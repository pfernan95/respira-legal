/**
 * The cross pages (pollen × city) grouped for internal links: by city for the
 * city page, by pollen for the allergen page. Until 22 Oct 2026 nothing on the
 * site linked to them, and the sitemap alone had not got Google to discover a
 * single one in eleven weeks.
 *
 * One default export only: a second named export would hand templates the
 * module namespace instead of the data.
 */
import crossPageList from "./crossPageList.js";

export default function () {
  const byCity = {};
  const byPollen = {};
  for (const c of crossPageList()) {
    (byCity[c.citySlug] ??= []).push(c);
    (byPollen[c.pollen] ??= []).push(c);
  }
  for (const list of Object.values(byCity)) {
    list.sort((a, b) => a.pollenName.localeCompare(b.pollenName, "es"));
  }
  for (const list of Object.values(byPollen)) {
    list.sort((a, b) => a.cityName.localeCompare(b.cityName, "es"));
  }
  return { byCity, byPollen };
}
