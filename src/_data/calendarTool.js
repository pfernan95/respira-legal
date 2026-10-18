/**
 * Data for the pollen calendar tool (/calendario-polen, /en/pollen-calendar).
 *
 * Each city gets one 12-month row per species, from the best source the site
 * has for that species there, and every row says which source it is:
 *
 *  - "model": the city's own Copernicus CAMS climatology (cityClimatology.json,
 *    2023-2025 average of the daily highs). Real model output at the city's
 *    coordinates, for the six species CAMS carries. Spain, the UK, Ireland.
 *  - "calendar": the app's seasonal calendar (zoneCalendars.json, generated
 *    from respira-app). In Spain only for the species CAMS does not carry
 *    (cypress, plane tree, pellitory, Arizona cypress, Alternaria): those rows
 *    are the REA calendars the app is calibrated on. In the US, every row: the
 *    Google Pollen API has no history, and these are the same calendars the
 *    US city pages already show.
 *
 * Deliberately NOT shown: the app's calendar rows for CAMS species outside
 * Spain's Mediterranean baseline, and any estimated species in the UK or
 * Ireland. Those are the Spanish calendar shifted by a month; where the site
 * has the model's own months for the city, a shifted Spanish row would only
 * contradict it, and where it has nothing it would be a guess.
 *
 * A row is a 12-character string, one per month from January:
 *   "-" no data, "0" none or under 1 grain/m³ on average, "1" low,
 *   "2" moderate, "3" high, "4" very high.
 * No grain counts reach the page: levels only, as in the app.
 */
import zoneCalendars from "./zoneCalendars.json" with { type: "json" };
import cityClimatology from "./cityClimatology.json" with { type: "json" };
import { POLLEN_TYPES } from "./constants/pollen.js";
import { US_SPECIES_NAMES, US_ZONE_LABELS } from "./constants/us.js";

const CODE = { none: "0", low: "1", moderate: "2", high: "3", very_high: "4" };
const isModelSpecies = (t) => !!POLLEN_TYPES[t]?.openMeteoKey;

function modelRow(months) {
  if (!Array.isArray(months) || months.every((m) => m == null)) return null;
  return months.map((m) => (m == null ? "-" : m.value < 1 ? "0" : CODE[m.level] ?? "-")).join("");
}
const calendarRow = (series) => series.map((l) => CODE[l] ?? "-").join("");

function buildCity(city) {
  const cal = zoneCalendars.calendars[city.cal];
  const clima = cityClimatology.cities[city.id.replace(/^es\//, "")];
  const rows = {};
  const src = {};
  for (const type of zoneCalendars.types) {
    if (city.country === "US") {
      if (cal.rows[type]) { rows[type] = calendarRow(cal.rows[type]); src[type] = "c"; }
      continue;
    }
    if (isModelSpecies(type)) {
      const r = modelRow(clima?.[type]);
      // A species the model never puts at 1 grain/m³ in any month is not a
      // season here; listing it as twelve blanks is noise.
      if (r && /[1-4]/.test(r)) { rows[type] = r; src[type] = "m"; }
    } else if (city.country === "ES" && cal.rows[type]) {
      rows[type] = calendarRow(cal.rows[type]);
      src[type] = "c";
    }
  }
  const notes = [];
  // Same caution the city page prints (polen-ciudad.njk): the model keeps a
  // November mugwort signal that does not match the plant's flowering.
  // The table keeps that month, with the note; the written summary leaves it
  // out (`skip`), so it never announces "mugwort from November".
  const skip = {};
  if (clima?.mugwort?.[10] && clima.mugwort[10].value >= 1) { notes.push("mugwortNov"); skip.mugwort = [10]; }
  if (city.country !== "US" && !Object.values(src).includes("m")) notes.push("noModel");
  // Written summaries list species in the order their season starts (first
  // month at moderate or above, from January), not in catalogue order.
  const firstOn = (t) => { const i = [...rows[t]].findIndex((c) => c >= "2" && c <= "4"); return i < 0 ? 99 : i; };
  const order = Object.keys(rows).sort((a, b) => firstOn(a) - firstOn(b));
  return {
    id: city.id, name: city.name, label: city.label, group: city.group, country: city.country, url: city.url,
    zone: cal.zone, rows, src, notes, skip, order,
  };
}

// The picker's <optgroup>s, in the generator's order (Nunjucks cannot carry a
// "current group" across loop iterations reliably, so the page gets them made).
function groups(cities) {
  const out = [];
  for (const c of cities) {
    const last = out[out.length - 1];
    if (last && last.name === c.group) last.cities.push(c);
    else out.push({ name: c.group, cities: [c] });
  }
  return out;
}

export default function () {
  const es = zoneCalendars.cities.es.map(buildCity);
  const en = zoneCalendars.cities.en.map(buildCity);
  const find = (list, id) => {
    const c = list.find((x) => x.id === id);
    if (!c) throw new Error(`calendarTool: no city ${id}`);
    return c;
  };
  const namesEn = { ...zoneCalendars.names.en };
  return {
    climaStart: cityClimatology.start.slice(0, 4),
    climaEnd: cityClimatology.end.slice(0, 4),
    types: zoneCalendars.types,
    es: { cities: es, groups: groups(es), default: find(es, "es/madrid"), names: zoneCalendars.names.es },
    en: {
      cities: en,
      groups: groups(en),
      default: find(en, "uk/london"),
      // The cities the page's written sections quote, by id.
      byId: Object.fromEntries(["uk/london", "ireland/dublin", "us/new-york", "us/chicago", "us/dallas",
        "us/atlanta", "us/seattle"].map((id) => [id, find(en, id)])),
      // US pages name these their own way ("Juniper / Cedar", "Cottonwood");
      // the tool follows them for US cities and the app's English elsewhere.
      names: namesEn,
      namesUs: { ...namesEn, ...US_SPECIES_NAMES },
      zoneLabels: US_ZONE_LABELS,
    },
  };
}
