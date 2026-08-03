/**
 * Ported literally from respira-app `constants/colors.ts` (copy dated 2026-08-03).
 * Source of truth: the app. Do not edit values here without changing the app first.
 *
 * The app switches a few tokens per platform (`Platform.OS === 'android'`);
 * the web uses the iOS values, which are the canonical brand tokens in the
 * brief. Where an Android-only variant exists it is noted inline.
 */
export const Colors = {
  // Base — warm cream tones
  background: "#FAF8F5",
  surface: "#FFFFFF",
  surfaceElevated: "#F5F2ED",

  // Primary brand — muted sage green
  primary: "#7C9A82",
  primaryLight: "#9BB5A0",
  primaryDark: "#5A7A60",

  // Text — warm neutrals
  textPrimary: "#2D3436",
  textSecondary: "#636E72",
  textMuted: "#B2BEC3", // android: #8E9BA0
  textOnPrimary: "#FFFFFF",

  // Pollen level colors — softened but recognizable
  levelLow: "#7C9A82", // android: #5A7A60
  levelModerate: "#E6B566", // android: #C9963A
  levelHigh: "#D4845A", // android: #B56E42
  levelVeryHigh: "#C0564B",
  levelExtreme: "#8E6B8A",

  // Air quality colors (European AQI) — softened
  aqiGood: "#7C9A82", // android: #5A7A60
  aqiAcceptable: "#A3BE8C", // android: #7A9A68
  aqiModerate: "#E6B566", // android: #C9963A
  aqiPoor: "#D4845A", // android: #B56E42
  aqiBad: "#C0564B",
  aqiVeryBad: "#8E6B8A",

  // Map overlays (with transparency)
  mapLow: "rgba(124, 154, 130, 0.35)",
  mapModerate: "rgba(230, 181, 102, 0.35)",
  mapHigh: "rgba(212, 132, 90, 0.40)",
  mapVeryHigh: "rgba(192, 86, 75, 0.45)",
  mapExtreme: "rgba(142, 107, 138, 0.45)",

  // UI — warm tones
  border: "#E8E2DA",
  divider: "#F0EBE3",
  shadow: "rgba(45, 52, 54, 0.06)",
  error: "#C0564B",
  success: "#7C9A82",
  warning: "#D4845A",

  // Tab bar
  tabActive: "#5A7A60",
  tabInactive: "#B2BEC3", // android: #8E9BA0
};

/** @typedef {'low'|'moderate'|'high'|'very_high'|'extreme'} PollenLevel */

export const pollenLevelColors = {
  low: Colors.levelLow,
  moderate: Colors.levelModerate,
  high: Colors.levelHigh,
  very_high: Colors.levelVeryHigh,
  extreme: Colors.levelExtreme,
};

export const pollenLevelLabels = {
  low: "Bajo",
  moderate: "Moderado",
  high: "Alto",
  very_high: "Muy Alto",
  extreme: "Extremo",
};

/** Compact level labels for narrow UI (forecast day columns, etc.) */
export const pollenLevelShortLabels = {
  low: "Bajo",
  moderate: "Mod.",
  high: "Alto",
  very_high: "M. alto",
  extreme: "Extremo",
};

export const mapOverlayColors = {
  low: Colors.mapLow,
  moderate: Colors.mapModerate,
  high: Colors.mapHigh,
  very_high: Colors.mapVeryHigh,
  extreme: Colors.mapExtreme,
};

export default {
  Colors,
  pollenLevelColors,
  pollenLevelLabels,
  pollenLevelShortLabels,
  mapOverlayColors,
};
