/**
 * Build-time data pipeline: fetches Open-Meteo air quality + pollen for every
 * provincial capital and aggregates it into daily values (see _lib/aggregate.js
 * for the aggregation rules, which must match the app).
 *
 * API-failure handling (per the brief): the last good result is kept in
 * `.cache/pollen-data.json` (restored/saved via actions/cache in CI). If a
 * city's fetch fails, its cached entry is reused and keeps its ORIGINAL
 * `fetchedAt`, so pages can show the real date of the data they display.
 * Never present stale data as today's.
 *
 * Env flags:
 *   POLLEN_SKIP_FETCH=1  -> use cache only (offline dev builds)
 */
import fs from "node:fs";
import path from "node:path";
import { getAllCapitals } from "./constants/spain.js";
import { HOURLY_PARAMS, aggregateDays, slugify } from "../_lib/aggregate.js";

const API_BASE = "https://air-quality-api.open-meteo.com/v1/air-quality";
const CACHE_FILE = path.join(process.cwd(), ".cache", "pollen-data.json");
const CONCURRENCY = 6;
const RETRIES = 3;

function buildUrl(city) {
  const params = new URLSearchParams({
    latitude: String(city.lat),
    longitude: String(city.lon),
    hourly: HOURLY_PARAMS.join(","),
    forecast_days: "7",
    timezone: "auto", // mandatory: local day boundaries, solves Canarias too
  });
  return `${API_BASE}?${params}`;
}

async function fetchCity(city) {
  let lastErr;
  for (let attempt = 1; attempt <= RETRIES; attempt++) {
    try {
      const res = await fetch(buildUrl(city), { signal: AbortSignal.timeout(20000) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      if (!json.hourly?.time?.length) throw new Error("empty hourly payload");
      return json;
    } catch (err) {
      lastErr = err;
      if (attempt < RETRIES) await new Promise((r) => setTimeout(r, 1000 * 2 ** (attempt - 1)));
    }
  }
  throw lastErr;
}

function readCache() {
  try {
    return JSON.parse(fs.readFileSync(CACHE_FILE, "utf8"));
  } catch {
    return null;
  }
}

function writeCache(data) {
  fs.mkdirSync(path.dirname(CACHE_FILE), { recursive: true });
  fs.writeFileSync(CACHE_FILE, JSON.stringify(data));
}

async function pool(items, worker, size) {
  const results = new Array(items.length);
  let next = 0;
  await Promise.all(
    Array.from({ length: Math.min(size, items.length) }, async () => {
      while (next < items.length) {
        const i = next++;
        results[i] = await worker(items[i], i);
      }
    }),
  );
  return results;
}

export default async function () {
  const capitals = getAllCapitals();
  const cache = readCache();
  const cachedCities = cache?.cities ?? {};
  const now = new Date().toISOString();

  if (process.env.POLLEN_SKIP_FETCH === "1") {
    if (!cache) throw new Error("POLLEN_SKIP_FETCH=1 but no .cache/pollen-data.json exists");
    console.log(`[pollenData] using cache only (${Object.keys(cachedCities).length} cities, fetched ${cache.fetchedAt})`);
    return cache;
  }

  const failures = [];
  const cities = {};

  await pool(
    capitals,
    async (city) => {
      const slug = slugify(city.name);
      try {
        const raw = await fetchCity(city);
        cities[slug] = {
          name: city.name,
          provincia: city.provincia,
          ccaa: city.ccaa,
          lat: city.lat,
          lon: city.lon,
          timezone: raw.timezone,
          units: { pollen: "granos/m³", aqi: "EAQI", pm: "µg/m³", ozone: "µg/m³" },
          fetchedAt: now,
          stale: false,
          days: aggregateDays(raw.hourly),
        };
      } catch (err) {
        const cached = cachedCities[slug];
        if (cached) {
          // Keep previous good data with its REAL fetch date; mark stale so
          // templates show that date instead of pretending it's today's.
          cities[slug] = { ...cached, stale: true };
          failures.push(`${slug} (using cache from ${cached.fetchedAt}): ${err.message}`);
        } else {
          failures.push(`${slug} (NO DATA, no cache either): ${err.message}`);
        }
      }
    },
    CONCURRENCY,
  );

  const data = { fetchedAt: now, cities, failures };

  if (failures.length) {
    console.warn(`[pollenData] ${failures.length} fetch failure(s):\n  - ${failures.join("\n  - ")}`);
  }
  // Only cache genuinely fresh data alongside carried-over stale entries.
  writeCache(data);
  console.log(`[pollenData] ${Object.keys(cities).length}/${capitals.length} cities ready (${failures.length} from cache/missing)`);
  return data;
}
