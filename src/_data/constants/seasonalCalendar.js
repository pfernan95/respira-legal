/**
 * Ported literally from respira-app `constants/seasonalCalendar.ts` (copy dated 2026-08-03).
 * Source of truth: the app. Do not edit values here without changing the app first.
 */
import { Colors } from "./colors.js";

/** @typedef {'none'|'low'|'moderate'|'high'|'very_high'} MonthlyIntensity */

/**
 * Monthly pollen intensity for each type in Spain.
 * Array of 12 values, index 0 = January, index 11 = December.
 * Based on aerobiology data and Spanish pollination calendars.
 */
export const MONTHLY_POLLEN_INTENSITY = {
  grass:           ["none", "none", "none", "low", "very_high", "very_high", "high", "none", "none", "none", "none", "none"],
  olive:           ["none", "none", "none", "low", "high", "high", "none", "none", "none", "none", "none", "none"],
  birch:           ["none", "none", "moderate", "moderate", "moderate", "none", "none", "none", "none", "none", "none", "none"],
  mugwort:         ["none", "none", "none", "none", "none", "none", "moderate", "moderate", "moderate", "none", "none", "none"],
  ragweed:         ["none", "none", "none", "none", "none", "none", "none", "moderate", "moderate", "moderate", "none", "none"],
  alder:           ["moderate", "moderate", "moderate", "none", "none", "none", "none", "none", "none", "none", "none", "none"],
  cypress:         ["high", "high", "moderate", "none", "none", "none", "none", "none", "none", "none", "none", "low"],
  plane_tree:      ["none", "none", "high", "high", "none", "none", "none", "none", "none", "none", "none", "none"],
  parietaria:      ["none", "none", "low", "moderate", "moderate", "moderate", "moderate", "moderate", "moderate", "moderate", "none", "none"],
  arizona_cypress: ["high", "high", "none", "none", "none", "none", "none", "none", "none", "none", "low", "high"],
  alternaria:      ["none", "none", "low", "low", "moderate", "moderate", "high", "very_high", "high", "moderate", "low", "none"],
};

/**
 * Representative grains/m³ per pollen type per month for Spain.
 * Array of 12 values, index 0 = January, index 11 = December.
 *
 * Values for estimated types (cypress, arizona_cypress, plane_tree, parietaria)
 * are based on REA (Red Española de Aerobiología) historical station averages
 * and published Spanish aerobiology literature.
 * API-covered types (grass, olive, birch, etc.) are fallback-only —
 * Open-Meteo normally provides real-time values for those.
 */
export const MONTHLY_POLLEN_GRAINS = {
  //                   Jan   Feb   Mar   Apr   May   Jun   Jul   Aug   Sep   Oct   Nov   Dec
  // Open-Meteo types (fallback only):
  grass:           [    0,    0,    0,    8,  180,  180,   60,    0,    0,    0,    0,    0],
  olive:           [    0,    0,    0,   15,   80,   80,    0,    0,    0,    0,    0,    0],
  birch:           [    0,    0,   25,   25,   20,    0,    0,    0,    0,    0,    0,    0],
  mugwort:         [    0,    0,    0,    0,    0,    0,   20,   20,   15,    0,    0,    0],
  ragweed:         [    0,    0,    0,    0,    0,    0,    0,   20,   20,   15,    0,    0],
  alder:           [   25,   20,   15,    0,    0,    0,    0,    0,    0,    0,    0,    0],
  // Estimated types — primary values used in the data pipeline:
  cypress:         [  150,  250,   60,    0,    0,    0,    0,    0,    0,    0,    0,   30],
  arizona_cypress: [  180,  200,    0,    0,    0,    0,    0,    0,    0,    0,   40,  150],
  plane_tree:      [    0,    0,   80,  120,    0,    0,    0,    0,    0,    0,    0,    0],
  parietaria:      [    0,    0,   12,   20,   40,   45,   35,   30,   20,   12,    0,    0],
  // Alternaria — spores/m³, national average with the documented August peak.
  alternaria:      [    5,    5,   15,   25,   35,   60,  200,  500,  300,   80,   25,   10],
};

/** Spanish abbreviated month names */
export const MONTH_NAMES_SHORT = [
  "Ene", "Feb", "Mar", "Abr", "May", "Jun",
  "Jul", "Ago", "Sep", "Oct", "Nov", "Dic",
];

/** Full Spanish month names */
export const MONTH_NAMES_FULL = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

/** Color mapping for intensity levels in the heatmap */
export const INTENSITY_COLORS = {
  none: "transparent",
  low: Colors.levelLow,
  moderate: Colors.levelModerate,
  high: Colors.levelHigh,
  very_high: Colors.levelVeryHigh,
};

/** Spanish labels for intensity levels */
export const INTENSITY_LABELS = {
  none: "Sin presencia",
  low: "Bajo",
  moderate: "Moderado",
  high: "Alto",
  very_high: "Muy alto",
};

/**
 * Get active pollen types for a given month (0-indexed).
 * Returns types sorted by intensity (highest first).
 */
export function getActivePollenForMonth(month) {
  const result = [];
  const order = ["none", "low", "moderate", "high", "very_high"];

  for (const [type, months] of Object.entries(MONTHLY_POLLEN_INTENSITY)) {
    const intensity = months[month];
    if (intensity !== "none") {
      result.push({ type, intensity });
    }
  }

  result.sort((a, b) => order.indexOf(b.intensity) - order.indexOf(a.intensity));
  return result;
}

export default {
  MONTHLY_POLLEN_INTENSITY,
  MONTHLY_POLLEN_GRAINS,
  MONTH_NAMES_SHORT,
  MONTH_NAMES_FULL,
  INTENSITY_COLORS,
  INTENSITY_LABELS,
};
