/**
 * Today's pollen for the UK and Ireland city pages: the same Open-Meteo CAMS
 * pipeline as the Spanish pages (pollenData.js), for the cities in
 * ukCities.js, with the same daily aggregation (_lib/aggregate.js).
 *
 * Olive is left out. The app lists GB and IE in ABSENT_IN.olive (respira-app
 * constants/climateZones.ts): CAMS models it everywhere, but there is no olive
 * growing there to speak of, and a near-zero olive row would only be noise,
 * or worse, the "dominant" type of a quiet day.
 *
 * Failure handling as in pollenData.js: a failed city reuses its last good
 * entry with its ORIGINAL fetchedAt and `stale: true`, so the page shows the
 * real date of what it displays. POLLEN_SKIP_FETCH=1 reads the cache only.
 */
import fs from "node:fs";
import path from "node:path";
import loadUkCities from "./ukCities.js";
import { HOURLY_PARAMS, API_POLLEN_TYPES, aggregateDays } from "../_lib/aggregate.js";

const UK_TYPES = API_POLLEN_TYPES.filter((id) => id !== "olive");

const API_BASE = "https://air-quality-api.open-meteo.com/v1/air-quality";
const CACHE_FILE = path.join(process.cwd(), ".cache", "uk-pollen-data.json");
const CONCURRENCY = 4;
const RETRIES = 3;

async function fetchCity(city) {
  const params = new URLSearchParams({
    latitude: String(city.lat),
    longitude: String(city.lon),
    hourly: HOURLY_PARAMS.filter((p) => p !== "olive_pollen").join(","),
    forecast_days: "7",
    timezone: "auto",
  });
  let lastErr;
  for (let attempt = 1; attempt <= RETRIES; attempt++) {
    try {
      const res = await fetch(`${API_BASE}?${params}`, { signal: AbortSignal.timeout(20000) });
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

export default async function () {
  const cache = readCache();
  if (process.env.POLLEN_SKIP_FETCH === "1") {
    if (!cache) {
      console.log("[ukPollenData] POLLEN_SKIP_FETCH=1 and no cache: UK/IE pages render without today's data");
      return { cities: {} };
    }
    return cache;
  }

  const ukCities = loadUkCities();
  const now = new Date().toISOString();
  const cities = {};
  const failures = [];
  const queue = [...ukCities];
  await Promise.all(
    Array.from({ length: CONCURRENCY }, async () => {
      while (queue.length) {
        const city = queue.shift();
        try {
          const raw = await fetchCity(city);
          cities[city.key] = { timezone: raw.timezone, fetchedAt: now, stale: false, days: aggregateDays(raw.hourly, UK_TYPES) };
        } catch (err) {
          const cached = cache?.cities?.[city.key];
          if (cached) {
            cities[city.key] = { ...cached, stale: true };
            failures.push(`${city.key} (using cache from ${cached.fetchedAt}): ${err.message}`);
          } else {
            failures.push(`${city.key} (NO DATA): ${err.message}`);
          }
        }
      }
    }),
  );

  const data = { fetchedAt: now, cities };
  fs.mkdirSync(path.dirname(CACHE_FILE), { recursive: true });
  fs.writeFileSync(CACHE_FILE, JSON.stringify(data));
  if (failures.length) console.warn(`[ukPollenData] ${failures.length} failure(s):\n  - ${failures.join("\n  - ")}`);
  console.log(`[ukPollenData] ${Object.keys(cities).length}/${ukCities.length} cities ready`);
  return data;
}
