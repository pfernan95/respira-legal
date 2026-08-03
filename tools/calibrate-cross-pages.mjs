/**
 * One-off calibration pass for cross pages (/polen-{polen}-{ciudad}).
 *
 * Filter (brief Parte 2, mechanical — not judgement):
 *   1. Only the 6 API pollens (grass, olive, birch, alder, mugwort, ragweed).
 *      The 5 estimated types have only a national monthly number, so a
 *      per-city page would carry no data of its own.
 *   2. Only if that pollen reaches at least `moderate` in that city at some
 *      point of the year. Calibrated with data, not intuition: Open-Meteo's
 *      air-quality API accepts past_days (up to 92). We pull the last 92 days
 *      per city and check the max hourly value against the moderate threshold.
 *
 * The result is written to src/_data/crossPages.json (versioned in the repo)
 * so page generation is reproducible and auditable. Re-run before each
 * expansion of cross pages; it is NOT part of the daily build.
 *
 *   node tools/calibrate-cross-pages.mjs
 */
import fs from "node:fs";
import { getAllCapitals } from "../src/_data/constants/spain.js";
import { POLLEN_TYPES, POLLEN_THRESHOLDS } from "../src/_data/constants/pollen.js";
import { slugify } from "../src/_lib/aggregate.js";

const API = "https://air-quality-api.open-meteo.com/v1/air-quality";
const API_TYPES = Object.values(POLLEN_TYPES).filter((t) => t.openMeteoKey);
const CONCURRENCY = 6;

async function fetchPast(city) {
  const params = new URLSearchParams({
    latitude: String(city.lat),
    longitude: String(city.lon),
    hourly: API_TYPES.map((t) => t.openMeteoKey).join(","),
    past_days: "92",
    forecast_days: "1",
    timezone: "auto",
  });
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(`${API}?${params}`, { signal: AbortSignal.timeout(30000) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      if (attempt === 3) throw err;
      await new Promise((r) => setTimeout(r, 1500 * attempt));
    }
  }
}

async function pool(items, worker, size) {
  const out = new Array(items.length);
  let i = 0;
  await Promise.all(
    Array.from({ length: Math.min(size, items.length) }, async () => {
      while (i < items.length) {
        const idx = i++;
        out[idx] = await worker(items[idx]);
      }
    }),
  );
  return out;
}

const capitals = getAllCapitals();
const byCity = {};
let calls = 0;

await pool(
  capitals,
  async (city) => {
    const slug = slugify(city.name);
    try {
      const json = await fetchPast(city);
      const hourly = json.hourly;
      const qualifying = [];
      for (const t of API_TYPES) {
        const vals = (hourly[t.openMeteoKey] || []).filter((v) => v != null && v >= 0);
        const max = vals.length ? Math.max(...vals) : 0;
        if (max >= POLLEN_THRESHOLDS[t.id].moderate) {
          qualifying.push({ pollen: t.id, maxObserved: Math.round(max * 10) / 10 });
        }
      }
      byCity[slug] = qualifying;
      calls++;
      process.stdout.write(`\r${calls}/${capitals.length} ciudades calibradas`);
    } catch (err) {
      byCity[slug] = [];
      console.error(`\n${slug}: ${err.message}`);
    }
  },
  CONCURRENCY,
);

// Flatten to a page list, ordered by observed max (proxy for intensity)
const pages = [];
for (const [city, list] of Object.entries(byCity)) {
  for (const { pollen, maxObserved } of list) {
    pages.push({ pollen, city, maxObserved });
  }
}
pages.sort((a, b) => b.maxObserved - a.maxObserved);

// Which pollens the 92-day window could actually see, based on the run date.
// A single 92-day pass cannot cover every pollen's season; pollens whose
// canonical season falls entirely outside the window are under-counted and
// must be re-calibrated with a pass during their season.
const runMonth = Number(
  new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Madrid", month: "2-digit" }).format(
    new Date(Number(process.env.CAL_NOW_MS)),
  ),
);
const output = {
  calibratedWindow: "past_92_days",
  runMonth,
  caveat:
    "One 92-day pass only sees ~3 months. Pollens in season within the window are reliable; pollens whose season falls outside it (e.g. birch/alder in a summer run) are under-counted and need a re-calibration pass during their season (Feb–May for birch/alder/cypress).",
  note: "Cross pages generated only for (pollen, city) pairs where the max hourly value in the last 92 days reached the moderate threshold. 6 API pollens only.",
  pairCount: pages.length,
  pages,
  byCity,
};
fs.writeFileSync("src/_data/crossPages.json", JSON.stringify(output, null, 2) + "\n");
console.log(`\n\n${pages.length} páginas cruzadas cualifican. Escrito a src/_data/crossPages.json`);
