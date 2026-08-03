import { MONTH_NAMES_FULL } from "./src/_data/constants/seasonalCalendar.js";

const WEEKDAYS_SHORT = ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"];

export default function (eleventyConfig) {
  // Static assets copied as-is to the output root
  eleventyConfig.addPassthroughCopy("src/*.{png,txt,svg}");
  eleventyConfig.addPassthroughCopy({ "src/CNAME": "CNAME" });
  eleventyConfig.addPassthroughCopy("src/assets/fonts");
  eleventyConfig.addPassthroughCopy("src/assets/*.svg");

  // "/polen-madrid.html" -> "/polen-madrid", "/index.html" -> "/"
  eleventyConfig.addFilter("extensionless", (url) =>
    url.replace(/index\.html$/, "").replace(/\.html$/, ""),
  );

  // "2026-08-03" -> "3 de agosto de 2026"
  eleventyConfig.addFilter("fechaEs", (isoDate) => {
    const [y, m, d] = isoDate.slice(0, 10).split("-").map(Number);
    return `${d} de ${MONTH_NAMES_FULL[m - 1].toLowerCase()} de ${y}`;
  });

  // "2026-08-03" -> "lun"
  eleventyConfig.addFilter("diaSemana", (isoDate) => {
    return WEEKDAYS_SHORT[new Date(`${isoDate.slice(0, 10)}T12:00:00Z`).getUTCDay()];
  });

  // "2026-08-03" -> "3 ago"
  eleventyConfig.addFilter("diaMes", (isoDate) => {
    const [, m, d] = isoDate.slice(0, 10).split("-").map(Number);
    return `${d} ${MONTH_NAMES_FULL[m - 1].slice(0, 3).toLowerCase()}`;
  });

  // ISO timestamp -> "07:02" in Europe/Madrid
  eleventyConfig.addFilter("horaMadrid", (iso) =>
    new Intl.DateTimeFormat("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Europe/Madrid",
    }).format(new Date(iso)),
  );

  // ISO timestamp -> "2026-08-03" in Europe/Madrid
  eleventyConfig.addFilter("fechaMadrid", (iso) =>
    new Intl.DateTimeFormat("en-CA", { dateStyle: "short", timeZone: "Europe/Madrid" }).format(
      new Date(iso),
    ),
  );

  return {
    dir: {
      input: "src",
      output: "_site",
    },
    htmlTemplateEngine: "liquid",
  };
}
