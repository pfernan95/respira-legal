/**
 * The pollen and hay fever apps an Australian can actually use, for
 * /en/best-pollen-apps-australia.
 *
 * Same editorial rule as competitors.js: every fact comes from the app's own
 * Australian App Store listing (itunes.apple.com/lookup?country=au, and the
 * apps.apple.com/au page for in-app purchases) or from the operator's own
 * website, checked on SNAPSHOT_DATE, with the URL kept next to it. Where a
 * listing does not say something, the page does not say it either.
 *
 * Left out on purpose:
 * - AccuWeather, The Weather Channel, WillyWeather, BOM Weather and Apple
 *   Weather: no Australian pollen could be verified in them. weather.com's
 *   own allergy page says "Pollen observations aren't available outside of
 *   the U.S."
 * - Weatherzone: its website has a pollen index, but its listing does not
 *   mention pollen, and the app could not be checked.
 * - US- and Europe-only pollen apps, by their own descriptions.
 *
 * Ratings are a snapshot in the Australian store, labelled with the date.
 */

const SNAPSHOT_DATE = "2026-10-20";

const AIRHEALTH_NOTE =
  "AirHealth Pty Ltd, founded in 2022 as a spin-out of the University of Melbourne and the University of Tasmania";

const list = [
  {
    name: "Melbourne Pollen Count",
    id: "707461899",
    seller: "AirHealth Pty Ltd",
    where: "Victoria",
    best: "Melbourne and the rest of Victoria",
    body:
      "Pollen forecasts for Victorians built from real-world counts across the state's monitoring network, symptom tracking, an alert when grass pollen is high, and alerts for Victoria's epidemic thunderstorm asthma forecast. The state's automated pollen counters sit in Parkville (Melbourne), Geelong, Hamilton, Ballarat, Bendigo, Wodonga and Churchill, and the Victorian Department of Health points people to this app for their readings. Grass pollen is counted from 1 October to 31 December.",
    price: "Free, with an optional subscription (A$4.99 a month or A$29.99 a year)",
    rating: "4.7 from 10,424 ratings",
    sources: [
      ["App Store listing", "https://apps.apple.com/au/app/melbourne-pollen-count/id707461899"],
      ["Victorian Department of Health", "https://www.health.vic.gov.au/environmental-health/epidemic-thunderstorm-asthma-risk-forecast"],
      ["Melbourne Pollen: counting season", "https://www.melbournepollen.com.au/faqs/why-grass-pollen-only-counted-between-1-october-and-31-december/"],
    ],
  },
  {
    name: "Canberra Pollen Count",
    id: "914338280",
    seller: "AirHealth Pty Ltd",
    where: "ACT",
    best: "Canberra",
    body:
      "Forecasts from grass to trees, alerts on high pollen days and a hay fever symptom tracker. The data comes from the Australian National University's sampler, which its website says is the only pollen station operating in Canberra; the count and a grass forecast run from spring into January.",
    price: "Free, with an optional subscription (A$4.99 a month or A$29.99 a year)",
    rating: "4.6 from 955 ratings",
    sources: [
      ["App Store listing", "https://apps.apple.com/au/app/canberra-pollen-count/id914338280"],
      ["Canberra Pollen: stations", "https://www.canberrapollen.com.au/faqs/how-many-pollen-counting-stations-are-there-act/"],
    ],
  },
  {
    name: "Sydney Pollen Count & Forecast",
    id: "1036166930",
    seller: "AirHealth Pty Ltd",
    where: "New South Wales",
    best: "Sydney",
    body:
      "Forecasts for grass, trees, mould and more, air quality from EPA monitoring sites, and alerts for high pollen and poor air. The pollen trap is on the roof of Campbelltown Hospital, with data from Western Sydney University; the daily count runs from September to December.",
    price: "Free, with an optional subscription (A$4.99 a month or A$29.99 a year)",
    rating: "4.6 from 366 ratings",
    sources: [
      ["App Store listing", "https://apps.apple.com/au/app/sydney-pollen-count-forecast/id1036166930"],
      ["Sydney Pollen: about", "https://www.sydneypollen.com.au/who-are-we/about-us/"],
    ],
  },
  {
    name: "Perth Pollen Count",
    id: "1640644173",
    seller: "AirHealth Pty Ltd",
    where: "Western Australia",
    best: "Perth",
    body:
      "Forecasts from an automated pollen counting station at Curtin University, with Edith Cowan University collaborating, plus live air quality, a symptom tracker and grass pollen alerts. Before 2022, pollen had last been monitored in Perth in 1995.",
    price: "Free, with an optional subscription (A$4.99 a month or A$29.99 a year)",
    rating: "4.5 from 131 ratings",
    sources: [
      ["App Store listing", "https://apps.apple.com/au/app/perth-pollen-count/id1640644173"],
      ["Perth Pollen: about", "https://www.perthpollen.com.au/who-are-we/about-us/"],
    ],
  },
  {
    name: "AirRater",
    id: "1050535426",
    seller: "AirHealth Pty Ltd",
    where: "Australia-wide (air quality); pollen where it has monitors",
    best: "Tasmania, and bushfire smoke anywhere",
    body:
      "Real-time and forecast air quality and pollen across Australia, including bushfire smoke, with symptom tracking to find your own triggers. Its pollen comes from monitors in Tasmania (Sandy Bay and Launceston), the ACT and Campbelltown in New South Wales; PM2.5 comes from state and territory networks, with CSIRO modelling where a station is more than 20 km away.",
    price: "Free, with an optional subscription (A$4.99 a month or A$29.99 a year)",
    rating: "4.4 from 780 ratings",
    sources: [
      ["App Store listing", "https://apps.apple.com/au/app/airrater/id1050535426"],
      ["AirRater: pollen", "https://airrater.org/index.html%3Fp=11.html"],
      ["AirRater: data sources", "https://airrater.org/index.html%3Fp=108.html"],
    ],
  },
  {
    name: "Thunderstorm Asthma",
    id: "6737190871",
    seller: "Bryce Cameron (independent developer)",
    where: "Victoria",
    best: "The thunderstorm asthma forecast on its own",
    body:
      "Victoria's official epidemic thunderstorm asthma risk from VicEmergency, for today and the next two days, by forecast district, with a map and widgets. It shows no pollen counts, and the forecast runs from 1 October to 31 December. iPhone only.",
    price: "Free",
    rating: "No ratings yet",
    sources: [["App Store listing", "https://apps.apple.com/au/app/thunderstorm-asthma/id6737190871"]],
  },
  {
    name: "IQAir AirVisual",
    id: "1048912974",
    seller: "IQAir AG",
    where: "Worldwide",
    best: "Air quality",
    body:
      "Global air quality first, with tree, weed and grass pollen counts and a 3-day forecast as a secondary feature. On IQAir's website, Melbourne's pollen levels are credited to wetter.com, a forecast model rather than local traps.",
    price: "Free",
    rating: "4.8 from 5,819 ratings",
    sources: [
      ["App Store listing", "https://apps.apple.com/au/app/iqair-airvisual-air-quality/id1048912974"],
      ["IQAir: Melbourne", "https://www.iqair.com/australia/victoria/melbourne"],
    ],
  },
  {
    name: "Airmine Pollen",
    id: "6444030048",
    seller: "Airmine AS",
    where: "Australia, excluding Tasmania",
    best: "A long forecast",
    body:
      "15-day pollen risk forecasts and risk maps, with air quality and mould, from Airmine's own models (satellite observations, weather forecasts and machine learning). Its Melbourne page lists acacia, cypress, eucalyptus and grass.",
    price: "Free, with an optional subscription (A$9.99 a month or A$29.99 a year)",
    rating: "3.0 from 4 ratings",
    sources: [
      ["App Store listing", "https://apps.apple.com/au/app/airmine-pollen/id6444030048"],
      ["Airmine: Melbourne", "https://airmine.ai/pollen/australia/melbourne/"],
    ],
  },
];

const respira = {
  name: "Respira",
  price: "Free with ads, with an optional Pro subscription (A$4.99 a month, A$29.99 a year, or A$39.99 once)",
  rating: "No ratings in Australia yet",
};

export default { snapshotDate: SNAPSHOT_DATE, airhealthNote: AIRHEALTH_NOTE, list, respira };
