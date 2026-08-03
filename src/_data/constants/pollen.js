/**
 * Ported literally from respira-app `constants/pollen.ts` (copy dated 2026-08-03).
 * Source of truth: the app. Do not edit values here without changing the app first.
 * If the web and the app show different levels for the same city on the same
 * day, this file (or the aggregation in _lib/) is the first suspect.
 */

/**
 * @typedef {'grass'|'olive'|'birch'|'mugwort'|'ragweed'|'alder'|'cypress'|
 *           'plane_tree'|'parietaria'|'arizona_cypress'|'alternaria'} PollenType
 */

export const POLLEN_TYPES = {
  grass: {
    id: "grass",
    nameEs: "Gramíneas",
    nameEn: "Grass",
    openMeteoKey: "grass_pollen",
    season: { start: 4, end: 7 },
    description: "Principal alérgeno en España. Pico en mayo-junio.",
  },
  olive: {
    id: "olive",
    nameEs: "Olivo",
    nameEn: "Olive",
    openMeteoKey: "olive_pollen",
    season: { start: 4, end: 6 },
    description: "Muy común en el sur de España. Pico en mayo.",
  },
  birch: {
    id: "birch",
    nameEs: "Abedul",
    nameEn: "Birch",
    openMeteoKey: "birch_pollen",
    season: { start: 3, end: 5 },
    description: "Más frecuente en el norte de España.",
  },
  mugwort: {
    id: "mugwort",
    nameEs: "Artemisa",
    nameEn: "Mugwort",
    openMeteoKey: "mugwort_pollen",
    season: { start: 7, end: 9 },
    description: "Polen de verano-otoño. Común en zonas secas.",
  },
  ragweed: {
    id: "ragweed",
    nameEs: "Ambrosía",
    nameEn: "Ragweed",
    openMeteoKey: "ragweed_pollen",
    season: { start: 8, end: 10 },
    description: "Alérgeno potente de otoño.",
  },
  alder: {
    id: "alder",
    nameEs: "Aliso",
    nameEn: "Alder",
    openMeteoKey: "alder_pollen",
    season: { start: 1, end: 3 },
    description: "Uno de los primeros en aparecer en invierno.",
  },
  cypress: {
    id: "cypress",
    nameEs: "Ciprés",
    nameEn: "Cypress",
    openMeteoKey: null,
    season: { start: 1, end: 3 },
    description: "Muy común en jardines y cementerios. Pico en febrero.",
  },
  plane_tree: {
    id: "plane_tree",
    nameEs: "Plátano de sombra",
    nameEn: "Plane tree",
    openMeteoKey: null,
    season: { start: 3, end: 4 },
    description: "Árbol urbano muy extendido. Pico en marzo-abril.",
  },
  parietaria: {
    id: "parietaria",
    nameEs: "Parietaria",
    nameEn: "Pellitory",
    openMeteoKey: null,
    season: { start: 3, end: 10 },
    description: "Planta de muros. Período de polinización muy largo.",
  },
  arizona_cypress: {
    id: "arizona_cypress",
    nameEs: "Arizónicas",
    nameEn: "Arizona cypress",
    openMeteoKey: null,
    season: { start: 11, end: 2 },
    description: "Seto muy popular. Poliniza en invierno.",
  },
  alternaria: {
    id: "alternaria",
    nameEs: "Alternaria",
    nameEn: "Alternaria",
    openMeteoKey: null,
    season: { start: 7, end: 10 },
    description: "Hongo común en grano y vegetación seca. Pico en agosto-septiembre.",
  },
};

// Thresholds in grains/m³ for each pollen type (alternaria: spores/m³)
export const POLLEN_THRESHOLDS = {
  grass: { low: 0, moderate: 20, high: 50, veryHigh: 150 },
  olive: { low: 0, moderate: 15, high: 50, veryHigh: 200 },
  birch: { low: 0, moderate: 15, high: 50, veryHigh: 90 },
  alder: { low: 0, moderate: 10, high: 30, veryHigh: 60 },
  mugwort: { low: 0, moderate: 10, high: 30, veryHigh: 60 },
  ragweed: { low: 0, moderate: 10, high: 30, veryHigh: 50 },
  // Estimated types — thresholds based on Spanish aerobiology data
  cypress: { low: 0, moderate: 10, high: 30, veryHigh: 100 },
  plane_tree: { low: 0, moderate: 15, high: 50, veryHigh: 150 },
  parietaria: { low: 0, moderate: 10, high: 30, veryHigh: 60 },
  arizona_cypress: { low: 0, moderate: 10, high: 30, veryHigh: 100 },
  // Alternaria is measured in spores/m³, not grains. SEAIC-aligned thresholds.
  alternaria: { low: 0, moderate: 30, high: 100, veryHigh: 300 },
};

/** Identical to the app's getPollenLevel(). */
export function getPollenLevel(type, value) {
  const thresholds = POLLEN_THRESHOLDS[type];
  if (!thresholds) return "low";

  if (value >= thresholds.veryHigh) return "very_high";
  if (value >= thresholds.high) return "high";
  if (value >= thresholds.moderate) return "moderate";
  return "low";
}

/** Identical to the app's getOverallPollenLevel(). */
export function getOverallPollenLevel(levels) {
  const order = ["low", "moderate", "high", "very_high", "extreme"];
  let maxIndex = 0;
  for (const level of levels) {
    const idx = order.indexOf(level);
    if (idx > maxIndex) maxIndex = idx;
  }
  return order[maxIndex];
}

export default { POLLEN_TYPES, POLLEN_THRESHOLDS };
