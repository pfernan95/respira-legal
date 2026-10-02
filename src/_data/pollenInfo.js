/**
 * Editorial allergen info for the national pollen pages (/{pollen}) and the
 * cross pages. Symptoms are described in neutral, informative terms — no
 * medical claims (brief Parte 5). Season text derives from the canonical
 * calendar; the prose adds context, not new numbers.
 */
export default {
  grass: {
    slug: "gramineas",
    h1: "Alergia a las gramíneas",
    lead: "Las gramíneas son el principal alérgeno estacional en España. Agrupan a cientos de especies de céspedes, cereales y pastos silvestres cuyo polen se dispersa sobre todo entre finales de primavera y comienzos del verano.",
    metaDescription: "Las gramíneas son el principal alérgeno estacional en España, con picos entre finales de primavera y comienzos del verano. Sigue los niveles con Respira.",
    sintomas:
      "Los síntomas que se asocian habitualmente al polen de gramíneas incluyen rinitis (estornudos, congestión y goteo nasal), picor y lagrimeo ocular y, en algunas personas, síntomas respiratorios. La intensidad suele seguir la curva de concentración de polen en el aire.",
    donde:
      "Están presentes en toda la península, con picos especialmente marcados en las mesetas y zonas de cereal de Castilla y León, Castilla-La Mancha y Extremadura, y en las zonas de pasto del norte.",
  },
  olive: {
    slug: "olivo",
    h1: "Alergia al olivo",
    lead: "El olivo es, junto a las gramíneas, uno de los alérgenos más importantes de España, especialmente en el sur y el interior. Su polinización se concentra en un periodo corto e intenso de primavera.",
    metaDescription: "El olivo poliniza en un periodo corto e intenso de primavera, sobre todo en Andalucía, Extremadura y Castilla-La Mancha. Sigue los niveles con Respira.",
    sintomas:
      "Se asocia con rinitis y conjuntivitis en las semanas de máxima polinización. En las zonas de gran densidad de olivar, las concentraciones de polen pueden ser muy elevadas durante mayo y junio.",
    donde:
      "Predomina en Andalucía —especialmente Jaén, Córdoba y Granada—, Extremadura y Castilla-La Mancha, las grandes regiones olivareras del país.",
  },
  birch: {
    slug: "abedul",
    h1: "Alergia al abedul",
    lead: "El abedul es uno de los alérgenos arbóreos más potentes del norte de España. Su polen se dispersa en primavera y es especialmente relevante en la cornisa cantábrica y las zonas de montaña húmeda.",
    metaDescription: "El abedul dispersa su polen en primavera, sobre todo en el norte peninsular y zonas de montaña húmeda. Sigue los niveles día a día con Respira.",
    sintomas:
      "Se asocia con rinitis y conjuntivitis primaverales. El polen de abedul presenta reactividad cruzada con la de otros árboles de la misma familia.",
    donde:
      "Es más frecuente en el norte peninsular: País Vasco, Cantabria, Asturias, Galicia interior y zonas de montaña de Castilla y León.",
  },
  alder: {
    slug: "aliso",
    h1: "Alergia al aliso",
    lead: "El aliso es uno de los primeros pólenes del año: abre la temporada en pleno invierno, antes que la mayoría de los árboles. Es característico de las riberas y zonas húmedas del norte.",
    metaDescription: "El aliso abre la temporada en pleno invierno, antes que la mayoría de los árboles, junto a ríos del norte. Sigue los niveles con Respira.",
    sintomas:
      "Se asocia con síntomas de rinitis y conjuntivitis a finales de invierno. Al ser precoz, puede sorprender a personas alérgicas antes del inicio de la temporada general.",
    donde:
      "Predomina en el norte húmedo, junto a ríos y arroyos: Galicia, cornisa cantábrica y zonas de montaña.",
  },
  mugwort: {
    slug: "artemisa",
    h1: "Alergia a la artemisa",
    lead: "La artemisa es un polen de verano y otoño, característico de zonas secas y bordes de camino. Cierra la temporada polínica del año junto con otras herbáceas.",
    metaDescription: "La artemisa poliniza en verano y otoño, cerrando la temporada polínica del año. Sigue sus niveles día a día con la app Respira.",
    sintomas:
      "Se asocia con rinitis y conjuntivitis en el final del verano. Presenta reactividad cruzada con otros pólenes de herbáceas de la misma época.",
    donde:
      "Se encuentra en el interior peninsular y zonas semiáridas, con mayor presencia en el centro y noreste.",
  },
  ragweed: {
    slug: "ambrosia",
    h1: "Alergia a la ambrosía",
    lead: "La ambrosía es un alérgeno potente de final de verano, en expansión en algunas zonas de Europa. En España su presencia es más limitada que la de gramíneas u olivo, pero relevante en focos concretos.",
    // Search Console, Oct 2026: "que es ambrosia en el clima", "síntomas de
    // alergia a la ambrosía", "temporada de alergia a la ambrosía". The page
    // answers those three without presenting ragweed as a main Spanish
    // allergen, which it is not.
    metaDescription: "Qué es la ambrosía que aparece en el tiempo, qué síntomas da su alergia y cuándo es su temporada (agosto a octubre en Europa). En España está poco extendida.",
    queEs: [
      "Si ves «ambrosía» en la previsión del tiempo o en la app del móvil, se refiere al polen de una planta, no a un fenómeno meteorológico. Muchas apps y webs del tiempo toman el polen del servicio europeo <a href=\"https://atmosphere.copernicus.eu/\" rel=\"noopener\">Copernicus (CAMS)</a>, cuyo modelo pronostica seis tipos de polen para toda Europa: aliso, abedul, gramíneas, artemisa, olivo y ambrosía. Por eso la ambrosía sale en la lista aunque no crezca cerca de ti.",
      "La planta es sobre todo <i>Ambrosia artemisiifolia</i>, una hierba anual originaria de Norteamérica que se ha extendido por Europa como especie invasora. Sus mayores focos están en Hungría, el norte de Italia, el valle del Ródano en Francia y los Balcanes. Crece en cunetas, solares y campos de cultivo, y cada planta libera mucho polen.",
      "En España está poco extendida: hay focos localizados, sobre todo en el noreste y el valle del Ebro, y en la mayor parte del país el modelo da valores bajos o nulos. Que aparezca en el tiempo no quiere decir que haya ambrosía en tu ciudad; lo que cuenta es el nivel que la acompaña, que puedes ver por ciudad más abajo.",
    ],
    headings: {
      sintomas: "Síntomas de la alergia a la ambrosía",
      temporada: "¿Cuándo es la temporada de ambrosía?",
    },
    sintomas:
      "Los síntomas que se asocian al polen de ambrosía son los de la rinitis alérgica (estornudos, congestión, picor y goteo nasal) y la conjuntivitis (picor y lagrimeo de ojos); en algunas personas también síntomas respiratorios como tos o pitos. Es conocida por provocar síntomas incluso a concentraciones relativamente bajas. Como poliniza al final del verano, puede alargar la temporada de quien ya tuvo síntomas en primavera, y es frecuente que quien reacciona a ella reaccione también a la artemisa, de la misma familia y que poliniza en las mismas semanas.",
    temporadaEuropa:
      "En Europa, la ambrosía poliniza de agosto a octubre, con el máximo entre finales de agosto y septiembre. Las primeras heladas acaban con la planta y con la temporada.",
    donde:
      "En España se concentra en focos del valle del Ebro y zonas del noreste, más que de forma generalizada.",
  },
};
