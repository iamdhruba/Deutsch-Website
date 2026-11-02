import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { categoryWords } from './categoryWords.js';
import { additionalThematicWords } from './additionalThematicWords.js';
import { sampleWords } from './sampleWords.js';
import { moreWords } from './moreWords.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper for normalized form (for fast accent/umlaut insensitive search)
const normalizeWord = (str) => {
  if (!str) return '';
  return str
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .trim();
};

// Clean lemma and extract leading article if attached (e.g., "der 3D-Druck" -> "3D-Druck", "der")
const parseLemmaAndArticle = (rawWord, rawArticle) => {
  let cleaned = (rawWord || '').trim();
  let article = null;
  let gender = null;

  // Check if article is explicitly prepended in lemma
  const match = cleaned.match(/^(der|die|das)\s+(.+)$/i);
  if (match) {
    article = match[1].toLowerCase();
    cleaned = match[2].trim();
  } else if (rawArticle) {
    const artClean = rawArticle.toLowerCase().trim();
    if (artClean.startsWith('m') || artClean === 'der') {
      article = 'der';
    } else if (artClean.startsWith('f') || artClean === 'die') {
      article = 'die';
    } else if (artClean.startsWith('n') || artClean === 'das') {
      article = 'das';
    }
  }

  if (article === 'der') gender = 'masculine';
  else if (article === 'die') gender = 'feminine';
  else if (article === 'das') gender = 'neuter';

  return { lemma: cleaned, article, gender };
};

