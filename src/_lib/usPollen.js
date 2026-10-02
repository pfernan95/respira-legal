/**
 * Pure helpers for usPollenData.js, kept out of the data file: Eleventy
 * exposes a data module with named exports as its whole namespace, not as
 * its default export, and the pages would read `usPollenData.cities` as
 * undefined.
 */
import { US_SPECIES_ORDER } from "../_data/constants/us.js";

// Same table and index mapping as the app. Codes outside it are dropped.
const PLANT_TO_TYPE = {
  GRAMINALES: "grass", GRASS: "grass", GRASSES: "grass",
  RAGWEED: "ragweed", BIRCH: "birch", ALDER: "alder", ASH: "ash", OAK: "oak",
  MAPLE: "maple", ELM: "elm", COTTONWOOD: "poplar", PINE: "pine", JUNIPER: "juniper",
};
const UPI_TO_LEVEL = ["none", "low", "low", "moderate", "high", "very_high"];
const RANK = { none: 0, low: 1, moderate: 2, high: 3, very_high: 4 };

/**
 * The local date a reader will see as "today" for most of this page's life.
 * The page lives until the next 05:00 UTC build; the date at the midpoint of
 * that window is the one that covers most of it, in every US time zone, for
 * the scheduled build and for an evening push alike. Longitude / 15 is the
 * same clock the app uses (rule 9): no timezone database, within an hour of
 * civil time across the country.
 */
export function targetDate(lon, now = new Date()) {
  const next = new Date(now);
  next.setUTCHours(5, 0, 0, 0);
  if (next <= now) next.setUTCDate(next.getUTCDate() + 1);
  const mid = new Date((now.getTime() + next.getTime()) / 2);
  const local = new Date(mid.getTime() + Math.round(lon / 15) * 3600 * 1000);
  return local.toISOString().slice(0, 10);
}

/** Google's payload -> [{ date, plants: { oak: "high", ... } }], or null if not a forecast. */
export function normalise(json) {
  if (!Array.isArray(json?.dailyInfo)) return null;
  const days = [];
  for (const d of json.dailyInfo) {
    if (!d?.date?.year || !d.date.month || !d.date.day) continue;
    const date = `${d.date.year}-${String(d.date.month).padStart(2, "0")}-${String(d.date.day).padStart(2, "0")}`;
    const plants = {};
    for (const p of d.plantInfo ?? []) {
      const type = PLANT_TO_TYPE[p?.code];
      if (!type) continue;
      // No indexInfo means out of season: Google omits the index rather than
      // sending zero. The app reads it as 'none'; so does this.
      const upi = Number(p.indexInfo?.value ?? 0);
      const idx = Number.isFinite(upi) ? Math.max(0, Math.min(5, Math.round(upi))) : 0;
      plants[type] = UPI_TO_LEVEL[idx];
    }
    days.push({ date, plants });
  }
  return days;
}

/** Overall level and main species for one day. Ties go to US_SPECIES_ORDER. */
export function summarise(day) {
  let overall = null;
  let dominant = null;
  for (const id of US_SPECIES_ORDER) {
    const lvl = day.plants[id];
    if (!lvl) continue;
    if (overall === null || RANK[lvl] > RANK[overall]) overall = lvl;
    if (RANK[lvl] > 0 && (dominant === null || RANK[lvl] > RANK[day.plants[dominant]])) dominant = id;
  }
  return { ...day, overallLevel: overall, dominant };
}

