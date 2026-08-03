/**
 * Build-time context: current date/month in Europe/Madrid plus the list of
 * pollen types in season right now (from the canonical seasonal calendar).
 */
import { getPollenLevel } from "./constants/pollen.js";
import {
  MONTHLY_POLLEN_GRAINS,
  getActivePollenForMonth,
} from "./constants/seasonalCalendar.js";

const now = new Date();
const madrid = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Europe/Madrid",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
}).formatToParts(now);
const get = (type) => madrid.find((p) => p.type === type).value;

const month = Number(get("month")) - 1; // 0-indexed

// Estimated (non-API) types with this month's seasonal value and its level
const ESTIMATED_TYPES = ["cypress", "plane_tree", "parietaria", "arizona_cypress", "alternaria"];
const estimatedNow = ESTIMATED_TYPES.map((id) => {
  const value = MONTHLY_POLLEN_GRAINS[id][month];
  return { id, value, level: value === 0 ? "none" : getPollenLevel(id, value) };
});

export default {
  nowIso: now.toISOString(),
  dateIso: `${get("year")}-${get("month")}-${get("day")}`,
  month,
  activeNow: getActivePollenForMonth(month),
  estimatedNow,
};
