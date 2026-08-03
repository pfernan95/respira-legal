/**
 * One-off generator for the static brand OG image (Fase 1). Replaces the
 * inherited og-image.png, which was 466 KB and carried claims we removed from
 * the site ("Niveles REA en tiempo real", "15 ciudades") plus emoji icons the
 * design annex vetoes. This one matches the redesign: sage palette, Fraunces
 * headline, IBM Plex body, the lungs mark, no false claims, no emoji.
 *
 * The per-city OG image with today's level is Fase 2 (after November).
 *
 * Fonts are instanced to static TTFs first (resvg doesn't apply variable
 * woff2): see the npm script / README. Run:
 *   node tools/generate-og-image.mjs
 */
import { Resvg } from "@resvg/resvg-js";
import fs from "node:fs";

const FONT_DIR = process.env.OG_FONT_DIR || ".cache/fonts";
const W = 1200;
const H = 630;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#7C9A82"/>
      <stop offset="1" stop-color="#5A7A60"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <circle cx="1010" cy="120" r="230" fill="#FFFFFF" opacity="0.06"/>
  <circle cx="150" cy="560" r="150" fill="#FFFFFF" opacity="0.05"/>

  <!-- lungs mark -->
  <g transform="translate(90,86)" fill="#FAF8F5">
    <rect x="30" y="4" width="8" height="26" rx="4"/>
    <path d="M27 32c0-5-4-8-9-8-12 0-22 15-22 32 0 10 5 16 12 16 11 0 19-11 19-23z"/>
    <path d="M41 32c0-5 4-8 9-8 12 0 22 15 22 32 0 10-5 16-12 16-11 0-19-11-19-23z"/>
  </g>
  <text x="180" y="128" font-family="IBM Plex Sans" font-weight="600" font-size="46" fill="#FAF8F5">Respira</text>

  <text x="88" y="290" font-family="Fraunces" font-weight="600" font-size="104" fill="#FFFFFF">Polen en España,</text>
  <text x="88" y="398" font-family="Fraunces" font-weight="600" font-size="104" fill="#F5E6C8">hoy</text>

  <text x="90" y="482" font-family="IBM Plex Sans" font-weight="400" font-size="38" fill="#FAF8F5" opacity="0.95">Niveles por ciudad y previsión de varios días,</text>
  <text x="90" y="530" font-family="IBM Plex Sans" font-weight="400" font-size="38" fill="#FAF8F5" opacity="0.95">con datos de Open-Meteo. App gratuita para iPhone.</text>
</svg>`;

const r = new Resvg(svg, {
  font: {
    fontDirs: [FONT_DIR],
    loadSystemFonts: false,
    defaultFontFamily: "IBM Plex Sans",
  },
  fitTo: { mode: "width", value: W },
});
const png = r.render().asPng();
fs.writeFileSync("src/og-image.png", png);
console.log(`src/og-image.png (${W}×${H}, ${Math.round(png.length / 1024)} KB)`);
