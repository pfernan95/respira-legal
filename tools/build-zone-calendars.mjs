/**
 * The app's own seasonal calendar for every city the site has a page for,
 * written to src/_data/zoneCalendars.json for the calendar tool
 * (/calendario-polen, /en/pollen-calendar).
 *
 * The rows come from respira-app itself, not from a port: this script
 * compiles the app's lib/season.ts (and the constants it imports) with the
 * app's own TypeScript, resolves each city's climate zone with
 * resolveClimateZone() and asks ribbonRows() for the species the app's
 * calendar card would show there. So the tool shows a visitor exactly what
 * the app shows them, and a calendar change in the app reaches the site the
 * next time this runs.
 *
 * Run by hand after a calendar change in the app, not in the build: the
 * deploy must not depend on a checkout of another repository.
 *
 *   node tools/build-zone-calendars.mjs ../respira-app
 *
 * Month resolution only, a typical year, by climate zone: it is a calendar,
 * not a forecast, and the pages say so.
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import { getAllCapitals } from "../src/_data/constants/spain.js";
import { slugify } from "../src/_lib/aggregate.js";
import loadUkCities from "../src/_data/ukCities.js";
import loadUsCities from "../src/_data/usCities.js";

const APP = path.resolve(process.argv[2] || "../respira-app");
const OUT = path.join(process.cwd(), "src", "_data", "zoneCalendars.json");
if (!fs.existsSync(path.join(APP, "lib", "season.ts"))) {
  console.error(`No respira-app checkout at ${APP} (expected lib/season.ts).`);
  process.exit(1);
}

// --- Compile the app's calendar modules -----------------------------------
const BUILD = fs.mkdtempSync(path.join(os.tmpdir(), "respira-calendar-"));
try {
  execFileSync("npx", [
    "tsc", "lib/season.ts", "--outDir", BUILD, "--rootDir", ".",
    "--module", "commonjs", "--target", "es2020", "--esModuleInterop",
    "--skipLibCheck", "--moduleResolution", "node",
  ], { cwd: APP, stdio: "pipe" });
} catch {
  // tsc reports unrelated repo errors but still emits; the require below
  // fails loudly if it did not.
}
// constants/colors.ts imports react-native for Platform.select. Nothing the
// calendar reads depends on it, so a tolerant stub stands in.
const SHIM = path.join(BUILD, "__rn_stub.js");
fs.writeFileSync(SHIM, `
const shim = new Proxy(function () { return shim; }, {
  get(_t, p) {
    if (p === "OS") return "ios";
    if (p === "select") return (o) => o.ios ?? o.default;
    if (p === "__esModule") return true;
    if (p === "default") return shim;
    if (p === "then") return undefined;
    return shim;
  },
  apply() { return shim; },
});
module.exports = shim;
`);
(function patch(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const f = path.join(dir, e.name);
    if (e.isDirectory()) { patch(f); continue; }
    if (!f.endsWith(".js") || f === SHIM) continue;
    const rel = path.relative(path.dirname(f), SHIM).replace(/\\/g, "/");
    const src = fs.readFileSync(f, "utf8").replace(/require\((["'])(react-native[^"']*)\1\)/g,
      () => `require("${rel.startsWith(".") ? rel : "./" + rel}")`);
    fs.writeFileSync(f, src);
  }
})(BUILD);

const require = createRequire(import.meta.url);
const { ribbonRows } = require(path.join(BUILD, "lib", "season.js"));
const { resolveClimateZone } = require(path.join(BUILD, "constants", "climateZones.js"));
const { POLLEN_TYPES } = require(path.join(BUILD, "constants", "pollen.js"));
const TYPE_ORDER = Object.keys(POLLEN_TYPES);

// --- Cities: every city page on the site ----------------------------------
const cities = [
  ...getAllCapitals().map((c) => {
    const slug = slugify(c.name);
    return { lang: "es", id: `es/${slug}`, name: c.name, label: c.name, group: c.ccaa,
             country: "ES", lat: c.lat, lon: c.lon, url: `/polen-${slug}` };
  }),
  ...loadUkCities().map((c) => ({
    lang: "en", id: c.key, name: c.name, label: c.name, group: c.country === "GB" ? "United Kingdom" : "Ireland",
    country: c.country, lat: c.lat, lon: c.lon, url: c.url,
  })),
  ...loadUsCities().map((c) => ({
    lang: "en", id: `us/${c.slug}`, name: c.name, label: `${c.name}, ${c.abbr}`, group: "United States",
    country: "US", lat: c.lat, lon: c.lon,
    url: `/en/pollen-${c.slug}`,
  })),
];

// --- One calendar per (country, zone); cities point at it -----------------
const calendars = {};
const out = { es: [], en: [] };
for (const c of cities) {
  const zone = resolveClimateZone(c.country, c.lat, c.lon);
  const key = `${c.country}:${zone}`;
  if (!calendars[key]) {
    // No allergens and month 0: the same rows the app's calendar card lists
    // for this place, minus its per-user ordering. Species with no active
    // month (ribbonRows drops them) and station-only species (no 12-month
    // series) are absent, as they are in the app.
    const rows = ribbonRows([], zone, c.country, 0)
      .sort((a, b) => TYPE_ORDER.indexOf(a.type) - TYPE_ORDER.indexOf(b.type));
    if (!rows.length) throw new Error(`${c.name}: no calendar rows for ${key}`);
    calendars[key] = { country: c.country, zone, rows: Object.fromEntries(rows.map((r) => [r.type, r.series])) };
  }
  out[c.lang].push({ id: c.id, name: c.name, label: c.label, group: c.group, country: c.country, cal: key, url: c.url });
}
// The city picker lists groups and cities alphabetically, as a reader looks
// for them; the generators' own order is by population.
const coll = { es: new Intl.Collator("es"), en: new Intl.Collator("en") };
for (const lang of ["es", "en"]) {
  const order = lang === "en" ? ["United Kingdom", "Ireland", "United States"] : null;
  out[lang].sort((a, b) =>
    (order ? order.indexOf(a.group) - order.indexOf(b.group) : coll[lang].compare(a.group, b.group)) ||
    coll[lang].compare(a.label, b.label));
}

// --- Names and intensity words, from the app's locale files ---------------
const loc = (l) => JSON.parse(fs.readFileSync(path.join(APP, "lib", "i18n", "locales", `${l}.json`), "utf8"));
const es = loc("es"), en = loc("en"), enUS = loc("en-US");
const usedTypes = [...new Set(Object.values(calendars).flatMap((k) => Object.keys(k.rows)))]
  .sort((a, b) => TYPE_ORDER.indexOf(a) - TYPE_ORDER.indexOf(b));
const pick = (dict) => Object.fromEntries(usedTypes.map((t) => [t, dict.pollen.types[t]]));
const namesUS = Object.fromEntries(usedTypes.map((t) => [t, enUS.pollen?.types?.[t] ?? en.pollen.types[t]]));

const appCommit = execFileSync("git", ["rev-parse", "--short", "HEAD"], { cwd: APP }).toString().trim();
const json = {
  source: `respira-app ${appCommit}: lib/season.ts ribbonRows() over constants/seasonalCalendar.ts, zone from resolveClimateZone()`,
  types: usedTypes,
  calendars,
  cities: out,
  names: { es: pick(es), en: pick(en), "en-US": namesUS },
  intensity: { es: es.pollen.intensity, en: en.pollen.intensity },
};
fs.writeFileSync(OUT, JSON.stringify(json, null, 1) + "\n");
fs.rmSync(BUILD, { recursive: true, force: true });

const byZone = {};
for (const [k, v] of Object.entries(calendars)) byZone[k] = Object.keys(v.rows).length;
console.log(`[zoneCalendars] ${out.es.length} es + ${out.en.length} en cities, ${Object.keys(calendars).length} calendars`);
console.log(byZone);
