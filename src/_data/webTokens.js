/**
 * Web design tokens — single source of truth for the generated stylesheet
 * (src/assets/styles.css.njk) and the /estilo reference page, which computes
 * and displays the WCAG contrast ratio of every pair listed here.
 *
 * Base values come from the canonical app tokens (constants/colors.js).
 * The *fill* variants are web-only adjustments so text on solid level fills
 * reaches WCAG 4.5:1 — required by the design annex, which mandates computing
 * (not eyeballing) these pairs. Derivations are minimal mixes and documented
 * per token. The canonical level colors stay untouched for non-text uses
 * (minibars, heatmap tints, borders).
 */
import { Colors } from "./constants/colors.js";

export const light = {
  bg: Colors.background, // #FAF8F5
  surface: Colors.surface, // #FFFFFF
  surfaceElevated: Colors.surfaceElevated, // #F5F2ED
  border: Colors.border, // #E8E2DA
  divider: Colors.divider, // #F0EBE3
  textPrimary: Colors.textPrimary, // #2D3436 — 11.96:1 on bg
  textSecondary: Colors.textSecondary, // #636E72 — 4.95:1 on bg, 5.24:1 on surface
  textMuted: Colors.textMuted, // #B2BEC3 — decorative only, fails 4.5:1
  primary: Colors.primary, // #7C9A82 — decorative only on bg (2.91:1)
  primaryDark: Colors.primaryDark, // #5A7A60 — links: 4.52:1 on bg
  primaryLight: Colors.primaryLight, // #9BB5A0

  // Canonical level colors (non-text uses: bars, tints, borders)
  level: {
    low: Colors.levelLow, // #7C9A82
    moderate: Colors.levelModerate, // #E6B566
    high: Colors.levelHigh, // #D4845A
    very_high: Colors.levelVeryHigh, // #C0564B
    extreme: Colors.levelExtreme, // #8E6B8A
  },

  // Solid-fill variants for text-bearing badges (hero NivelBadge).
  // fill + ink pairs, each ≥ 4.5:1 (ratio shown on /estilo):
  levelFill: {
    low: { bg: "#85A18B", ink: Colors.textPrimary }, // low +7% white → 4.51:1
    moderate: { bg: Colors.levelModerate, ink: Colors.textPrimary }, // as-is → 6.74:1
    high: { bg: "#D5885F", ink: Colors.textPrimary }, // high +3% white → 4.54:1
    very_high: { bg: "#BE554A", ink: "#FFFFFF" }, // very_high +1% black → 4.58:1
    extreme: { bg: Colors.levelExtreme, ink: "#FFFFFF" }, // as-is → 4.55:1
  },

  aqi: {
    good: Colors.aqiGood,
    acceptable: Colors.aqiAcceptable,
    moderate: Colors.aqiModerate,
    poor: Colors.aqiPoor,
    bad: Colors.aqiBad,
    very_bad: Colors.aqiVeryBad,
  },
};

export const dark = {
  bg: "#16181A",
  surface: "#1E2124",
  surfaceElevated: "#24282B",
  border: "#2E3336",
  divider: "#272B2E",
  textPrimary: "#ECEAE6", // 14.82:1 on bg
  textSecondary: "#A8B0B3", // 8.08:1 on bg, 7.34:1 on surface
  textMuted: "#6E7679", // decorative only
  primary: Colors.primaryLight, // #9BB5A0 — 8.06:1 on bg, works as link color
  primaryDark: Colors.primary, // hover shade in dark mode
  primaryLight: "#B5CBB9",

  level: { ...light.level }, // same hues for bars/tints, verified against dark bg

  // In dark mode the canonical colors are light enough to take dark ink,
  // except very_high/extreme which need +8% white (annex: adjust and note it):
  levelFill: {
    low: { bg: Colors.levelLow, ink: "#16181A" }, // 5.77:1
    moderate: { bg: Colors.levelModerate, ink: "#16181A" }, // 9.47:1
    high: { bg: Colors.levelHigh, ink: "#16181A" }, // 6.14:1
    very_high: { bg: "#C56459", ink: "#16181A" }, // +8% white → 4.53:1
    extreme: { bg: "#977793", ink: "#16181A" }, // +8% white → 4.56:1
  },

  aqi: { ...light.aqi },
};

/** WCAG relative luminance + contrast ratio (used by /estilo). */
export function contrast(hexA, hexB) {
  const lum = (hex) => {
    const [r, g, b] = [1, 3, 5]
      .map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
      .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const [l1, l2] = [lum(hexA), lum(hexB)].sort((a, b) => b - a);
  return Math.round(((l1 + 0.05) / (l2 + 0.05)) * 100) / 100;
}

export default { light, dark, contrast };
