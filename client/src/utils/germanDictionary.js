/**
 * Comprehensive German-to-English Instant Dictionary & Stemmer
 * Provides instant English translations for German words in sentences on hover.
 */

// Cache for dynamically looked-up words from the database
const dynamicCache = new Map();
const pendingLookups = new Set();
const subscribers = new Set();

export function subscribeToWordLookups(cb) {
  subscribers.add(cb);
  return () => subscribers.delete(cb);
}

function notifySubscribers() {
  subscribers.forEach((cb) => {
    try {
      cb();
    } catch {
      // ignore
    }
  });
}

/**
 * High-frequency German function words, pronouns, articles, prepositions,
 * conjunctions, adverbs, verbs, nouns, and adjectives.
 */
export const GERMAN_LEXICON = {
  // Articles
  der: { meaning: 'the', lemma: 'der', pos: 'article' },
  die: { meaning: 'the', lemma: 'die', pos: 'article' },
  das: { meaning: 'the', lemma: 'das', pos: 'article' },
  den: { meaning: 'the', lemma: 'der', pos: 'article' },
  dem: { meaning: 'the', lemma: 'der', pos: 'article' },
  des: { meaning: 'of the', lemma: 'der', pos: 'article' },
  ein: { meaning: 'a / an', lemma: 'ein', pos: 'article' },
  eine: { meaning: 'a / an', lemma: 'ein', pos: 'article' },
  einen: { meaning: 'a / an', lemma: 'ein', pos: 'article' },
  einem: { meaning: 'a / an', lemma: 'ein', pos: 'article' },
  einer: { meaning: 'a / an', lemma: 'ein', pos: 'article' },
  eines: { meaning: 'of a', lemma: 'ein', pos: 'article' },
  kein: { meaning: 'no / not any', lemma: 'kein', pos: 'article' },
  keine: { meaning: 'no / not any', lemma: 'kein', pos: 'article' },
  keinen: { meaning: 'no / not any', lemma: 'kein', pos: 'article' },
  keinem: { meaning: 'no / not any', lemma: 'kein', pos: 'article' },
  keiner: { meaning: 'no / not any', lemma: 'kein', pos: 'article' },
  keines: { meaning: 'no / not any', lemma: 'kein', pos: 'article' },

  // Pronouns
  ich: { meaning: 'I', lemma: 'ich', pos: 'pronoun' },
  du: { meaning: 'you', lemma: 'du', pos: 'pronoun' },
  er: { meaning: 'he', lemma: 'er', pos: 'pronoun' },
  sie: { meaning: 'she / they', lemma: 'sie', pos: 'pronoun' },
  es: { meaning: 'it', lemma: 'es', pos: 'pronoun' },
  wir: { meaning: 'we', lemma: 'wir', pos: 'pronoun' },
  ihr: { meaning: 'you (plural) / her', lemma: 'ihr', pos: 'pronoun' },
  mich: { meaning: 'me', lemma: 'ich', pos: 'pronoun' },
  mir: { meaning: 'me (to me)', lemma: 'ich', pos: 'pronoun' },
  dich: { meaning: 'you', lemma: 'du', pos: 'pronoun' },
  dir: { meaning: 'you (to you)', lemma: 'du', pos: 'pronoun' },
  ihn: { meaning: 'him', lemma: 'er', pos: 'pronoun' },
  ihm: { meaning: 'him (to him)', lemma: 'er', pos: 'pronoun' },
  uns: { meaning: 'us', lemma: 'wir', pos: 'pronoun' },
  euch: { meaning: 'you (plural)', lemma: 'ihr', pos: 'pronoun' },
  ihnen: { meaning: 'them', lemma: 'sie', pos: 'pronoun' },
  Ihnen: { meaning: 'you (formal)', lemma: 'Sie', pos: 'pronoun' },
  mein: { meaning: 'my', lemma: 'mein', pos: 'pronoun' },
  meine: { meaning: 'my', lemma: 'mein', pos: 'pronoun' },
  meinen: { meaning: 'my', lemma: 'mein', pos: 'pronoun' },
  meinem: { meaning: 'my', lemma: 'mein', pos: 'pronoun' },
  meiner: { meaning: 'my', lemma: 'mein', pos: 'pronoun' },
  meines: { meaning: 'my', lemma: 'mein', pos: 'pronoun' },
  dein: { meaning: 'your', lemma: 'dein', pos: 'pronoun' },
  deine: { meaning: 'your', lemma: 'dein', pos: 'pronoun' },
  sein: { meaning: 'his / its', lemma: 'sein', pos: 'pronoun' },
  seine: { meaning: 'his / its', lemma: 'sein', pos: 'pronoun' },
  ihre: { meaning: 'her / their', lemma: 'ihr', pos: 'pronoun' },
  unser: { meaning: 'our', lemma: 'unser', pos: 'pronoun' },
  unsere: { meaning: 'our', lemma: 'unser', pos: 'pronoun' },
  dieser: { meaning: 'this', lemma: 'dieser', pos: 'pronoun' },
  diese: { meaning: 'this / these', lemma: 'dieser', pos: 'pronoun' },
  dieses: { meaning: 'this', lemma: 'dieser', pos: 'pronoun' },
  diesen: { meaning: 'this / these', lemma: 'dieser', pos: 'pronoun' },
  diesem: { meaning: 'this', lemma: 'dieser', pos: 'pronoun' },
  man: { meaning: 'one / people', lemma: 'man', pos: 'pronoun' },
  jemand: { meaning: 'someone', lemma: 'jemand', pos: 'pronoun' },
  niemand: { meaning: 'nobody', lemma: 'niemand', pos: 'pronoun' },
  etwas: { meaning: 'something / somewhat', lemma: 'etwas', pos: 'pronoun' },
  nichts: { meaning: 'nothing', lemma: 'nichts', pos: 'pronoun' },
  wer: { meaning: 'who', lemma: 'wer', pos: 'pronoun' },
  was: { meaning: 'what', lemma: 'was', pos: 'pronoun' },
  wen: { meaning: 'whom', lemma: 'wer', pos: 'pronoun' },
  wem: { meaning: 'to whom', lemma: 'wer', pos: 'pronoun' },
  wessen: { meaning: 'whose', lemma: 'wer', pos: 'pronoun' },

  // Prepositions
  in: { meaning: 'in / into', lemma: 'in', pos: 'preposition' },
  im: { meaning: 'in the', lemma: 'in', pos: 'preposition' },
  ins: { meaning: 'into the', lemma: 'in', pos: 'preposition' },
  an: { meaning: 'at / on', lemma: 'an', pos: 'preposition' },
  am: { meaning: 'at the / on the', lemma: 'an', pos: 'preposition' },
  ans: { meaning: 'to the', lemma: 'an', pos: 'preposition' },
  auf: { meaning: 'on / upon', lemma: 'auf', pos: 'preposition' },
  aufs: { meaning: 'onto the', lemma: 'auf', pos: 'preposition' },
  aus: { meaning: 'from / out of', lemma: 'aus', pos: 'preposition' },
  bei: { meaning: 'at / near / with', lemma: 'bei', pos: 'preposition' },
  beim: { meaning: 'at the', lemma: 'bei', pos: 'preposition' },
  mit: { meaning: 'with', lemma: 'mit', pos: 'preposition' },
  nach: { meaning: 'after / to', lemma: 'nach', pos: 'preposition' },
  von: { meaning: 'from / of', lemma: 'von', pos: 'preposition' },
  vom: { meaning: 'from the', lemma: 'von', pos: 'preposition' },
  zu: { meaning: 'to / at / too', lemma: 'zu', pos: 'preposition' },
  zum: { meaning: 'to the', lemma: 'zu', pos: 'preposition' },
  zur: { meaning: 'to the', lemma: 'zu', pos: 'preposition' },
  für: { meaning: 'for', lemma: 'für', pos: 'preposition' },
  fürs: { meaning: 'for the', lemma: 'für', pos: 'preposition' },
  gegen: { meaning: 'against', lemma: 'gegen', pos: 'preposition' },
  ohne: { meaning: 'without', lemma: 'ohne', pos: 'preposition' },
  um: { meaning: 'around / at', lemma: 'um', pos: 'preposition' },
  durch: { meaning: 'through', lemma: 'durch', pos: 'preposition' },
  über: { meaning: 'over / about', lemma: 'über', pos: 'preposition' },
  unter: { meaning: 'under / among', lemma: 'unter', pos: 'preposition' },
  vor: { meaning: 'before / in front of', lemma: 'vor', pos: 'preposition' },
  hinter: { meaning: 'behind', lemma: 'hinter', pos: 'preposition' },
  neben: { meaning: 'next to', lemma: 'neben', pos: 'preposition' },
  zwischen: { meaning: 'between', lemma: 'zwischen', pos: 'preposition' },
  seit: { meaning: 'since / for', lemma: 'seit', pos: 'preposition' },
  ab: { meaning: 'from / starting from', lemma: 'ab', pos: 'preposition' },
  bis: { meaning: 'until / up to', lemma: 'bis', pos: 'preposition' },
  während: { meaning: 'during / while', lemma: 'während', pos: 'preposition' },
  wegen: { meaning: 'because of', lemma: 'wegen', pos: 'preposition' },
  trotz: { meaning: 'in spite of', lemma: 'trotz', pos: 'preposition' },

  // Conjunctions
  und: { meaning: 'and', lemma: 'und', pos: 'conjunction' },
  aber: { meaning: 'but / however', lemma: 'aber', pos: 'conjunction' },
  oder: { meaning: 'or', lemma: 'oder', pos: 'conjunction' },
  denn: { meaning: 'because / for', lemma: 'denn', pos: 'conjunction' },
  sondern: { meaning: 'but rather', lemma: 'sondern', pos: 'conjunction' },
  dass: { meaning: 'that', lemma: 'dass', pos: 'conjunction' },
  daß: { meaning: 'that', lemma: 'dass', pos: 'conjunction' },
  weil: { meaning: 'because', lemma: 'weil', pos: 'conjunction' },
  wenn: { meaning: 'if / when', lemma: 'wenn', pos: 'conjunction' },
  als: { meaning: 'when / as / than', lemma: 'als', pos: 'conjunction' },
  ob: { meaning: 'whether / if', lemma: 'ob', pos: 'conjunction' },
  obwohl: { meaning: 'although', lemma: 'obwohl', pos: 'conjunction' },
  damit: { meaning: 'so that', lemma: 'damit', pos: 'conjunction' },
  bevor: { meaning: 'before', lemma: 'bevor', pos: 'conjunction' },
  nachdem: { meaning: 'after', lemma: 'nachdem', pos: 'conjunction' },
  solange: { meaning: 'as long as', lemma: 'solange', pos: 'conjunction' },

  // Adverbs & Particles
  nicht: { meaning: 'not', lemma: 'nicht', pos: 'adverb' },
  sehr: { meaning: 'very', lemma: 'sehr', pos: 'adverb' },
  auch: { meaning: 'also / too', lemma: 'auch', pos: 'adverb' },
  nur: { meaning: 'only / just', lemma: 'nur', pos: 'adverb' },
  schon: { meaning: 'already', lemma: 'schon', pos: 'adverb' },
  noch: { meaning: 'still / yet', lemma: 'noch', pos: 'adverb' },
  immer: { meaning: 'always', lemma: 'immer', pos: 'adverb' },
  nie: { meaning: 'never', lemma: 'nie', pos: 'adverb' },
  oft: { meaning: 'often', lemma: 'oft', pos: 'adverb' },
  manchmal: { meaning: 'sometimes', lemma: 'manchmal', pos: 'adverb' },
  wieder: { meaning: 'again', lemma: 'wieder', pos: 'adverb' },
  hier: { meaning: 'here', lemma: 'hier', pos: 'adverb' },
  da: { meaning: 'there / since', lemma: 'da', pos: 'adverb' },
  dort: { meaning: 'there', lemma: 'dort', pos: 'adverb' },
  jetzt: { meaning: 'now', lemma: 'jetzt', pos: 'adverb' },
  nun: { meaning: 'now', lemma: 'nun', pos: 'adverb' },
  heute: { meaning: 'today', lemma: 'heute', pos: 'adverb' },
  gestern: { meaning: 'yesterday', lemma: 'gestern', pos: 'adverb' },
  morgen: { meaning: 'tomorrow', lemma: 'morgen', pos: 'adverb' },
  bald: { meaning: 'soon', lemma: 'bald', pos: 'adverb' },
  gern: { meaning: 'gladly / with pleasure', lemma: 'gern', pos: 'adverb' },
  gerne: { meaning: 'gladly', lemma: 'gern', pos: 'adverb' },
  vielleicht: { meaning: 'maybe / perhaps', lemma: 'vielleicht', pos: 'adverb' },
  wirklich: { meaning: 'really / truly', lemma: 'wirklich', pos: 'adverb' },
  besonders: { meaning: 'especially', lemma: 'besonders', pos: 'adverb' },
  zusammen: { meaning: 'together', lemma: 'zusammen', pos: 'adverb' },
  allein: { meaning: 'alone', lemma: 'allein', pos: 'adverb' },
  sofort: { meaning: 'immediately', lemma: 'sofort', pos: 'adverb' },
  einfach: { meaning: 'simply / simple', lemma: 'einfach', pos: 'adverb' },
  genau: { meaning: 'exactly', lemma: 'genau', pos: 'adverb' },
  ja: { meaning: 'yes', lemma: 'ja', pos: 'interjection' },
  nein: { meaning: 'no', lemma: 'nein', pos: 'interjection' },
  doch: { meaning: 'yes (contradicting) / yet', lemma: 'doch', pos: 'particle' },
  mal: { meaning: 'times / just', lemma: 'mal', pos: 'particle' },
  bitte: { meaning: 'please / you are welcome', lemma: 'bitte', pos: 'interjection' },
  danke: { meaning: 'thank you', lemma: 'danke', pos: 'interjection' },
  wie: { meaning: 'how / like / as', lemma: 'wie', pos: 'adverb' },
  wo: { meaning: 'where', lemma: 'wo', pos: 'adverb' },
  wohin: { meaning: 'where to', lemma: 'wohin', pos: 'adverb' },
  woher: { meaning: 'where from', lemma: 'woher', pos: 'adverb' },
  wann: { meaning: 'when', lemma: 'wann', pos: 'adverb' },
  warum: { meaning: 'why', lemma: 'warum', pos: 'adverb' },

  // Auxiliary & Common Verbs
  sein: { meaning: 'to be', lemma: 'sein', pos: 'verb' },
  bin: { meaning: 'am', lemma: 'sein', pos: 'verb' },
  bist: { meaning: 'are', lemma: 'sein', pos: 'verb' },
  ist: { meaning: 'is', lemma: 'sein', pos: 'verb' },
  sind: { meaning: 'are', lemma: 'sein', pos: 'verb' },
  seid: { meaning: 'are', lemma: 'sein', pos: 'verb' },
  war: { meaning: 'was', lemma: 'sein', pos: 'verb' },
  waren: { meaning: 'were', lemma: 'sein', pos: 'verb' },
  gewesen: { meaning: 'been', lemma: 'sein', pos: 'verb' },

  haben: { meaning: 'to have', lemma: 'haben', pos: 'verb' },
  habe: { meaning: 'have', lemma: 'haben', pos: 'verb' },
  hast: { meaning: 'have', lemma: 'haben', pos: 'verb' },
  hat: { meaning: 'has', lemma: 'haben', pos: 'verb' },
  habt: { meaning: 'have', lemma: 'haben', pos: 'verb' },
  hatte: { meaning: 'had', lemma: 'haben', pos: 'verb' },
  hatten: { meaning: 'had', lemma: 'haben', pos: 'verb' },
  gehabt: { meaning: 'had', lemma: 'haben', pos: 'verb' },

  werden: { meaning: 'to become / will', lemma: 'werden', pos: 'verb' },
  werde: { meaning: 'will / become', lemma: 'werden', pos: 'verb' },
  wirst: { meaning: 'will / become', lemma: 'werden', pos: 'verb' },
  wird: { meaning: 'becomes / will', lemma: 'werden', pos: 'verb' },
  wurden: { meaning: 'became / were', lemma: 'werden', pos: 'verb' },
  wurde: { meaning: 'became / was', lemma: 'werden', pos: 'verb' },
  geworden: { meaning: 'become', lemma: 'werden', pos: 'verb' },

  können: { meaning: 'can / to be able to', lemma: 'können', pos: 'verb' },
  kann: { meaning: 'can', lemma: 'können', pos: 'verb' },
  kannst: { meaning: 'can', lemma: 'können', pos: 'verb' },
  könnt: { meaning: 'can', lemma: 'können', pos: 'verb' },
  konnte: { meaning: 'could', lemma: 'können', pos: 'verb' },

  müssen: { meaning: 'must / have to', lemma: 'müssen', pos: 'verb' },
  muss: { meaning: 'must', lemma: 'müssen', pos: 'verb' },
  muß: { meaning: 'must', lemma: 'müssen', pos: 'verb' },
  musst: { meaning: 'must', lemma: 'müssen', pos: 'verb' },
  müsst: { meaning: 'must', lemma: 'müssen', pos: 'verb' },
  musste: { meaning: 'had to', lemma: 'müssen', pos: 'verb' },

  wollen: { meaning: 'to want to', lemma: 'wollen', pos: 'verb' },
  will: { meaning: 'wants to', lemma: 'wollen', pos: 'verb' },
  willst: { meaning: 'want to', lemma: 'wollen', pos: 'verb' },
  wollt: { meaning: 'want to', lemma: 'wollen', pos: 'verb' },
  wollte: { meaning: 'wanted to', lemma: 'wollen', pos: 'verb' },

  sollen: { meaning: 'should / ought to', lemma: 'sollen', pos: 'verb' },
  soll: { meaning: 'should', lemma: 'sollen', pos: 'verb' },
  sollst: { meaning: 'should', lemma: 'sollen', pos: 'verb' },
  sollt: { meaning: 'should', lemma: 'sollen', pos: 'verb' },
  sollte: { meaning: 'should', lemma: 'sollen', pos: 'verb' },

  dürfen: { meaning: 'may / allowed to', lemma: 'dürfen', pos: 'verb' },
  darf: { meaning: 'may / allowed to', lemma: 'dürfen', pos: 'verb' },
  darfst: { meaning: 'may', lemma: 'dürfen', pos: 'verb' },
  durfte: { meaning: 'was allowed to', lemma: 'dürfen', pos: 'verb' },

  mögen: { meaning: 'to like', lemma: 'mögen', pos: 'verb' },
  mag: { meaning: 'likes', lemma: 'mögen', pos: 'verb' },
  magst: { meaning: 'like', lemma: 'mögen', pos: 'verb' },
  möchte: { meaning: 'would like', lemma: 'mögen', pos: 'verb' },
  möchtest: { meaning: 'would like', lemma: 'mögen', pos: 'verb' },
  möchten: { meaning: 'would like', lemma: 'mögen', pos: 'verb' },

  gehen: { meaning: 'to go / walk', lemma: 'gehen', pos: 'verb' },
  gehe: { meaning: 'go', lemma: 'gehen', pos: 'verb' },
  gehst: { meaning: 'go', lemma: 'gehen', pos: 'verb' },
  geht: { meaning: 'goes / walks', lemma: 'gehen', pos: 'verb' },
  ging: { meaning: 'went', lemma: 'gehen', pos: 'verb' },
  gegangen: { meaning: 'gone', lemma: 'gehen', pos: 'verb' },

  fahren: { meaning: 'to travel / drive', lemma: 'fahren', pos: 'verb' },
  fahre: { meaning: 'drive / travel', lemma: 'fahren', pos: 'verb' },
  fährst: { meaning: 'drive / travel', lemma: 'fahren', pos: 'verb' },
  fährt: { meaning: 'travels / drives', lemma: 'fahren', pos: 'verb' },
  fuhr: { meaning: 'drove', lemma: 'fahren', pos: 'verb' },
  gefahren: { meaning: 'driven / traveled', lemma: 'fahren', pos: 'verb' },

  kommen: { meaning: 'to come', lemma: 'kommen', pos: 'verb' },
  komme: { meaning: 'come', lemma: 'kommen', pos: 'verb' },
  kommst: { meaning: 'come', lemma: 'kommen', pos: 'verb' },
  kommt: { meaning: 'comes', lemma: 'kommen', pos: 'verb' },
  kam: { meaning: 'came', lemma: 'kommen', pos: 'verb' },
  gekommen: { meaning: 'come', lemma: 'kommen', pos: 'verb' },

  sehen: { meaning: 'to see', lemma: 'sehen', pos: 'verb' },
  sehe: { meaning: 'see', lemma: 'sehen', pos: 'verb' },
  siehst: { meaning: 'see', lemma: 'sehen', pos: 'verb' },
  sieht: { meaning: 'sees', lemma: 'sehen', pos: 'verb' },
  sah: { meaning: 'saw', lemma: 'sehen', pos: 'verb' },
  gesehen: { meaning: 'seen', lemma: 'sehen', pos: 'verb' },

  geben: { meaning: 'to give', lemma: 'geben', pos: 'verb' },
  gebe: { meaning: 'give', lemma: 'geben', pos: 'verb' },
  gibst: { meaning: 'give', lemma: 'geben', pos: 'verb' },
  gibt: { meaning: 'gives / there is', lemma: 'geben', pos: 'verb' },
  gab: { meaning: 'gave', lemma: 'geben', pos: 'verb' },
  gegeben: { meaning: 'given', lemma: 'geben', pos: 'verb' },

  lesen: { meaning: 'to read', lemma: 'lesen', pos: 'verb' },
  lese: { meaning: 'read', lemma: 'lesen', pos: 'verb' },
  liest: { meaning: 'reads', lemma: 'lesen', pos: 'verb' },
  las: { meaning: 'read (past)', lemma: 'lesen', pos: 'verb' },
  gelesen: { meaning: 'read (participle)', lemma: 'lesen', pos: 'verb' },

  schreiben: { meaning: 'to write', lemma: 'schreiben', pos: 'verb' },
  schreibe: { meaning: 'write', lemma: 'schreiben', pos: 'verb' },
  schreibt: { meaning: 'writes', lemma: 'schreiben', pos: 'verb' },
  schrieb: { meaning: 'wrote', lemma: 'schreiben', pos: 'verb' },
  geschrieben: { meaning: 'written', lemma: 'schreiben', pos: 'verb' },

  sprechen: { meaning: 'to speak', lemma: 'sprechen', pos: 'verb' },
  spreche: { meaning: 'speak', lemma: 'sprechen', pos: 'verb' },
  sprichst: { meaning: 'speak', lemma: 'sprechen', pos: 'verb' },
  spricht: { meaning: 'speaks', lemma: 'sprechen', pos: 'verb' },
  sprach: { meaning: 'spoke', lemma: 'sprechen', pos: 'verb' },
  gesprochen: { meaning: 'spoken', lemma: 'sprechen', pos: 'verb' },

  verstehen: { meaning: 'to understand', lemma: 'verstehen', pos: 'verb' },
  verstehe: { meaning: 'understand', lemma: 'verstehen', pos: 'verb' },
  versteht: { meaning: 'understands', lemma: 'verstehen', pos: 'verb' },
  verstand: { meaning: 'understood', lemma: 'verstehen', pos: 'verb' },
  verstanden: { meaning: 'understood', lemma: 'verstehen', pos: 'verb' },

  finden: { meaning: 'to find / think', lemma: 'finden', pos: 'verb' },
  finde: { meaning: 'find', lemma: 'finden', pos: 'verb' },
  findest: { meaning: 'find', lemma: 'finden', pos: 'verb' },
  findet: { meaning: 'finds', lemma: 'finden', pos: 'verb' },
  fand: { meaning: 'found', lemma: 'finden', pos: 'verb' },
  gefunden: { meaning: 'found', lemma: 'finden', pos: 'verb' },

  heißen: { meaning: 'to be called', lemma: 'heißen', pos: 'verb' },
  heisse: { meaning: 'am called', lemma: 'heißen', pos: 'verb' },
  heisst: { meaning: 'is called', lemma: 'heißen', pos: 'verb' },
  heißt: { meaning: 'is called / means', lemma: 'heißen', pos: 'verb' },
  hieß: { meaning: 'was called', lemma: 'heißen', pos: 'verb' },

  wissen: { meaning: 'to know (facts)', lemma: 'wissen', pos: 'verb' },
  weiß: { meaning: 'knows / know', lemma: 'wissen', pos: 'verb' },
  weißt: { meaning: 'know', lemma: 'wissen', pos: 'verb' },
  wusste: { meaning: 'knew', lemma: 'wissen', pos: 'verb' },
  gewusst: { meaning: 'known', lemma: 'wissen', pos: 'verb' },

  kennen: { meaning: 'to know (be familiar)', lemma: 'kennen', pos: 'verb' },
  kenne: { meaning: 'know', lemma: 'kennen', pos: 'verb' },
  kennt: { meaning: 'knows', lemma: 'kennen', pos: 'verb' },
  kannte: { meaning: 'knew', lemma: 'kennen', pos: 'verb' },
  gekannt: { meaning: 'known', lemma: 'kennen', pos: 'verb' },

  denken: { meaning: 'to think', lemma: 'denken', pos: 'verb' },
  denke: { meaning: 'think', lemma: 'denken', pos: 'verb' },
  denkt: { meaning: 'thinks', lemma: 'denken', pos: 'verb' },
  dachte: { meaning: 'thought', lemma: 'denken', pos: 'verb' },
  gedacht: { meaning: 'thought', lemma: 'denken', pos: 'verb' },

  sagen: { meaning: 'to say', lemma: 'sagen', pos: 'verb' },
  sage: { meaning: 'say', lemma: 'sagen', pos: 'verb' },
  sagst: { meaning: 'say', lemma: 'sagen', pos: 'verb' },
  sagt: { meaning: 'says', lemma: 'sagen', pos: 'verb' },
  sagte: { meaning: 'said', lemma: 'sagen', pos: 'verb' },
  gesagt: { meaning: 'said', lemma: 'sagen', pos: 'verb' },

  machen: { meaning: 'to do / make', lemma: 'machen', pos: 'verb' },
  mache: { meaning: 'make / do', lemma: 'machen', pos: 'verb' },
  machst: { meaning: 'make / do', lemma: 'machen', pos: 'verb' },
  macht: { meaning: 'makes / does', lemma: 'machen', pos: 'verb' },
  machte: { meaning: 'made / did', lemma: 'machen', pos: 'verb' },
  gemacht: { meaning: 'made / done', lemma: 'machen', pos: 'verb' },

  lernen: { meaning: 'to learn / study', lemma: 'lernen', pos: 'verb' },
  lerne: { meaning: 'learn', lemma: 'lernen', pos: 'verb' },
  lernst: { meaning: 'learn', lemma: 'lernen', pos: 'verb' },
  lernt: { meaning: 'learns', lemma: 'lernen', pos: 'verb' },
  lernte: { meaning: 'learned', lemma: 'lernen', pos: 'verb' },
  gelernt: { meaning: 'learned', lemma: 'lernen', pos: 'verb' },

  arbeiten: { meaning: 'to work', lemma: 'arbeiten', pos: 'verb' },
  arbeite: { meaning: 'work', lemma: 'arbeiten', pos: 'verb' },
  arbeitet: { meaning: 'works', lemma: 'arbeiten', pos: 'verb' },
  arbeitete: { meaning: 'worked', lemma: 'arbeiten', pos: 'verb' },
  gearbeitet: { meaning: 'worked', lemma: 'arbeiten', pos: 'verb' },

  wohnen: { meaning: 'to live / reside', lemma: 'wohnen', pos: 'verb' },
  wohne: { meaning: 'live', lemma: 'wohnen', pos: 'verb' },
  wohnst: { meaning: 'live', lemma: 'wohnen', pos: 'verb' },
  wohnt: { meaning: 'lives', lemma: 'wohnen', pos: 'verb' },
  wohnte: { meaning: 'lived', lemma: 'wohnen', pos: 'verb' },
  gewohnt: { meaning: 'lived', lemma: 'wohnen', pos: 'verb' },

  brauchen: { meaning: 'to need', lemma: 'brauchen', pos: 'verb' },
  brauche: { meaning: 'need', lemma: 'brauchen', pos: 'verb' },
  brauchst: { meaning: 'need', lemma: 'brauchen', pos: 'verb' },
  braucht: { meaning: 'needs', lemma: 'brauchen', pos: 'verb' },

  helfen: { meaning: 'to help', lemma: 'helfen', pos: 'verb' },
  helfe: { meaning: 'help', lemma: 'helfen', pos: 'verb' },
  hilfst: { meaning: 'help', lemma: 'helfen', pos: 'verb' },
  hilft: { meaning: 'helps', lemma: 'helfen', pos: 'verb' },
  half: { meaning: 'helped', lemma: 'helfen', pos: 'verb' },
  geholfen: { meaning: 'helped', lemma: 'helfen', pos: 'verb' },

  nehmen: { meaning: 'to take', lemma: 'nehmen', pos: 'verb' },
  nehme: { meaning: 'take', lemma: 'nehmen', pos: 'verb' },
  nimmst: { meaning: 'take', lemma: 'nehmen', pos: 'verb' },
  nimmt: { meaning: 'takes', lemma: 'nehmen', pos: 'verb' },
  nahm: { meaning: 'took', lemma: 'nehmen', pos: 'verb' },
  genommen: { meaning: 'taken', lemma: 'nehmen', pos: 'verb' },

  bringen: { meaning: 'to bring', lemma: 'bringen', pos: 'verb' },
  bringe: { meaning: 'bring', lemma: 'bringen', pos: 'verb' },
  bringt: { meaning: 'brings', lemma: 'bringen', pos: 'verb' },
  brachte: { meaning: 'brought', lemma: 'bringen', pos: 'verb' },
  gebracht: { meaning: 'brought', lemma: 'bringen', pos: 'verb' },

  bleiben: { meaning: 'to stay / remain', lemma: 'bleiben', pos: 'verb' },
  bleibe: { meaning: 'stay', lemma: 'bleiben', pos: 'verb' },
  bleibt: { meaning: 'stays', lemma: 'bleiben', pos: 'verb' },
  blieb: { meaning: 'stayed', lemma: 'bleiben', pos: 'verb' },
  geblieben: { meaning: 'stayed', lemma: 'bleiben', pos: 'verb' },

  treffen: { meaning: 'to meet', lemma: 'treffen', pos: 'verb' },
  treffe: { meaning: 'meet', lemma: 'treffen', pos: 'verb' },
  triffst: { meaning: 'meet', lemma: 'treffen', pos: 'verb' },
  trifft: { meaning: 'meets', lemma: 'treffen', pos: 'verb' },
  traf: { meaning: 'met', lemma: 'treffen', pos: 'verb' },
  getroffen: { meaning: 'met', lemma: 'treffen', pos: 'verb' },

  // Common Nouns (lemma + plural)
  mann: { meaning: 'man / husband', lemma: 'Mann', pos: 'noun' },
  männer: { meaning: 'men', lemma: 'Mann', pos: 'noun' },
  frau: { meaning: 'woman / wife', lemma: 'Frau', pos: 'noun' },
  frauen: { meaning: 'women', lemma: 'Frau', pos: 'noun' },
  kind: { meaning: 'child', lemma: 'Kind', pos: 'noun' },
  kinder: { meaning: 'children', lemma: 'Kind', pos: 'noun' },
  kindes: { meaning: 'child (genitive)', lemma: 'Kind', pos: 'noun' },
  tag: { meaning: 'day', lemma: 'Tag', pos: 'noun' },
  tage: { meaning: 'days', lemma: 'Tag', pos: 'noun' },
  tages: { meaning: 'day (genitive)', lemma: 'Tag', pos: 'noun' },
  nacht: { meaning: 'night', lemma: 'Nacht', pos: 'noun' },
  nächte: { meaning: 'nights', lemma: 'Nacht', pos: 'noun' },
  zeit: { meaning: 'time', lemma: 'Zeit', pos: 'noun' },
  zeiten: { meaning: 'times', lemma: 'Zeit', pos: 'noun' },
  jahr: { meaning: 'year', lemma: 'Jahr', pos: 'noun' },
  jahre: { meaning: 'years', lemma: 'Jahr', pos: 'noun' },
  stadt: { meaning: 'city / town', lemma: 'Stadt', pos: 'noun' },
  städte: { meaning: 'cities', lemma: 'Stadt', pos: 'noun' },
  haus: { meaning: 'house', lemma: 'Haus', pos: 'noun' },
  häuser: { meaning: 'houses', lemma: 'Haus', pos: 'noun' },
  buch: { meaning: 'book', lemma: 'Buch', pos: 'noun' },
  bücher: { meaning: 'books', lemma: 'Buch', pos: 'noun' },
  ball: { meaning: 'ball', lemma: 'Ball', pos: 'noun' },
  bälle: { meaning: 'balls', lemma: 'Ball', pos: 'noun' },
  leben: { meaning: 'life', lemma: 'Leben', pos: 'noun' },
  lebens: { meaning: 'life (genitive)', lemma: 'Leben', pos: 'noun' },
  sonne: { meaning: 'sun', lemma: 'Sonne', pos: 'noun' },
  park: { meaning: 'park', lemma: 'Park', pos: 'noun' },
  parks: { meaning: 'parks', lemma: 'Park', pos: 'noun' },
  frage: { meaning: 'question', lemma: 'Frage', pos: 'noun' },
  fragen: { meaning: 'questions', lemma: 'Frage', pos: 'noun' },
  antwort: { meaning: 'answer', lemma: 'Antwort', pos: 'noun' },
  antworten: { meaning: 'answers', lemma: 'Antwort', pos: 'noun' },
  freund: { meaning: 'friend', lemma: 'Freund', pos: 'noun' },
  freunde: { meaning: 'friends', lemma: 'Freund', pos: 'noun' },
  freundin: { meaning: 'friend (female)', lemma: 'Freundin', pos: 'noun' },
  zug: { meaning: 'train', lemma: 'Zug', pos: 'noun' },
  züge: { meaning: 'trains', lemma: 'Zug', pos: 'noun' },
  landschaft: { meaning: 'landscape', lemma: 'Landschaft', pos: 'noun' },
  person: { meaning: 'person', lemma: 'Person', pos: 'noun' },
  personen: { meaning: 'people / persons', lemma: 'Person', pos: 'noun' },
  leute: { meaning: 'people', lemma: 'Leute', pos: 'noun' },
  schweiz: { meaning: 'Switzerland', lemma: 'Schweiz', pos: 'noun' },
  deutschland: { meaning: 'Germany', lemma: 'Deutschland', pos: 'noun' },
  österreich: { meaning: 'Austria', lemma: 'Österreich', pos: 'noun' },
  sprache: { meaning: 'language', lemma: 'Sprache', pos: 'noun' },
  sprachen: { meaning: 'languages', lemma: 'Sprache', pos: 'noun' },
  wort: { meaning: 'word', lemma: 'Wort', pos: 'noun' },
  wörter: { meaning: 'words', lemma: 'Wort', pos: 'noun' },
  schule: { meaning: 'school', lemma: 'Schule', pos: 'noun' },
  arbeit: { meaning: 'work / job', lemma: 'Arbeit', pos: 'noun' },
  welt: { meaning: 'world', lemma: 'Welt', pos: 'noun' },
  weg: { meaning: 'way / path', lemma: 'Weg', pos: 'noun' },
  auto: { meaning: 'car', lemma: 'Auto', pos: 'noun' },
  autos: { meaning: 'cars', lemma: 'Auto', pos: 'noun' },
  geld: { meaning: 'money', lemma: 'Geld', pos: 'noun' },
  wasser: { meaning: 'water', lemma: 'Wasser', pos: 'noun' },
  kaffee: { meaning: 'coffee', lemma: 'Kaffee', pos: 'noun' },
  tee: { meaning: 'tea', lemma: 'Tee', pos: 'noun' },
  brot: { meaning: 'bread', lemma: 'Brot', pos: 'noun' },
  bild: { meaning: 'picture / image', lemma: 'Bild', pos: 'noun' },
  bilder: { meaning: 'pictures', lemma: 'Bild', pos: 'noun' },
  land: { meaning: 'country / land', lemma: 'Land', pos: 'noun' },
  länder: { meaning: 'countries', lemma: 'Land', pos: 'noun' },
  zimmer: { meaning: 'room', lemma: 'Zimmer', pos: 'noun' },
  tisch: { meaning: 'table', lemma: 'Tisch', pos: 'noun' },
  stuhl: { meaning: 'chair', lemma: 'Stuhl', pos: 'noun' },
  stunde: { meaning: 'hour', lemma: 'Stunde', pos: 'noun' },
  minute: { meaning: 'minute', lemma: 'Minute', pos: 'noun' },
  woche: { meaning: 'week', lemma: 'Woche', pos: 'noun' },
  monat: { meaning: 'month', lemma: 'Monat', pos: 'noun' },
  name: { meaning: 'name', lemma: 'Name', pos: 'noun' },
  namen: { meaning: 'names', lemma: 'Name', pos: 'noun' },
  ende: { meaning: 'end', lemma: 'Ende', pos: 'noun' },
  anfang: { meaning: 'beginning', lemma: 'Anfang', pos: 'noun' },
  beispiel: { meaning: 'example', lemma: 'Beispiel', pos: 'noun' },
  satz: { meaning: 'sentence', lemma: 'Satz', pos: 'noun' },
  sätze: { meaning: 'sentences', lemma: 'Satz', pos: 'noun' },
  familie: { meaning: 'family', lemma: 'Familie', pos: 'noun' },
  eltern: { meaning: 'parents', lemma: 'Eltern', pos: 'noun' },
  mutter: { meaning: 'mother', lemma: 'Mutter', pos: 'noun' },
  vater: { meaning: 'father', lemma: 'Vater', pos: 'noun' },
  bruder: { meaning: 'brother', lemma: 'Bruder', pos: 'noun' },
  schwester: { meaning: 'sister', lemma: 'Schwester', pos: 'noun' },
  sohn: { meaning: 'son', lemma: 'Sohn', pos: 'noun' },
  tochter: { meaning: 'daughter', lemma: 'Tochter', pos: 'noun' },
  hund: { meaning: 'dog', lemma: 'Hund', pos: 'noun' },
  katze: { meaning: 'cat', lemma: 'Katze', pos: 'noun' },

  // Common Adjectives
  gut: { meaning: 'good / well', lemma: 'gut', pos: 'adjective' },
  gute: { meaning: 'good', lemma: 'gut', pos: 'adjective' },
  guter: { meaning: 'good', lemma: 'gut', pos: 'adjective' },
  gutes: { meaning: 'good', lemma: 'gut', pos: 'adjective' },
  guten: { meaning: 'good', lemma: 'gut', pos: 'adjective' },
  gutem: { meaning: 'good', lemma: 'gut', pos: 'adjective' },
  besser: { meaning: 'better', lemma: 'gut', pos: 'adjective' },
  beste: { meaning: 'best', lemma: 'gut', pos: 'adjective' },
  bester: { meaning: 'best', lemma: 'gut', pos: 'adjective' },
  besten: { meaning: 'best', lemma: 'gut', pos: 'adjective' },
  bestes: { meaning: 'best', lemma: 'gut', pos: 'adjective' },
  schlecht: { meaning: 'bad', lemma: 'schlecht', pos: 'adjective' },
  groß: { meaning: 'big / great', lemma: 'groß', pos: 'adjective' },
  gross: { meaning: 'big / great', lemma: 'groß', pos: 'adjective' },
  klein: { meaning: 'small / little', lemma: 'klein', pos: 'adjective' },
  alt: { meaning: 'old', lemma: 'alt', pos: 'adjective' },
  neu: { meaning: 'new', lemma: 'neu', pos: 'adjective' },
  jung: { meaning: 'young', lemma: 'jung', pos: 'adjective' },
  schön: { meaning: 'beautiful / nice', lemma: 'schön', pos: 'adjective' },
  wunderschön: { meaning: 'beautiful', lemma: 'wunderschön', pos: 'adjective' },
  wunderschöne: { meaning: 'beautiful', lemma: 'wunderschön', pos: 'adjective' },
  wunderschönen: { meaning: 'beautiful', lemma: 'wunderschön', pos: 'adjective' },
  wunderschöner: { meaning: 'beautiful', lemma: 'wunderschön', pos: 'adjective' },
  wunderschönes: { meaning: 'beautiful', lemma: 'wunderschön', pos: 'adjective' },
  wunderschönem: { meaning: 'beautiful', lemma: 'wunderschön', pos: 'adjective' },
  schnell: { meaning: 'fast / quick', lemma: 'schnell', pos: 'adjective' },
  langsam: { meaning: 'slow', lemma: 'langsam', pos: 'adjective' },
  warm: { meaning: 'warm', lemma: 'warm', pos: 'adjective' },
  kalt: { meaning: 'cold', lemma: 'kalt', pos: 'adjective' },
  heiß: { meaning: 'hot', lemma: 'heiß', pos: 'adjective' },
  teuer: { meaning: 'expensive', lemma: 'teuer', pos: 'adjective' },
  billig: { meaning: 'cheap', lemma: 'billig', pos: 'adjective' },
  günstig: { meaning: 'affordable', lemma: 'günstig', pos: 'adjective' },
  wichtig: { meaning: 'important', lemma: 'wichtig', pos: 'adjective' },
  richtig: { meaning: 'correct / right', lemma: 'richtig', pos: 'adjective' },
  falsch: { meaning: 'wrong / false', lemma: 'falsch', pos: 'adjective' },
  leicht: { meaning: 'easy / light', lemma: 'leicht', pos: 'adjective' },
  schwer: { meaning: 'heavy / hard', lemma: 'schwer', pos: 'adjective' },
  hell: { meaning: 'bright / light', lemma: 'hell', pos: 'adjective' },
  dunkel: { meaning: 'dark', lemma: 'dunkel', pos: 'adjective' },
  viel: { meaning: 'much / a lot', lemma: 'viel', pos: 'adjective' },
  viele: { meaning: 'many', lemma: 'viel', pos: 'adjective' },
  wenig: { meaning: 'little / few', lemma: 'wenig', pos: 'adjective' },
  wenige: { meaning: 'few', lemma: 'wenig', pos: 'adjective' },
  ganz: { meaning: 'whole / quite', lemma: 'ganz', pos: 'adjective' },
  täglich: { meaning: 'daily', lemma: 'täglich', pos: 'adjective' },
  täglichen: { meaning: 'daily', lemma: 'täglich', pos: 'adjective' },
  müde: { meaning: 'tired', lemma: 'müde', pos: 'adjective' },
  glücklich: { meaning: 'happy', lemma: 'glücklich', pos: 'adjective' },
  traurig: { meaning: 'sad', lemma: 'traurig', pos: 'adjective' },
  fertig: { meaning: 'ready / finished', lemma: 'fertig', pos: 'adjective' },
  klar: { meaning: 'clear', lemma: 'klar', pos: 'adjective' },
  stark: { meaning: 'strong', lemma: 'stark', pos: 'adjective' },
  schwach: { meaning: 'weak', lemma: 'schwach', pos: 'adjective' },
};