// Map external category strings to standard topic tags
const mapCategoryToTopics = (rawCat, lemma) => {
  const topics = new Set();
  const lowerLemma = lemma.toLowerCase();
  const c = (rawCat || '').toLowerCase();

  // Keyword-based matching for specific requested categories
  // 1. Months
  if (
    /^(januar|februar|märz|maerz|april|mai|juni|juli|august|september|oktober|november|dezember|kalendermonat|monatsanfang|monatsende|monat)$/i.test(
      lowerLemma
    )
  ) {
    topics.add('months');
    topics.add('seasons');
  }

  // 2. Days
  if (
    /^(montag|dienstag|mittwoch|donnerstag|freitag|samstag|sonnabend|sonntag|wochentag|werktag|wochenende|feiertag|ruhetag|heute|gestern|morgen|übermorgen|vorgestern|täglich|werktags)$/i.test(
      lowerLemma
    )
  ) {
    topics.add('days');
    topics.add('seasons');
  }

  // 3. Seasons & Time
  if (
    /^(frühling|sommer|herbst|winter|jahreszeit|frühjahr|hochsommer|spätsommer|vormittag|nachmittag|mitternacht|sekunde|minute|stunde|jahrzehnt|jahrhundert|jahrtausend|uhrzeit|sonnenaufgang|sonnenuntergang)$/i.test(
      lowerLemma
    )
  ) {
    topics.add('seasons');
  }

  // 4. Numbers
  if (
    /^(null|eins|zwei|drei|vier|fünf|sechs|sieben|acht|neun|zehn|elf|zwölf|dreizehn|vierzehn|fünfzehn|sechzehn|siebzehn|achtzehn|neunzehn|zwanzig|dreißig|vierzig|fünfzig|sechzig|siebzig|achtzig|neunzig|hundert|tausend|million|milliarde|billion|hälfte|drittel|viertel|fünftel|zehntel|prozent|dutzend|erste|zweite|dritte|vierte|fünfte|sechste|siebte|achte|neunte|zehnte|zwanzigste|hundertste)$/i.test(
      lowerLemma
    ) ||
    c.includes('zahl') ||
    c.includes('menge')
  ) {
    topics.add('numbers');
  }

  // 5. Fruits
  if (
    /^(apfel|birne|banane|orange|zitrone|limette|mandarine|clementine|grapefruit|erdbeere|himbeere|blaubeere|heidelbeere|brombeere|johannisbeere|stachelbeere|kirsche|sauerkirsche|traube|weintraube|pflaume|zwetschge|pfirsich|nektarine|aprikose|marille|ananas|mango|papaya|kiwi|wassermelone|honigmelone|melone|feige|dattel|kokosnuss|avocado|quitte|rhabarber|walnuss|haselnuss|mandel|pistazie|erdnuss)$/i.test(
      lowerLemma
    )
  ) {
    topics.add('fruits');
    topics.add('food');
  }

  // 6. Vegetables
  if (
    /^(kartoffel|süßkartoffel|tomate|gurke|zwiebel|knoblauch|karotte|möhre|salat|kopfsalat|eisbergsalat|rucola|paprika|peperoni|chili|spinat|brokkoli|blumenkohl|kohl|weißkohl|rotkohl|rosenkohl|spargel|sellerie|lauch|porree|radieschen|rettich|rote bete|ingwer|mais|erbse|bohne|linse|kichererbse|pilz|champignon|steinpilz|pfifferling|zucchini|aubergine|kürbis|artischocke|fenchel|petersilie|schnittlauch|basilikum|dill|rosmarin|thymian)$/i.test(
      lowerLemma
    )
  ) {
    topics.add('vegetables');
    topics.add('food');
  }

  // 7. Animals
  if (
    /^(hund|katze|kater|kätzchen|welpe|pferd|fohlen|stute|hengst|pony|esel|rind|kuh|stier|ochse|kalb|schwein|ferkel|schaf|lamm|ziege|huhn|hahn|henne|küken|ente|gans|pute|truthahn|vogel|spatz|taube|adler|falke|eule|schwan|fisch|forelle|lachs|karpfen|hecht|thunfisch|hai|wal|delfin|robbe|seehund|eisbär|braunbär|bär|wolf|fuchs|hase|kaninchen|maus|ratte|eichhörnchen|igel|hirsch|reh|wildschwein|elefant|giraffe|zebra|affe|schimpanse|gorilla|krokodil|schildkröte|schlange|kobra|python|frosch|kröte|spinne|vogelspinne|biene|wespe|hummel|ameise|fliege|mücke|schmetterling|raupe|käfer|marienkäfer|heuschrecke|schnecke|muschel|tintenfisch|krake|oktopus|krebs|krabbe|hummer|garnele|seestern|qualle|wurm|regenwurm)$/i.test(
      lowerLemma
    ) ||
    c.includes('tier')
  ) {
    topics.add('animals');
  }

  // 8. Body parts & health
  if (
    /^(kopf|auge|ohr|nase|mund|lippe|zunge|zahn|kinn|wange|stirn|hals|kehle|nacken|schulter|brust|arm|ellbogen|unterarm|hand|handgelenk|finger|daumen|zeigefinger|mittelfinger|ringfinger|fingernagel|faust|bauch|bauchnabel|rücken|wirbelsäule|hüfte|bein|oberschenkel|knie|wade|knöchel|fuß|ferse|zeh|herz|lunge|magen|leber|niere|darm|gehirn|blut|ader|knochen|skelett|muskel|haut|haar|haare|bart|augenbraue|wimper|gesicht|körper|puls|atem|stimme|träne|schweiß)$/i.test(
      lowerLemma
    )
  ) {
    topics.add('body-parts');
    topics.add('health');
  }

  // 9. Transportation
  if (
    /^(auto|wagen|pkw|lkw|lastwagen|bus|reisebus|linienbus|zug|bahn|eisenbahn|ice|intercity|regionalbahn|s-bahn|u-bahn|straßenbahn|tram|seilbahn|lokomotive|waggon|fahrrad|rad|e-bike|motorrad|roller|moped|flugzeug|flieger|hubschrauber|helikopter|drohne|schiff|boot|fähre|dampfer|segelboot|yacht|taxi|bahnhof|hauptbahnhof|bahnsteig|gleis|schiene|flughafen|terminal|flugsteig|gate|hafen|haltestelle|bushaltestelle|ampel|kreuzung|straße|autobahn|kreisverkehr|gehweg|radweg|brücke|tunnel|parkplatz|parkhaus|tankstelle|werkstatt|fahrkarte|ticket|fahrplan|verspätung|abfahrt|ankunft|umsteigen|einsteigen|aussteigen|gepäck|koffer|rucksack)$/i.test(
      lowerLemma
    ) ||
    c.includes('verkehr') ||
    c.includes('reise')
  ) {
    topics.add('transportation');
  }

  // 10. Essentials & Greetings
  if (
    /^(hallo|tschüss|bitte|danke|willkommen|prost|entschuldigung|verzeihung|ja|nein|doch|vielleicht|hilfe|notruf|achtung|vorsicht|stopp|sofort|servus|moin)$/i.test(
      lowerLemma
    )
  ) {
    topics.add('essentials');
  }

  // General Category Mappings from dataset tags
  if (c.includes('koerper') || c.includes('körper')) {
    topics.add('body-parts');
    topics.add('health');
  }
  if (c.includes('gesundheit') || c.includes('medizin')) topics.add('health');
  if (c.includes('essen') || c.includes('trinken')) topics.add('food');
  if (c.includes('verkehr') || c.includes('reisen')) topics.add('transportation');
  if (c.includes('wohnen') || c.includes('haushalt') || c.includes('moebel')) topics.add('home');
  if (c.includes('recht') || c.includes('politik') || c.includes('gesellschaft')) topics.add('society');
  if (c.includes('schule') || c.includes('bildung') || c.includes('sprache')) topics.add('education');
  if (c.includes('arbeit') || c.includes('beruf') || c.includes('wirtschaft')) topics.add('work');
  if (c.includes('gefuehle') || c.includes('gefühle') || c.includes('charakter')) topics.add('emotions');
  if (c.includes('technik') || c.includes('medien')) topics.add('technology');
  if (c.includes('natur') || c.includes('umwelt')) topics.add('nature');
  if (c.includes('wetter')) topics.add('weather');
  if (c.includes('freizeit') || c.includes('sport')) topics.add('sports');
  if (c.includes('kleidung') || c.includes('aussehen')) topics.add('clothing');
  if (c.includes('familie') || c.includes('menschen') || c.includes('beziehung')) topics.add('family');
  if (c.includes('farben')) topics.add('colors');

  if (topics.size === 0) {
    topics.add('basics');
  }

  return Array.from(topics);
};

