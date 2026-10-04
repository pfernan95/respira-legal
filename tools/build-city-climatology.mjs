/**
 * Month-by-month pollen climatology for a city, from CAMS reanalysis via
 * Open-Meteo, written to src/_data/cityClimatology.json.
 *
 * Covers the Spanish cities in CITIES and every UK and Ireland city page.
 *
 * Run by hand, not in the build: the past does not change, and a daily deploy
 * should not depend on a 26,000-hour download. Re-run once a year to roll the
 * window forward.
 *
 *   node tools/build-city-climatology.mjs            # every city in CITIES
 *
 * What a cell means: the mean, over every day of that month in the window, of
 * the day's MAXIMUM hourly value (the same daily rule the city pages use for
 * "today"), classified with the app's thresholds. Hours the model left null
 * are skipped, never read as zero; a month with no usable day is null.
 */
import fs from "node:fs";
import path from "node:path";
import { getAllCapitals } from "../src/_data/constants/spain.js";
import { POLLEN_TYPES, getPollenLevel } from "../src/_data/constants/pollen.js";
import { slugify } from "../src/_lib/aggregate.js";
import loadUkCities from "../src/_data/ukCities.js";

// Spanish city pages that carry their own calendar, by slug.
const CITIES = ["madrid"];
const START = "2023-01-01";
const END = "2025-12-31";
const OUT = path.join(process.cwd(), "src", "_data", "cityClimatology.json");

const TYPES = Object.values(POLLEN_TYPES).filter((t) => t.openMeteoKey).map((t) => t.id);

async function climatology(city, types = TYPES) {
  const params = new URLSearchParams({
    latitude: String(city.lat),
    longitude: String(city.lon),
    hourly: types.map((id) => POLLEN_TYPES[id].openMeteoKey).join(","),
    start_date: START,
    end_date: END,
    timezone: "auto",
  });
  // Three years of hourly data is a heavy request by Open-Meteo's per-minute
  // weighting; a 429 means wait for the next minute, not give up.
  let res;
  for (let attempt = 1; ; attempt++) {
    res = await fetch(`https://air-quality-api.open-meteo.com/v1/air-quality?${params}`);
    if (res.status !== 429 || attempt === 4) break;
    console.log(`[climatology] ${city.name}: 429, waiting 65 s`);
    await new Promise((r) => setTimeout(r, 65000));
  }
  if (!res.ok) throw new Error(`${city.name}: HTTP ${res.status}`);
  const { hourly } = await res.json();

  const rows = {};
  for (const id of types) {
    const series = hourly[POLLEN_TYPES[id].openMeteoKey];
    const dailyMax = new Map();
    hourly.time.forEach((t, i) => {
      const v = series[i];
      if (v == null || Number.isNaN(v)) return;
      const day = t.slice(0, 10);
      dailyMax.set(day, Math.max(dailyMax.get(day) ?? 0, Math.max(0, v)));
    });
    const byMonth = Array.from({ length: 12 }, () => []);
    for (const [day, v] of dailyMax) byMonth[Number(day.slice(5, 7)) - 1].push(v);
    rows[id] = byMonth.map((vals) => {
      if (!vals.length) return null;
      const mean = vals.reduce((a, b) => a + b, 0) / vals.length;
      const value = Math.round(mean * 10) / 10;
      return { value, level: getPollenLevel(id, value), days: vals.length };
    });
  }
  return rows;
}

const capitals = getAllCapitals();
const out = { source: "CAMS (Copernicus) vía Open-Meteo", start: START, end: END, cities: {} };
for (const slug of CITIES) {
  const city = capitals.find((c) => slugify(c.name) === slug);
  if (!city) throw new Error(`unknown city ${slug}`);
  out.cities[slug] = await climatology(city);
  console.log(`[climatology] ${slug}: ${TYPES.length} types`);
}
// Every UK and Ireland page, keyed "uk/london", "ireland/dublin". No olive:
// the app treats it as absent there (ukPollenData.js).
for (const city of loadUkCities()) {
  out.cities[city.key] = await climatology(city, TYPES.filter((id) => id !== "olive"));
  console.log(`[climatology] ${city.key}`);
}
fs.writeFileSync(OUT, JSON.stringify(out, null, 1) + "\n");
