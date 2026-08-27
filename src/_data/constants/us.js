/**
 * Ported literally from respira-app `constants/climateZones.ts` and
 * `constants/seasonalCalendar.ts` (copy dated 2026-08-27).
 * Source of truth: the app. Do not edit values here without changing the app first.
 *
 * This is what lets the /en/ city pages be built with no API call at all:
 * the seasonal shape of a US city comes from its climate zone, which is a
 * pure function of latitude and longitude.
 */

/** Compact 12-month series. '.' none, l low, m moderate, h high, V very high. */
function months(spec) {
  if (spec.length !== 12) throw new Error(`monthly series must be 12 characters: "${spec}"`);
  const map = { ".": "none", l: "low", m: "moderate", h: "high", V: "very_high" };
  return [...spec].map((c) => {
    const level = map[c];
    if (!level) throw new Error(`unknown intensity "${c}" in "${spec}"`);
    return level;
  });
}

export const US_ZONES = ["us_southeast", "us_northeast", "us_midwest", "us_southwest", "us_pacific"];

export const US_ZONE_LABELS = {
  us_southeast: "the Southeast",
  us_northeast: "the Northeast",
  us_midwest: "the Midwest",
  us_southwest: "the Southwest",
  us_pacific: "the Pacific Coast",
};

/**
 * Which of the five US zones a point falls in. A rough west-to-east cut,
 * with boundaries chosen so the places that matter aerobiologically land
 * right: the -94 cut keeps Texas and Oklahoma on the southwest side, so
 * Austin and San Antonio sit in the mountain-cedar belt where they belong.
 */
export function resolveUsZone(lat, lon) {
  if (lat == null || lon == null) return "us_midwest";
  if (lon <= -115) return "us_pacific";
  if (lon <= -94 && lat < 37) return "us_southwest";
  if (lon <= -95) return "us_midwest";
  if (lat < 36.5) return "us_southeast";
  if (lon <= -80) return "us_midwest";
  return "us_northeast";
}

/**
 * Monthly intensity per species per zone.
 *
 * A zeroed row is a statement, not a gap: birch does not occur in the Gulf
 * south or the desert southwest, and this is how the file says so.
 */
export const US_MONTHLY_INTENSITY = {
  //                            J F M A M J J A S O N D
  grass: {
    us_southeast: months(".lmhVVhhml.."),
    us_northeast: months("...lhVhll..."),
    us_midwest:   months("...lhVhml..."),
    us_southwest: months("llmhhhhmmlll"),
    us_pacific:   months("..lmhhml...."),
  },
  ragweed: {
    us_southeast: months(".......hVml."),
    us_northeast: months(".......hVm.."),
    us_midwest:   months("......lVVm.."),
    us_southwest: months(".......mhm.."),
    us_pacific:   months(".......ll..."),
  },
  birch: {
    us_southeast: months("............"),
    us_northeast: months("...hVl......"),
    us_midwest:   months("...mhl......"),
    us_southwest: months("............"),
    us_pacific:   months("..mhm......."),
  },
  alder: {
    us_southeast: months("............"),
    us_northeast: months(".lmm........"),
    us_midwest:   months(".lml........"),
    us_southwest: months("............"),
    us_pacific:   months("hVhm........"),
  },
  ash: {
    us_southeast: months(".mhm........"),
    us_northeast: months("..lhm......."),
    us_midwest:   months("..mhl......."),
    us_southwest: months(".mhm........"),
    us_pacific:   months(".lmml......."),
  },
  elm: {
    us_southeast: months("mhml....ll.."),
    us_northeast: months(".mhm........"),
    us_midwest:   months("lmhm...lml.."),
    us_southwest: months("lmml...lmm.l"),
    us_pacific:   months(".lml....l..."),
  },
  poplar: {
    us_southeast: months(".mhm........"),
    us_northeast: months("..lhm......."),
    us_midwest:   months("..mhl......."),
    us_southwest: months(".hVm........"),
    us_pacific:   months(".lmhm......."),
  },
  maple: {
    us_southeast: months("lhhm........"),
    us_northeast: months(".lmhm......."),
    us_midwest:   months(".lmhm......."),
    us_southwest: months(".mhml......."),
    us_pacific:   months(".lmml......."),
  },
  oak: {
    us_southeast: months(".mVVm......."),
    us_northeast: months("..lVVl......"),
    us_midwest:   months("..lhVl......"),
    us_southwest: months(".lhhm......."),
    us_pacific:   months("..lmml......"),
  },
  juniper: {
    us_southeast: months("lll........l"),
    us_northeast: months(".lmm........"),
    us_midwest:   months("lmml.......l"),
    us_southwest: months("Vhl.......lV"),
    us_pacific:   months(".lmml......."),
  },
  pine: {
    us_southeast: months(".hVVm......."),
    us_northeast: months("..lmhm......"),
    us_midwest:   months("..lmhl......"),
    us_southwest: months(".lmml......."),
    us_pacific:   months("..lmhm......"),
  },
};

/** Display order on the city pages: the ones people search for, first. */
export const US_SPECIES_ORDER = [
  "ragweed", "grass", "oak", "birch", "maple", "juniper",
  "elm", "ash", "poplar", "pine", "alder",
];

export const US_SPECIES_NAMES = {
  ragweed: "Ragweed", grass: "Grass", oak: "Oak", birch: "Birch",
  maple: "Maple", juniper: "Juniper / Cedar", elm: "Elm", ash: "Ash",
  poplar: "Cottonwood", pine: "Pine", alder: "Alder",
};

export const MONTH_NAMES_EN = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
export const MONTH_FULL_EN = ["January","February","March","April","May","June","July","August","September","October","November","December"];
