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
    // 20 Oct 2026: the "en el clima" family (215 impressions from Spain over
    // 21 Sep–17 Oct, position ~10, 0 clicks) did not move after the queEs
    // section went live on 2 Oct, so the title and that heading now use the
    // searchers' word, "clima". Compare in private.gsc_queries from 21 Oct.
    title: "Ambrosía en el clima: qué es, alergia y temporada",
    metaDescription: "Qué es la ambrosía que aparece en el tiempo, qué síntomas da su alergia y cuándo es su temporada (agosto a octubre en Europa). En España está poco extendida.",
    queEs: [
      "Si ves «ambrosía» en la previsión del tiempo o en la app del clima, se refiere al polen de una planta, no a un fenómeno meteorológico. Muchas apps y webs del tiempo toman el polen del servicio europeo <a href=\"https://atmosphere.copernicus.eu/\" rel=\"noopener\">Copernicus (CAMS)</a>, cuyo modelo pronostica seis tipos de polen para toda Europa: aliso, abedul, gramíneas, artemisa, olivo y ambrosía. Por eso la ambrosía sale en la lista aunque no crezca cerca de ti.",
      "La planta es sobre todo <i>Ambrosia artemisiifolia</i>, una hierba anual originaria de Norteamérica que se ha extendido por Europa como especie invasora. Sus mayores focos están en Hungría, el norte de Italia, el valle del Ródano en Francia y los Balcanes. Crece en cunetas, solares y campos de cultivo, y cada planta libera mucho polen.",
      "En España está poco extendida: hay focos localizados, sobre todo en el noreste y el valle del Ebro, y en la mayor parte del país el modelo da valores bajos o nulos. Que aparezca en el tiempo no quiere decir que haya ambrosía en tu ciudad; lo que cuenta es el nivel que la acompaña, que puedes ver por ciudad más abajo.",
    ],
    headings: {
      queEs: "¿Qué es la ambrosía que sale en el tiempo o en el clima?",
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
  // ── Species CAMS does not model (added 24 Nov 2026) ──────────────────────
  // There is no daily level by city for these on the website, so the pages
  // give the zone calendars (the app's own, from zoneCalendars.json) and say
  // where the measured level is published. Every fact below comes from the
  // sources listed in `fuentes`, read on 24 Nov 2026.
  cypress: {
    slug: "cipres",
    h1: "Alergia al ciprés y la arizónica",
    title: "Alergia al ciprés y la arizónica: temporada y síntomas",
    estimado: true,
    calRows: ["cypress", "arizona_cypress"],
    lead: "El ciprés y la arizónica son de la misma familia, las cupresáceas, y polinizan en invierno. Según la Comunidad de Madrid, en invierno su polen es el más frecuente en el aire y «prácticamente el único en esta estación que causa alergias».",
    metaDescription: "El ciprés y la arizónica polinizan en invierno, con el máximo en enero y febrero. Calendario por zonas, síntomas y dónde ver el nivel de hoy de tu ciudad.",
    queEs: [
      "Las cupresáceas son una familia de árboles y arbustos que incluye los cipreses y las arizónicas. Son especies plantadas: en parques, jardines y setos. La Comunidad de Madrid destaca entre las más habituales «las arizónicas utilizadas como setos en jardines en algunas urbanizaciones».",
      "La SEAIC las cuenta entre los pólenes que causan alergia «con un carácter más local», y nombra a Madrid y Barcelona.",
    ],
    headings: {
      queEs: "¿Qué son el ciprés y la arizónica?",
      sintomas: "Síntomas de la alergia al ciprés",
      temporada: "¿Cuándo es la temporada del ciprés y la arizónica?",
      hoy: "¿Cómo está hoy el polen de ciprés en tu ciudad?",
    },
    sintomas:
      "Los síntomas habituales son los de cualquier alergia al polen: rinitis (estornudos, congestión, picor y goteo nasal) y conjuntivitis (picor y lagrimeo de ojos), en este caso en pleno invierno. En algunas personas, esta alergia se asocia también a reacciones al melocotón y a los cítricos, por una proteína del polen (Cup s 7) que resiste la cocción; la herramienta de alergia cruzada lo explica con sus fuentes.",
    temporadaEuropa:
      "Las cupresáceas polinizan en invierno. En el calendario de Respira, la arizónica empieza a finales de otoño y el ciprés común sigue hasta marzo; los dos están altos en enero y febrero.",
    donde:
      "Se plantan en ciudades y urbanizaciones. La SEAIC sitúa esta alergia sobre todo en Madrid y Barcelona.",
    nivelHoy: [
      "El nivel diario de las páginas de cada ciudad viene del modelo europeo de polen (CAMS de Copernicus), y ese modelo no incluye el ciprés. El nivel medido lo publican las redes de aerobiología: la <a href=\"https://www.uco.es/rea/\" rel=\"noopener\">Red Española de Aerobiología (REA)</a>, cada semana, y la <a href=\"https://www.polenes.com/\" rel=\"noopener\">red de la SEAIC (polenes.com)</a>. En la Comunidad de Madrid, la <a href=\"https://www.madrid.org/polen\" rel=\"noopener\">red Palinocam</a> publica cada día laborable el dato del día anterior y una previsión a 48 horas.",
      "La app Respira muestra el nivel semanal de la REA en la estación más cercana a ti, si hay una a menos de 100 km. Si no la hay, muestra una estimación por calendario, marcada como estimación.",
    ],
    seguirFaq: "El nivel medido lo publican la Red Española de Aerobiología (REA) cada semana y, en la Comunidad de Madrid, la red Palinocam cada día laborable. La app Respira muestra el nivel semanal de la REA en la estación más cercana, si hay una a menos de 100 km, o una estimación por calendario.",
    fuentes: ["<a href=\"https://www.comunidad.madrid/node/68045\" rel=\"noopener\">Comunidad de Madrid: «La Comunidad de Madrid activa su sistema de información diaria sobre el polen invernal en la atmósfera» (27 de enero de 2024)</a>", "<a href=\"https://www.seaic.org/download/6212\" rel=\"noopener\">Comité de Aerobiología de la SEAIC: «La alergia al polen. Claves para sobrevivir esta primavera» (2015)</a>", "<a href=\"/alergia-cruzada-polen-alimentos\">Herramienta de alergia cruzada de Respira</a>, con sus estudios citados"],
  },
  plane_tree: {
    slug: "platano-de-sombra",
    h1: "Alergia al plátano de sombra",
    estimado: true,
    lead: "El plátano de sombra se usa como árbol de alineación en las grandes ciudades españolas. Según la SEAIC, en Madrid hay 73.000 (el 25 % del arbolado) y en Barcelona 57.471 (el 33 %). Su polinización es «explosiva» y no suele pasar de un mes.",
    metaDescription: "El plátano de sombra poliniza de golpe entre la segunda quincena de marzo y la primera de abril. Dónde, síntomas, calendario y cómo ver el nivel de hoy.",
    headings: {
      sintomas: "Síntomas de la alergia al plátano de sombra",
      temporada: "¿Cuándo poliniza el plátano de sombra?",
      hoy: "¿Cómo está hoy el polen de plátano de sombra?",
    },
    sintomas:
      "Los síntomas son los de la rinitis y la conjuntivitis alérgicas, concentrados en unas pocas semanas de primavera. Según la SEAIC, en Madrid los pacientes alérgicos al polen que lo son al plátano de sombra pasaron de un 2 % en los años 80 a un 40 % en 2015, cuando lo publicó. En algunas personas se asocia a alergia a alimentos vegetales, como frutos secos, cacahuete o melocotón, por una proteína (Pla a 3) que no se destruye al cocinar; la herramienta de alergia cruzada lo explica con sus fuentes.",
    temporadaEuropa:
      "Según la SEAIC, poliniza en la segunda quincena de marzo y la primera de abril, y no suele pasar de un mes. Avanza de sur a norte: se detecta antes en ciudades como Málaga, Jaén, Sevilla o Murcia, y los niveles altos de Madrid, Barcelona y Zaragoza llegan a finales de marzo y principios de abril.",
    donde:
      "Es un árbol plantado, de calles y parques. La SEAIC lo destaca en Madrid, Barcelona y Zaragoza.",
    nivelHoy: [
      "El nivel diario de las páginas de cada ciudad viene del modelo europeo de polen (CAMS de Copernicus), y ese modelo no incluye el plátano de sombra. El nivel medido lo publican la <a href=\"https://www.uco.es/rea/\" rel=\"noopener\">Red Española de Aerobiología (REA)</a>, cada semana, y la <a href=\"https://www.polenes.com/\" rel=\"noopener\">red de la SEAIC (polenes.com)</a>. En la Comunidad de Madrid, la <a href=\"https://www.madrid.org/polen\" rel=\"noopener\">red Palinocam</a> publica cada día laborable los datos de polen del día anterior.",
      "La app Respira muestra el nivel semanal de la REA en la estación más cercana a ti, si hay una a menos de 100 km. Si no la hay, muestra una estimación por calendario, marcada como estimación.",
    ],
    seguirFaq: "El nivel medido lo publican la Red Española de Aerobiología (REA) cada semana y la red de la SEAIC. La app Respira muestra el nivel semanal de la REA en la estación más cercana, si hay una a menos de 100 km, o una estimación por calendario.",
    fuentes: ["<a href=\"https://www.seaic.org/download/6178/\" rel=\"noopener\">SEAIC: «La contaminación y la plantación de especies alergénicas pueden contribuir al aumento de la alergia al polen en las ciudades» (nota de prensa, 25 de marzo de 2015)</a>", "<a href=\"https://www.seaic.org/download/6212\" rel=\"noopener\">Comité de Aerobiología de la SEAIC: «La alergia al polen. Claves para sobrevivir esta primavera» (2015)</a>", "<a href=\"/alergia-cruzada-polen-alimentos\">Herramienta de alergia cruzada de Respira</a>, con sus estudios citados"],
  },
  parietaria: {
    slug: "parietaria",
    h1: "Alergia a la parietaria",
    estimado: true,
    sinCruzada: true,
    lead: "La parietaria es una hierba de la familia de las ortigas que crece en los muros. Según la SEAIC, en el litoral mediterráneo es la que predomina en la alergia al polen, por delante de las gramíneas.",
    metaDescription: "La parietaria, hierba de muros, domina la alergia al polen en el litoral mediterráneo, con temporada de primavera a otoño. Calendario por zonas y síntomas.",
    headings: {
      sintomas: "Síntomas de la alergia a la parietaria",
      temporada: "¿Cuándo es la temporada de parietaria?",
      hoy: "¿Cómo está hoy el polen de parietaria?",
    },
    sintomas:
      "Una revisión médica de 2018 señala que la rinitis y el asma acompañan con frecuencia a la alergia a la parietaria. Las especies que más alergia causan son Parietaria judaica y Parietaria officinalis.",
    temporadaEuropa:
      "Su temporada es larga. En un estudio de diez años en Italia duró de media de 6 a 7 meses, con un pico principal en primavera y otro menor a principios de otoño. No dura todo el año, aunque muchos médicos lo creen, según esa revisión.",
    donde:
      "Según la SEAIC, predomina en el litoral mediterráneo y en ciertas zonas de las Islas Canarias. Crece con facilidad a la sombra de los muros viejos.",
    nivelHoy: [
      "El nivel diario de las páginas de cada ciudad viene del modelo europeo de polen (CAMS de Copernicus), y ese modelo no incluye la parietaria. La <a href=\"https://www.uco.es/rea/\" rel=\"noopener\">Red Española de Aerobiología (REA)</a> publica cada semana el nivel de ortigas y parietarias juntas, porque al microscopio su polen no se distingue. También lo cuenta la <a href=\"https://www.polenes.com/\" rel=\"noopener\">red de la SEAIC (polenes.com)</a>.",
      "La app Respira muestra el nivel semanal de la REA en la estación más cercana a ti, si hay una a menos de 100 km. Si no la hay, muestra una estimación por calendario, marcada como estimación.",
    ],
    seguirFaq: "La Red Española de Aerobiología (REA) publica cada semana el nivel de ortigas y parietarias. La app Respira muestra ese nivel semanal en la estación más cercana, si hay una a menos de 100 km, o una estimación por calendario.",
    fuentes: ["<a href=\"https://www.seaic.org/download/6212\" rel=\"noopener\">Comité de Aerobiología de la SEAIC: «La alergia al polen. Claves para sobrevivir esta primavera» (2015)</a>", "<a href=\"https://pmc.ncbi.nlm.nih.gov/articles/PMC6306946/\" rel=\"noopener\">Ciprandi G. y otros: «Parietaria Allergy: An Intriguing Challenge for the Allergist», Medicina, 2018</a>"],
  },
};
