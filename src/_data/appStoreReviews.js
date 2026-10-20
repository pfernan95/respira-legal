/**
 * App Store reviews shown as testimonials, and the live rating next to them.
 *
 * The quotes are CHOSEN BY HAND from Apple's public review feed
 * (itunes.apple.com/<cc>/rss/customerreviews/id=6759206565/json) and copied
 * verbatim: never edited, never translated without saying so, never invented.
 * A shortened quote cuts at a sentence boundary and shows the ellipsis. The
 * reviewer's nickname is left out; country, month and stars are what the page
 * states. Reviews that are feature requests ("añadid widgets") are not
 * testimonials and stay out even when the stars are high.
 *
 * The rating and count come from the iTunes lookup API at build time, so the
 * number on the page is the number Apple shows that day. A failed fetch keeps
 * the last good value with its date; POLLEN_SKIP_FETCH=1 reads the cache only.
 *
 * No aggregateRating in the JSON-LD: Google's review-snippet rules require
 * ratings collected by the site itself, not copied from another one.
 */
import fs from "node:fs";
import path from "node:path";

const APP_ID = "6759206565";
const CACHE_FILE = path.join(process.cwd(), ".cache", "app-store-rating.json");
const COUNTRIES = ["es", "us", "gb"];

const QUOTES = {
  es: [
    {
      title: "Como si no tuviera alergia",
      text: "Gracias a esta aplicación puedo organizarme y gestionar mi alergia antes de salir a la calle, muy recomendada! Gracias a los recordatorios no se me olvida tomar mi medicamento",
      stars: 5, date: "2026-10-18", country: "España",
    },
    {
      title: "Genial",
      text: "Llevo varios años buscando una app que me informe de la presencia de polen para anticiparme a los síntomas de la alergia… he probado decenas de aplicaciones y de todas, esta es hasta ahora la mejor.",
      stars: 5, date: "2026-06-12", country: "España", shortened: true,
    },
    {
      title: "Muy buena",
      text: "He probado varias de polen y es la que más me convence. Puedes tener un widget con tus alergias con la información actualizada y el equipo de soporte es muy bueno. Si eres alérgico pruébala!",
      stars: 5, date: "2026-05-13", country: "España",
    },
  ],
  en: [
    {
      title: "Useful in London",
      text: "Have been using this app for a few days and it’s pretty accurate when it comes to estimating the pollens specifically for my allergies. I recommend it",
      stars: 5, date: "2026-09-25", country: "United Kingdom",
    },
    {
      title: "Breathe Easy",
      text: "Great app to quickly monitor what’s in the air today. Well designed. Awesome developer.",
      stars: 5, date: "2026-10-07", country: "United States",
    },
  ],
};

function readCache() {
  try { return JSON.parse(fs.readFileSync(CACHE_FILE, "utf8")); } catch { return null; }
}

async function fetchRating(cc) {
  const res = await fetch(`https://itunes.apple.com/lookup?id=${APP_ID}&country=${cc}`, { signal: AbortSignal.timeout(15000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const r = (await res.json()).results?.[0];
  if (!r) throw new Error("no result");
  return { average: r.averageUserRating ?? null, count: r.userRatingCount ?? 0, fetchedAt: new Date().toISOString() };
}

export default async function () {
  const cache = readCache() || {};
  const ratings = { ...cache };
  if (process.env.POLLEN_SKIP_FETCH !== "1") {
    for (const cc of COUNTRIES) {
      try {
        ratings[cc] = await fetchRating(cc);
      } catch (err) {
        console.log(`[appStoreReviews] ${cc}: ${err.message}${cache[cc] ? ` (using cache from ${cache[cc].fetchedAt})` : ""}`);
      }
    }
    try {
      fs.mkdirSync(path.dirname(CACHE_FILE), { recursive: true });
      fs.writeFileSync(CACHE_FILE, JSON.stringify(ratings));
    } catch {}
  }
  // The UK map page shows only the review from London.
  const quotes = { ...QUOTES, gb: QUOTES.en.filter((q) => q.country === "United Kingdom") };
  return { quotes, ratings };
}
