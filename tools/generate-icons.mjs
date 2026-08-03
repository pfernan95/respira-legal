/**
 * One-off favicon set generator (not part of the daily build).
 * Renders the brand mark (white lungs on sage, traced from the original
 * 48px favicon) to the committed PNG sizes. Run manually:
 *   node tools/generate-icons.mjs
 */
import { Resvg } from "@resvg/resvg-js";
import fs from "node:fs";

const LUNGS = `
  <g fill="#FFFFFF">
    <rect x="47" y="26" width="6" height="18" rx="3"/>
    <path d="M45 46c0-4-3-6-7-6-9 0-16.5 11.5-16.5 24 0 7.5 4 12 9.5 12 8.5 0 14-8.5 14-17z"/>
    <path d="M55 46c0-4 3-6 7-6 9 0 16.5 11.5 16.5 24 0 7.5-4 12-9.5 12-8.5 0-14-8.5-14-17z"/>
  </g>`;

// Rounded version for favicons (browser tabs show it as-is)
const rounded = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" rx="22" fill="#7C9A82"/>${LUNGS}</svg>`;

// Full-bleed square for apple-touch-icon (iOS applies its own mask)
const square = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" fill="#7C9A82"/>${LUNGS}</svg>`;

function png(svg, size, file) {
  const r = new Resvg(svg, { fitTo: { mode: "width", value: size } });
  fs.writeFileSync(file, r.render().asPng());
  console.log(`${file} (${size}px)`);
}

fs.writeFileSync("src/favicon.svg", rounded.trim() + "\n");
png(rounded, 48, "src/favicon.png");
png(square, 180, "src/apple-touch-icon.png");
