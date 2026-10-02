import { MONTH_NAMES_FULL, MONTHLY_POLLEN_INTENSITY } from "./src/_data/constants/seasonalCalendar.js";
import { POLLEN_TYPES } from "./src/_data/constants/pollen.js";

const LEVEL_WORDS = { none: "nulo", low: "bajo", moderate: "moderado", high: "alto", very_high: "muy alto", extreme: "extremo" };
const RANK = { none: 0, low: 1, moderate: 2, high: 3, very_high: 4, extreme: 5 };
const MONTHS_LOWER = MONTH_NAMES_FULL.map((m) => m.toLowerCase());

/**
 * "de abril a julio", "en mayo", "de diciembre a marzo": the months of a
 * 12-month level series at moderate or above, as runs that may wrap the year.
 * null when no month reaches moderate.
 */
function seasonSpan(series) {
  const on = series.map((l) => RANK[l] >= 2);
  if (!on.some(Boolean)) return null;
  if (on.every(Boolean)) return "todo el año";
  // Start just after an "off" month so a December-March run stays whole.
  const start = (on.lastIndexOf(false) + 1) % 12;
  const runs = [];
  for (let k = 0; k < 12; k++) {
    const i = (start + k) % 12;
    if (!on[i]) continue;
    const last = runs[runs.length - 1];
    if (last && (last.end + 1) % 12 === i) last.end = i;
    else runs.push({ from: i, end: i });
  }
  const words = runs.map((r) => (r.from === r.end ? `en ${MONTHS_LOWER[r.from]}` : `de ${MONTHS_LOWER[r.from]} a ${MONTHS_LOWER[r.end]}`));
  return words.length === 1 ? words[0] : `${words.slice(0, -1).join(", ")} y ${words[words.length - 1]}`;
}

function fechaLarga(isoDate) {
  const [y, m, d] = isoDate.slice(0, 10).split("-").map(Number);
  return `${d} de ${MONTHS_LOWER[m - 1]} de ${y}`;
}

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

  // The week's worst day by overall level (first one on a tie), and whether
  // every day with data shares today's level. Days with no model value skip.
  eleventyConfig.addFilter("weekPeak", (days) => {
    let peak = null;
    let same = true;
    const first = days.find((d) => d.overallLevel)?.overallLevel;
    for (const d of days) {
      if (!d.overallLevel) continue;
      if (!peak || RANK[d.overallLevel] > RANK[peak.overallLevel]) peak = d;
      if (d.overallLevel !== first) same = false;
    }
    return { peak, same };
  });

  /**
   * The two questions people actually search for a city ("niveles de polen en
   * X hoy", "temporada de polen en X"), answered from this build's data. They
   * lead the city FAQ and its FAQPage markup, which both read this filter, so
   * the visible text and the structured data cannot drift apart.
   *
   * `hoy` is today's aggregated day (null levels when the model has no pollen
   * there). `climatology`, when the city has one, is the CAMS month-by-month
   * table shown on its page, and wins over the national calendar for the six
   * modelled types, because it is about this city and not about Spain.
   */
  eleventyConfig.addFilter("cityFaqHead", (cityName, hoy, predomIds, climatology) => {
    let today;
    if (!hoy || hoy.overallLevel == null) {
      today = `El modelo de polen de Open-Meteo (CAMS) no ofrece previsión para ${cityName}, así que hoy no hay un nivel que mostrar. La página lo indica en lugar de dar un valor que no existe.`;
    } else {
      const porTipo = Object.entries(hoy.pollen)
        .filter(([, p]) => p.level)
        .map(([id, p]) => `${POLLEN_TYPES[id].nameEs.toLowerCase()} ${LEVEL_WORDS[p.level]}`);
      const dom = hoy.dominant
        ? `, con ${POLLEN_TYPES[hoy.dominant].nameEs.toLowerCase()} como tipo dominante`
        : ", sin un tipo dominante: el modelo prevé valores nulos o casi nulos para todos";
      today = `Hoy, ${fechaLarga(hoy.date)}, el nivel general de polen previsto en ${cityName} es ${LEVEL_WORDS[hoy.overallLevel]}${dom}. Por tipo: ${porTipo.join(", ")}. Es el máximo diario previsto por el modelo CAMS de Copernicus a través de Open-Meteo, actualizado cada mañana.`;
    }

    const ids = predomIds?.length ? predomIds : ["grass", "olive", "cypress"];
    const parts = [];
    for (const id of ids) {
      const local = climatology?.[id];
      const series = local
        ? local.map((c) => (c && c.value >= 1 ? c.level : "none"))
        : MONTHLY_POLLEN_INTENSITY[id];
      const span = series && seasonSpan(series);
      if (span) parts.push(`${POLLEN_TYPES[id].nameEs.toLowerCase()} ${span}`);
    }
    const fuente = climatology
      ? `según el modelo CAMS para ${cityName} (media 2023-2025) y, para los demás tipos, el calendario polínico orientativo de España`
      : "según el calendario polínico orientativo de España (Red Española de Aerobiología)";
    const season = parts.length
      ? `Los pólenes con más peso en ${cityName} alcanzan niveles moderados o altos en estos meses, ${fuente}: ${parts.join("; ")}. Fuera de esos meses los niveles suelen ser bajos, y cada año la temporada se adelanta o se retrasa según la meteorología.`
      : `La temporada principal en España va de febrero a julio, con las gramíneas y el olivo como protagonistas de la primavera, ${fuente}.`;

    return [
      { q: `¿Cuáles son los niveles de polen en ${cityName} hoy?`, a: today },
      { q: `¿Cuándo es la temporada de polen en ${cityName}?`, a: season },
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

  // "2026-10-02" -> "Fri" / "Oct 2" (the /en/ forecast table)
  eleventyConfig.addFilter("weekdayEn", (isoDate) =>
    ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][new Date(`${isoDate.slice(0, 10)}T12:00:00Z`).getUTCDay()],
  );
  eleventyConfig.addFilter("dayMonthEn", (isoDate) => {
    const [, m, d] = isoDate.slice(0, 10).split("-").map(Number);
    return `${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][m - 1]} ${d}`;
  });
  // "2026-10-02" -> "Friday, October 2, 2026"
  eleventyConfig.addFilter("longDateEn", (isoDate) =>
    new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric", timeZone: "UTC" })
      .format(new Date(`${isoDate.slice(0, 10)}T12:00:00Z`)),
  );
  // ISO timestamp -> "Oct 2, 2026, 05:12 UTC"
  eleventyConfig.addFilter("stampUtcEn", (iso) =>
    new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "UTC" })
      .format(new Date(iso)) + " UTC",
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
