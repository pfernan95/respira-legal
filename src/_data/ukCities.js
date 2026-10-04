/**
 * The UK and Ireland city pages under /en/uk/pollen-{slug} and
 * /en/ireland/pollen-{slug}.
 *
 * Coordinates are the app's own seed cities (respira-app
 * constants/countries.ts, GB and IE), so the page and the app read the same
 * CAMS cell for the same city. The largest urban areas of each nation, so
 * Scotland, Wales and Northern Ireland are all represented.
 *
 * Two countries in one tree on purpose: one model (CAMS), one language, one
 * set of species, and readers who search both ("pollen count Belfast" and
 * "pollen count Dublin" are the same question). The directory still says
 * which country a page is in, and Birmingham does not collide with Alabama.
 *
 * `nearby` is the four nearest cities on this list, across the border too.
 */
import { slugify, distanceKm } from "../_lib/aggregate.js";

const CITIES = [
  { name: "London", nation: "England", country: "GB", lat: 51.5019, lon: -0.1187 },
  { name: "Birmingham", nation: "England", country: "GB", lat: 52.4769, lon: -1.9219 },
  { name: "Manchester", nation: "England", country: "GB", lat: 53.5024, lon: -2.2499 },
  { name: "Leeds", nation: "England", country: "GB", lat: 53.832, lon: -1.582 },
  { name: "Glasgow", nation: "Scotland", country: "GB", lat: 55.8764, lon: -4.2527 },
  { name: "Liverpool", nation: "England", country: "GB", lat: 53.4179, lon: -2.9199 },
  { name: "Newcastle", nation: "England", country: "GB", lat: 55.0023, lon: -1.6019 },
  { name: "Sheffield", nation: "England", country: "GB", lat: 53.3667, lon: -1.5 },
  { name: "Bristol", nation: "England", country: "GB", lat: 51.45, lon: -2.5833 },
  { name: "Edinburgh", nation: "Scotland", country: "GB", lat: 55.9483, lon: -3.2191 },
  { name: "Nottingham", nation: "England", country: "GB", lat: 52.9703, lon: -1.17 },
  { name: "Leicester", nation: "England", country: "GB", lat: 52.63, lon: -1.1332 },
  { name: "Cardiff", nation: "Wales", country: "GB", lat: 51.5, lon: -3.225 },
  { name: "Belfast", nation: "Northern Ireland", country: "GB", lat: 54.6, lon: -5.96 },
  { name: "Brighton", nation: "England", country: "GB", lat: 50.8303, lon: -0.17 },
  { name: "Dublin", nation: "Ireland", country: "IE", lat: 53.335, lon: -6.2509 },
  { name: "Cork", nation: "Ireland", country: "IE", lat: 51.8986, lon: -8.4958 },
  { name: "Limerick", nation: "Ireland", country: "IE", lat: 52.6647, lon: -8.623 },
  { name: "Galway", nation: "Ireland", country: "IE", lat: 53.2724, lon: -9.0488 },
];

const DIR = { GB: "uk", IE: "ireland" };

export default function () {
  const cities = CITIES.map((c) => {
    const slug = slugify(c.name);
    const dir = DIR[c.country];
    return { ...c, slug, dir, key: `${dir}/${slug}`, url: `/en/${dir}/pollen-${slug}` };
  });
  const nearestOf = (city) =>
    cities
      .filter((o) => o.key !== city.key)
      .map((o) => ({ name: o.name, url: o.url, d: distanceKm(city, o) }))
      .sort((a, b) => a.d - b.d)
      .slice(0, 4)
      .map(({ name, url }) => ({ name, url }));
  return cities.map((c) => ({ ...c, nearby: nearestOf(c) }));
}
