/**
 * Aggregation rules for turning Open-Meteo hourly data into daily values.
 *
 * These rules are the brief's "regla de agregación de hoy" and mirror the
 * app's forecast view (`extractForecast`), so the web matches the app's
 * "today" forecast row:
 *
 *   - Daily value per pollen type = MAX of that day's hourly values.
 *   - Overall daily level = worst level across types (low < moderate < high
 *     < very_high < extreme).
 *   - Daily AQI = MEAN of hourly `european_aqi`, rounded. Pollen goes by max,
 *     AQI goes by mean — do not unify them.
 *   - Negative hourly values are clamped to 0 before computing levels.
 *
 * The label for this number is "máximo previsto para hoy" — never "ahora
 * mismo": the page is static and rebuilt once a day.
 */
import {
  POLLEN_TYPES,
  POLLEN_THRESHOLDS,
  getPollenLevel,
  getOverallPollenLevel,
} from "../_data/constants/pollen.js";

/** Open-Meteo hourly params, exactly as the app requests them. */
export const HOURLY_PARAMS = [
  "pm2_5",
  "pm10",
  "ozone",
  "european_aqi",
  "alder_pollen",
  "birch_pollen",
  "grass_pollen",
  "mugwort_pollen",
  "olive_pollen",
  "ragweed_pollen",
];

/** Pollen types that come from the API (openMeteoKey !== null). */
export const API_POLLEN_TYPES = Object.values(POLLEN_TYPES)
  .filter((t) => t.openMeteoKey !== null)
  .map((t) => t.id);

const clamp0 = (v) => (v == null || Number.isNaN(v) ? null : Math.max(0, v));

function maxOf(values) {
  const clean = values.map(clamp0).filter((v) => v !== null);
  return clean.length ? Math.max(...clean) : null;
}

function meanOf(values) {
  const clean = values.map(clamp0).filter((v) => v !== null);
  if (!clean.length) return null;
  return clean.reduce((a, b) => a + b, 0) / clean.length;
}

/**
 * Group Open-Meteo's flat hourly arrays into per-day buckets.
 * `hourly.time` is local time (timezone=auto), ISO "YYYY-MM-DDTHH:00".
 */
function groupByDay(hourly) {
  const days = new Map();
  hourly.time.forEach((t, i) => {
    const date = t.slice(0, 10);
    if (!days.has(date)) days.set(date, []);
    days.get(date).push(i);
  });
  return days;
}

/**
 * Aggregate one city's Open-Meteo response into daily summaries.
 * Returns an array of days (local dates, timezone=auto):
 * {
 *   date: "2026-08-03",
 *   pollen: { grass: { value, level }, ... },   // API types only
 *   overallLevel: "moderate",
 *   aqi: { value, pm2_5, pm10, ozone },          // means, rounded
 * }
 */
export function aggregateDays(hourly) {
  const days = groupByDay(hourly);
  const result = [];

  for (const [date, idxs] of days) {
    const pick = (key) => idxs.map((i) => hourly[key]?.[i]);

    const pollen = {};
    for (const id of API_POLLEN_TYPES) {
      const key = POLLEN_TYPES[id].openMeteoKey;
      const value = maxOf(pick(key));
      pollen[id] = {
        value: value === null ? null : Math.round(value * 10) / 10,
        level: value === null ? null : getPollenLevel(id, value),
      };
    }

    const levels = Object.values(pollen)
      .map((p) => p.level)
      .filter(Boolean);

    // Dominant pollen of the day: highest level, ties broken by how far the
    // value is into its own thresholds (raw values aren't comparable across
    // types because each type has different thresholds).
    const LEVEL_ORDER = ["low", "moderate", "high", "very_high", "extreme"];
    let dominant = null;
    let best = -1;
    for (const [id, p] of Object.entries(pollen)) {
      if (p.value === null || p.value === 0) continue;
      const score =
        LEVEL_ORDER.indexOf(p.level) * 1000 + p.value / POLLEN_THRESHOLDS[id].moderate;
      if (score > best) {
        best = score;
        dominant = id;
      }
    }

    const aqiMean = meanOf(pick("european_aqi"));

    result.push({
      date,
      pollen,
      dominant,
      overallLevel: levels.length ? getOverallPollenLevel(levels) : null,
      aqi: {
        value: aqiMean === null ? null : Math.round(aqiMean),
        pm2_5: round1(meanOf(pick("pm2_5"))),
        pm10: round1(meanOf(pick("pm10"))),
        ozone: round1(meanOf(pick("ozone"))),
      },
    });
  }

  // CAMS only provides pollen ~5 days ahead even though the API accepts
  // forecast_days=7: trailing days come back all-null. Drop them — the page
  // must never promise more days than it can serve. But if NO day has pollen
  // (e.g. the Canary Islands sit outside CAMS pollen coverage), keep the days:
  // they still carry AQI and a date, and the template states there is no
  // pollen forecast for that location instead of rendering an empty page.
  const anyPollen = result.some((d) => d.overallLevel !== null);
  if (anyPollen) {
    while (result.length && result[result.length - 1].overallLevel === null) {
      result.pop();
    }
  }

  return result;
}

function round1(v) {
  return v === null ? null : Math.round(v * 10) / 10;
}

/** Great-circle-ish distance (km) between two lat/lon points (haversine). */
export function distanceKm(a, b) {
  const R = 6371;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lon - a.lon);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

/** Slug used in URLs: lowercase, no diacritics ("Cáceres" -> "caceres"). */
export function slugify(name) {
  return name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