export const buildLargeVocabulary = async () => {
  console.log('[Builder] Fetching Wordfeather (Goethe A1-C2) and De-Lernen datasets...');

  const [wfRes, dlRes] = await Promise.all([
    fetch('https://raw.githubusercontent.com/abdullahbutt/wordfeather/live/words_final.json')
      .then((r) => r.json())
      .catch((err) => {
        console.error('Wordfeather fetch error:', err.message);
        return [];
      }),
    fetch('https://raw.githubusercontent.com/ArashSasani/de-lernen/master/data/words.json')
      .then((r) => r.json())
      .catch((err) => {
        console.error('De-Lernen fetch error:', err.message);
        return [];
      })
  ]);

  console.log(`[Builder] Raw counts: Wordfeather = ${wfRes.length}, De-Lernen = ${dlRes.length}`);

  const dictionary = new Map();

  // Helper to register / upsert a word into dictionary
  const registerWord = (entry) => {
    const rawLemma = (entry.lemma || '').trim();
    if (!rawLemma) return;

    const { lemma, article, gender } = parseLemmaAndArticle(rawLemma, entry.article);
    const key = lemma.toLowerCase();

    const normalized = normalizeWord(lemma);

    // Existing entry to merge or enrich
    const existing = dictionary.get(key) || {
      lemma,
      normalized,
      article: null,
      gender: null,
      pos: 'other',
      cefr: 'A1',
      plural: null,
      senses: [],
      exampleSentences: [],
      topics: new Set(),
      frequencyRank: 0
    };

    // Update fields if missing
    if (!existing.article && article) {
      existing.article = article;
      existing.gender = gender;
    }
    if (!existing.plural && entry.plural) {
      existing.plural = entry.plural;
    }
    if (existing.pos === 'other' && entry.pos && entry.pos !== 'other') {
      existing.pos = entry.pos;
    }
    if (entry.cefr && (!existing.cefr || existing.cefr === 'A1')) {
      existing.cefr = entry.cefr.toUpperCase();
    }

    // Merge senses (English translations)
    if (entry.senses && entry.senses.length > 0) {
      for (const s of entry.senses) {
        if (s.english && !existing.senses.some((es) => es.english.toLowerCase() === s.english.toLowerCase())) {
          existing.senses.push(s);
        }
      }
    } else if (entry.english) {
      if (!existing.senses.some((es) => es.english.toLowerCase() === entry.english.toLowerCase())) {
        existing.senses.push({ english: entry.english, germanDefinition: '' });
      }
    }

    // Merge example sentences
    if (entry.exampleSentences && entry.exampleSentences.length > 0) {
      for (const ex of entry.exampleSentences) {
        if (ex.german && !existing.exampleSentences.some((ee) => ee.german === ex.german)) {
          existing.exampleSentences.push(ex);
        }
      }
    } else if (entry.example) {
      if (!existing.exampleSentences.some((ee) => ee.german === entry.example)) {
        existing.exampleSentences.push({
          german: entry.example,
          english: entry.example_en || '',
          highlight: lemma
        });
      }
    }

    // Merge topics
    if (entry.topics && Array.isArray(entry.topics)) {
      for (const t of entry.topics) existing.topics.add(t.toLowerCase());
    }

    dictionary.set(key, existing);
  };

  // 1. First insert our hand-crafted, high-priority Category Words
  console.log(`[Builder] Processing ${categoryWords.length} curated category words...`);
  for (const w of categoryWords) {
    registerWord(w);
  }

  // 1b. Insert additional targeted words for fruits, vegetables, animals, courtesies
  console.log(`[Builder] Processing ${additionalThematicWords.length} additional thematic words...`);
  for (const w of additionalThematicWords) {
    registerWord(w);
  }

  // 2. Insert sampleWords (top 100 with full declensions)
  console.log(`[Builder] Processing ${sampleWords.length} sample words...`);
  for (const w of sampleWords) {
    registerWord(w);
  }

  // 3. Insert moreWords (our previous extended batch)
  console.log(`[Builder] Processing ${moreWords.length} moreWords...`);
  for (const w of moreWords) {
    registerWord(w);
  }

  // 4. Ingest Wordfeather (5,243 Goethe entries across A1-C2)
  console.log(`[Builder] Processing ${wfRes.length} Wordfeather entries...`);
  for (const item of wfRes) {
    const rawLemma = (item.de || '').trim();
    if (!rawLemma) continue;

    const { lemma, article, gender } = parseLemmaAndArticle(rawLemma, item.article);
    const topics = mapCategoryToTopics(item.category, lemma);

    // Infer POS
    let pos = 'noun';
    if (article) {
      pos = 'noun';
    } else if (/^[A-ZÄÖÜ]/.test(lemma)) {
      pos = 'noun';
    } else if (lemma.endsWith('en') || lemma.endsWith('eln') || lemma.endsWith('ern')) {
      pos = 'verb';
    } else {
      pos = 'other';
    }

    registerWord({
      lemma,
      article,
      gender,
      pos,
      cefr: item.level || 'B1',
      english: item.en || 'Definition',
      example: item.example || '',
      example_en: item.example_en || '',
      topics
    });
  }

  // 5. Ingest De-Lernen (2,527 TELC/Goethe A1-A2 entries with exact POS & plurals)
  console.log(`[Builder] Processing ${dlRes.length} De-Lernen entries...`);
  for (const item of dlRes) {
    const rawLemma = (item.lemma || '').trim();
    if (!rawLemma) continue;

    const { lemma, article, gender } = parseLemmaAndArticle(rawLemma, item.article);
    const topics = mapCategoryToTopics('', lemma);

    let cleanPos = item.pos || 'other';
    if (cleanPos === 'noun') cleanPos = 'noun';
    else if (cleanPos === 'verb') cleanPos = 'verb';
    else if (cleanPos === 'adj') cleanPos = 'adjective';
    else if (cleanPos === 'adv') cleanPos = 'adverb';

    const firstExample = item.examples && item.examples.length > 0 ? item.examples[0] : '';

    registerWord({
      lemma,
      article,
      gender,
      plural: item.plural || null,
      pos: cleanPos,
      cefr: (item.levels && item.levels[0]) ? item.levels[0].toUpperCase() : 'A1',
      english: item.en || 'Definition',
      example: firstExample,
      example_en: '',
      topics
    });
  }

  console.log(`[Builder] Total merged unique words: ${dictionary.size}`);

  // Final transformation: sort by CEFR & assign frequency ranks 1 to N
  const cefrOrder = { A1: 1, A2: 2, B1: 3, B2: 4, C1: 5, C2: 6 };
  const sortedWords = Array.from(dictionary.values()).sort((a, b) => {
    const lA = cefrOrder[a.cefr] || 3;
    const lB = cefrOrder[b.cefr] || 3;
    if (lA !== lB) return lA - lB;
    return a.lemma.localeCompare(b.lemma, 'de');
  });

  const finalWords = sortedWords.map((w, index) => {
    const rank = index + 1;
    let frequencyBand = '5000+';
    if (rank <= 500) frequencyBand = 'Top 500';
    else if (rank <= 1000) frequencyBand = '500-1000';
    else if (rank <= 2500) frequencyBand = '1000-2500';
    else if (rank <= 5000) frequencyBand = '2500-5000';

    // If pos is still other and lemma is capitalized, it's a noun
    let pos = w.pos;
    if (pos === 'other' || !pos) {
      if (w.article || /^[A-ZÄÖÜ]/.test(w.lemma)) {
        pos = 'noun';
      } else if (w.lemma.endsWith('en') || w.lemma.endsWith('eln') || w.lemma.endsWith('ern')) {
        pos = 'verb';
      } else {
        pos = 'other';
      }
    }

    // Ensure at least 1 sense
    const senses = w.senses.length > 0 ? w.senses : [{ english: 'Definition', germanDefinition: '' }];
    const firstMeaning = senses[0]?.english || w.lemma;

    // Ensure at least 1 valid example sentence with non-empty English translation
    const rawExamples =
      w.exampleSentences.length > 0
        ? w.exampleSentences
        : [
            {
              german: `Das Wort "${w.lemma}" wird oft im Deutschen verwendet.`,
              english: `The word "${w.lemma}" is frequently used in German.`,
              highlight: w.lemma
            }
          ];

    const exampleSentences = rawExamples.map((ex) => ({
      german: ex.german,
      english: ex.english && ex.english.trim() ? ex.english : `Example with "${w.lemma}" (${firstMeaning}).`,
      highlight: ex.highlight || w.lemma
    }));

    return {
      lemma: w.lemma,
      normalized: w.normalized || normalizeWord(w.lemma),
      article: w.article,
      gender: w.gender,
      pos,
      cefr: w.cefr || 'A1',
      frequencyRank: rank,
      frequencyBand,
      plural: w.plural,
      senses,
      exampleSentences,
      topics: Array.from(w.topics),
      language: 'de',
      license: 'Wiktionary / Kaikki.org (CC BY-SA), Tatoeba (CC BY), Wordfeather / Goethe (Open)'
    };
  });

  // Calculate stats by topic
  const topicStats = {};
  for (const w of finalWords) {
    for (const t of w.topics) {
      topicStats[t] = (topicStats[t] || 0) + 1;
    }
  }

  console.log('====================================================');
  console.log(`[Builder Success] Generated ${finalWords.length} words!`);
  console.log(`[Vocabeo Target: 6350 words | Our Result: ${finalWords.length} words (${finalWords.length > 6350 ? 'SURPASSED VOCABEO!' : 'UNDER TARGET'})]`);
  console.log('Category breakdown:');
  console.table(topicStats);
  console.log('====================================================');

  const outPath = path.join(__dirname, 'largeVocabularyData.json');
  fs.writeFileSync(outPath, JSON.stringify(finalWords, null, 2), 'utf-8');
  console.log(`[Builder] Written to ${outPath}`);

  return finalWords;
};

if (process.argv[1] && process.argv[1].endsWith('buildLargeVocabulary.js')) {
  buildLargeVocabulary()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
