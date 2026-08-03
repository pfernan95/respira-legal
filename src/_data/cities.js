/**
 * The full ordered list of city pages to generate: every provincial capital
 * (52) joined with its editorial content, ordered by population (INE) as the
 * agreed fallback ranking, with 4 geographically nearest capitals precomputed
 * for internal linking. Single source for the city generator, the home
 * snapshot and the national pollen pages.
 */
import { getAllCapitals } from "./constants/spain.js";
import { slugify, distanceKm } from "../_lib/aggregate.js";
import cityContent from "./cityContent.js";
import poblacion from "./poblacion.js";

export default function () {
  const capitals = getAllCapitals().map((c) => ({ ...c, slug: slugify(c.name) }));

  const nearestOf = (city) =>
    capitals
      .filter((o) => o.slug !== city.slug)
      .map((o) => ({ slug: o.slug, name: o.name, d: distanceKm(city, o) }))
      .sort((a, b) => a.d - b.d)
      .slice(0, 4)
      .map(({ slug, name }) => ({ slug, name }));

  return capitals
    .map((c) => {
      const content = cityContent[c.slug];
      return {
        slug: c.slug,
        name: c.name,
        provincia: c.provincia,
        ccaa: c.ccaa,
        lat: c.lat,
        lon: c.lon,
        pop: poblacion[c.slug] ?? 0,
        predominantes: content?.predominantes ?? [],
        intro: content?.intro ?? [],
        nearby: nearestOf(c),
      };
    })
    .sort((a, b) => b.pop - a.pop);
}
