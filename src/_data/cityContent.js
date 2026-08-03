/**
 * Editorial content per city page. Only cities listed here get a data-driven
 * page; Fase C adds the rest. The daily numbers come from pollenData (keyed
 * by slug) — this file holds what a rebuild must NOT regenerate: local prose,
 * FAQ and internal links.
 *
 * Content rules (brief Parte 5): no medical claims, no unsourced figures,
 * estimated pollens always labelled.
 */
export default [
  {
    slug: "madrid",
    name: "Madrid",
    provincia: "Madrid",
    ccaa: "Comunidad de Madrid",
    // Pollen types with the most clinical relevance locally (editorial, from
    // the existing page's audited content)
    predominantes: ["plane_tree", "grass", "cypress", "olive"],
    intro: [
      "Madrid concentra una de las mayores poblaciones de plátano de sombra (<em>Platanus hispanica</em>) de España, lo que convierte marzo y abril en meses especialmente intensos para muchas personas alérgicas. A esto se suman las gramíneas de la sierra y los olivares del sur de la Comunidad, que elevan los niveles entre mayo y junio.",
      "En la capital, los días de viento del suroeste suelen traer polen del olivar manchego y de Andalucía, que se suma al polen local. El dato de esta página es el máximo previsto para hoy en la ciudad; la previsión a 7 días te permite anticipar los picos.",
    ],
    faq: [
      {
        q: "¿Cuándo es la peor época de polen en Madrid?",
        a: "Depende del polen al que tengas sensibilidad. El ciprés y las arizónicas polinizan de enero a marzo, el plátano de sombra concentra su pico en marzo y abril, y las gramíneas y el olivo dominan de mayo a junio. El calendario polínico de esta página muestra la intensidad orientativa mes a mes.",
      },
      {
        q: "¿Qué pólenes predominan en Madrid?",
        a: "Los de mayor incidencia en Madrid y su área metropolitana son el plátano de sombra, las gramíneas, el ciprés y el olivo. El plátano de sombra es especialmente relevante por la cantidad de ejemplares plantados en las calles de la capital.",
      },
      {
        q: "¿Cada cuánto se actualizan los datos de esta página?",
        a: "Una vez al día, por la mañana. El valor mostrado es el máximo previsto para el día por tipo de polen, no una medición en tiempo real. La fecha y hora exactas de la última actualización aparecen junto al dato.",
      },
      {
        q: "¿De dónde salen los datos de polen de Madrid?",
        a: "Los niveles de gramíneas, olivo, abedul, aliso, artemisa y ambrosía proceden del modelo CAMS de Copernicus a través de la API de Open-Meteo. Para los tipos sin dato del modelo (ciprés, plátano de sombra, parietaria, arizónicas y alternaria) se muestra una estimación estacional basada en los calendarios de la Red Española de Aerobiología, siempre etiquetada como tal.",
      },
      {
        q: "¿Cuántos días de previsión hay disponibles?",
        a: "Todos los días con dato disponible del modelo de polen, incluido hoy — normalmente en torno a cinco. La página nunca muestra días para los que el modelo no ofrece dato.",
      },
    ],
    nearby: [
      { slug: "toledo", name: "Toledo" },
      { slug: "valladolid", name: "Valladolid" },
      { slug: "salamanca", name: "Salamanca" },
      { slug: "zaragoza", name: "Zaragoza" },
    ],
  },
];
