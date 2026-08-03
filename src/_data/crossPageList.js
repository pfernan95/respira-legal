/**
 * Turns the calibrated crossPages.json into the list the generator paginates
 * over, joining each (pollen, city) pair with the city's coords/name and the
 * pollen's canonical info. Only the 6 API pollens appear here by construction.
 */
import crossPages from "./crossPages.json" with { type: "json" };
import { getAllCapitals } from "./constants/spain.js";
import { POLLEN_TYPES } from "./constants/pollen.js";
import { slugify } from "../_lib/aggregate.js";

export default function () {
  const capitals = new Map(getAllCapitals().map((c) => [slugify(c.name), c]));

  return crossPages.pages
    .map(({ pollen, city, maxObserved }) => {
      const cap = capitals.get(city);
      if (!cap) return null;
      return {
        pollen,
        pollenName: POLLEN_TYPES[pollen].nameEs,
        citySlug: city,
        cityName: cap.name,
        ccaa: cap.ccaa,
        maxObserved,
        pollenSlug: slugify(POLLEN_TYPES[pollen].nameEs),
        slug: `polen-${slugify(POLLEN_TYPES[pollen].nameEs)}-${city}`,
      };
    })
    .filter(Boolean);
}
