import { MONTH_NAMES_FULL } from "./src/_data/constants/seasonalCalendar.js";

const WEEKDAYS_SHORT = ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"];

export default function (eleventyConfig) {
  // Static assets copied as-is to the output root
  eleventyConfig.addPassthroughCopy("src/*.{png,txt,svg}");
  eleventyConfig.addPassthroughCopy({ "src/CNAME": "CNAME" });
  eleventyConfig.addPassthroughCopy("src/assets/fonts");
  eleventyConfig.addPassthroughCopy("src/assets/*.svg");
  eleventyConfig.addPassthroughCopy("src/assets/img");

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

  // Per-city FAQ: unique by city name + predominant pollens. No medical
  // claims, no unsourced figures (brief Parte 5). Returns [{q, a}] where `a`
  // is plain text (safe for both HTML and JSON-LD).
  eleventyConfig.addFilter("cityFaq", (cityName, predomNames) => {
    const predomList = predomNames?.length
      ? predomNames.join(", ")
      : "las gramíneas, el olivo y las cupresáceas";
    return [
      {
        q: `¿Qué pólenes predominan en ${cityName}?`,
        a: `Los de mayor relevancia local son ${predomList}. El calendario polínico de esta página muestra la intensidad orientativa mes a mes para cada tipo.`,
      },
      {
        q: `¿Cada cuánto se actualizan los datos de polen en ${cityName}?`,
        a: "Una vez al día, por la mañana. El valor mostrado es el máximo previsto para el día por tipo de polen, no una medición en tiempo real. La fecha y hora exactas de la última actualización aparecen junto al dato.",
      },
      {
        q: `¿De dónde salen los datos de polen de ${cityName}?`,
        a: "Los niveles de gramíneas, olivo, abedul, aliso, artemisa y ambrosía proceden del modelo CAMS de Copernicus a través de Open-Meteo. Para los tipos sin dato del modelo (ciprés, plátano de sombra, parietaria, arizónicas y alternaria) se muestra una estimación estacional basada en los calendarios de la Red Española de Aerobiología, siempre etiquetada como tal.",
      },
      {
        q: `¿Cuántos días de previsión hay para ${cityName}?`,
        a: "Los días con dato disponible del modelo de polen, incluido hoy — normalmente en torno a cinco. La página nunca muestra días para los que el modelo no ofrece dato.",
      },
    ];
  });

  /**
   * "March and April" from a 12-month intensity series: the months at the
   * series' own maximum, written out. Used by the /en/ city pages, where a
   * species' peak is the one fact a reader actually wants from the calendar.
   */
  eleventyConfig.addFilter("peakMonthsEn", (series) => {
    const RANK = { none: 0, low: 1, moderate: 2, high: 3, very_high: 4 };
    const NAMES = ["January","February","March","April","May","June",
                   "July","August","September","October","November","December"];
    const top = Math.max(...series.map((l) => RANK[l] ?? 0));
    if (top === 0) return "no month in particular";
    const hits = series.map((l, i) => [l, i]).filter(([l]) => (RANK[l] ?? 0) === top).map(([, i]) => NAMES[i]);
    if (hits.length === 1) return hits[0];
    if (hits.length === 2) return `${hits[0]} and ${hits[1]}`;
    return `${hits.slice(0, -1).join(", ")} and ${hits[hits.length - 1]}`;
  });

  /**
   * Spanish counterpart of peakMonthsEn: "mayo y junio" from a 12-month
   * intensity series. Used by the /alergia-* pages, which unlike the city
   * pages have no free-text season field in pollenInfo.js — the calendar
   * array is the only source for "when", so the FAQ answer derives it here
   * instead of duplicating it by hand per allergen.
   */
  eleventyConfig.addFilter("peakMonths", (series) => {
    const RANK = { none: 0, low: 1, moderate: 2, high: 3, very_high: 4 };
    const NAMES = ["enero","febrero","marzo","abril","mayo","junio",
                   "julio","agosto","septiembre","octubre","noviembre","diciembre"];
    const top = Math.max(...series.map((l) => RANK[l] ?? 0));
    if (top === 0) return "ningún mes en particular";
    const hits = series.map((l, i) => [l, i]).filter(([l]) => (RANK[l] ?? 0) === top).map(([, i]) => NAMES[i]);
    if (hits.length === 1) return hits[0];
    if (hits.length === 2) return `${hits[0]} y ${hits[1]}`;
    return `${hits.slice(0, -1).join(", ")} y ${hits[hits.length - 1]}`;
  });

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
