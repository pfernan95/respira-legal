/**
 * Pollen-food cross-reactivity, for /alergia-cruzada-polen-alimentos and
 * /en/pollen-food-allergy.
 *
 * Written from sources, NOT ported from the app. respira-app's
 * constants/crossReactivity.ts was fact-checked on 18 Oct 2026 against the
 * EAACI Molecular Allergology User's Guide 2.0 and the studies cited below,
 * and it was wrong in ways that matter: it named profilin for cypress (the
 * cause is Cup s 7, a gibberellin-regulated protein) and Pla a 1 for plane
 * tree (it is the LTP Pla a 3), and it told cypress, plane and mugwort
 * allergics that cooking or peeling lowers the risk, which is false for
 * those proteins. Nothing here should be copied back without the same check.
 *
 * Rules this file keeps:
 *  - Every food is in a source listed for its pollen. "w" (well documented)
 *    means the EAACI guide or several sources name it; "r" (reported) means
 *    at least one reliable source does. Neither is a frequency: no source
 *    gives per-food frequencies, so the page never implies one.
 *  - `stable` marks pollens whose food link is a heat- and digestion-stable
 *    protein (LTP, GRP) or an unidentified one that survives cooking (celery
 *    and mugwort). For those the page says cooking does not make the food
 *    safe, and that reactions can be severe.
 *  - Every figure carries the study it comes from. No figure without one.
 *  - It is not a diagnosis, and every page says so before the tool.
 */

