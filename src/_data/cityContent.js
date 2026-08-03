/**
 * Contenido editorial por ciudad. Los números diarios vienen de pollenData
 * (por slug); aquí vive lo que un rebuild NO debe regenerar: prosa local y la
 * lista de pólenes predominantes. Las ciudades cercanas y la FAQ se generan
 * en la plantilla (geo + datos), no se mantienen a mano.
 *
 * Reglas de contenido (brief Parte 5): cero afirmaciones médicas, ninguna
 * cifra sin fuente, estimados siempre etiquetados. Las menciones a Quercus y
 * salsoláceas se conservan como contenido editorial (sin datos numéricos,
 * porque no tenemos dato para esos tipos), por decisión de Parada 1.
 *
 * `intro` usa <em> para nombres científicos. `predominantes` son ids de
 * POLLEN_TYPES, ordenados por relevancia local (editorial).
 */

/** @type {Record<string, {predominantes: string[], intro: string[]}>} */
const CONTENT = {
  // ---- Andalucía ----
  almeria: {
    predominantes: ["olive", "parietaria", "grass"],
    intro: [
      "Almería tiene un clima árido que marca su perfil polínico: la parietaria poliniza buena parte del año en zonas urbanas y las salsoláceas, adaptadas a suelos secos, aparecen en verano y otoño. El olivo del interior aporta la carga principal de primavera.",
      "La escasez de lluvia mantiene los recuentos primaverales por debajo de los del valle del Guadalquivir, pero alarga la presencia de pólenes de zonas secas. El dato de esta página es el máximo previsto para hoy; la previsión te permite anticipar los picos.",
    ],
  },
  cadiz: {
    predominantes: ["grass", "olive", "parietaria"],
    intro: [
      "Cádiz, rodeada de mar, tiene un perfil suave y estable comparado con el interior andaluz. Las gramíneas de las campiñas y marismas cercanas dominan la primavera, con aporte de olivo desde la campiña gaditana en mayo y junio.",
      "La humedad atlántica y las brisas marinas moderan los niveles en la ciudad. La parietaria mediterránea añade presencia prolongada en zonas urbanas.",
    ],
  },
  cordoba: {
    predominantes: ["olive", "grass", "cypress"],
    intro: [
      "Córdoba es uno de los puntos calientes del polen de olivo en España y sede científica de la <a href='https://www.uco.es/rea/' rel='noopener'>Red Española de Aerobiología</a>, coordinada desde la Universidad de Córdoba. Mayo y junio marcan los máximos de la temporada de olivo.",
      "Las cupresáceas abren el año en enero y febrero y las gramíneas acompañan al olivo en la primavera tardía. El dato de esta página es el máximo previsto para hoy en la ciudad.",
    ],
  },
  granada: {
    predominantes: ["olive", "grass", "cypress"],
    intro: [
      "Granada tiene un perfil mixto: los olivares de la Vega y de Sierra Mágina elevan el olivo en mayo y junio, mientras que la altitud y la cercanía de Sierra Nevada introducen gramíneas de montaña y, en verano, salsoláceas en zonas más secas como el Altiplano.",
      "El contraste entre la vega regada y las zonas áridas del entorno da a Granada una temporada larga. La previsión a varios días ayuda a anticipar los picos.",
    ],
  },
  huelva: {
    predominantes: ["grass", "olive", "parietaria"],
    intro: [
      "Huelva combina el litoral atlántico con las campiñas y el entorno de Doñana. Las gramíneas dominan la primavera y el olivo del interior aporta carga en mayo y junio, moderados ambos por la influencia marina.",
      "La parietaria mantiene presencia urbana prolongada. El dato de esta página es el máximo previsto para hoy.",
    ],
  },
  jaen: {
    predominantes: ["olive", "grass", "cypress"],
    intro: [
      "Jaén está rodeada por una de las mayores extensiones de olivar del mundo, lo que convierte mayo y junio en los meses de mayor carga de polen de olivo. Es una de las zonas de referencia para el seguimiento de este alérgeno en España.",
      "Las cupresáceas abren la temporada en invierno y las gramíneas acompañan al olivo en primavera. La previsión te permite anticipar los días de mayor intensidad.",
    ],
  },
  malaga: {
    predominantes: ["olive", "parietaria", "grass"],
    intro: [
      "Málaga combina el polen mediterráneo costero (parietaria) con la carga de olivar del interior andaluz. Las brisas terrales descienden desde los olivares de Antequera y Ronda, elevando los niveles de olivo entre mayo y junio sin salir de la costa.",
      "La parietaria poliniza de forma prolongada en zonas urbanas del litoral. El dato de esta página es el máximo previsto para hoy en la ciudad.",
    ],
  },
  sevilla: {
    predominantes: ["olive", "grass", "cypress"],
    intro: [
      "Sevilla está rodeada de una amplia extensión de olivar, lo que convierte mayo y junio en los meses más intensos del año. El valle del Guadalquivir actúa como corredor de polen y concentra la carga de olivo de la campiña.",
      "Las cupresáceas (arizónica, ciprés) arrancan la temporada en enero y febrero, antes que en el norte peninsular. La previsión a varios días ayuda a anticipar los picos.",
    ],
  },
  // ---- Aragón ----
  huesca: {
    predominantes: ["grass", "cypress", "plane_tree"],
    intro: [
      "Huesca, a los pies del Pirineo, tiene una primavera marcada por las gramíneas de los prados y campos del somontano. Las cupresáceas abren el año y el plátano de sombra aporta el pico urbano de marzo y abril.",
      "La cercanía de la montaña alarga la temporada de gramíneas respecto al valle del Ebro. El dato de esta página es el máximo previsto para hoy.",
    ],
  },
  teruel: {
    predominantes: ["grass", "cypress", "mugwort"],
    intro: [
      "Teruel, de clima continental y seco, tiene una temporada de gramíneas concentrada en primavera-verano y presencia de pólenes de zonas áridas como la artemisa y las salsoláceas al final del verano.",
      "La altitud retrasa el arranque respecto a zonas más cálidas. La previsión te permite anticipar los picos.",
    ],
  },
  zaragoza: {
    predominantes: ["plane_tree", "grass", "cypress"],
    intro: [
      "El valle del Ebro tiene un perfil polínico particular: las salsoláceas y quenopodiáceas, familias adaptadas a suelos áridos, son la marca de Zaragoza en verano y otoño. En primavera dominan el plátano de sombra y las cupresáceas.",
      "El cierzo, viento característico del valle, transporta polen a larga distancia y puede traer cargas inesperadas. El dato de esta página es el máximo previsto para hoy en la ciudad.",
    ],
  },
  // ---- Asturias ----
  oviedo: {
    predominantes: ["grass", "birch", "alder"],
    intro: [
      "Oviedo tiene un calendario polínico atlántico dominado por las gramíneas de los prados verdes de Asturias. El abedul y el aliso, típicos del norte húmedo, aportan la carga arbórea de finales de invierno y primavera.",
      "La abundante lluvia mantiene los prados activos y prolonga la temporada de gramíneas. La previsión ayuda a anticipar los días de mayor intensidad.",
    ],
  },
  // ---- Baleares ----
  palma: {
    predominantes: ["parietaria", "olive", "grass"],
    intro: [
      "Palma tiene un perfil mediterráneo insular: la parietaria poliniza de forma prolongada en zonas urbanas y el olivo y las gramíneas del interior de Mallorca aportan la carga de primavera.",
      "La influencia marina modera los niveles y estabiliza la temporada. El dato de esta página es el máximo previsto para hoy.",
    ],
  },
  // ---- Canarias ----
  "las-palmas-de-gran-canaria": {
    predominantes: ["grass", "parietaria"],
    intro: [
      "Las Palmas de Gran Canaria tiene un clima subtropical con estacionalidad polínica suave. Las gramíneas y la parietaria mantienen presencia durante buena parte del año, sin los picos marcados de la península.",
      "La ausencia de un invierno frío hace que la temporada sea más repartida. La previsión te permite anticipar los días de mayor carga.",
    ],
  },
  "santa-cruz-de-tenerife": {
    predominantes: ["grass", "parietaria"],
    intro: [
      "Santa Cruz de Tenerife comparte el patrón subtropical canario: temporada polínica repartida a lo largo del año, con gramíneas y parietaria como pólenes de mayor presencia y sin los picos intensos del interior peninsular.",
      "El relieve de la isla genera microclimas que modulan los niveles según la zona. El dato de esta página es el máximo previsto para hoy.",
    ],
  },
  // ---- Cantabria ----
  santander: {
    predominantes: ["grass", "birch", "alder"],
    intro: [
      "Santander tiene un calendario atlántico dominado por las gramíneas de los prados cántabros, con aporte de abedul y aliso, típicos del norte húmedo, entre el final del invierno y la primavera.",
      "La humedad del Cantábrico prolonga la temporada de gramíneas. La previsión ayuda a anticipar los picos.",
    ],
  },
  // ---- Castilla-La Mancha ----
  albacete: {
    predominantes: ["grass", "olive", "cypress"],
    intro: [
      "Albacete, en la llanura manchega, tiene una temporada marcada por las gramíneas de los cultivos cerealistas y aporte de olivo del interior. Las salsoláceas de zonas áridas añaden presencia al final del verano.",
      "El clima continental concentra los picos en primavera. El dato de esta página es el máximo previsto para hoy.",
    ],
  },
  "ciudad-real": {
    predominantes: ["olive", "grass", "cypress"],
    intro: [
      "Ciudad Real combina los olivares y viñedos manchegos con los pastizales de la llanura. El olivo y las gramíneas dominan mayo y junio, con cupresáceas al arrancar el año.",
      "El clima seco y continental concentra la carga en primavera. La previsión te permite anticipar los días duros.",
    ],
  },
  cuenca: {
    predominantes: ["grass", "cypress", "olive"],
    intro: [
      "Cuenca, entre la serranía y la mancha, tiene una temporada de gramíneas de primavera-verano y presencia de cupresáceas y pinares en el entorno serrano. El olivo llega desde las zonas más bajas.",
      "La altitud retrasa el arranque respecto a la llanura. El dato de esta página es el máximo previsto para hoy.",
    ],
  },
  guadalajara: {
    predominantes: ["grass", "plane_tree", "cypress"],
    intro: [
      "Guadalajara, próxima a Madrid, comparte con la capital el peso del plátano de sombra urbano en marzo y abril y las gramíneas de la campiña y la alcarria en primavera tardía.",
      "El clima continental concentra los picos entre mayo y junio. La previsión ayuda a anticipar los días de mayor intensidad.",
    ],
  },
  toledo: {
    predominantes: ["grass", "olive", "cypress"],
    intro: [
      "Toledo se sitúa entre dos grandes zonas polínicas: los olivares de Castilla-La Mancha al sur y los pastizales de la meseta al norte. El resultado es una primavera larga, con gramíneas predominantes en mayo y junio y carga de olivo en las mismas semanas.",
      "El Tajo y su vega añaden vegetación de ribera al entorno urbano. El dato de esta página es el máximo previsto para hoy en la ciudad.",
    ],
  },
  // ---- Castilla y León ----
  avila: {
    predominantes: ["grass", "cypress", "olive"],
    intro: [
      "Ávila, la capital de provincia más alta de España, tiene una temporada polínica tardía por su altitud. Las gramíneas de los pastos de montaña dominan el verano temprano y las cupresáceas abren el año.",
      "El frío continental retrasa el arranque respecto a la meseta baja. La previsión te permite anticipar los picos.",
    ],
  },
  burgos: {
    predominantes: ["grass", "cypress", "plane_tree"],
    intro: [
      "Burgos, de clima continental frío, concentra su temporada de gramíneas en primavera-verano. Las cupresáceas y el plátano de sombra urbano aportan la carga de finales de invierno y comienzos de primavera.",
      "La altitud y el frío retrasan el calendario respecto al sur de la meseta. El dato de esta página es el máximo previsto para hoy.",
    ],
  },
  leon: {
    predominantes: ["grass", "birch", "cypress"],
    intro: [
      "León mezcla el perfil de la meseta con influencia de montaña: gramíneas de los pastos en primavera-verano y presencia de abedul, más propio del norte, en las zonas de transición hacia la cordillera Cantábrica.",
      "El clima fresco alarga la temporada de gramíneas. La previsión ayuda a anticipar los días de mayor carga.",
    ],
  },
  palencia: {
    predominantes: ["grass", "cypress", "plane_tree"],
    intro: [
      "Palencia, en plena meseta cerealista, tiene una temporada dominada por las gramíneas de los campos de cereal en mayo y junio, con cupresáceas al arrancar el año y plátano de sombra urbano en primavera.",
      "El clima continental concentra los picos en primavera tardía. El dato de esta página es el máximo previsto para hoy.",
    ],
  },
  salamanca: {
    predominantes: ["grass", "cypress", "plane_tree"],
    intro: [
      "Salamanca está rodeada de dehesa salmantina, lo que añade un componente de polen de Quercus (encina, roble, alcornoque) entre marzo y mayo, además de las gramíneas y cupresáceas habituales de la meseta.",
      "Las gramíneas de los pastos dominan mayo y junio. El dato de esta página es el máximo previsto para hoy en la ciudad.",
    ],
  },
  segovia: {
    predominantes: ["grass", "cypress", "plane_tree"],
    intro: [
      "Segovia, al pie del Guadarrama, tiene una temporada de gramíneas de primavera-verano y presencia de cupresáceas y pinares del entorno serrano. La altitud modera el arranque respecto a la meseta baja.",
      "La cercanía de la sierra alarga la presencia de gramíneas de montaña. La previsión te permite anticipar los picos.",
    ],
  },
  soria: {
    predominantes: ["grass", "cypress", "mugwort"],
    intro: [
      "Soria, una de las provincias más frías y de menor densidad de España, tiene una temporada polínica tardía y concentrada. Las gramíneas dominan el verano temprano y la artemisa aparece al final del verano.",
      "El clima continental extremo retrasa el calendario. El dato de esta página es el máximo previsto para hoy.",
    ],
  },
  valladolid: {
    predominantes: ["grass", "cypress", "plane_tree"],
    intro: [
      "Valladolid y la meseta norte tienen un calendario centrado en gramíneas y cupresáceas. La carga de olivo es moderada, llega desde el sur, pero las gramíneas de cebada, trigo y avena de los campos circundantes hacen de mayo y junio meses intensos.",
      "El plátano de sombra urbano aporta el pico de marzo y abril. El dato de esta página es el máximo previsto para hoy en la ciudad.",
    ],
  },
  zamora: {
    predominantes: ["grass", "cypress", "plane_tree"],
    intro: [
      "Zamora, en la meseta cerealista junto al Duero, tiene una temporada dominada por las gramíneas de los campos de cereal, con cupresáceas al comienzo del año y presencia de Quercus de las dehesas del entorno.",
      "El clima continental concentra los picos en primavera tardía. La previsión ayuda a anticipar los días duros.",
    ],
  },
  // ---- Cataluña ----
  barcelona: {
    predominantes: ["parietaria", "plane_tree", "grass"],
    intro: [
      "Barcelona tiene un perfil polínico mediterráneo particular: la parietaria (una urticácea) poliniza prácticamente todo el año en grietas de muros y zonas urbanas, con picos entre marzo y octubre. El plátano de sombra, abundante en el Eixample y la Diagonal, marca el pico de primavera.",
      "La humedad del litoral mantiene los niveles más estables que en el interior, pero las brisas pueden concentrar el polen en zonas urbanas densas. El dato de esta página es el máximo previsto para hoy en la ciudad.",
    ],
  },
  girona: {
    predominantes: ["parietaria", "plane_tree", "grass"],
    intro: [
      "Girona combina el perfil mediterráneo con influencia de la vegetación del interior gerundense. La parietaria mantiene presencia prolongada y el plátano de sombra urbano marca el pico de primavera, con gramíneas de las llanuras del Empordà.",
      "La cercanía del Pirineo aporta pólenes arbóreos de montaña. La previsión te permite anticipar los picos.",
    ],
  },
  lleida: {
    predominantes: ["plane_tree", "grass", "cypress"],
    intro: [
      "Lleida, en la depresión interior catalana, tiene un clima continental seco con un perfil más parecido al valle del Ebro que al litoral. El plátano de sombra y las gramíneas de la huerta dominan la primavera y las salsoláceas aparecen en verano.",
      "El contraste con la costa catalana es marcado: menos parietaria y más pólenes de zonas secas. El dato de esta página es el máximo previsto para hoy.",
    ],
  },
  tarragona: {
    predominantes: ["parietaria", "olive", "grass"],
    intro: [
      "Tarragona tiene un perfil mediterráneo costero con parietaria de presencia prolongada y aporte de olivo de las comarcas del interior. Las gramíneas del Camp de Tarragona completan la carga de primavera.",
      "La influencia marina modera los niveles urbanos. La previsión ayuda a anticipar los días de mayor intensidad.",
    ],
  },
  // ---- Comunidad Valenciana ----
  alicante: {
    predominantes: ["parietaria", "olive", "grass"],
    intro: [
      "Alicante, de clima mediterráneo seco, tiene a la parietaria como polen de presencia casi continua en zonas urbanas. Las palmeras, el olivo del interior y las salsoláceas de zonas áridas completan un calendario repartido a lo largo del año.",
      "La escasez de lluvia alarga la presencia de pólenes de zonas secas. El dato de esta página es el máximo previsto para hoy.",
    ],
  },
  "castellon-de-la-plana": {
    predominantes: ["parietaria", "olive", "grass"],
    intro: [
      "Castellón de la Plana comparte el perfil mediterráneo del litoral valenciano: parietaria prolongada, olivo y algarrobo del interior y gramíneas de la plana en primavera.",
      "La influencia marina estabiliza los niveles urbanos. La previsión te permite anticipar los picos.",
    ],
  },
  valencia: {
    predominantes: ["parietaria", "olive", "grass"],
    intro: [
      "Valencia comparte con Barcelona el dominio de la parietaria, que poliniza casi sin pausa de marzo a octubre y es la principal responsable de la alergia perenne en la costa mediterránea. El interior añade carga de olivar y gramíneas en mayo y junio.",
      "La huerta y las zonas agrícolas cercanas elevan las gramíneas en primavera tardía. El dato de esta página es el máximo previsto para hoy en la ciudad.",
    ],
  },
  // ---- Extremadura ----
  badajoz: {
    predominantes: ["grass", "olive", "cypress"],
    intro: [
      "Badajoz combina dehesa, olivar y pastizal extremeño. Las gramíneas dominan la primavera, el olivo aporta carga en mayo y junio y la encina (<em>Quercus ilex</em>) de la dehesa marca presencia en abril y mayo.",
      "El clima cálido adelanta el arranque respecto a la meseta norte. El dato de esta página es el máximo previsto para hoy.",
    ],
  },
  caceres: {
    predominantes: ["grass", "olive", "cypress"],
    intro: [
      "Cáceres y Extremadura combinan dehesa, olivar y pastizal. La encina (<em>Quercus ilex</em>) marca un pico característico en abril y mayo, seguido por gramíneas y olivo en mayo y junio. El polen de Quercus, aunque menos comentado que el de gramíneas u olivo, tiene presencia notable en la zona.",
      "El entorno de dehesa da a Cáceres un componente arbóreo propio. El dato de esta página es el máximo previsto para hoy en la ciudad.",
    ],
  },
  // ---- Galicia ----
  "a-coruna": {
    predominantes: ["grass", "birch", "alder"],
    intro: [
      "A Coruña tiene un calendario atlántico dominado por las gramíneas de los prados gallegos, con aporte de abedul, aliso y plátano de sombra urbano. La humedad oceánica prolonga la temporada de gramíneas.",
      "El clima suave y lluvioso mantiene los prados activos buena parte del año. La previsión te permite anticipar los picos.",
    ],
  },
  lugo: {
    predominantes: ["grass", "birch", "alder"],
    intro: [
      "Lugo, de interior gallego húmedo, tiene una temporada dominada por las gramíneas de prados y pastos, con presencia de abedul y aliso de los bosques de ribera del norte.",
      "La lluvia abundante prolonga la actividad de los prados. El dato de esta página es el máximo previsto para hoy.",
    ],
  },
  ourense: {
    predominantes: ["grass", "birch", "olive"],
    intro: [
      "Ourense, en los valles interiores gallegos, combina el perfil atlántico de gramíneas con influencia de las zonas más cálidas del Miño, donde aparece algo de olivo. El abedul y el aliso aportan carga arbórea de finales de invierno.",
      "Los valles resguardados adelantan el arranque respecto a la costa. La previsión ayuda a anticipar los días duros.",
    ],
  },
  pontevedra: {
    predominantes: ["grass", "birch", "alder"],
    intro: [
      "Pontevedra tiene un calendario atlántico de gramíneas dominantes, con abedul, aliso y plátano de sombra urbano. Las Rías Baixas aportan un clima suave que prolonga la temporada.",
      "La humedad oceánica mantiene los prados activos buena parte del año. El dato de esta página es el máximo previsto para hoy.",
    ],
  },
  // ---- Madrid ----
  madrid: {
    predominantes: ["plane_tree", "grass", "cypress", "olive"],
    intro: [
      "Madrid concentra una gran cantidad de plátano de sombra (<em>Platanus hispanica</em>) en sus calles, lo que convierte marzo y abril en meses especialmente intensos para muchas personas alérgicas. A esto se suman las gramíneas de la sierra y los olivares del sur de la Comunidad, que elevan los niveles entre mayo y junio.",
      "En la capital, los días de viento del suroeste suelen traer polen del olivar manchego y de Andalucía, que se suma al polen local. El dato de esta página es el máximo previsto para hoy en la ciudad; la previsión te permite anticipar los picos.",
    ],
  },
  // ---- Murcia ----
  murcia: {
    predominantes: ["parietaria", "olive", "grass"],
    intro: [
      "Murcia es una de las zonas de referencia de las salsoláceas y quenopodiáceas, plantas adaptadas a suelos áridos y salinos que polinizan de julio a octubre. Sumadas a la parietaria mediterránea, dan a la Región una temporada polínica muy repartida a lo largo del año.",
      "El olivo y las gramíneas de la huerta aportan la carga de primavera. El dato de esta página es el máximo previsto para hoy en la ciudad.",
    ],
  },
  // ---- Navarra ----
  pamplona: {
    predominantes: ["grass", "birch", "cypress"],
    intro: [
      "Pamplona, en la transición entre el norte húmedo y el valle del Ebro, tiene una temporada de gramíneas intensa en primavera-verano y presencia de abedul, más propio del norte, además de cupresáceas al arrancar el año.",
      "El clima de transición combina pólenes atlánticos y continentales. La previsión te permite anticipar los picos.",
    ],
  },
  // ---- País Vasco ----
  "vitoria-gasteiz": {
    predominantes: ["grass", "birch", "plane_tree"],
    intro: [
      "Vitoria-Gasteiz, en la llanada alavesa, tiene una temporada de gramíneas destacada, con abedul del entorno y plátano de sombra urbano. Su altitud le da un clima más continental que el de la costa vasca.",
      "El abedul es uno de los pólenes arbóreos más relevantes del norte. El dato de esta página es el máximo previsto para hoy.",
    ],
  },
  bilbao: {
    predominantes: ["birch", "grass", "alder"],
    intro: [
      "Bilbao tiene un calendario polínico atlántico que se diferencia del resto de España: el abedul (<em>Betula</em>) es el polen dominante de marzo a mayo y uno de los más alergénicos del norte peninsular. El aliso (<em>Alnus</em>) abre la temporada en enero y febrero, antes que el abedul.",
      "Las gramíneas de los prados verdes completan la carga de primavera-verano. El dato de esta página es el máximo previsto para hoy en la ciudad.",
    ],
  },
  "donostia-san-sebastian": {
    predominantes: ["birch", "grass", "alder"],
    intro: [
      "Donostia-San Sebastián comparte el perfil atlántico del norte: abedul dominante en primavera, aliso al arrancar el año y gramíneas de los prados durante la temporada cálida.",
      "La humedad del Cantábrico prolonga la actividad de los prados. La previsión ayuda a anticipar los días de mayor intensidad.",
    ],
  },
  // ---- La Rioja ----
  logrono: {
    predominantes: ["grass", "plane_tree", "cypress"],
    intro: [
      "Logroño, en el valle del Ebro riojano, combina las gramíneas de la huerta y el viñedo con el plátano de sombra urbano y las cupresáceas de comienzos de año. Las salsoláceas de zonas secas aparecen al final del verano.",
      "El clima de valle da una primavera intensa y un verano con pólenes de zonas áridas. El dato de esta página es el máximo previsto para hoy.",
    ],
  },
  // ---- Ceuta y Melilla ----
  ceuta: {
    predominantes: ["parietaria", "olive", "grass"],
    intro: [
      "Ceuta tiene un perfil mediterráneo con parietaria de presencia prolongada y aporte de olivo y gramíneas del entorno. La influencia marina modera los niveles a lo largo del año.",
      "El clima suave reparte la temporada sin picos extremos. La previsión te permite anticipar los días de mayor carga.",
    ],
  },
  melilla: {
    predominantes: ["parietaria", "olive", "grass"],
    intro: [
      "Melilla comparte el perfil mediterráneo norteafricano: parietaria prolongada, olivo del entorno y gramíneas en primavera, todo moderado por la proximidad del mar.",
      "El clima cálido y seco alarga la presencia de pólenes de zonas secas. El dato de esta página es el máximo previsto para hoy.",
    ],
  },
};

export default CONTENT;
