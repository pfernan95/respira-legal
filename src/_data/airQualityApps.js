/**
 * Apps de calidad del aire y de alergia en España, para /mejores-apps-alergia-espana
 * y /calidad-aire-y-polen.
 *
 * MISMA REGLA EDITORIAL que competitors.js: todo dato sale de la ficha pública
 * de App Store de cada app, consultada el 2026-09-03 vía la API de Apple. Las
 * valoraciones son una foto de ese día, no un dato en vivo, y van etiquetadas
 * con la fecha para que se note si envejecen.
 *
 * Y una regla propia de estas dos páginas: Respira NO compite por "mejor app de
 * calidad del aire". Su calidad del aire es salida del modelo CAMS vía
 * Open-Meteo (european_aqi / us_aqi), no medición de estaciones oficiales. Las
 * apps del MITECO y del Ayuntamiento de Madrid sí leen la red oficial, y para
 * quien solo quiera calidad del aire son la respuesta correcta. Las páginas lo
 * dicen así, con enlace. Lo que Respira sí puede reclamar es la intersección:
 * polen por especie + calidad del aire en la misma pantalla, para alérgicos.
 *
 * La valoración baja de las apps oficiales es un hecho verificable y se cuenta
 * como lo que es: el dato que publican es autoritativo, la app que lo envuelve
 * es lo que los usuarios puntúan. No es un ataque, es la razón por la que una
 * página de "cuál instalo" tiene sentido.
 */

const FECHA = "2026-09-03";

const apps = [
  {
    slug: "ica-miteco",
    nombre: "ICA – Índice de Calidad del Aire",
    autor: "Ministerio para la Transición Ecológica",
    appStoreId: "6503063828",
    valoracion: `3,0 sobre 5 con 4 valoraciones (App Store España, ${FECHA})`,
    fuenteDatos: "Red oficial española de vigilancia de la calidad del aire",
    hacePolen: false,
    queEs:
      "La app oficial del índice nacional de calidad del aire. Lee las estaciones de la red oficial y publica PM2,5, PM10, NO₂, O₃ y SO₂ con el índice ICA que usa la administración.",
    cuandoElegirla:
      "Si lo que quieres es calidad del aire oficial de toda España, con el mismo índice que utiliza la administración, esta es la fuente. Tiene muy pocas valoraciones todavía, pero el dato de detrás es el bueno.",
  },
  {
    slug: "aire-de-madrid",
    nombre: "Aire de Madrid",
    autor: "Ayuntamiento de Madrid",
    appStoreId: "1056591219",
    valoracion: `1,4 sobre 5 con 62 valoraciones (App Store España, ${FECHA})`,
    fuenteDatos: "Red de estaciones del Ayuntamiento de Madrid",
    hacePolen: false,
    queEs:
      "La app oficial del Ayuntamiento de Madrid. Muestra los niveles hora a hora de la red municipal de estaciones, con histórico, estaciones cercanas y avisos por episodio de contaminación.",
    cuandoElegirla:
      "Si vives en Madrid y quieres el dato municipal oficial, sin intermediarios, es la fuente directa. Conviene saber que los usuarios la puntúan bajo: el dato que hay detrás es oficial, lo que se valora ahí es la app que lo envuelve.",
  },
  {
    slug: "iqair-airvisual",
    nombre: "IQAir AirVisual",
    autor: "IQAir AG",
    appStoreId: "1048912974",
    valoracion: `4,7 sobre 5 con unas 900 valoraciones (App Store España, ${FECHA})`,
    fuenteDatos: "Red global de estaciones oficiales y sensores propios de IQAir",
    hacePolen: false,
    queEs:
      "Una app de calidad del aire global, de una empresa cuyo negocio es medir aire. Más de 500.000 ubicaciones en más de 100 países, previsión a 7 días, histórico y mapas de contaminación.",
    cuandoElegirla:
      "Si viajas, o quieres comparar tu ciudad con otras, o quieres profundidad de calidad del aire de verdad. Para eso es mejor que Respira con diferencia. No cubre polen por especie.",
  },
  {
    slug: "aircare",
    nombre: "AirCare (Air Quality & Pollen)",
    autor: "AirCare Data, Inc.",
    appStoreId: "1190987663",
    valoracion: `4,3 sobre 5 con 8 valoraciones (App Store España, ${FECHA})`,
    fuenteDatos: "Datos globales de calidad del aire, polen, índice UV e incendios",
    hacePolen: true,
    queEs:
      "La otra app de esta lista que junta calidad del aire y polen. Además añade índice UV y focos de incendio detectados por satélite. Su ficha declara cinco tipos de polen: abedul, gramíneas, ambrosía, olivo y aliso.",
    cuandoElegirla:
      "Si quieres aire y polen juntos y te sirve con cinco tipos de polen, más UV e incendios, es una alternativa real a Respira y la más parecida en planteamiento. Respira va más hondo en polen: once especies en Estados Unidos y redes nacionales de medición en España, Italia y Alemania.",
  },
];

export default { apps, fecha: FECHA };
