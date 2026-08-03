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
