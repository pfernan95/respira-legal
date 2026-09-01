/**
 * Editorial allergen info for the English pages under /en/.
 *
 * The eleven species the Google Pollen API publishes for the United States,
 * which is the same closed set the app offers there (COUNTRY_SPECIES.US in
 * constants/climateZones.ts). Not a translation of the Spanish six: the two
 * countries have different problem species, and half of these have no Spanish
 * page to translate from.
 *
 * Same editorial rules as the Spanish set: symptoms described in neutral,
 * informative terms, no medical claims, no figures that are not sourced. The
 * seasons are stated as months rather than numbers because they vary by
 * latitude across a country four time zones wide — a single "peak value" for
 * ragweed would be wrong in Texas and wrong again in Minnesota.
 */
export default {
  ragweed: {
    slug: "ragweed",
    h1: "Ragweed allergy",
    lead: "Ragweed is the defining allergen of the American fall. A single plant can release a billion grains of pollen in a season, and that pollen travels — it has been found hundreds of miles out to sea. For much of the eastern and midwestern United States it is the reason late summer is harder than spring.",
    metaDescription: "Ragweed season runs August to the first frost, peaking in September, when a single plant can release a billion grains of pollen. Track it with Respira.",
    symptoms:
      "Commonly associated with sneezing, nasal congestion, a runny nose, and itchy or watering eyes. Symptoms tend to track the pollen curve, building through August and easing after the first hard frost.",
    where:
      "Heaviest across the Midwest and the East Coast, and along river valleys. It is present in almost every state, but the Southwest and the Pacific Coast generally see far less of it.",
    season: "August to the first frost, peaking in September.",
  },
  oak: {
    slug: "oak",
    h1: "Oak pollen allergy",
    lead: "Oak is one of the most widespread tree allergens in the United States. It is not the most potent grain by weight, but there is so much of it, over so much of the country, that it dominates spring counts from Georgia to New Jersey — and it is what leaves cars yellow in April.",
    metaDescription: "Oak pollen season runs March to May, earlier in the South. Not the most potent grain by weight, but there's far more of it. Respira tracks it daily.",
    symptoms:
      "Associated with spring rhinitis and conjunctivitis. Because oak season overlaps with several other trees, it can be hard to tell apart from birch or maple without testing.",
    where:
      "Across the eastern half of the country and much of the West Coast. Especially heavy in the Southeast, the mid-Atlantic and parts of Texas.",
    season: "March to May, earlier in the South.",
  },
  birch: {
    slug: "birch",
    h1: "Birch pollen allergy",
    lead: "Birch is a potent early-spring tree allergen and one of the best-studied, because its major protein is the reference point for a whole family of cross-reactions. In the United States it matters most in the northern tier and at altitude.",
    metaDescription: "Birch pollen season runs March to May, later the further north you go. Its major allergen anchors a whole family of cross-reactions. Track it with Respira.",
    symptoms:
      "Associated with rhinitis and conjunctivitis in early spring. Birch is the classic trigger for oral allergy syndrome — an itching or tingling in the mouth after eating certain raw fruits, particularly apples, cherries and stone fruit.",
    where:
      "The Northeast, the Upper Midwest, the northern Rockies and the Pacific Northwest.",
    season: "March to May, later the further north you go.",
  },
  maple: {
    slug: "maple",
    h1: "Maple pollen allergy",
    lead: "Maples flower very early — often before their leaves are out, and before most people think of pollen season as having started. Box elder, a maple despite the name, is the one that produces the most allergenic pollen of the group.",
    metaDescription: "Maple pollen season runs February to May, often before the leaves are even out. Track daily levels, symptoms and season length with Respira.",
    symptoms:
      "Associated with rhinitis and conjunctivitis. Because maple season opens the year in many regions, symptoms can arrive weeks before people expect them.",
    where:
      "Throughout the eastern and central United States, and widely planted as a street tree well outside its native range.",
    season: "February to May, depending on species and latitude.",
  },
  juniper: {
    slug: "juniper",
    h1: "Juniper and cedar pollen allergy",
    lead: "Mountain cedar — a juniper, despite the name — is the reason central Texas has a pollen season in December and January, when most of the country has none. Local counts during a cedar event are among the highest recorded for any pollen anywhere in the United States.",
    metaDescription: "Mountain cedar (a juniper) pollinates December to February in central Texas; other junipers run into spring elsewhere. Track your local season with Respira.",
    symptoms:
      "Associated with intense rhinitis and conjunctivitis during release events, which can be short and severe rather than a long gentle season.",
    where:
      "Central Texas above all, plus the Southwest, the Great Basin and the Rocky Mountain states. Junipers are also very widely planted as landscaping across the West.",
    season: "December to February for mountain cedar; spring elsewhere.",
  },
  elm: {
    slug: "elm",
    h1: "Elm pollen allergy",
    lead: "Elms pollinate at both ends of the year: American elm in late winter, and several introduced species again in the fall. That second season catches people who associate tree pollen with spring.",
    metaDescription: "Elm pollen season runs February to April, with a second release in fall from some species — the one that catches people off guard. Track it daily with Respira.",
    symptoms:
      "Associated with rhinitis and conjunctivitis. The autumn-flowering species can overlap with ragweed, making the two hard to separate by timing alone.",
    where:
      "Across the eastern and central United States, and widely planted in cities.",
    season: "February to April, with a second autumn release from some species.",
  },
  ash: {
    slug: "ash",
    h1: "Ash pollen allergy",
    lead: "Ash flowers in early spring, usually alongside oak and maple. Its pollen is closely related to that of olive and privet, which is why people sensitised to one often react to the others.",
    metaDescription: "Ash pollen season runs March to May, usually alongside oak and maple. Its pollen cross-reacts with olive and privet. Track daily levels with Respira.",
    symptoms:
      "Associated with spring rhinitis and conjunctivitis. Cross-reactivity within the olive family means a reaction to ash can hint at a reaction to olive in regions where both occur.",
    where:
      "Across most of the country, though the emerald ash borer has removed a great many mature ash trees from the Midwest and Northeast.",
    season: "March to May.",
  },
  poplar: {
    slug: "cottonwood",
    h1: "Cottonwood and poplar pollen allergy",
    lead: "Cottonwood is famous for the wrong thing. The white fluff that fills the air in early summer is seed, not pollen, and it is too large to be inhaled deeply — the actual pollen was released weeks earlier and is invisible. People often blame the fluff they can see for symptoms caused by something they cannot.",
    metaDescription: "Cottonwood pollen runs March to May; the white fluff people blame for allergies in June is seed, not pollen. Track the real season with Respira.",
    symptoms:
      "The pollen is associated with rhinitis and conjunctivitis in spring. The summer fluff can be a mechanical irritant, which is a different thing from an allergic response.",
    where:
      "Along rivers and irrigation across the West and Great Plains, and widely planted for shade and windbreaks.",
    season: "March to May for the pollen; the seed fluff comes in June.",
  },
  pine: {
    slug: "pine",
    h1: "Pine pollen allergy",
    lead: "Pine produces enormous quantities of pollen — enough to turn cars, decks and puddles yellow across the Southeast every spring — but it is a comparatively weak allergen. The grains are large and heavy, and most of them fall out of the air near the tree rather than being inhaled.",
    metaDescription: "Pine pollen season runs March to June, turning cars and decks yellow across the Southeast — though it's a comparatively weak allergen. Track it with Respira.",
    symptoms:
      "Less commonly associated with allergic symptoms than its sheer volume suggests. Where it does cause them, they are the usual rhinitis and conjunctivitis. The visible yellow layer often coincides with other species that are the real trigger.",
    where:
      "Throughout the Southeast, the Pacific Northwest, the Rockies and the Northeast.",
    season: "March to June, depending on species and elevation.",
  },
  grass: {
    slug: "grass",
    h1: "Grass pollen allergy",
    lead: "Grass is the most common cause of seasonal allergy worldwide, and the United States is no exception. It covers hundreds of species — lawn grasses, pasture, cereals and roadside weeds — whose pollen is released from late spring into summer, and in the warm South for much of the year.",
    metaDescription: "Grass pollen season runs May to July in most of the US, nearly year-round in the Deep South. It's the most common cause of seasonal allergy worldwide.",
    symptoms:
      "Associated with rhinitis, conjunctivitis and, in some people, respiratory symptoms. Intensity generally follows the concentration of pollen in the air.",
    where:
      "Everywhere. The season is longest in the South and shortest in the far North.",
    season: "May to July in most of the country; nearly year-round in the Deep South.",
  },
  alder: {
    slug: "alder",
    h1: "Alder pollen allergy",
    lead: "Alder is among the first pollens of the year, opening the season in the depths of winter before most trees have stirred. It belongs to the same family as birch, and the two cross-react.",
    metaDescription: "Alder pollen season runs January to April, earliest on the Pacific Coast — one of the first pollens of the year. Track daily levels with Respira.",
    symptoms:
      "Associated with late-winter rhinitis and conjunctivitis. Because it is so early, it can catch people out before they think of it as pollen season at all.",
    where:
      "The Pacific Northwest above all, where it is a major allergen, plus the Northeast and around water in the northern states.",
    season: "January to April, earliest on the Pacific Coast.",
  },
};