/**
 * Clean up a translation string: strip parentheses, brackets, and take first sense.
 */
export function cleanMeaning(raw) {
  if (!raw) return '';
  return raw
    .replace(/\(.*?\)/g, '')
    .replace(/\[.*?\]/g, '')
    .split(/[;,/]/)[0]
    .trim();
}

/**
 * Asynchronously fetch word definition from backend dictionary if missing
 */
async function fetchWordFromBackend(rawTerm) {
  const cleanTerm = rawTerm.toLowerCase().trim();
  if (!cleanTerm || pendingLookups.has(cleanTerm)) return;
  pendingLookups.add(cleanTerm);

  try {
    const res = await fetch(`/api/words?search=${encodeURIComponent(cleanTerm)}&limit=1`);
    if (res.ok) {
      const data = await res.json();
      const match = data.words?.[0];
      if (match) {
        const primaryMeaning = cleanMeaning(match.senses?.[0]?.english) || match.lemma;
        dynamicCache.set(cleanTerm, {
          meaning: primaryMeaning,
          lemma: match.lemma,
          pos: match.pos,
          germanDefinition: match.senses?.[0]?.germanDefinition
        });
        notifySubscribers();
      }
    }
  } catch {
    // Ignore network error; fallback remains
  } finally {
    pendingLookups.delete(cleanTerm);
  }
}