const S = {
  maug: { title: "EAACI Molecular Allergology User's Guide 2.0 (Dramburg et al.)", publisher: "EAACI, Pediatric Allergy and Immunology", year: 2023, url: "https://pubmed.ncbi.nlm.nih.gov/37186333/" },
  asero2008: { title: "Profilin sensitization detected in the office by skin prick test (Asero et al.)", publisher: "Clinical & Experimental Allergy", year: 2008, url: "https://pubmed.ncbi.nlm.nih.gov/18489029/" },
  florido2002: { title: "An allergen from Olea europaea pollen (Ole e 7) is associated with plant-derived food anaphylaxis (Florido López et al.)", publisher: "Allergy", year: 2002, url: "https://pubmed.ncbi.nlm.nih.gov/12173271/" },
  skypala2021: { title: "Non-specific lipid-transfer proteins: allergen structure and function, cross-reactivity, sensitization, and epidemiology (Skypala et al.)", publisher: "Clinical and Translational Allergy", year: 2021, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8129635/" },
  popescu2015: { title: "Cross-reactivity between aeroallergens and food allergens (Popescu)", publisher: "World Journal of Methodology", year: 2015, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4482820/" },
  acaai: { title: "Pollen Food Allergy Syndrome", publisher: "American College of Allergy, Asthma & Immunology", year: 2019, url: "https://acaai.org/allergies/allergic-conditions/food/oral-allergy-syndrome/" },
  aaaai: { title: "Oral Allergy Syndrome (OAS) or Pollen Food Syndrome", publisher: "American Academy of Allergy, Asthma & Immunology", year: 2026, url: "https://www.aaaai.org/tools-for-the-public/conditions-library/allergies/oral-allergy-syndrome-(oas)" },
  ballmer2002: { title: "Influence of food processing on the allergenicity of celery: DBPCFC with celery spice and cooked celery (Ballmer-Weber et al.)", publisher: "Allergy", year: 2002, url: "https://pubmed.ncbi.nlm.nih.gov/11906337/" },
  gao2019: { title: "Mugwort pollen-related food allergy: lipid transfer protein sensitization and correlation with the severity of allergic reactions (Gao et al.)", publisher: "Allergy, Asthma & Immunology Research", year: 2019, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6267181/" },
  enberg1987: { title: "Watermelon and ragweed share allergens (Enberg et al.)", publisher: "Journal of Allergy and Clinical Immunology", year: 1987, url: "https://pubmed.ncbi.nlm.nih.gov/3584742/" },
  anderson1970: { title: "Melon and banana sensitivity coincident with ragweed pollinosis (Anderson et al.)", publisher: "Journal of Allergy", year: 1970, url: "https://pubmed.ncbi.nlm.nih.gov/5266576/" },
  osawa2020: { title: "Epidemiological study of oral allergy syndrome in birch pollen dispersal-free regions (Osawa et al.)", publisher: "Allergology International", year: 2020, url: "https://pubmed.ncbi.nlm.nih.gov/31708436/" },
  allergyuk: { title: "Oral Allergy Syndrome (Pollen Food Syndrome) factsheet", publisher: "Allergy UK", year: 2021, url: "https://www.allergyuk.org/resources/oral-allergy-syndrome-pollen-food-syndrome-factsheet/" },
  klingebiel2019: { title: "Pru p 7 sensitization is a predominant cause of severe, cypress pollen-associated peach allergy (Klingebiel et al.)", publisher: "Clinical & Experimental Allergy", year: 2019, url: "https://pubmed.ncbi.nlm.nih.gov/30672059/" },
  iizuka2022: { title: "Gibberellin-regulated proteins: emergent allergens (Iizuka et al.)", publisher: "Frontiers in Allergy", year: 2022, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9500206/" },
  enrique2002: { title: "Platanus acerifolia pollinosis and food allergy (Enrique et al.)", publisher: "Allergy", year: 2002, url: "https://pubmed.ncbi.nlm.nih.gov/11906368/" },
  enrique2004: { title: "IgE reactivity to profilin in Platanus acerifolia pollen-sensitized subjects with plant-derived food allergy (Enrique et al.)", publisher: "Journal of Investigational Allergology and Clinical Immunology", year: 2004, url: "https://pubmed.ncbi.nlm.nih.gov/15736720/" },
  bsaci2022: { title: "BSACI guideline for the diagnosis and management of pollen food syndrome in the UK (Skypala et al.)", publisher: "Clinical & Experimental Allergy", year: 2022, url: "https://pubmed.ncbi.nlm.nih.gov/35975576/" },
  fbbva: { title: "La alergia a frutas y verduras (Navarro Gracia, Cisteró-Bahima), en El libro de las enfermedades alérgicas, 2.ª ed.", publisher: "Fundación BBVA, actualizado con la SEAIC", year: 2021, url: "https://fbbva.es/microsite/alergiasfbbva/alergia.pdf" },
};

// [es, en] for every food named below.
const F = {
  tomato: ["Tomate", "Tomato"], melon: ["Melón", "Melon"], watermelon: ["Sandía", "Watermelon"],
  citrus: ["Cítricos (naranja y otros)", "Citrus (orange and others)"], peach: ["Melocotón", "Peach"], kiwi: ["Kiwi", "Kiwi"],
  banana: ["Plátano (fruta)", "Banana"], pineapple: ["Piña", "Pineapple"], courgette: ["Calabacín", "Courgette (zucchini)"],
  cucumber: ["Pepino", "Cucumber"], celery: ["Apio", "Celery"], pear: ["Pera", "Pear"], walnut: ["Nuez", "Walnut"],
  peanut: ["Cacahuete", "Peanut"], apple: ["Manzana", "Apple"], hazelnut: ["Avellana", "Hazelnut"], carrot: ["Zanahoria", "Carrot"],
  cherry: ["Cereza", "Cherry"], soy: ["Soja (sobre todo bebida y proteína en polvo)", "Soy (especially soy drinks and protein powder)"],
  almond: ["Almendra", "Almond"], plum: ["Ciruela", "Plum"], apricot: ["Albaricoque", "Apricot"], strawberry: ["Fresa", "Strawberry"],
  mustard: ["Mostaza", "Mustard"], fennel: ["Hinojo", "Fennel"], parsley: ["Perejil", "Parsley"], aniseed: ["Anís", "Aniseed"],
  cumin: ["Comino y cilantro", "Cumin and coriander"], chamomile: ["Manzanilla (infusión)", "Chamomile (tea)"],
  sunflower: ["Pipas de girasol", "Sunflower seeds"], pepper: ["Pimiento", "Bell pepper"], pomegranate: ["Granada", "Pomegranate"],
  maize: ["Maíz", "Maize (corn)"], chickpea: ["Garbanzo", "Chickpea"], lettuce: ["Lechuga", "Lettuce"],
};

const POLLENS = [
  {
    id: "birch", es: "Abedul", en: "Birch", page: { es: "/alergia-abedul", en: "/en/allergy-birch" }, stable: false,
    foods: { w: ["apple", "hazelnut", "carrot", "celery", "cherry", "pear", "peach", "soy"], r: ["almond", "kiwi", "plum", "apricot", "strawberry", "peanut", "walnut"] },
    cause: {
      es: "La proteína Bet v 1 del abedul (de la familia PR-10) se parece a las de muchas frutas, frutos secos y verduras. En menos casos, la profilina (Bet v 2).",
      en: "Birch's Bet v 1 protein (a PR-10) closely resembles proteins in many fruits, nuts and vegetables. Less often, profilin (Bet v 2) is involved.",
    },
    cooking: {
      es: "La PR-10 suele romperse al cocinar: la compota de manzana se suele tolerar. Hay excepciones: la avellana tostada y el apio cocinado pueden dar síntomas, y la bebida de soja o la proteína de soja en polvo pueden dar reacciones graves. Cualquier reacción a frutos secos o a la soja debe valorarla un alergólogo.",
      en: "PR-10 is usually broken down by cooking, so cooked fruit such as apple compote is usually tolerated. There are exceptions: roasted hazelnuts and cooked celery can still cause symptoms, and soy drinks or soy protein powder can cause severe reactions. Any reaction to nuts or soy should be checked by an allergist.",
    },
    fact: {
      es: "Alrededor del 70 % de las personas alérgicas al polen de abedul reaccionan también a algún alimento vegetal, según la guía de la EAACI. La academia estadounidense AAAAI da entre el 50 % y el 75 % de los adultos.",
      en: "Around 70% of people with birch pollen allergy also react to some plant foods, according to the EAACI guide. The American academy AAAAI puts it at 50-75% of adults.",
    },
    sources: ["maug", "aaaai", "acaai"],
  },
  {
    id: "alder", es: "Aliso", en: "Alder", page: { es: "/alergia-aliso", en: "/en/allergy-alder" }, stable: false,
    foods: { w: ["apple"], r: ["cherry", "pear", "peach", "hazelnut", "almond", "carrot", "celery"] },
    cause: {
      es: "La proteína Aln g 1 del aliso es de la misma familia (PR-10) que la del abedul, así que puede dar las mismas reacciones a frutas y frutos secos.",
      en: "Alder's Aln g 1 belongs to the same family (PR-10) as birch's main protein, so it can trigger the same fruit and nut reactions.",
    },
    cooking: {
      es: "Cocinar rompe la PR-10: la fruta guisada, al horno o en conserva se suele tolerar. Los frutos secos, el apio y la soja pueden reaccionar aunque estén procesados, así que conviene que los valore un alergólogo.",
      en: "Cooking breaks PR-10 down, so stewed, baked or tinned fruit is usually tolerated. Nuts, celery and soy can still react after processing, so get these checked by an allergist.",
    },
    fact: {
      es: "En una región de Japón sin polen de abedul, el síndrome de alergia oral se asoció a la sensibilización al aliso y al abedul.",
      en: "In a region of Japan with no birch pollen, oral allergy syndrome was linked to sensitisation to alder and birch.",
    },
    sources: ["maug", "osawa2020", "allergyuk"],
  },
  {
    id: "grass", es: "Gramíneas", en: "Grass", page: { es: "/alergia-gramineas", en: "/en/allergy-grass" }, stable: false,
    foods: { w: ["tomato", "melon", "watermelon", "citrus"], r: ["peach", "kiwi", "banana", "pineapple", "courgette", "cucumber", "celery"] },
    cause: {
      es: "La profilina de las gramíneas (Phl p 12), una proteína que comparten muchos vegetales. Suele dar picor leve en la boca con el alimento crudo.",
      en: "Grass profilin (Phl p 12), a protein shared by many plants. It usually causes mild mouth itching with the raw food.",
    },
    cooking: {
      es: "La profilina se destruye con el calor y la digestión, así que la salsa de tomate o la fruta en almíbar se suelen tolerar. No vale si la reacción la causa una LTP, frecuente con el melocotón en España e Italia, que resiste la cocción.",
      en: "Profilin is broken down by heat and digestion, so tomato sauce or tinned fruit is usually tolerated. That does not hold if the reaction is caused by an LTP, common with peach in Spain and Italy, which survives cooking.",
    },
    fact: null,
    sources: ["maug", "asero2008", "acaai"],
  },
  {
    id: "olive", es: "Olivo", en: "Olive", page: { es: "/alergia-olivo", en: null }, stable: true,
    foods: { w: ["peach", "melon"], r: ["pear", "kiwi", "walnut", "peanut"] },
    cause: {
      es: "La proteína del olivo relacionada con los alimentos es su LTP (Ole e 7), no su profilina. Las LTP resisten la cocción y la digestión.",
      en: "The olive protein linked to food is its LTP (Ole e 7), not its profilin. LTPs survive cooking and digestion.",
    },
    cooking: {
      es: "La LTP está sobre todo en la piel: pelar la fruta reduce la exposición, pero no la elimina, y resiste la cocción, así que la fruta cocinada o en conserva no es una prueba segura. Las reacciones a fruta ligadas al olivo pueden ser graves: si has notado algo más que picor en la boca, consulta con un alergólogo.",
      en: "LTP sits mainly in the skin, so peeling fruit lowers exposure without removing it, and it survives cooking, so cooked or tinned fruit is not a safe test. Olive-related reactions to fruit can be severe: if you have had more than mouth itching, see an allergist.",
    },
    fact: {
      es: "En una serie española de 134 pacientes alérgicos al polen de olivo, 40 (el 30 %) referían reacciones a alimentos vegetales, y 19 de ellos habían tenido anafilaxia.",
      en: "In a Spanish series of 134 patients allergic to olive pollen, 40 (30%) reported reactions to plant foods, and 19 of them had had anaphylaxis.",
    },
    sources: ["florido2002", "skypala2021", "popescu2015"],
  },
  {
    id: "mugwort", es: "Artemisa", en: "Mugwort", page: { es: "/alergia-artemisa", en: null }, stable: true,
    foods: { w: ["celery", "carrot", "peach", "mustard"], r: ["fennel", "parsley", "aniseed", "cumin", "chamomile", "sunflower", "pepper"] },
    cause: {
      es: "No hay una sola proteína. La LTP de la artemisa (Art v 3) explica la relación con el melocotón y la mostaza. Para el apio y las especias, la causa aún no está identificada: se barajan la profilina (Art v 4), la defensina Art v 1 y otras glicoproteínas.",
      en: "There is no single protein. Mugwort's LTP (Art v 3) explains the link with peach and mustard. For celery and spices the cause is still unidentified: profilin (Art v 4), the defensin Art v 1 and other glycoproteins are candidates.",
    },
    cooking: {
      es: "Cocinar no ayuda de forma fiable. El apio puede dar reacciones cocinado y como especia seca, y la LTP del melocotón y la mostaza resiste el calor. La infusión de manzanilla ha causado reacciones graves aunque se prepara con agua hirviendo. Si has reaccionado al apio, a especias, a la mostaza o a la manzanilla, consulta con un alergólogo.",
      en: "Cooking does not reliably help. Celery can still cause reactions cooked or as a dried spice, and the LTP in peach and mustard survives heat. Chamomile tea has caused severe reactions even though it is made with boiling water. If you have reacted to celery, spices, mustard or chamomile, see an allergist.",
    },
    fact: {
      es: "Las reacciones al apio más graves se dan en personas sensibilizadas a la artemisa, según la guía de la EAACI. En un estudio chino con 148 pacientes alérgicos a la artemisa, el 72 % tenía alergia a algún alimento, sobre todo ligada a LTP.",
      en: "The most severe celery reactions occur in people sensitised to mugwort, according to the EAACI guide. In a Chinese study of 148 mugwort-allergic patients, 72% had a food allergy, mostly linked to LTP.",
    },
    sources: ["maug", "popescu2015", "ballmer2002", "gao2019"],
  },
  {
    id: "ragweed", es: "Ambrosía", en: "Ragweed", page: { es: "/alergia-ambrosia", en: "/en/allergy-ragweed" }, stable: false,
    foods: { w: ["melon", "watermelon", "banana"], r: ["courgette", "cucumber", "sunflower"] },
    cause: {
      es: "Sobre todo la profilina de la ambrosía (Amb a 8). Su LTP (Amb a 6) es una segunda candidata.",
      en: "Mainly ragweed profilin (Amb a 8). Its LTP (Amb a 6) is a second candidate.",
    },
    cooking: {
      es: "La profilina se destruye con el calor, así que el calabacín cocinado se suele tolerar. El melón, la sandía y el plátano se comen crudos: lo práctico es evitar la fruta cruda que te da síntomas.",
      en: "Profilin is destroyed by heat, so cooked courgette is usually tolerated. Melon, watermelon and banana are eaten raw, so the practical advice is to avoid the raw fruit that gives you symptoms.",
    },
    fact: {
      es: "Tener anticuerpos no es lo mismo que tener síntomas: en un estudio, solo 6 de los 26 pacientes con anticuerpos IgE frente a la sandía tenían síntomas al comerla.",
      en: "Antibodies are not the same as symptoms: in one study, only 6 of 26 patients with IgE antibodies to watermelon had symptoms when they ate it.",
    },
    sources: ["enberg1987", "anderson1970", "popescu2015"],
  },
  {
    id: "cypress", es: "Ciprés", en: "Cypress", page: { es: null, en: null }, stable: true,
    foods: { w: ["peach", "citrus"], r: ["cherry", "apricot", "pomegranate"] },
    cause: {
      es: "Una proteína regulada por giberelinas del ciprés (Cup s 7), que reacciona con sus parecidas del melocotón (Pru p 7) y de la naranja (Cit s 7). No es la profilina.",
      en: "A gibberellin-regulated protein in cypress pollen (Cup s 7), which cross-reacts with its counterparts in peach (Pru p 7) and orange (Cit s 7). It is not profilin.",
    },
    cooking: {
      es: "Esta proteína resiste el calor y la digestión y está en la pulpa y en la piel: ni cocinar ni pelar la fruta evitan la reacción. Puede ser grave (hinchazón de la cara o los párpados, cierre de garganta, anafilaxia), a veces solo cuando coincide con ejercicio o con antiinflamatorios. Si reaccionas al melocotón o a los cítricos, consulta con un alergólogo.",
      en: "This protein resists heat and digestion and is found in both pulp and peel, so neither cooking nor peeling prevents a reaction. It can be severe (swelling of the face or eyelids, throat tightness, anaphylaxis), sometimes only together with exercise or anti-inflammatory painkillers. If you react to peach or citrus, see an allergist.",
    },
    fact: {
      es: "En un estudio francés con 198 pacientes alérgicos al melocotón, el 62 % estaba sensibilizado a Pru p 7, la proteína del melocotón relacionada con el ciprés, y eso se asoció a la exposición al polen de ciprés y a reacciones más graves.",
      en: "In a French study of 198 peach-allergic patients, 62% were sensitised to Pru p 7, the cypress-related peach protein, which was linked to cypress pollen exposure and to more severe reactions.",
    },
    sources: ["maug", "klingebiel2019", "iizuka2022"],
  },
  {
    id: "plane_tree", es: "Plátano de sombra", en: "Plane tree", page: { es: null, en: null }, stable: true,
    foods: { w: [], r: ["hazelnut", "peach", "apple", "peanut", "maize", "chickpea", "lettuce"] },
    cause: {
      es: "La LTP del plátano de sombra (Pla a 3). Ni su profilina ni la proteína Pla a 1 explican las reacciones a alimentos.",
      en: "Plane tree's LTP (Pla a 3). Neither its profilin nor its Pla a 1 protein explains the food reactions.",
    },
    cooking: {
      es: "La LTP no se destruye al cocinar ni con la digestión, y las reacciones a frutos secos, cacahuete, melocotón o maíz pueden ser graves. Cocinar no hace seguros estos alimentos: si reaccionas a alguno, consulta con un alergólogo.",
      en: "LTP is not destroyed by cooking or digestion, and reactions to nuts, peanuts, peach or maize can be severe. Cooking does not make these foods safe: if you react to any of them, see an allergist.",
    },
    fact: {
      es: "En un estudio de Barcelona, 61 de 720 pacientes alérgicos al polen estaban sensibilizados al plátano de sombra, y 32 de ellos (el 52 %) tenían alergia a algún alimento vegetal, sobre todo avellana, melocotón, manzana, cacahuete, maíz, garbanzo y lechuga.",
      en: "In a Barcelona study, 61 of 720 pollen-allergic patients were sensitised to plane tree pollen, and 32 of them (52%) had a plant-food allergy, most often to hazelnut, peach, apple, peanut, maize, chickpea and lettuce.",
    },
    sources: ["enrique2002", "skypala2021", "enrique2004"],
  },
];

// The general sources the "what is it" section and the FAQ rest on.
const GENERAL = { es: ["fbbva", "bsaci2022", "skypala2021", "maug"], en: ["aaaai", "allergyuk", "bsaci2022", "skypala2021", "maug"] };

function forLang(lang) {
  const i = lang === "es" ? 0 : 1;
  const pollens = POLLENS.map((p) => ({
    id: p.id,
    name: p[lang],
    page: p.page[lang],
    stable: p.stable,
    cause: p.cause[lang],
    cooking: p.cooking[lang],
    fact: p.fact ? p.fact[lang] : null,
    well: p.foods.w.map((f) => F[f][i]),
    reported: p.foods.r.map((f) => F[f][i]),
    sources: p.sources.map((k) => S[k]),
  }));
  return {
    pollens,
    general: GENERAL[lang].map((k) => S[k]),
    // What the browser script needs, kept small: names and food names only.
    client: pollens.map((p) => ({
      id: p.id, name: p.name, stable: p.stable,
      foods: [...p.well.map((n) => ({ n, s: "w" })), ...p.reported.map((n) => ({ n, s: "r" }))],
    })),
  };
}

export default function () {
  for (const p of POLLENS) for (const f of [...p.foods.w, ...p.foods.r]) {
    if (!F[f]) throw new Error(`crossReactivity: no names for food "${f}"`);
  }
  return { es: forLang("es"), en: forLang("en") };
}
