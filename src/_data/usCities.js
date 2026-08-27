/**
 * The US city pages under /en/pollen-{slug}.
 *
 * Chosen by metro population, with the five climate zones all represented so
 * no zone's seasonal pattern goes unpublished. Every entry carries its own
 * `note`: cities inside one zone share a calendar, so without a line of their
 * own the pages would be near-duplicates of each other, which is worth less
 * than no page at all.
 *
 * `zone` is computed, never stored, so it can never drift from the app's
 * resolveUsZone. Same for `nearby`, which is the four nearest cities on this
 * list and exists for internal linking.
 */
import { slugify, distanceKm } from "../_lib/aggregate.js";
import { resolveUsZone } from "./constants/us.js";

const CITIES = [
  { name: "New York", state: "New York", abbr: "NY", lat: 40.7128, lon: -74.0060, pop: 19500000,
    note: "Street trees do most of the damage here. London plane, oak and maple line the boroughs, and the spring peak arrives compressed into a few weeks in April and May." },
  { name: "Los Angeles", state: "California", abbr: "CA", lat: 34.0522, lon: -118.2437, pop: 12900000,
    note: "A long, mild season rather than a sharp one. Ornamental planting and a climate with no real winter mean something is usually in the air, and grass runs well past the point it has stopped elsewhere." },
  { name: "Chicago", state: "Illinois", abbr: "IL", lat: 41.8781, lon: -87.6298, pop: 9400000,
    note: "Two distinct seasons: tree pollen off the lake in April and May, then ragweed from August until the first hard frost. The lake breeze can hold counts down downtown and leave the western suburbs worse." },
  { name: "Dallas", state: "Texas", abbr: "TX", lat: 32.7767, lon: -96.7970, pop: 7600000,
    note: "Elm and cedar make winter an allergy season here, which catches out anyone who moved from the north expecting a break between December and February." },
  { name: "Houston", state: "Texas", abbr: "TX", lat: 29.7604, lon: -95.3698, pop: 7100000,
    note: "Humidity keeps mold in play year round alongside the pollen, and the grass season is one of the longest in the country." },
  { name: "Washington", state: "District of Columbia", abbr: "DC", lat: 38.9072, lon: -77.0369, pop: 6300000,
    note: "Oak dominates the spring, and the tidal basin's famous cherry blossom is not the problem — cherry is insect pollinated. The oak behind it is." },
  { name: "Philadelphia", state: "Pennsylvania", abbr: "PA", lat: 39.9526, lon: -75.1652, pop: 6200000,
    note: "A textbook Northeast pattern: maple and elm first, oak and birch through the peak, then a ragweed autumn." },
  { name: "Atlanta", state: "Georgia", abbr: "GA", lat: 33.7490, lon: -84.3880, pop: 6100000,
    note: "The yellow pine dust on cars in April is the city's signature, though pine grains are large and less allergenic than they look. The oak underneath it is what most people react to." },
  { name: "Miami", state: "Florida", abbr: "FL", lat: 25.7617, lon: -80.1918, pop: 6100000,
    note: "No birch and no alder this far south. Grass instead, for most of the year, which makes the season less a season than a constant." },
  { name: "Phoenix", state: "Arizona", abbr: "AZ", lat: 33.4484, lon: -112.0740, pop: 4900000,
    note: "Desert, but not low pollen. Imported ornamental planting and irrigated lawns produce a spring peak that the native landscape would not." },
  { name: "Boston", state: "Massachusetts", abbr: "MA", lat: 42.3601, lon: -71.0589, pop: 4900000,
    note: "A late, sharp spring. Birch and oak arrive close together in May rather than spreading out, so the worst weeks are concentrated." },
  { name: "San Francisco", state: "California", abbr: "CA", lat: 37.7749, lon: -122.4194, pop: 4700000,
    note: "The fog belt holds counts down in the city itself while the East Bay and the inland valleys run considerably higher on the same day." },
  { name: "Riverside", state: "California", abbr: "CA", lat: 33.9806, lon: -117.3755, pop: 4600000,
    note: "Inland Southern California, without the coastal moderation. Hot, dry and windy conditions carry grass and weed pollen a long way." },
  { name: "Detroit", state: "Michigan", abbr: "MI", lat: 42.3314, lon: -83.0458, pop: 4300000,
    note: "Maple and birch drive a Great Lakes spring, and ragweed closes the year out from the surrounding farmland." },
  { name: "Seattle", state: "Washington", abbr: "WA", lat: 47.6062, lon: -122.3321, pop: 4000000,
    note: "The earliest tree pollen in the country. Alder starts in January and peaks in February, months before anything begins elsewhere, and it is routinely mistaken for a winter cold." },
  { name: "Minneapolis", state: "Minnesota", abbr: "MN", lat: 44.9778, lon: -93.2650, pop: 3700000,
    note: "Deep in the ragweed belt. The August and September counts here are among the highest anywhere in the United States, and the season ends abruptly with the first hard frost." },
  { name: "San Diego", state: "California", abbr: "CA", lat: 32.7157, lon: -117.1611, pop: 3300000,
    note: "Mild enough that the season never fully closes. Grass and weed pollen persist through months that would be clear further north." },
  { name: "Tampa", state: "Florida", abbr: "FL", lat: 27.9506, lon: -82.4572, pop: 3200000,
    note: "Oak in early spring is the sharpest peak of the year, and the humidity keeps mold spores relevant alongside the pollen." },
  { name: "Denver", state: "Colorado", abbr: "CO", lat: 39.7392, lon: -104.9903, pop: 3000000,
    note: "Altitude shifts everything later and compresses it. Cottonwood along the Front Range creeks is the spring signature." },
  { name: "St. Louis", state: "Missouri", abbr: "MO", lat: 38.6270, lon: -90.1994, pop: 2800000,
    note: "River valley air and Midwest farmland either side of it. Ragweed here is a river-corridor problem as much as a field one." },
  { name: "Baltimore", state: "Maryland", abbr: "MD", lat: 39.2904, lon: -76.6122, pop: 2800000,
    note: "Oak and maple through April and May, with the Chesapeake keeping the coastal side slightly milder than the counties inland." },
  { name: "Charlotte", state: "North Carolina", abbr: "NC", lat: 35.2271, lon: -80.8431, pop: 2700000,
    note: "The Piedmont spring is early and heavy, with oak and pine arriving together in March." },
  { name: "Orlando", state: "Florida", abbr: "FL", lat: 28.5383, lon: -81.3792, pop: 2700000,
    note: "Oak in February and March, then grass for most of what is left of the year." },
  { name: "San Antonio", state: "Texas", abbr: "TX", lat: 29.4241, lon: -98.4936, pop: 2600000,
    note: "Mountain cedar country. The December and January juniper counts here are the largest single-species readings recorded anywhere in the United States, and locals call the reaction cedar fever." },
  { name: "Portland", state: "Oregon", abbr: "OR", lat: 45.5152, lon: -122.6784, pop: 2500000,
    note: "Alder in late winter, then grass. The Willamette Valley south of the city grows grass seed commercially, and June counts reflect it." },
  { name: "Sacramento", state: "California", abbr: "CA", lat: 38.5816, lon: -121.4944, pop: 2400000,
    note: "Central Valley agriculture and a long dry season. Tree pollen starts in February and grass runs well into summer." },
  { name: "Pittsburgh", state: "Pennsylvania", abbr: "PA", lat: 40.4406, lon: -79.9959, pop: 2400000,
    note: "The river valleys trap air, and counts in the hollows can sit well above the ridges on the same morning." },
  { name: "Las Vegas", state: "Nevada", abbr: "NV", lat: 36.1699, lon: -115.1398, pop: 2300000,
    note: "Almost everything here was planted. Mulberry and olive were widely used in landscaping before restrictions, and the spring peak is largely imported." },
  { name: "Austin", state: "Texas", abbr: "TX", lat: 30.2672, lon: -97.7431, pop: 2300000,
    note: "The centre of the mountain cedar belt. December and January are the worst months of the year here, which is the reverse of almost everywhere else in the country." },
  { name: "Cincinnati", state: "Ohio", abbr: "OH", lat: 39.1031, lon: -84.5120, pop: 2300000,
    note: "The Ohio River valley concentrates both the spring tree pollen and the autumn ragweed, and consistently ranks near the top of national allergy lists." },
  { name: "Kansas City", state: "Missouri", abbr: "MO", lat: 39.0997, lon: -94.5786, pop: 2200000,
    note: "Prairie on three sides. Ragweed dominates the second half of the year and grass the first." },
  { name: "Columbus", state: "Ohio", abbr: "OH", lat: 39.9612, lon: -82.9988, pop: 2100000,
    note: "A long Midwest spring, with maple and elm opening it in March and oak carrying the peak." },
  { name: "Indianapolis", state: "Indiana", abbr: "IN", lat: 39.7684, lon: -86.1581, pop: 2100000,
    note: "Surrounded by farmland on every side, which makes the ragweed season here as significant as the spring one." },
  { name: "Cleveland", state: "Ohio", abbr: "OH", lat: 41.4993, lon: -81.6944, pop: 2100000,
    note: "Lake Erie delays the spring by a week or two compared with cities at the same latitude inland." },
  { name: "San Jose", state: "California", abbr: "CA", lat: 37.3382, lon: -121.8863, pop: 2000000,
    note: "Warmer and drier than the coast an hour west, with an earlier tree season and a longer grass one." },
  { name: "Nashville", state: "Tennessee", abbr: "TN", lat: 36.1627, lon: -86.7816, pop: 2000000,
    note: "The Cumberland basin holds air still, and the spring tree peak here is both early and heavy." },
  { name: "Virginia Beach", state: "Virginia", abbr: "VA", lat: 36.8529, lon: -75.9780, pop: 1800000,
    note: "Coastal, so the sea breeze cuts afternoon counts, but the pine and oak inland still carry the spring." },
  { name: "Providence", state: "Rhode Island", abbr: "RI", lat: 41.8240, lon: -71.4128, pop: 1700000,
    note: "A compressed New England spring, with birch and oak overlapping through May." },
  { name: "Jacksonville", state: "Florida", abbr: "FL", lat: 30.3322, lon: -81.6557, pop: 1600000,
    note: "North Florida gets a real oak and pine spring that the south of the state does not, on top of a long grass season." },
  { name: "Milwaukee", state: "Wisconsin", abbr: "WI", lat: 43.0389, lon: -87.9065, pop: 1600000,
    note: "Lake Michigan holds the spring back, then ragweed arrives from the farmland west of the city in August." },
  { name: "Oklahoma City", state: "Oklahoma", abbr: "OK", lat: 35.4676, lon: -97.5164, pop: 1400000,
    note: "Wind is the defining factor. Open country and few barriers mean grass and weed pollen travel into the city from a long way out." },
  { name: "Raleigh", state: "North Carolina", abbr: "NC", lat: 35.7796, lon: -78.6382, pop: 1400000,
    note: "Pine pollen coats the city in spring, but it is the oak season running underneath it that most people react to." },
  { name: "Memphis", state: "Tennessee", abbr: "TN", lat: 35.1495, lon: -90.0490, pop: 1300000,
    note: "The Mississippi delta is humid and still, which keeps both pollen and mold in the air longer than the wind would elsewhere." },
  { name: "Richmond", state: "Virginia", abbr: "VA", lat: 37.5407, lon: -77.4360, pop: 1300000,
    note: "Where the Southeast pattern starts giving way to the Northeast one, so the spring arrives earlier here than in Washington an hour north." },
  { name: "Louisville", state: "Kentucky", abbr: "KY", lat: 38.2527, lon: -85.7585, pop: 1300000,
    note: "The Ohio valley again, and consistently one of the harder cities in the country for seasonal allergies on both ends of the year." },
  { name: "New Orleans", state: "Louisiana", abbr: "LA", lat: 29.9511, lon: -90.0715, pop: 1300000,
    note: "Subtropical and wet. Oak in early spring, grass for most of the rest, and mold as a constant companion to both." },
  { name: "Salt Lake City", state: "Utah", abbr: "UT", lat: 40.7608, lon: -111.8910, pop: 1300000,
    note: "The valley traps air against the Wasatch, the same inversion that traps winter smog, and pollen sits in it the same way." },
  { name: "Hartford", state: "Connecticut", abbr: "CT", lat: 41.7658, lon: -72.6734, pop: 1200000,
    note: "The Connecticut River valley runs a slightly earlier and heavier spring than the Massachusetts hills either side of it." },
  { name: "Buffalo", state: "New York", abbr: "NY", lat: 42.8864, lon: -78.8784, pop: 1100000,
    note: "One of the latest springs in the lower 48. The lake keeps tree pollen back until well into May." },
  { name: "Birmingham", state: "Alabama", abbr: "AL", lat: 33.5186, lon: -86.8104, pop: 1100000,
    note: "Ringed by wooded ridges, with an oak and pine spring that starts in February and a ragweed autumn on the other end." },
];

export default function () {
  const cities = CITIES.map((c) => ({
    ...c,
    slug: slugify(c.name),
    zone: resolveUsZone(c.lat, c.lon),
  }));

  const nearestOf = (city) =>
    cities
      .filter((o) => o.slug !== city.slug)
      .map((o) => ({ slug: o.slug, name: o.name, abbr: o.abbr, d: distanceKm(city, o) }))
      .sort((a, b) => a.d - b.d)
      .slice(0, 4)
      .map(({ slug, name, abbr }) => ({ slug, name, abbr }));

  return cities
    .map((c) => ({ ...c, nearby: nearestOf(c) }))
    .sort((a, b) => b.pop - a.pop);
}