/**
 * Get word meaning and metadata.
 * Order of priority:
 * 1. If matches current target word object -> use target word senses
 * 2. Static GERMAN_LEXICON exact match
 * 3. Dynamic backend cache
 * 4. Stemmer / lemmatizer fallback (stripping German adjective & noun endings)
 * 5. Trigger backend lookup in background
 */
export function getWordMeaning(rawWord, targetWordObj = null) {
  if (!rawWord) return { meaning: '', lemma: '' };

  const word = rawWord.trim();
  const lower = word.toLowerCase();

  // 1. Target word object context match
  if (targetWordObj) {
    const targetLemma = (targetWordObj.lemma || '').toLowerCase();
    if (lower === targetLemma || targetLemma.startsWith(lower) || lower.startsWith(targetLemma)) {
      const sense = cleanMeaning(targetWordObj.senses?.[0]?.english);
      if (sense) {
        return {
          meaning: sense,
          lemma: targetWordObj.lemma,
          pos: targetWordObj.pos,
          germanDefinition: targetWordObj.senses?.[0]?.germanDefinition
        };
      }
    }
  }

  // 2. Direct lexicon lookup
  if (GERMAN_LEXICON[lower]) {
    return GERMAN_LEXICON[lower];
  }

  // Capitalized noun lookup (e.g. Zug, Landschaft)
  if (GERMAN_LEXICON[word]) {
    return GERMAN_LEXICON[word];
  }

  // 3. Dynamic cache lookup
  if (dynamicCache.has(lower)) {
    return dynamicCache.get(lower);
  }

  // 4. Stemmer rules for German inflections
  // A. Adjective endings (-e, -en, -er, -es, -em, -ste, -sten)
  const adjEndings = ['sten', 'ste', 'ten', 'tem', 'ter', 'tes', 'en', 'em', 'er', 'es', 'e'];
  for (const end of adjEndings) {
    if (lower.length > end.length + 3 && lower.endsWith(end)) {
      const stem = lower.slice(0, -end.length);
      if (GERMAN_LEXICON[stem]) {
        return {
          meaning: GERMAN_LEXICON[stem].meaning,
          lemma: GERMAN_LEXICON[stem].lemma,
          pos: GERMAN_LEXICON[stem].pos
        };
      }
    }
  }

  // B. Noun plurals (-en, -er, -e, -n, -s)
  const nounEndings = ['en', 'er', 'e', 'n', 's'];
  for (const end of nounEndings) {
    if (lower.length > end.length + 3 && lower.endsWith(end)) {
      const stem = lower.slice(0, -end.length);
      if (GERMAN_LEXICON[stem]) {
        return {
          meaning: GERMAN_LEXICON[stem].meaning,
          lemma: GERMAN_LEXICON[stem].lemma,
          pos: 'noun'
        };
      }
    }
  }

  // C. Verb prefixes / ge- participles (e.g. gefahren -> fahren)
  if (lower.startsWith('ge') && lower.endsWith('en') && lower.length > 5) {
    const base = lower.slice(2);
    if (GERMAN_LEXICON[base]) {
      return GERMAN_LEXICON[base];
    }
  }

  // 5. Query backend in background for next time
  fetchWordFromBackend(lower);

  // Return best guess fallback
  return {
    meaning: word,
    lemma: word,
    pos: 'word'
  };
}
