/**
 * One-off generator for the static brand OG image (Fase 1). Replaces the
 * inherited og-image.png, which was 466 KB and carried claims we removed from
 * the site ("Niveles REA en tiempo real", "15 ciudades") plus emoji icons the
 * design annex vetoes. This one matches the redesign: sage palette, Fraunces
 * headline, IBM Plex body, and the REAL app icon (tools/brand-icon.png,
 * verbatim from pfernan95/respira-app) — no re-drawing, no false claims.
 *
 * The per-city OG image with today's level is Fase 2 (after November).
 *
 * Fonts are instanced to static TTFs first (resvg doesn't apply variable
 * woff2): run tools/instance-fonts.py. Then:
 *   node tools/generate-og-image.mjs
 */
import { Resvg } from "@resvg/resvg-js";
import fs from "node:fs";

const FONT_DIR = process.env.OG_FONT_DIR || ".cache/fonts";
const W = 1200;
const H = 630;

// Embed the real app icon (1024×1024) as a data URI; resvg downscales it.
const iconB64 = fs.readFileSync("tools/brand-icon.png").toString("base64");
const iconHref = `data:image/png;base64,${iconB64}`;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#7C9A82"/>
      <stop offset="1" stop-color="#5A7A60"/>
    </linearGradient>
    <clipPath id="iconClip"><rect x="88" y="70" width="120" height="120" rx="26"/></clipPath>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <circle cx="1010" cy="120" r="230" fill="#FFFFFF" opacity="0.06"/>
  <circle cx="150" cy="560" r="150" fill="#FFFFFF" opacity="0.05"/>

  <!-- real app icon as a rounded badge -->
  <image href="${iconHref}" x="88" y="70" width="120" height="120" clip-path="url(#iconClip)"/>
  <text x="232" y="150" font-family="IBM Plex Sans" font-weight="600" font-size="52" fill="#FAF8F5">Respira</text>

  <text x="88" y="316" font-family="Fraunces" font-weight="600" font-size="104" fill="#FFFFFF">Polen en España,</text>
  <text x="88" y="424" font-family="Fraunces" font-weight="600" font-size="104" fill="#F5E6C8">hoy</text>

  <text x="90" y="506" font-family="IBM Plex Sans" font-weight="400" font-size="38" fill="#FAF8F5" opacity="0.95">Niveles por ciudad y previsión de varios días,</text>
  <text x="90" y="554" font-family="IBM Plex Sans" font-weight="400" font-size="38" fill="#FAF8F5" opacity="0.95">con datos de Open-Meteo. App gratuita para iPhone.</text>
</svg>`;

const r = new Resvg(svg, {
  font: { fontDirs: [FONT_DIR], loadSystemFonts: false, defaultFontFamily: "IBM Plex Sans" },
  fitTo: { mode: "width", value: W },
});
const png = r.render().asPng();
fs.writeFileSync("src/og-image.png", png);
console.log(`src/og-image.png (${W}×${H}, ${Math.round(png.length / 1024)} KB)`);
