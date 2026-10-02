/**
 * Today's pollen for the /en/pollen-{city} pages, from the Google Pollen API.
 *
 * Why Google, and why here: CAMS has no pollen for the United States (every
 * hour comes back null), so Open-Meteo cannot fill these pages the way it
 * fills the Spanish ones. The app gets US pollen from Google too, through the
 * `pollen-us` Edge Function; the site is a separate, server-side caller with
 * its own key and its own budget.
 *
 * Off by default. Without GOOGLE_POLLEN_API_KEY in the environment this
 * returns `enabled: false` and the city pages keep their seasonal-calendar
 * form, title included: a page called "Pollen Count Today" must have a count
 * for today on it.
 *
 * Cost: one call per city per local day, at most MAX_CALLS per build. 50
 * cities x 31 days is about 1,550 calls a month, inside Google's free 5,000
 * together with the app's ~20 a day. A rebuild later the same day (a push to
 * main) reuses the cache and calls nothing.
 *
 * Google's terms let a forecast be kept for 24 hours. A cached entry older
 * than that is never shown or reused, and a city whose fetch failed without a
 * fresh cache simply has no data today; the page says so.
 *
 * Levels, not numbers: Google returns a 0-5 index (UPI), not grains/m3. It is
 * mapped exactly as the app maps it (supabase/functions/_shared/pollenUs.ts).
 */
import fs from "node:fs";
import path from "node:path";
import loadUsCities from "./usCities.js";
import { normalise, summarise, targetDate } from "../_lib/usPollen.js";

const API = "https://pollen.googleapis.com/v1/forecast:lookup";
const CACHE_FILE = path.join(process.cwd(), ".cache", "us-pollen-data.json");
const MAX_CALLS = 60;
const MAX_AGE_MS = 24 * 3600 * 1000;
const CONCURRENCY = 4;

async function fetchCity(city, key) {
  const params = new URLSearchParams({
    key,
    "location.latitude": String(city.lat),
    "location.longitude": String(city.lon),
    days: "5",
    languageCode: "en",
    plantsDescription: "false",
  });
  const res = await fetch(`${API}?${params}`, { signal: AbortSignal.timeout(20000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const days = normalise(await res.json());
  if (!days) throw new Error("not a forecast payload");
  if (!days.some((d) => Object.keys(d.plants).length)) throw new Error("no recognised plants");
  return days;
}

function readCache() {
  try {
    return JSON.parse(fs.readFileSync(CACHE_FILE, "utf8"));
  } catch {
    return { cities: {} };
  }
}

export default async function () {
  const key = process.env.GOOGLE_POLLEN_API_KEY;
  if (!key && process.env.POLLEN_SKIP_FETCH !== "1") {
    console.log("[usPollenData] GOOGLE_POLLEN_API_KEY not set: /en/ city pages stay seasonal");
    return { enabled: false, cities: {} };
  }

  const usCities = loadUsCities();
  const now = new Date();
  const cache = readCache();
  const cities = {};
  const failures = [];
  let calls = 0;

  const queue = [...usCities];
  await Promise.all(
    Array.from({ length: CONCURRENCY }, async () => {
      while (queue.length) {
        const city = queue.shift();
        const today = targetDate(city.lon, now);
        const cached = cache.cities?.[city.slug];
        const fresh = cached && now - new Date(cached.fetchedAt) < MAX_AGE_MS;
        let entry = null;

        if (fresh && cached.forDate === today) {
          entry = cached;
        } else if (key && process.env.POLLEN_SKIP_FETCH !== "1" && calls < MAX_CALLS) {
          calls++;
          try {
            entry = { forDate: today, fetchedAt: now.toISOString(), days: await fetchCity(city, key) };
          } catch (err) {
            failures.push(`${city.slug}: ${err.message}`);
          }
        }
        if (!entry && fresh) entry = cached;
        if (!entry) continue;

        const days = entry.days.filter((d) => d.date >= today).map(summarise);
        if (!days.length || days[0].date !== today) continue;
        cities[city.slug] = { ...entry, today, days };
      }
    }),
  );

  // Only entries younger than 24 h are ever written back.
  const keep = {};
  for (const [slug, c] of Object.entries({ ...cache.cities, ...cities })) {
    if (now - new Date(c.fetchedAt) < MAX_AGE_MS) keep[slug] = { forDate: c.forDate, fetchedAt: c.fetchedAt, days: c.days.map(({ date, plants }) => ({ date, plants })) };
  }
  fs.mkdirSync(path.dirname(CACHE_FILE), { recursive: true });
  fs.writeFileSync(CACHE_FILE, JSON.stringify({ cities: keep }));

  if (failures.length) console.warn(`[usPollenData] ${failures.length} failure(s):\n  - ${failures.join("\n  - ")}`);
  console.log(`[usPollenData] ${Object.keys(cities).length}/${usCities.length} cities with today's pollen (${calls} Google calls)`);
  return { enabled: true, cities };
}
