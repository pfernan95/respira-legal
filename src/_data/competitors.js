/**
 * Competitor comparison data for the English /en/respira-vs-* pages and the
 * /en/best-pollen-apps roundup.
 *
 * EDITORIAL RULE, and the reason these pages are worth publishing at all:
 * every row is sourced from the competitor's own App Store listing, fetched
 * 2026-09-03. Where their material does not state something, the value is
 * "unstated" and the page renders "Not stated" — NOT a cross. Absence of a
 * claim in a marketing description is not evidence the feature is missing,
 * and a comparison table that quietly converts silence into a competitor
 * weakness is the exact thing that makes these pages worthless as a source.
 *
 * Three values only:
 *   yes      — the competitor states it, or we verified it
 *   no       — the competitor explicitly states the limitation, or we know
 *              first-hand it is absent (used for Respira's own gaps too)
 *   unstated — their material does not say; we are not guessing
 *
 * Respira loses rows here on purpose. It has no symptom-severity prediction
 * model, it has no US review base yet, and its air-quality depth is not close
 * to IQAir's. Saying so is what makes the rows Respira does win believable.
 *
 * Ratings are a snapshot, not a live feed. They are labelled with the date
 * they were taken so a reader can tell how stale they are.
 */

const SNAPSHOT_DATE = "2026-09-03";

/** Respira's own column, so the table has a single source of shape. */
const respira = {
  name: "Respira",
  developer: "Pablo Fernández Jiménez",
  appStoreId: "6759206565",
  price: "Free, with an optional Pro subscription",
  rating: "4.9 from 14 ratings (Spanish App Store); not yet rated in the US",
  features: {
    countries: { value: "yes", note: "Eight: the United States, Spain, Portugal, France, Italy, Germany, Ireland and the United Kingdom" },
    usSpecies: { value: "yes", note: "Eleven species, from the Google Pollen API" },
    airQuality: { value: "yes", note: "AQI plus PM2.5, PM10 and ozone, on the EPA scale in the US and the European index elsewhere" },
    symptomDiary: { value: "yes", note: "Symptoms, severity, medication and notes, with a monthly calendar" },
    severityPrediction: { value: "no", note: "Respira reports measured and forecast pollen. It does not predict how you personally will feel" },
    widgets: { value: "yes", note: "Home Screen and Lock Screen" },
    doctorReport: { value: "yes", note: "PDF export of the diary (Pro)" },
    travel: { value: "yes", note: "Destination forecast and pre-trip alerts (Pro)" },
    multipleLocations: { value: "yes", note: "Saved locations, synced across devices" },
    usTraction: { value: "no", note: "Launched in the US in August 2026. No US ratings yet" },
  },
};

/**
 * One entry per comparison page. `slug` drives the permalink
 * (/en/respira-vs-<slug>).
 */
