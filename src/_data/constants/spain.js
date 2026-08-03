/**
 * Ported literally from respira-app `constants/spain.ts` (copy dated 2026-08-03).
 * Source of truth: the app. Do not edit values here without changing the app first.
 * Coordinates are the exact ones the app sends to Open-Meteo, so web and app
 * always query the same grid point per city.
 */

// Main cities used for map overlay data fetching (provincial capitals)
export const SPAIN_CAPITAL_COORDS = { lat: 40.4168, lon: -3.7038 };

export const COMUNIDADES = [
  {
    name: "Andalucía",
    code: "AN",
    provincias: [
      { name: "Almería", capital: { name: "Almería", lat: 36.8340, lon: -2.4637, isCapital: true }, ciudades: [] },
      { name: "Cádiz", capital: { name: "Cádiz", lat: 36.5271, lon: -6.2886, isCapital: true }, ciudades: [
        { name: "Jerez de la Frontera", lat: 36.6850, lon: -6.1261 },
        { name: "Algeciras", lat: 36.1408, lon: -5.4536 },
      ] },
      { name: "Córdoba", capital: { name: "Córdoba", lat: 37.8882, lon: -4.7794, isCapital: true }, ciudades: [] },
      { name: "Granada", capital: { name: "Granada", lat: 37.1773, lon: -3.5986, isCapital: true }, ciudades: [] },
      { name: "Huelva", capital: { name: "Huelva", lat: 37.2614, lon: -6.9447, isCapital: true }, ciudades: [] },
      { name: "Jaén", capital: { name: "Jaén", lat: 37.7796, lon: -3.7849, isCapital: true }, ciudades: [] },
      { name: "Málaga", capital: { name: "Málaga", lat: 36.7213, lon: -4.4214, isCapital: true }, ciudades: [
        { name: "Marbella", lat: 36.5099, lon: -4.8862 },
        { name: "Torremolinos", lat: 36.6217, lon: -4.4997 },
      ] },
      { name: "Sevilla", capital: { name: "Sevilla", lat: 37.3891, lon: -5.9845, isCapital: true }, ciudades: [
        { name: "Dos Hermanas", lat: 37.2833, lon: -5.9222 },
      ] },
    ],
  },
  {
    name: "Aragón",
    code: "AR",
    provincias: [
      { name: "Huesca", capital: { name: "Huesca", lat: 42.1401, lon: -0.4089, isCapital: true }, ciudades: [] },
      { name: "Teruel", capital: { name: "Teruel", lat: 40.3456, lon: -1.1065, isCapital: true }, ciudades: [] },
      { name: "Zaragoza", capital: { name: "Zaragoza", lat: 41.6488, lon: -0.8891, isCapital: true }, ciudades: [] },
    ],
  },
  {
    name: "Asturias",
    code: "AS",
    provincias: [
      { name: "Asturias", capital: { name: "Oviedo", lat: 43.3614, lon: -5.8493, isCapital: true }, ciudades: [
        { name: "Gijón", lat: 43.5322, lon: -5.6611 },
        { name: "Avilés", lat: 43.5567, lon: -5.9246 },
      ] },
    ],
  },
  {
    name: "Islas Baleares",
    code: "IB",
    provincias: [
      { name: "Islas Baleares", capital: { name: "Palma", lat: 39.5696, lon: 2.6502, isCapital: true }, ciudades: [
        { name: "Ibiza", lat: 38.9067, lon: 1.4206 },
      ] },
    ],
  },
  {
    name: "Canarias",
    code: "CN",
    provincias: [
      { name: "Las Palmas", capital: { name: "Las Palmas de Gran Canaria", lat: 28.1235, lon: -15.4363, isCapital: true }, ciudades: [
        { name: "Arrecife", lat: 28.9630, lon: -13.5477 },
      ] },
      { name: "Santa Cruz de Tenerife", capital: { name: "Santa Cruz de Tenerife", lat: 28.4636, lon: -16.2518, isCapital: true }, ciudades: [] },
    ],
  },
  {
    name: "Cantabria",
    code: "CB",
    provincias: [
      { name: "Cantabria", capital: { name: "Santander", lat: 43.4623, lon: -3.8100, isCapital: true }, ciudades: [] },
    ],
  },
  {
    name: "Castilla-La Mancha",
    code: "CM",
    provincias: [
      { name: "Albacete", capital: { name: "Albacete", lat: 38.9942, lon: -1.8585, isCapital: true }, ciudades: [] },
      { name: "Ciudad Real", capital: { name: "Ciudad Real", lat: 38.9848, lon: -3.9274, isCapital: true }, ciudades: [] },
      { name: "Cuenca", capital: { name: "Cuenca", lat: 40.0704, lon: -2.1374, isCapital: true }, ciudades: [] },
      { name: "Guadalajara", capital: { name: "Guadalajara", lat: 40.6337, lon: -3.1674, isCapital: true }, ciudades: [] },
      { name: "Toledo", capital: { name: "Toledo", lat: 39.8628, lon: -4.0273, isCapital: true }, ciudades: [
        { name: "Talavera de la Reina", lat: 39.9634, lon: -4.8305 },
      ] },
    ],
  },
  {
    name: "Castilla y León",
    code: "CL",
    provincias: [
      { name: "Ávila", capital: { name: "Ávila", lat: 40.6560, lon: -4.6816, isCapital: true }, ciudades: [] },
      { name: "Burgos", capital: { name: "Burgos", lat: 42.3440, lon: -3.6969, isCapital: true }, ciudades: [] },
      { name: "León", capital: { name: "León", lat: 42.5987, lon: -5.5671, isCapital: true }, ciudades: [
        { name: "Ponferrada", lat: 42.5499, lon: -6.5986 },
      ] },
      { name: "Palencia", capital: { name: "Palencia", lat: 42.0095, lon: -4.5288, isCapital: true }, ciudades: [] },
      { name: "Salamanca", capital: { name: "Salamanca", lat: 40.9701, lon: -5.6635, isCapital: true }, ciudades: [] },
      { name: "Segovia", capital: { name: "Segovia", lat: 40.9429, lon: -4.1088, isCapital: true }, ciudades: [] },
      { name: "Soria", capital: { name: "Soria", lat: 41.7636, lon: -2.4649, isCapital: true }, ciudades: [] },
      { name: "Valladolid", capital: { name: "Valladolid", lat: 41.6523, lon: -4.7245, isCapital: true }, ciudades: [] },
      { name: "Zamora", capital: { name: "Zamora", lat: 41.5035, lon: -5.7445, isCapital: true }, ciudades: [] },
    ],
  },
  {
    name: "Cataluña",
    code: "CT",
    provincias: [
      { name: "Barcelona", capital: { name: "Barcelona", lat: 41.3874, lon: 2.1686, isCapital: true }, ciudades: [
        { name: "Hospitalet de Llobregat", lat: 41.3596, lon: 2.1003 },
        { name: "Sabadell", lat: 41.5486, lon: 2.1075 },
        { name: "Terrassa", lat: 41.5631, lon: 2.0089 },
        { name: "Badalona", lat: 41.4501, lon: 2.2476 },
      ] },
      { name: "Girona", capital: { name: "Girona", lat: 41.9794, lon: 2.8214, isCapital: true }, ciudades: [] },
      { name: "Lleida", capital: { name: "Lleida", lat: 41.6176, lon: 0.6200, isCapital: true }, ciudades: [] },
      { name: "Tarragona", capital: { name: "Tarragona", lat: 41.1189, lon: 1.2445, isCapital: true }, ciudades: [
        { name: "Reus", lat: 41.1561, lon: 1.1069 },
      ] },
    ],
  },
  {
    name: "Comunidad Valenciana",
    code: "VC",
    provincias: [
      { name: "Alicante", capital: { name: "Alicante", lat: 38.3452, lon: -0.4810, isCapital: true }, ciudades: [
        { name: "Elche", lat: 38.2670, lon: -0.6985 },
        { name: "Benidorm", lat: 38.5341, lon: -0.1313 },
      ] },
      { name: "Castellón", capital: { name: "Castellón de la Plana", lat: 39.9864, lon: -0.0513, isCapital: true }, ciudades: [] },
      { name: "Valencia", capital: { name: "Valencia", lat: 39.4699, lon: -0.3763, isCapital: true }, ciudades: [
        { name: "Torrent", lat: 39.4372, lon: -0.4657 },
        { name: "Gandía", lat: 38.9664, lon: -0.1827 },
      ] },
    ],
  },
  {
    name: "Extremadura",
    code: "EX",
    provincias: [
      { name: "Badajoz", capital: { name: "Badajoz", lat: 38.8794, lon: -6.9706, isCapital: true }, ciudades: [
        { name: "Mérida", lat: 38.9161, lon: -6.3437 },
      ] },
      { name: "Cáceres", capital: { name: "Cáceres", lat: 39.4753, lon: -6.3724, isCapital: true }, ciudades: [] },
    ],
  },
  {
    name: "Galicia",
    code: "GA",
    provincias: [
      { name: "A Coruña", capital: { name: "A Coruña", lat: 43.3623, lon: -8.4115, isCapital: true }, ciudades: [
        { name: "Santiago de Compostela", lat: 42.8782, lon: -8.5448 },
        { name: "Ferrol", lat: 43.4844, lon: -8.2328 },
      ] },
      { name: "Lugo", capital: { name: "Lugo", lat: 43.0097, lon: -7.5560, isCapital: true }, ciudades: [] },
      { name: "Ourense", capital: { name: "Ourense", lat: 42.3400, lon: -7.8648, isCapital: true }, ciudades: [] },
      { name: "Pontevedra", capital: { name: "Pontevedra", lat: 42.4312, lon: -8.6440, isCapital: true }, ciudades: [
        { name: "Vigo", lat: 42.2406, lon: -8.7207 },
      ] },
    ],
  },
  {
    name: "Comunidad de Madrid",
    code: "MD",
    provincias: [
      { name: "Madrid", capital: { name: "Madrid", lat: 40.4168, lon: -3.7038, isCapital: true }, ciudades: [
        // Palinocam network stations
        { name: "Alcalá de Henares", lat: 40.4819, lon: -3.3635 },
        { name: "Alcobendas", lat: 40.5333, lon: -3.6333 },
        { name: "Aranjuez", lat: 40.0333, lon: -3.6000 },
        { name: "Collado Villalba", lat: 40.6333, lon: -4.0000 },
        { name: "Coslada", lat: 40.4239, lon: -3.5614 },
        { name: "Getafe", lat: 40.3047, lon: -3.7311 },
        { name: "Las Rozas", lat: 40.4928, lon: -3.8739 },
        { name: "Móstoles", lat: 40.3223, lon: -3.8651 },
      ] },
    ],
  },
  {
    name: "Región de Murcia",
    code: "MC",
    provincias: [
      { name: "Murcia", capital: { name: "Murcia", lat: 37.9922, lon: -1.1307, isCapital: true }, ciudades: [
        { name: "Cartagena", lat: 37.6057, lon: -0.9913 },
        { name: "Lorca", lat: 37.6773, lon: -1.7009 },
      ] },
    ],
  },
  {
    name: "Navarra",
    code: "NC",
    provincias: [
      { name: "Navarra", capital: { name: "Pamplona", lat: 42.8125, lon: -1.6458, isCapital: true }, ciudades: [] },
    ],
  },
  {
    name: "País Vasco",
    code: "PV",
    provincias: [
      { name: "Álava", capital: { name: "Vitoria-Gasteiz", lat: 42.8467, lon: -2.6726, isCapital: true }, ciudades: [] },
      { name: "Bizkaia", capital: { name: "Bilbao", lat: 43.2630, lon: -2.9350, isCapital: true }, ciudades: [
        { name: "Barakaldo", lat: 43.2956, lon: -2.9875 },
        { name: "Getxo", lat: 43.3567, lon: -3.0117 },
      ] },
      { name: "Gipuzkoa", capital: { name: "Donostia-San Sebastián", lat: 43.3183, lon: -1.9812, isCapital: true }, ciudades: [] },
    ],
  },
  {
    name: "La Rioja",
    code: "RI",
    provincias: [
      { name: "La Rioja", capital: { name: "Logroño", lat: 42.4627, lon: -2.4445, isCapital: true }, ciudades: [] },
    ],
  },
  {
    name: "Ceuta",
    code: "CE",
    provincias: [
      { name: "Ceuta", capital: { name: "Ceuta", lat: 35.8894, lon: -5.3198, isCapital: true }, ciudades: [] },
    ],
  },
  {
    name: "Melilla",
    code: "ML",
    provincias: [
      { name: "Melilla", capital: { name: "Melilla", lat: 35.2923, lon: -2.9381, isCapital: true }, ciudades: [] },
    ],
  },
];

// Flat list of all provincial capitals for map data fetching
export function getAllCapitals() {
  const capitals = [];
  for (const ccaa of COMUNIDADES) {
    for (const provincia of ccaa.provincias) {
      capitals.push({ ...provincia.capital, isCapital: true, provincia: provincia.name, ccaa: ccaa.name });
    }
  }
  return capitals;
}

// All cities (capitals + additional) for the map
export function getAllMapCities() {
  const cities = [];
  for (const ccaa of COMUNIDADES) {
    for (const provincia of ccaa.provincias) {
      cities.push({ ...provincia.capital, isCapital: true });
      for (const ciudad of provincia.ciudades) {
        cities.push({ ...ciudad, isCapital: ciudad.isCapital ?? false });
      }
    }
  }
  return cities;
}

export default { COMUNIDADES, SPAIN_CAPITAL_COORDS };