const list = [
  {
    slug: "pollen-com",
    name: "Allergy Plus by Pollen.com",
    shortName: "Allergy Plus",
    developer: "IQVIA Inc.",
    appStoreId: "1556701665",
    price: "Free",
    rating: `4.8 from about 22,900 ratings (US App Store, ${SNAPSHOT_DATE})`,
    positioning:
      "The app of Pollen.com, a US allergy-forecasting site that has been running for around two decades. It is the most established name in this list for pollen specifically, and its US forecast history is longer than anyone else's here.",
    honestVerdict:
      "If you are in the continental US, never travel outside it, and want a pollen forecast from the longest-running US source with a large, settled user base, Allergy Plus is the safer pick. Respira is the better fit if you want a symptom diary you can hand to an allergist, widgets, or coverage that follows you abroad.",
    features: {
      countries: { value: "no", note: "Its listing states it is \"currently for use in the continental US only\"" },
      usSpecies: { value: "unstated", note: "Describes \"in-depth information on impactful allergens in your area\" without naming a species count" },
      airQuality: { value: "yes", note: "Air quality forecasts alongside allergy and weather" },
      symptomDiary: { value: "unstated", note: "Not mentioned in its listing" },
      severityPrediction: { value: "unstated", note: "Not mentioned in its listing" },
      widgets: { value: "unstated", note: "Not mentioned in its listing" },
      doctorReport: { value: "unstated", note: "Not mentioned in its listing" },
      travel: { value: "no", note: "Follows from the continental-US-only limitation it states" },
      multipleLocations: { value: "yes", note: "Forecasts and notifications across multiple locations" },
      usTraction: { value: "yes", note: "About 22,900 US ratings" },
    },
  },
  {
    slug: "zyrtec-allergycast",
    name: "ZYRTEC AllergyCast",
    shortName: "AllergyCast",
    developer: "McNeil-PPC, Inc",
    appStoreId: "320298020",
    price: "Free",
    rating: `4.2 from about 550 ratings (US App Store, ${SNAPSHOT_DATE})`,
    positioning:
      "A pharmaceutical brand's allergy app. Its distinguishing feature is a personalised symptom-severity prediction: you log how you feel, and it forecasts how bad your day is likely to be, getting more specific to you over time.",
    honestVerdict:
      "AllergyCast does something Respira does not: it predicts how you personally are likely to feel, not just what the pollen level is. If that prediction is the feature you want, it is the one to use. Respira is the better fit if you want the underlying measurements across more species and countries, a diary you can export for a clinician, and widgets.",
    features: {
      countries: { value: "unstated", note: "Its listing does not state which countries it covers" },
      usSpecies: { value: "unstated", note: "Describes \"top allergens in your area\" without naming a species count" },
      airQuality: { value: "yes", note: "Air quality is one of the inputs to its impact score, with an air-quality map" },
      symptomDiary: { value: "yes", note: "Symptom logging, behind a sign-in, feeding its predictions" },
      severityPrediction: { value: "yes", note: "A personalised daily symptom-severity prediction, its headline feature" },
      widgets: { value: "unstated", note: "Not mentioned in its listing" },
      doctorReport: { value: "unstated", note: "Not mentioned in its listing" },
      travel: { value: "unstated", note: "Not mentioned in its listing" },
      multipleLocations: { value: "unstated", note: "Its listing describes forecasts \"based on your current location\"" },
      usTraction: { value: "yes", note: "About 550 US ratings, and the reach of a national pharmacy brand behind it" },
    },
  },
  {
    slug: "iqair-airvisual",
    name: "IQAir AirVisual",
    shortName: "AirVisual",
    developer: "IQAir AG",
    appStoreId: "1048912974",
    price: "Free",
    rating: `4.8 from about 44,700 ratings (US App Store, ${SNAPSHOT_DATE})`,
    positioning:
      "An air-quality app first, from a company whose core business is air-quality monitoring hardware and data. It covers over 500,000 locations across more than 100 countries, with historical data, 7-day forecasts and 3D pollution maps.",
    honestVerdict:
      "For air quality specifically, AirVisual is deeper than Respira by a wide margin and it is not close. Its coverage, history and mapping are its whole product. Respira is a pollen app that also shows air quality; if pollen species, an allergy diary and allergen-specific alerts are what you are after, they are not what AirVisual is built for.",
    features: {
      countries: { value: "yes", note: "Over 100 countries and 500,000+ locations for air quality" },
      usSpecies: { value: "unstated", note: "Pollen is not the focus of its listing; no species count given" },
      airQuality: { value: "yes", note: "Its core product: real-time, historical and 7-day forecast, 2D and 3D maps" },
      symptomDiary: { value: "unstated", note: "Not mentioned in its listing" },
      severityPrediction: { value: "unstated", note: "Not mentioned in its listing" },
      widgets: { value: "unstated", note: "Not mentioned in its listing" },
      doctorReport: { value: "unstated", note: "Not mentioned in its listing" },
      travel: { value: "unstated", note: "Global coverage would support it; its listing does not describe a trip feature" },
      multipleLocations: { value: "yes", note: "Favourite locations with historical views" },
      usTraction: { value: "yes", note: "About 44,700 US ratings" },
    },
  },
];

/** Row order and labels for the comparison table. */
const featureRows = [
  { key: "countries", label: "Countries covered" },
  { key: "usSpecies", label: "US pollen species named" },
  { key: "airQuality", label: "Air quality" },
  { key: "symptomDiary", label: "Symptom diary" },
  { key: "severityPrediction", label: "Personal symptom prediction" },
  { key: "widgets", label: "Home and Lock Screen widgets" },
  { key: "doctorReport", label: "Exportable report for a clinician" },
  { key: "travel", label: "Destination / travel forecast" },
  { key: "multipleLocations", label: "Multiple saved locations" },
  { key: "usTraction", label: "Established US user base" },
];

export default { respira, list, featureRows, snapshotDate: SNAPSHOT_DATE };
