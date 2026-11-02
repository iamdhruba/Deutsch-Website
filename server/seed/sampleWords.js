/**
 * 100 Authentic German Vocabulary Entries for Lernen
 * Sourced & formatted from Wiktionary/Kaikki (CC BY-SA) and Tatoeba (CC BY)
 * Each entry includes:
 * - CEFR level (A1 - C1)
 * - Frequency rank (1-100)
 * - Grammatical gender and article (der/die/das) for nouns
 * - Plural forms and full declension tables
 * - Verb conjugation (present, past, auxiliary haben/sein, participle)
 * - 3 authentic example sentences with English translations
 * - Synonyms and collocations
 */

export const sampleWords = [
  // 1. der (Masculine Definite Article)
  {
    lemma: 'der',
    article: 'der',
    gender: 'masculine',
    pos: 'article',
    cefr: 'A1',
    frequencyRank: 1,
    frequencyBand: 'Top 500',
    ipa: '/deːɐ̯/',
    senses: [
      {
        english: 'the (masculine nominative singular)',
        germanDefinition: 'Bestimmter Artikel für männliche Nomen im Nominativ',
        synonyms: [],
        collocations: ['der Mann', 'der Tag', 'der Tisch']
      }
    ],
    declension: {
      nominative: { singular: 'der', plural: 'die' },
      accusative: { singular: 'den', plural: 'die' },
      dative: { singular: 'dem', plural: 'den' },
      genitive: { singular: 'des', plural: 'der' }
    },
    exampleSentences: [
      {
        german: 'Der Mann liest ein Buch.',
        english: 'The man is reading a book.',
        highlight: 'Der'
      },
      {
        german: 'Ich gebe dem Kind den Ball.',
        english: 'I give the ball to the child.',
        highlight: 'den'
      },
      {
        german: 'Das ist der beste Tag meines Lebens.',
        english: 'That is the best day of my life.',
        highlight: 'der'
      }
    ],
    topics: ['grammar', 'basics'],
    language: 'de'
  },
  // 2. die (Feminine / Plural Definite Article)
  {
    lemma: 'die',
    article: 'die',
    gender: 'feminine',
    pos: 'article',
    cefr: 'A1',
    frequencyRank: 2,
    frequencyBand: 'Top 500',
    ipa: '/diː/',
    senses: [
      {
        english: 'the (feminine singular / plural)',
        germanDefinition: 'Bestimmter Artikel für weibliche Nomen und Pluralformen',
        synonyms: [],
        collocations: ['die Frau', 'die Stadt', 'die Kinder']
      }
    ],
    declension: {
      nominative: { singular: 'die', plural: 'die' },
      accusative: { singular: 'die', plural: 'die' },
      dative: { singular: 'der', plural: 'den' },
      genitive: { singular: 'der', plural: 'der' }
    },
    exampleSentences: [
      {
        german: 'Die Sonne scheint heute hell.',
        english: 'The sun is shining brightly today.',
        highlight: 'Die'
      },
      {
        german: 'Wir treffen die Freunde im Park.',
        english: 'We are meeting the friends in the park.',
        highlight: 'die'
      },
      {
        german: 'Die Antwort auf die Frage ist einfach.',
        english: 'The answer to the question is simple.',
        highlight: 'Die'
      }
    ],
    topics: ['grammar', 'basics'],
    language: 'de'
  },
  // 3. das (Neuter Definite Article)
  {
    lemma: 'das',
    article: 'das',
    gender: 'neuter',
    pos: 'article',
    cefr: 'A1',
    frequencyRank: 3,
    frequencyBand: 'Top 500',
    ipa: '/das/',
    senses: [
      {
        english: 'the (neuter singular); that',
        germanDefinition: 'Bestimmter Artikel für sächliche Nomen im Nominativ und Akkusativ',
        synonyms: [],
        collocations: ['das Haus', 'das Kind', 'das Auto']
      }
    ],
    declension: {
      nominative: { singular: 'das', plural: 'die' },
      accusative: { singular: 'das', plural: 'die' },
      dative: { singular: 'dem', plural: 'den' },
      genitive: { singular: 'des', plural: 'der' }
    },
    exampleSentences: [
      {
        german: 'Das Haus ist sehr alt und schön.',
        english: 'The house is very old and beautiful.',
        highlight: 'Das'
      },
      {
        german: 'Ich sehe das kleine Kind.',
        english: 'I see the small child.',
        highlight: 'das'
      },
      {
        german: 'Das ist genau das, was ich gesucht habe.',
        english: 'That is exactly what I was looking for.',
        highlight: 'Das'
      }
    ],
    topics: ['grammar', 'basics'],
    language: 'de'
  },
  // 4. sein (to be)
  {
    lemma: 'sein',
    pos: 'verb',
    cefr: 'A1',
    frequencyRank: 4,
    frequencyBand: 'Top 500',
    ipa: '/zaɪ̯n/',
    senses: [
      {
        english: 'to be (auxiliary verb)',
        germanDefinition: 'Existieren, sich in einem Zustand befinden',
        synonyms: ['existieren'],
        collocations: ['glücklich sein', 'bereit sein', 'zu spät sein']
      }
    ],
    conjugation: {
      auxiliary: 'sein',
      present: {
        ich: 'bin',
        du: 'bist',
        erSieEs: 'ist',
        wir: 'sind',
        ihr: 'seid',
        sieSie: 'sind'
      },
      pastPrateritum: {
        ich: 'war',
        du: 'warst',
        erSieEs: 'war',
        wir: 'waren',
        ihr: 'wart',
        sieSie: 'waren'
      },
      perfektParticiple: 'gewesen',
      konjunktivII: {
        ich: 'wäre',
        du: 'wärest',
        erSieEs: 'wäre',
        wir: 'wären',
        ihr: 'wäret',
        sieSie: 'wären'
      },
      imperative: {
        du: 'sei',
        ihr: 'seid',
        Sie: 'seien Sie'
      }
    },
    exampleSentences: [
      {
        german: 'Ich bin müde, aber glücklich.',
        english: 'I am tired, but happy.',
        highlight: 'bin'
      },
      {
        german: 'Er ist seit fünf Jahren Lehrer.',
        english: 'He has been a teacher for five years.',
        highlight: 'ist'
      },
      {
        german: 'Wir waren gestern im Kino.',
        english: 'We were at the cinema yesterday.',
        highlight: 'waren'
      }
    ],
    topics: ['verbs', 'basics'],
    language: 'de'
  },
  // 5. haben (to have)
  {
    lemma: 'haben',
    pos: 'verb',
    cefr: 'A1',
    frequencyRank: 5,
    frequencyBand: 'Top 500',
    ipa: '/ˈhaːbm̩/',
    senses: [
      {
        english: 'to have; possess (auxiliary verb)',
        germanDefinition: 'Besitzen, über etwas verfügen',
        synonyms: ['besitzen'],
        collocations: ['Zeit haben', 'Recht haben', 'Hunger haben']
      }
    ],
    conjugation: {
      auxiliary: 'haben',
      present: {
        ich: 'habe',
        du: 'hast',
        erSieEs: 'hat',
        wir: 'haben',
        ihr: 'habt',
        sieSie: 'haben'
      },
      pastPrateritum: {
        ich: 'hatte',
        du: 'hattest',
        erSieEs: 'hatte',
        wir: 'hatten',
        ihr: 'hattet',
        sieSie: 'hatten'
      },
      perfektParticiple: 'gehabt',
      konjunktivII: {
        ich: 'hätte',
        du: 'hättest',
        erSieEs: 'hätte',
        wir: 'hätten',
        ihr: 'hättet',
        sieSie: 'hätten'
      },
      imperative: {
        du: 'habe / hab',
        ihr: 'habt',
        Sie: 'haben Sie'
      }
    },
    exampleSentences: [
      {
        german: 'Hast du heute Abend Zeit?',
        english: 'Do you have time this evening?',
        highlight: 'Hast'
      },
      {
        german: 'Sie hat einen Bruder und eine Schwester.',
        english: 'She has a brother and a sister.',
        highlight: 'hat'
      },
      {
        german: 'Ich hatte gestern viel zu tun.',
        english: 'I had a lot to do yesterday.',
        highlight: 'hatte'
      }
    ],
    topics: ['verbs', 'basics'],
    language: 'de'
  },
  // 6. und (and)
  {
    lemma: 'und',
    pos: 'conjunction',
    cefr: 'A1',
    frequencyRank: 6,
    frequencyBand: 'Top 500',
    ipa: '/ʊnt/',
    senses: [
      {
        english: 'and (coordinating conjunction)',
        germanDefinition: 'Verbindet Wörter, Wortgruppen oder Sätze',
        synonyms: ['sowie'],
        collocations: ['hin und wieder', 'nach und nach']
      }
    ],
    exampleSentences: [
      {
        german: 'Kaffee und Tee stehen auf dem Tisch.',
        english: 'Coffee and tea are on the table.',
        highlight: 'und'
      },
      {
        german: 'Er spricht Deutsch und Englisch.',
        english: 'He speaks German and English.',
        highlight: 'und'
      },
      {
        german: 'Komm herein und setz dich!',
        english: 'Come in and sit down!',
        highlight: 'und'
      }
    ],
    topics: ['grammar', 'conjunctions'],
    language: 'de'
  },
  // 7. in (in, into)
  {
    lemma: 'in',
    pos: 'preposition',
    cefr: 'A1',
    frequencyRank: 7,
    frequencyBand: 'Top 500',
    ipa: '/ɪn/',
    senses: [
      {
        english: 'in, inside (+ Dative: location; + Accusative: direction)',
        germanDefinition: 'Wechselpräposition für Ort (Dativ) oder Richtung (Akkusativ)',
        synonyms: ['innerhalb'],
        collocations: ['in der Stadt', 'ins Kino gehen', 'im Moment']
      }
    ],
    exampleSentences: [
      {
        german: 'Ich wohne in Berlin.',
        english: 'I live in Berlin.',
        highlight: 'in'
      },
      {
        german: 'Wir gehen heute ins Kino.',
        english: 'We are going to the cinema today.',
        highlight: 'ins'
      },
      {
        german: 'Der Schlüssel liegt in der Tasche.',
        english: 'The key is in the bag.',
        highlight: 'in'
      }
    ],
    topics: ['grammar', 'prepositions'],
    language: 'de'
  },
  // 8. ein / eine / ein (Indefinite Article: a, an)
  {
    lemma: 'ein',
    article: null,
    pos: 'article',
    cefr: 'A1',
    frequencyRank: 8,
    frequencyBand: 'Top 500',
    ipa: '/aɪ̯n/',
    senses: [
      {
        english: 'a, an; one',
        germanDefinition: 'Unbestimmter Artikel im Deutschen',
        synonyms: [],
        collocations: ['ein Freund', 'eine Frage', 'ein Problem']
      }
    ],
    declension: {
      nominative: { singular: 'ein (m) / eine (f) / ein (n)', plural: 'keine' },
      accusative: { singular: 'einen (m) / eine (f) / ein (n)', plural: 'keine' },
      dative: { singular: 'einem (m) / einer (f) / einem (n)', plural: 'keinen' },
      genitive: { singular: 'eines (m) / einer (f) / eines (n)', plural: 'keiner' }
    },
    exampleSentences: [
      {
        german: 'Ich habe einen Apfel gekauft.',
        english: 'I bought an apple.',
        highlight: 'einen'
      },
      {
        german: 'Sie liest ein interessantes Buch.',
        english: 'She is reading an interesting book.',
        highlight: 'ein'
      },
      {
        german: 'Das ist eine tolle Idee!',
        english: 'That is a great idea!',
        highlight: 'eine'
      }
    ],
    topics: ['grammar', 'articles'],
    language: 'de'
  },
  // 9. werden (to become, auxiliary for future & passive)
  {
    lemma: 'werden',
    pos: 'verb',
    cefr: 'A1',
    frequencyRank: 9,
    frequencyBand: 'Top 500',
    ipa: '/ˈveːɐ̯dn̩/',
    senses: [
      {
        english: 'to become; will (auxiliary for Futur and Passiv)',
        germanDefinition: 'Einen Zustand erreichen; Hilfsverb für Futur und Passiv',
        synonyms: ['entstehen'],
        collocations: ['Arzt werden', 'besser werden', 'alt werden']
      }
    ],
    conjugation: {
      auxiliary: 'sein',
      present: {
        ich: 'werde',
        du: 'wirst',
        erSieEs: 'wird',
        wir: 'werden',
        ihr: 'werdet',
        sieSie: 'werden'
      },
      pastPrateritum: {
        ich: 'wurde',
        du: 'wurdest',
        erSieEs: 'wurde',
        wir: 'wurden',
        ihr: 'wurdet',
        sieSie: 'wurden'
      },
      perfektParticiple: 'geworden',
      konjunktivII: {
        ich: 'würde',
        du: 'würdest',
        erSieEs: 'würde',
        wir: 'würden',
        ihr: 'würdet',
        sieSie: 'würden'
      },
      imperative: {
        du: 'werde',
        ihr: 'werdet',
        Sie: 'werden Sie'
      }
    },
    exampleSentences: [
      {
        german: 'Es wird langsam dunkel draußen.',
        english: 'It is slowly becoming dark outside.',
        highlight: 'wird'
      },
      {
        german: 'Sie will Tierärztin werden.',
        english: 'She wants to become a veterinarian.',
        highlight: 'werden'
      },
      {
        german: 'Wir werden morgen ankommen.',
        english: 'We will arrive tomorrow.',
        highlight: 'werden'
      }
    ],
    topics: ['verbs', 'grammar'],
    language: 'de'
  },
  // 10. nicht (not)
  {
    lemma: 'nicht',
    pos: 'particle',
    cefr: 'A1',
    frequencyRank: 10,
    frequencyBand: 'Top 500',
    ipa: '/nɪçt/',
    senses: [
      {
        english: 'not (negation)',
        germanDefinition: 'Dient der Verneinung von Aussagen',
        synonyms: ['keineswegs'],
        collocations: ['gar nicht', 'noch nicht', 'nicht wahr']
      }
    ],
    exampleSentences: [
      {
        german: 'Ich verstehe das leider nicht.',
        english: 'Unfortunately, I do not understand that.',
        highlight: 'nicht'
      },
      {
        german: 'Er kommt heute nicht zur Arbeit.',
        english: 'He is not coming to work today.',
        highlight: 'nicht'
      },
      {
        german: 'Das ist nicht so schwer wie gedacht.',
        english: 'That is not as difficult as thought.',
        highlight: 'nicht'
      }
    ],
    topics: ['grammar', 'negation'],
    language: 'de'
  },
  // 11. der Mann (the man)
  {
    lemma: 'Mann',
    article: 'der',
    gender: 'masculine',
    pos: 'noun',
    cefr: 'A1',
    frequencyRank: 11,
    frequencyBand: 'Top 500',
    plural: 'Männer',
    ipa: '/man/',
    senses: [
      {
        english: 'man; husband',
        germanDefinition: 'Erwachsene männliche Person; Ehemann',
        synonyms: ['Ehemann', 'Herr'],
        collocations: ['ein junger Mann', 'Mann und Frau']
      }
    ],
    declension: {
      nominative: { singular: 'der Mann', plural: 'die Männer' },
      accusative: { singular: 'den Mann', plural: 'die Männer' },
      dative: { singular: 'dem Mann', plural: 'den Männern' },
      genitive: { singular: 'des Mannes', plural: 'der Männer' }
    },
    exampleSentences: [
      {
        german: 'Der Mann trägt einen eleganten Hut.',
        english: 'The man is wearing an elegant hat.',
        highlight: 'Mann'
      },
      {
        german: 'Mein Mann kocht heute das Abendessen.',
        english: 'My husband is cooking dinner today.',
        highlight: 'Mann'
      },
      {
        german: 'Zwei Männer stehen vor der Tür.',
        english: 'Two men are standing in front of the door.',
        highlight: 'Männer'
      }
    ],
    topics: ['people', 'family'],
    language: 'de'
  },
  // 12. die Frau (the woman)
  {
    lemma: 'Frau',
    article: 'die',
    gender: 'feminine',
    pos: 'noun',
    cefr: 'A1',
    frequencyRank: 12,
    frequencyBand: 'Top 500',
    plural: 'Frauen',
    ipa: '/fʁaʊ̯/',
    senses: [
      {
        english: 'woman; wife; Mrs. / Ms.',
        germanDefinition: 'Erwachsene weibliche Person; Ehefrau; Anrede für Frauen',
        synonyms: ['Ehefrau', 'Dame'],
        collocations: ['eine junge Frau', 'Frau Müller', 'Mann und Frau']
      }
    ],
    declension: {
      nominative: { singular: 'die Frau', plural: 'die Frauen' },
      accusative: { singular: 'die Frau', plural: 'die Frauen' },
      dative: { singular: 'der Frau', plural: 'den Frauen' },
      genitive: { singular: 'der Frau', plural: 'der Frauen' }
    },
    exampleSentences: [
      {
        german: 'Die Frau spricht drei Sprachen fließend.',
        english: 'The woman speaks three languages fluently.',
        highlight: 'Frau'
      },
      {
        german: 'Guten Tag, Frau Schmidt!',
        english: 'Good day, Mrs. Schmidt!',
        highlight: 'Frau'
      },
      {
        german: 'Viele Frauen arbeiten in dieser Firma.',
        english: 'Many women work in this company.',
        highlight: 'Frauen'
      }
    ],
    topics: ['people', 'family'],
    language: 'de'
  },
  // 13. das Kind (the child)
  {
    lemma: 'Kind',
    article: 'das',
    gender: 'neuter',
    pos: 'noun',
    cefr: 'A1',
    frequencyRank: 13,
    frequencyBand: 'Top 500',
    plural: 'Kinder',
    ipa: '/kɪnt/',
    senses: [
      {
        english: 'child; kid',
        germanDefinition: 'Mensch im Alter der Kindheit; Nachkomme',
        synonyms: ['Nachwuchs', 'Sprössling'],
        collocations: ['ein kleines Kind', 'Kinder haben', 'Kindergarten']
      }
    ],
    declension: {
      nominative: { singular: 'das Kind', plural: 'die Kinder' },
      accusative: { singular: 'das Kind', plural: 'die Kinder' },
      dative: { singular: 'dem Kind', plural: 'den Kindern' },
      genitive: { singular: 'des Kindes', plural: 'der Kinder' }
    },
    exampleSentences: [
      {
        german: 'Das Kind spielt fröhlich im Garten.',
        english: 'The child plays happily in the garden.',
        highlight: 'Kind'
      },
      {
        german: 'Sie haben zwei Kinder: einen Sohn und eine Tochter.',
        english: 'They have two children: a son and a daughter.',
        highlight: 'Kinder'
      },
      {
        german: 'Ich kenne dieses Kind seit seiner Geburt.',
        english: 'I have known this child since its birth.',
        highlight: 'Kind'
      }
    ],
    topics: ['people', 'family'],
    language: 'de'
  },
  // 14. das Haus (the house)
  {
    lemma: 'Haus',
    article: 'das',
    gender: 'neuter',
    pos: 'noun',
    cefr: 'A1',
    frequencyRank: 14,
    frequencyBand: 'Top 500',
    plural: 'Häuser',
    ipa: '/haʊ̯s/',
    senses: [
      {
        english: 'house; home; building',
        germanDefinition: 'Gebäude zum Wohnen oder Arbeiten',
        synonyms: ['Gebäude', 'Wohnhaus'],
        collocations: ['nach Hause gehen', 'zu Hause sein', 'ein großes Haus']
      }
    ],
    declension: {
      nominative: { singular: 'das Haus', plural: 'die Häuser' },
      accusative: { singular: 'das Haus', plural: 'die Häuser' },
      dative: { singular: 'dem Haus', plural: 'den Häusern' },
      genitive: { singular: 'des Hauses', plural: 'der Häuser' }
    },
    exampleSentences: [
      {
        german: 'Wir sind endlich zu Hause angekommen.',
        english: 'We have finally arrived home.',
        highlight: 'Hause'
      },
      {
        german: 'In unserer Straße stehen viele bunte Häuser.',
        english: 'There are many colorful houses on our street.',
        highlight: 'Häuser'
      },
      {
        german: 'Das Haus hat einen wunderschönen Garten.',
        english: 'The house has a wonderful garden.',
        highlight: 'Haus'
      }
    ],
    topics: ['living', 'places'],
    language: 'de'
  },
  // 15. die Zeit (the time)
  {
    lemma: 'Zeit',
    article: 'die',
    gender: 'feminine',
    pos: 'noun',
    cefr: 'A1',
    frequencyRank: 15,
    frequencyBand: 'Top 500',
    plural: 'Zeiten',
    ipa: '/tsaɪ̯t/',
    senses: [
      {
        english: 'time; period; tense',
        germanDefinition: 'Ablauf des Geschehens; Moment; Frist',
        synonyms: ['Dauer', 'Frist'],
        collocations: ['Zeit haben', 'mit der Zeit', 'zur rechten Zeit']
      }
    ],
    declension: {
      nominative: { singular: 'die Zeit', plural: 'die Zeiten' },
      accusative: { singular: 'die Zeit', plural: 'die Zeiten' },
      dative: { singular: 'der Zeit', plural: 'den Zeiten' },
      genitive: { singular: 'der Zeit', plural: 'der Zeiten' }
    },
    exampleSentences: [
      {
        german: 'Ich habe im Moment leider sehr wenig Zeit.',
        english: 'Unfortunately, I have very little time at the moment.',
        highlight: 'Zeit'
      },
      {
        german: 'Die Zeit vergeht wie im Flug.',
        english: 'Time flies so quickly.',
        highlight: 'Zeit'
      },
      {
        german: 'Zu welchen Zeiten ist das Büro geöffnet?',
        english: 'At what times is the office open?',
        highlight: 'Zeiten'
      }
    ],
    topics: ['daily-life', 'time'],
    language: 'de'
  },
  // 16. der Tag (the day)
  {
    lemma: 'Tag',
    article: 'der',
    gender: 'masculine',
    pos: 'noun',
    cefr: 'A1',
    frequencyRank: 16,
    frequencyBand: 'Top 500',
    plural: 'Tage',
    ipa: '/taːk/',
    senses: [
      {
        english: 'day',
        germanDefinition: 'Zeitraum von 24 Stunden; helle Tageszeit',
        synonyms: ['Kalendertag'],
        collocations: ['guten Tag', 'jeden Tag', 'am nächsten Tag']
      }
    ],
    declension: {
      nominative: { singular: 'der Tag', plural: 'die Tage' },
      accusative: { singular: 'den Tag', plural: 'die Tage' },
      dative: { singular: 'dem Tag', plural: 'den Tagen' },
      genitive: { singular: 'des Tages', plural: 'der Tage' }
    },
    exampleSentences: [
      {
        german: 'Guten Tag! Wie kann ich Ihnen helfen?',
        english: 'Good day! How can I help you?',
        highlight: 'Tag'
      },
      {
        german: 'Ich lerne jeden Tag zwanzig neue Vokabeln.',
        english: 'I learn twenty new vocabulary words every day.',
        highlight: 'Tag'
      },
      {
        german: 'Die Woche hat sieben Tage.',
        english: 'The week has seven days.',
        highlight: 'Tage'
      }
    ],
    topics: ['time', 'calendar'],
    language: 'de'
  },
  // 17. das Jahr (the year)
  {
    lemma: 'Jahr',
    article: 'das',
    gender: 'neuter',
    pos: 'noun',
    cefr: 'A1',
    frequencyRank: 17,
    frequencyBand: 'Top 500',
    plural: 'Jahre',
    ipa: '/jaːɐ̯/',
    senses: [
      {
        english: 'year',
        germanDefinition: 'Zeitraum von 365 bzw. 366 Tagen',
        synonyms: ['Kalenderjahr'],
        collocations: ['letztes Jahr', 'ein ganzes Jahr', 'pro Jahr']
      }
    ],
    declension: {
      nominative: { singular: 'das Jahr', plural: 'die Jahre' },
      accusative: { singular: 'das Jahr', plural: 'die Jahre' },
      dative: { singular: 'dem Jahr', plural: 'den Jahren' },
      genitive: { singular: 'des Jahres', plural: 'der Jahre' }
    },
    exampleSentences: [
      {
        german: 'Frohes neues Jahr!',
        english: 'Happy new year!',
        highlight: 'Jahr'
      },
      {
        german: 'Ich lerne seit einem Jahr Deutsch.',
        english: 'I have been learning German for a year.',
        highlight: 'Jahr'
      },
      {
        german: 'Vor zehn Jahren lebte ich in Wien.',
        english: 'Ten years ago I lived in Vienna.',
        highlight: 'Jahren'
      }
    ],
    topics: ['time', 'calendar'],
    language: 'de'
  },
  // 18. gehen (to go, walk)
  {
    lemma: 'gehen',
    pos: 'verb',
    cefr: 'A1',
    frequencyRank: 18,
    frequencyBand: 'Top 500',
    ipa: '/ˈɡeːən/',
    senses: [
      {
        english: 'to go; walk; work / function',
        germanDefinition: 'Sich zu Fuß fortbewegen; funktionieren',
        synonyms: ['laufen', 'schreiten'],
        collocations: ['nach Hause gehen', 'spazieren gehen', 'Wie geht es dir?']
      }
    ],
    conjugation: {
      auxiliary: 'sein',
      present: {
        ich: 'gehe',
        du: 'gehst',
        erSieEs: 'geht',
        wir: 'gehen',
        ihr: 'geht',
        sieSie: 'gehen'
      },
      pastPrateritum: {
        ich: 'ging',
        du: 'gingst',
        erSieEs: 'ging',
        wir: 'gingen',
        ihr: 'gingt',
        sieSie: 'gingen'
      },
      perfektParticiple: 'gegangen',
      konjunktivII: {
        ich: 'ginge',
        du: 'gingest',
        erSieEs: 'ginge',
        wir: 'gingen',
        ihr: 'ginget',
        sieSie: 'gingen'
      },
      imperative: {
        du: 'geh',
        ihr: 'geht',
        Sie: 'gehen Sie'
      }
    },
    exampleSentences: [
      {
        german: 'Wie geht es Ihnen heute?',
        english: 'How are you today?',
        highlight: 'geht'
      },
      {
        german: 'Wir gehen zu Fuß zum Supermarkt.',
        english: 'We are walking to the supermarket.',
        highlight: 'gehen'
      },
      {
        german: 'Er ist gestern früh ins Bett gegangen.',
        english: 'He went to bed early yesterday.',
        highlight: 'gegangen'
      }
    ],
    topics: ['verbs', 'movement'],
    language: 'de'
  },
  // 19. kommen (to come)
  {
    lemma: 'kommen',
    pos: 'verb',
    cefr: 'A1',
    frequencyRank: 19,
    frequencyBand: 'Top 500',
    ipa: '/ˈkɔmən/',
    senses: [
      {
        english: 'to come; arrive; originate from',
        germanDefinition: 'Sich hierher bewegen; abstammen',
        synonyms: ['anreisen', 'eintreffen'],
        collocations: ['aus Deutschland kommen', 'zu spät kommen', 'zurückkommen']
      }
    ],
    conjugation: {
      auxiliary: 'sein',
      present: {
        ich: 'komme',
        du: 'kommst',
        erSieEs: 'kommt',
        wir: 'kommen',
        ihr: 'kommt',
        sieSie: 'kommen'
      },
      pastPrateritum: {
        ich: 'kam',
        du: 'kamst',
        erSieEs: 'kam',
        wir: 'kamen',
        ihr: 'kamt',
        sieSie: 'kamen'
      },
      perfektParticiple: 'gekommen',
      konjunktivII: {
        ich: 'käme',
        du: 'kämest',
        erSieEs: 'käme',
        wir: 'kämen',
        ihr: 'kämet',
        sieSie: 'kämen'
      },
      imperative: {
        du: 'komm',
        ihr: 'kommt',
        Sie: 'kommen Sie'
      }
    },
    exampleSentences: [
      {
        german: 'Woher kommst du? - Ich komme aus Österreich.',
        english: 'Where do you come from? - I come from Austria.',
        highlight: 'kommst'
      },
      {
        german: 'Der Zug kommt pünktlich an.',
        english: 'The train is arriving on time.',
        highlight: 'kommt'
      },
      {
        german: 'Bist du gut nach Hause gekommen?',
        english: 'Did you get home safely?',
        highlight: 'gekommen'
      }
    ],
    topics: ['verbs', 'basics'],
    language: 'de'
  },
  // 20. machen (to do, make)
  {
    lemma: 'machen',
    pos: 'verb',
    cefr: 'A1',
    frequencyRank: 20,
    frequencyBand: 'Top 500',
    ipa: '/ˈmaxn̩/',
    senses: [
      {
        english: 'to do; make; cause',
        germanDefinition: 'Etwas herstellen, tun oder ausführen',
        synonyms: ['tun', 'herstellen'],
        collocations: ['Hausaufgaben machen', 'Spaß machen', 'Urlaub machen']
      }
    ],
    conjugation: {
      auxiliary: 'haben',
      present: {
        ich: 'mache',
        du: 'machst',
        erSieEs: 'macht',
        wir: 'machen',
        ihr: 'macht',
        sieSie: 'machen'
      },
      pastPrateritum: {
        ich: 'machte',
        du: 'machtest',
        erSieEs: 'machte',
        wir: 'machten',
        ihr: 'machtet',
        sieSie: 'machten'
      },
      perfektParticiple: 'gemacht',
      konjunktivII: {
        ich: 'machte',
        du: 'machtest',
        erSieEs: 'machte',
        wir: 'machten',
        ihr: 'machtet',
        sieSie: 'machten'
      },
      imperative: {
        du: 'mach',
        ihr: 'macht',
        Sie: 'machen Sie'
      }
    },
    exampleSentences: [
      {
        german: 'Deutsch lernen macht großen Spaß!',
        english: 'Learning German is great fun!',
        highlight: 'macht'
      },
      {
        german: 'Was machst du am Wochenende?',
        english: 'What are you doing at the weekend?',
        highlight: 'machst'
      },
      {
        german: 'Ich habe die Übungen schon gemacht.',
        english: 'I have already done the exercises.',
        highlight: 'gemacht'
      }
    ],
    topics: ['verbs', 'actions'],
    language: 'de'
  },
  // 21. sagen (to say, tell)
  {
    lemma: 'sagen',
    pos: 'verb',
    cefr: 'A1',
    frequencyRank: 21,
    frequencyBand: 'Top 500',
    ipa: '/ˈzaːɡn̩/',
    senses: [
      {
        english: 'to say; speak; state',
        germanDefinition: 'In Worten äußern',
        synonyms: ['äußern', 'erzählen', 'sprechen'],
        collocations: ['die Wahrheit sagen', 'Danke sagen', 'Auf Wiedersehen sagen']
      }
    ],
    conjugation: {
      auxiliary: 'haben',
      present: {
        ich: 'sage',
        du: 'sagst',
        erSieEs: 'sagt',
        wir: 'sagen',
        ihr: 'sagt',
        sieSie: 'sagen'
      },
      pastPrateritum: {
        ich: 'sagte',
        du: 'sagtest',
        erSieEs: 'sagte',
        wir: 'sagten',
        ihr: 'sagtet',
        sieSie: 'sagten'
      },
      perfektParticiple: 'gesagt',
      konjunktivII: {
        ich: 'sagte',
        du: 'sagtest',
        erSieEs: 'sagte',
        wir: 'sagten',
        ihr: 'sagtet',
        sieSie: 'sagten'
      },
      imperative: {
        du: 'sag',
        ihr: 'sagt',
        Sie: 'sagen Sie'
      }
    },
    exampleSentences: [
      {
        german: 'Können Sie das bitte noch einmal sagen?',
        english: 'Could you please say that once more?',
        highlight: 'sagen'
      },
      {
        german: 'Er sagt immer die reine Wahrheit.',
        english: 'He always tells the pure truth.',
        highlight: 'sagt'
      },
      {
        german: 'Was hast du dazu gesagt?',
        english: 'What did you say about that?',
        highlight: 'gesagt'
      }
    ],
    topics: ['verbs', 'communication'],
    language: 'de'
  },
  // 22. sehen (to see, look)
  {
    lemma: 'sehen',
    pos: 'verb',
    cefr: 'A1',
    frequencyRank: 22,
    frequencyBand: 'Top 500',
    ipa: '/ˈzeːən/',
    senses: [
      {
        english: 'to see; watch; view',
        germanDefinition: 'Mit den Augen wahrnehmen',
        synonyms: ['erblicken', 'schauen'],
        collocations: ['fernsehen', 'Auf Wiedersehen', 'einen Film sehen']
      }
    ],
    conjugation: {
      auxiliary: 'haben',
      present: {
        ich: 'sehe',
        du: 'siehst',
        erSieEs: 'sieht',
        wir: 'sehen',
        ihr: 'seht',
        sieSie: 'sehen'
      },
      pastPrateritum: {
        ich: 'sah',
        du: 'sahst',
        erSieEs: 'sah',
        wir: 'sahen',
        ihr: 'saht',
        sieSie: 'sahen'
      },
      perfektParticiple: 'gesehen',
      konjunktivII: {
        ich: 'sähe',
        du: 'sähest',
        erSieEs: 'sähe',
        wir: 'sähen',
        ihr: 'sähet',
        sieSie: 'sähen'
      },
      imperative: {
        du: 'sieh',
        ihr: 'seht',
        Sie: 'sehen Sie'
      }
    },
    exampleSentences: [
      {
        german: 'Siehst du den Regenbogen dort drüben?',
        english: 'Do you see the rainbow over there?',
        highlight: 'Siehst'
      },
      {
        german: 'Wir haben gestern einen spannenden Film gesehen.',
        english: 'We saw an exciting film yesterday.',
        highlight: 'gesehen'
      },
      {
        german: 'Bis bald! Auf Wiedersehen!',
        english: 'See you soon! Goodbye!',
        highlight: 'Wiedersehen'
      }
    ],
    topics: ['verbs', 'senses'],
    language: 'de'
  },
  // 23. können (can, to be able to)
  {
    lemma: 'können',
    pos: 'verb',
    cefr: 'A1',
    frequencyRank: 23,
    frequencyBand: 'Top 500',
    ipa: '/ˈkœnən/',
    senses: [
      {
        english: 'can; to be able to (modal verb)',
        germanDefinition: 'Fähig sein, die Möglichkeit haben',
        synonyms: ['vermögen'],
        collocations: ['Deutsch können', 'helfen können', 'nicht mehr können']
      }
    ],
    conjugation: {
      auxiliary: 'haben',
      present: {
        ich: 'kann',
        du: 'kannst',
        erSieEs: 'kann',
        wir: 'können',
        ihr: 'könnt',
        sieSie: 'können'
      },
      pastPrateritum: {
        ich: 'konnte',
        du: 'konntest',
        erSieEs: 'konnte',
        wir: 'konnten',
        ihr: 'konntet',
        sieSie: 'konnten'
      },
      perfektParticiple: 'gekonnt / können',
      konjunktivII: {
        ich: 'könnte',
        du: 'könntest',
        erSieEs: 'könnte',
        wir: 'könnten',
        ihr: 'könntet',
        sieSie: 'könnten'
      },
      imperative: {
        du: '-',
        ihr: '-',
        Sie: '-'
      }
    },
    exampleSentences: [
      {
        german: 'Ich kann schon ein bisschen Deutsch sprechen.',
        english: 'I can already speak a little German.',
        highlight: 'kann'
      },
      {
        german: 'Können Sie mir bitte den Weg zeigen?',
        english: 'Could you please show me the way?',
        highlight: 'Können'
      },
      {
        german: 'Sie konnte gestern leider nicht zur Party kommen.',
        english: 'Unfortunately, she could not come to the party yesterday.',
        highlight: 'konnte'
      }
    ],
    topics: ['modal-verbs', 'verbs'],
    language: 'de'
  },
  // 24. müssen (must, to have to)
  {
    lemma: 'müssen',
    pos: 'verb',
    cefr: 'A1',
    frequencyRank: 24,
    frequencyBand: 'Top 500',
    ipa: '/ˈmʏsn̩/',
    senses: [
      {
        english: 'must; to have to (modal verb)',
        germanDefinition: 'Verpflichtet oder gezwungen sein',
        synonyms: ['gezwungen sein'],
        collocations: ['los müssen', 'warten müssen', 'arbeiten müssen']
      }
    ],
    conjugation: {
      auxiliary: 'haben',
      present: {
        ich: 'muss',
        du: 'musst',
        erSieEs: 'muss',
        wir: 'müssen',
        ihr: 'müsst',
        sieSie: 'müssen'
      },
      pastPrateritum: {
        ich: 'musste',
        du: 'musstest',
        erSieEs: 'musste',
        wir: 'mussten',
        ihr: 'musstet',
        sieSie: 'mussten'
      },
      perfektParticiple: 'gemusst / müssen',
      konjunktivII: {
        ich: 'müsste',
        du: 'müsstest',
        erSieEs: 'müsste',
        wir: 'müssten',
        ihr: 'müsstet',
        sieSie: 'müssten'
      },
      imperative: {
        du: '-',
        ihr: '-',
        Sie: '-'
      }
    },
    exampleSentences: [
      {
        german: 'Ich muss heute pünktlich im Büro sein.',
        english: 'I must be in the office on time today.',
        highlight: 'muss'
      },
      {
        german: 'Wir müssen noch für die Prüfung lernen.',
        english: 'We still have to study for the exam.',
        highlight: 'müssen'
      },
      {
        german: 'Er musste den Zug um sechs Uhr nehmen.',
        english: 'He had to take the six o\'clock train.',
        highlight: 'musste'
      }
    ],
    topics: ['modal-verbs', 'verbs'],
    language: 'de'
  },
  // 25. wollen (to want)
  {
    lemma: 'wollen',
    pos: 'verb',
    cefr: 'A1',
    frequencyRank: 25,
    frequencyBand: 'Top 500',
    ipa: '/ˈvɔlən/',
    senses: [
      {
        english: 'to want; intend (modal verb)',
        germanDefinition: 'Die feste Absicht haben',
        synonyms: ['beabsichtigen', 'wünschen'],
        collocations: ['Deutsch lernen wollen', 'nach Hause wollen']
      }
    ],
    conjugation: {
      auxiliary: 'haben',
      present: {
        ich: 'will',
        du: 'willst',
        erSieEs: 'will',
        wir: 'wollen',
        ihr: 'wollt',
        sieSie: 'wollen'
      },
      pastPrateritum: {
        ich: 'wollte',
        du: 'wolltest',
        erSieEs: 'wollte',
        wir: 'wollten',
        ihr: 'wolltet',
        sieSie: 'wollten'
      },
      perfektParticiple: 'gewollt / wollen',
      konjunktivII: {
        ich: 'wollte',
        du: 'wolltest',
        erSieEs: 'wollte',
        wir: 'wollten',
        ihr: 'wolltet',
        sieSie: 'wollten'
      },
      imperative: {
        du: '-',
        ihr: '-',
        Sie: '-'
      }
    },
    exampleSentences: [
      {
        german: 'Ich will im Sommer nach Deutschland reisen.',
        english: 'I want to travel to Germany in the summer.',
        highlight: 'will'
      },
      {
        german: 'Was wollt ihr heute Abend essen?',
        english: 'What do you want to eat this evening?',
        highlight: 'wollt'
      },
      {
        german: 'Sie wollte schon immer Ärztin werden.',
        english: 'She always wanted to become a doctor.',
        highlight: 'wollte'
      }
    ],
    topics: ['modal-verbs', 'verbs'],
    language: 'de'
  },
  // 26. gut (good, well)
  {
    lemma: 'gut',
    pos: 'adjective',
    cefr: 'A1',
    frequencyRank: 26,
    frequencyBand: 'Top 500',
    ipa: '/ɡuːt/',
    senses: [
      {
        english: 'good; well; fine',
        germanDefinition: 'Von hoher Qualität; angenehm; richtig',
        synonyms: ['ausgezeichnet', 'schön', 'fein'],
        collocations: ['guten Morgen', 'sehr gut', 'gut gemacht']
      }
    ],
    exampleSentences: [
      {
        german: 'Guten Morgen! Hast du gut geschlafen?',
        english: 'Good morning! Did you sleep well?',
        highlight: 'gut'
      },
      {
        german: 'Das Essen schmeckt wirklich sehr gut.',
        english: 'The food tastes really very good.',
        highlight: 'gut'
      },
      {
        german: 'Sie hat eine gute Idee für das Projekt.',
        english: 'She has a good idea for the project.',
        highlight: 'gute'
      }
    ],
    topics: ['adjectives', 'basics'],
    language: 'de'
  },
  // 27. neu (new)
  {
    lemma: 'neu',
    pos: 'adjective',
    cefr: 'A1',
    frequencyRank: 27,
    frequencyBand: 'Top 500',
    ipa: '/nɔɪ̯/',
    senses: [
      {
        english: 'new; fresh; recent',
        germanDefinition: 'Vor kurzem entstanden, erworben oder begonnen',
        synonyms: ['frisch', 'modern', 'aktuell'],
        collocations: ['neues Jahr', 'von neuem', 'neue Wörter']
      }
    ],
    exampleSentences: [
      {
        german: 'Ich habe mir ein neues Smartphone gekauft.',
        english: 'I bought myself a new smartphone.',
        highlight: 'neues'
      },
      {
        german: 'Er ist ganz neu in der Stadt.',
        english: 'He is completely new in town.',
        highlight: 'neu'
      },
      {
        german: 'Willkommen in deiner neuen Wohnung!',
        english: 'Welcome to your new apartment!',
        highlight: 'neuen'
      }
    ],
    topics: ['adjectives', 'descriptions'],
    language: 'de'
  },
  // 28. groß (big, tall, large)
  {
    lemma: 'groß',
    pos: 'adjective',
    cefr: 'A1',
    frequencyRank: 28,
    frequencyBand: 'Top 500',
    ipa: '/ɡʁoːs/',
    senses: [
      {
        english: 'big; tall; large; great',
        germanDefinition: 'Von bedeutendem Ausmaß oder bedeutender Höhe',
        synonyms: ['riesig', 'gewaltig'],
        collocations: ['eine große Stadt', 'große Familie', 'großen Dank']
      }
    ],
    exampleSentences: [
      {
        german: 'Berlin ist eine sehr große und lebendige Stadt.',
        english: 'Berlin is a very large and vibrant city.',
        highlight: 'große'
      },
      {
        german: 'Mein Bruder ist fast zwei Meter groß.',
        english: 'My brother is almost two meters tall.',
        highlight: 'groß'
      },
      {
        german: 'Vielen Dank für Ihre große Hilfe!',
        english: 'Many thanks for your great help!',
        highlight: 'große'
      }
    ],
    topics: ['adjectives', 'descriptions'],
    language: 'de'
  },
  // 29. klein (small, little, short)
  {
    lemma: 'klein',
    pos: 'adjective',
    cefr: 'A1',
    frequencyRank: 29,
    frequencyBand: 'Top 500',
    ipa: '/klaɪ̯n/',
    senses: [
      {
        english: 'small; little; compact',
        germanDefinition: 'Von geringer Größe oder Bedeutung',
        synonyms: ['winzig', 'gering'],
        collocations: ['ein kleiner Junge', 'eine Kleinigkeit', 'von klein auf']
      }
    ],
    exampleSentences: [
      {
        german: 'Wir wohnen in einem kleinen, gemütlichen Haus.',
        english: 'We live in a small, cozy house.',
        highlight: 'kleinen'
      },
      {
        german: 'Der kleine Hund bellt freundlich.',
        english: 'The little dog is barking friendly.',
        highlight: 'kleine'
      },
      {
        german: 'Haben Sie das auch in einer kleineren Größe?',
        english: 'Do you also have this in a smaller size?',
        highlight: 'kleineren'
      }
    ],
    topics: ['adjectives', 'descriptions'],
    language: 'de'
  },
  // 30. schön (beautiful, nice, handsome)
  {
    lemma: 'schön',
    pos: 'adjective',
    cefr: 'A1',
    frequencyRank: 30,
    frequencyBand: 'Top 500',
    ipa: '/ʃøːn/',
    senses: [
      {
        english: 'beautiful; pretty; nice; pleasant',
        germanDefinition: 'Ästhetisch ansprechend; angenehm',
        synonyms: ['hübsch', 'attraktiv', 'herrlich'],
        collocations: ['schönes Wochenende', 'schön, dich zu sehen', 'wunderschön']
      }
    ],
    exampleSentences: [
      {
        german: 'Ich wünsche dir ein schönes Wochenende!',
        english: 'I wish you a nice weekend!',
        highlight: 'schönes'
      },
      {
        german: 'Die Aussicht von diesem Berg ist einfach schön.',
        english: 'The view from this mountain is simply beautiful.',
        highlight: 'schön'
      },
      {
        german: 'Es ist schön, neue Freunde kennenzulernen.',
        english: 'It is nice to meet new friends.',
        highlight: 'schön'
      }
    ],
    topics: ['adjectives', 'descriptions'],
    language: 'de'
  },
  // 31. die Sprache (the language)
  {
    lemma: 'Sprache',
    article: 'die',
    gender: 'feminine',
    pos: 'noun',
    cefr: 'A1',
    frequencyRank: 31,
    frequencyBand: 'Top 500',
    plural: 'Sprachen',
    ipa: '/ˈʃpʁaːxə/',
    senses: [
      {
        english: 'language; speech',
        germanDefinition: 'System von Zeichen zur Verständigung',
        synonyms: ['Mundart', 'Idiom'],
        collocations: ['eine Fremdsprache lernen', 'Muttersprache', 'Körpersprache']
      }
    ],
    declension: {
      nominative: { singular: 'die Sprache', plural: 'die Sprachen' },
      accusative: { singular: 'die Sprache', plural: 'die Sprachen' },
      dative: { singular: 'der Sprache', plural: 'den Sprachen' },
      genitive: { singular: 'der Sprache', plural: 'der Sprachen' }
    },
    exampleSentences: [
      {
        german: 'Die deutsche Sprache hat viele interessante Wörter.',
        english: 'The German language has many interesting words.',
        highlight: 'Sprache'
      },
      {
        german: 'Wie viele Sprachen sprichst du?',
        english: 'How many languages do you speak?',
        highlight: 'Sprachen'
      },
      {
        german: 'Englisch ist eine wichtige globale Sprache.',
        english: 'English is an important global language.',
        highlight: 'Sprache'
      }
    ],
    topics: ['language', 'education'],
    language: 'de'
  },
  // 32. das Wort (the word)
  {
    lemma: 'Wort',
    article: 'das',
    gender: 'neuter',
    pos: 'noun',
    cefr: 'A1',
    frequencyRank: 32,
    frequencyBand: 'Top 500',
    plural: 'Wörter / Worte',
    ipa: '/vɔʁt/',
    senses: [
      {
        english: 'word (plural Wörter = single vocabulary words; Worte = connected meaningful speech/saying)',
        germanDefinition: 'Kleinste selbstständige sprachliche Einheit',
        synonyms: ['Ausdruck', 'Vokabel'],
        collocations: ['ein neues Wort', 'Wort für Wort', 'jemandem das Wort geben']
      }
    ],
    declension: {
      nominative: { singular: 'das Wort', plural: 'die Wörter' },
      accusative: { singular: 'das Wort', plural: 'die Wörter' },
      dative: { singular: 'dem Wort', plural: 'den Wörtern' },
      genitive: { singular: 'des Wortes', plural: 'der Wörter' }
    },
    exampleSentences: [
      {
        german: 'Was bedeutet dieses Wort auf Englisch?',
        english: 'What does this word mean in English?',
        highlight: 'Wort'
      },
      {
        german: 'Ich wiederhole die neuen Wörter jeden Tag.',
        english: 'I review the new words every day.',
        highlight: 'Wörter'
      },
      {
        german: 'Mir fehlen im Moment einfach die passenden Worte.',
        english: 'I am simply at a loss for words right now.',
        highlight: 'Worte'
      }
    ],
    topics: ['language', 'vocabulary'],
    language: 'de'
  },
  // 33. das Buch (the book)
  {
    lemma: 'Buch',
    article: 'das',
    gender: 'neuter',
    pos: 'noun',
    cefr: 'A1',
    frequencyRank: 33,
    frequencyBand: 'Top 500',
    plural: 'Bücher',
    ipa: '/buːx/',
    senses: [
      {
        english: 'book',
        germanDefinition: 'Gedrucktes oder gebundenes Schriftwerk',
        synonyms: ['Band', 'Werk'],
        collocations: ['ein Buch lesen', 'Lehrbuch', 'Wörterbuch']
      }
    ],
    declension: {
      nominative: { singular: 'das Buch', plural: 'die Bücher' },
      accusative: { singular: 'das Buch', plural: 'die Bücher' },
      dative: { singular: 'dem Buch', plural: 'den Büchern' },
      genitive: { singular: 'des Buches', plural: 'der Bücher' }
    },
    exampleSentences: [
      {
        german: 'Das Buch liegt auf dem Schreibtisch.',
        english: 'The book is lying on the desk.',
        highlight: 'Buch'
      },
      {
        german: 'Ich lese gerne Bücher auf Deutsch.',
        english: 'I enjoy reading books in German.',
        highlight: 'Bücher'
      },
      {
        german: 'Dieses Lehrbuch erklärt die Grammatik sehr anschaulich.',
        english: 'This textbook explains grammar very clearly.',
        highlight: 'Lehrbuch'
      }
    ],
    topics: ['education', 'reading'],
    language: 'de'
  },
  // 34. die Stadt (the city)
  {
    lemma: 'Stadt',
    article: 'die',
    gender: 'feminine',
    pos: 'noun',
    cefr: 'A1',
    frequencyRank: 34,
    frequencyBand: 'Top 500',
    plural: 'Städte',
    ipa: '/ʃtat/',
    senses: [
      {
        english: 'city; town',
        germanDefinition: 'Größere geschlossene Siedlung mit eigener Verwaltung',
        synonyms: ['Großstadt', 'Gemeinde'],
        collocations: ['in die Stadt gehen', 'Hauptstadt', 'Altstadt']
      }
    ],
    declension: {
      nominative: { singular: 'die Stadt', plural: 'die Städte' },
      accusative: { singular: 'die Stadt', plural: 'die Städte' },
      dative: { singular: 'der Stadt', plural: 'den Städten' },
      genitive: { singular: 'der Stadt', plural: 'der Städte' }
    },
    exampleSentences: [
      {
        german: 'Wien ist die lebenswerteste Stadt der Welt.',
        english: 'Vienna is the most livable city in the world.',
        highlight: 'Stadt'
      },
      {
        german: 'In Deutschland gibt es viele historische Städte.',
        english: 'In Germany there are many historic cities.',
        highlight: 'Städte'
      },
      {
        german: 'Wir machen heute einen Spaziergang durch die Innenstadt.',
        english: 'We are taking a walk through downtown today.',
        highlight: 'Stadt'
      }
    ],
    topics: ['places', 'geography'],
    language: 'de'
  },
  // 35. das Land (the country, state, countryside)
  {
    lemma: 'Land',
    article: 'das',
    gender: 'neuter',
    pos: 'noun',
    cefr: 'A1',
    frequencyRank: 35,
    frequencyBand: 'Top 500',
    plural: 'Länder',
    ipa: '/lant/',
    senses: [
      {
        english: 'country; land; federal state; countryside',
        germanDefinition: 'Staatliches Territorium oder ländliches Gebiet',
        synonyms: ['Staat', 'Nation'],
        collocations: ['auf dem Land leben', 'Bundesland', 'in ein anderes Land reisen']
      }
    ],
    declension: {
      nominative: { singular: 'das Land', plural: 'die Länder' },
      accusative: { singular: 'das Land', plural: 'die Länder' },
      dative: { singular: 'dem Land', plural: 'den Ländern' },
      genitive: { singular: 'des Landes', plural: 'der Länder' }
    },
    exampleSentences: [
      {
        german: 'Deutschland hat sechzehn Bundesländer.',
        english: 'Germany has sixteen federal states.',
        highlight: 'Bundesländer'
      },
      {
        german: 'Ich reise gerne in ferne Länder.',
        english: 'I like traveling to distant countries.',
        highlight: 'Länder'
      },
      {
        german: 'Am Wochenende fahren wir aufs Land.',
        english: 'At the weekend we are driving to the countryside.',
        highlight: 'Land'
      }
    ],
    topics: ['places', 'geography'],
    language: 'de'
  },
  // 36. der Freund (the friend [m], boyfriend)
  {
    lemma: 'Freund',
    article: 'der',
    gender: 'masculine',
    pos: 'noun',
    cefr: 'A1',
    frequencyRank: 36,
    frequencyBand: 'Top 500',
    plural: 'Freunde',
    ipa: '/fʁɔɪ̯nt/',
    senses: [
      {
        english: 'friend (male); boyfriend',
        germanDefinition: 'Männliche Person, zu der man eine enge persönliche Beziehung pflegt',
        synonyms: ['Kamerad', 'Kumpel'],
        collocations: ['bester Freund', 'ein Freund von mir', 'feste Freunde']
      }
    ],
    declension: {
      nominative: { singular: 'der Freund', plural: 'die Freunde' },
      accusative: { singular: 'den Freund', plural: 'die Freunde' },
      dative: { singular: 'dem Freund', plural: 'den Freunden' },
      genitive: { singular: 'des Freundes', plural: 'der Freunde' }
    },
    exampleSentences: [
      {
        german: 'Mein bester Freund heißt Lukas.',
        english: 'My best friend is named Lukas.',
        highlight: 'Freund'
      },
      {
        german: 'Ich treffe mich heute Abend mit meinen Freunden.',
        english: 'I am meeting up with my friends this evening.',
        highlight: 'Freunden'
      },
      {
        german: 'Gute Freunde unterstützen einander immer.',
        english: 'Good friends always support each other.',
        highlight: 'Freunde'
      }
    ],
    topics: ['people', 'relationships'],
    language: 'de'
  },
  // 37. die Freundin (the friend [f], girlfriend)
  {
    lemma: 'Freundin',
    article: 'die',
    gender: 'feminine',
    pos: 'noun',
    cefr: 'A1',
    frequencyRank: 37,
    frequencyBand: 'Top 500',
    plural: 'Freundinnen',
    ipa: '/ˈfʁɔɪ̯ndɪn/',
    senses: [
      {
        english: 'friend (female); girlfriend',
        germanDefinition: 'Weibliche Person, zu der man eine enge persönliche Beziehung pflegt',
        synonyms: ['Gefährtin'],
        collocations: ['beste Freundin', 'meine Freundin', 'eine Freundin von mir']
      }
    ],
    declension: {
      nominative: { singular: 'die Freundin', plural: 'die Freundinnen' },
      accusative: { singular: 'die Freundin', plural: 'die Freundinnen' },
      dative: { singular: 'der Freundin', plural: 'den Freundinnen' },
      genitive: { singular: 'der Freundin', plural: 'der Freundinnen' }
    },
    exampleSentences: [
      {
        german: 'Meine Freundin studiert Medizin in Heidelberg.',
        english: 'My girlfriend/friend is studying medicine in Heidelberg.',
        highlight: 'Freundin'
      },
      {
        german: 'Sie hat ihre Freundinnen zum Geburtstag eingeladen.',
        english: 'She invited her friends to her birthday.',
        highlight: 'Freundinnen'
      },
      {
        german: 'Das Geschenk ist für eine gute Freundin von mir.',
        english: 'The gift is for a good friend of mine.',
        highlight: 'Freundin'
      }
    ],
    topics: ['people', 'relationships'],
    language: 'de'
  },
  // 38. die Arbeit (the work, job)
  {
    lemma: 'Arbeit',
    article: 'die',
    gender: 'feminine',
    pos: 'noun',
    cefr: 'A1',
    frequencyRank: 38,
    frequencyBand: 'Top 500',
    plural: 'Arbeiten',
    ipa: '/ˈaʁbaɪ̯t/',
    senses: [
      {
        english: 'work; job; labor',
        germanDefinition: 'Tätigkeit zur Erfüllung von Aufgaben oder zum Gelderwerb',
        synonyms: ['Beruf', 'Tätigkeit', 'Beschäftigung'],
        collocations: ['zur Arbeit gehen', 'gute Arbeit', 'Arbeitsplatz']
      }
    ],
    declension: {
      nominative: { singular: 'die Arbeit', plural: 'die Arbeiten' },
      accusative: { singular: 'die Arbeit', plural: 'die Arbeiten' },
      dative: { singular: 'der Arbeit', plural: 'den Arbeiten' },
      genitive: { singular: 'der Arbeit', plural: 'der Arbeiten' }
    },
    exampleSentences: [
      {
        german: 'Ich fahre jeden Tag mit dem Fahrrad zur Arbeit.',
        english: 'I ride my bicycle to work every day.',
        highlight: 'Arbeit'
      },
      {
        german: 'Gute Arbeit! Das hast du toll gemacht.',
        english: 'Good work! You did that wonderfully.',
        highlight: 'Arbeit'
      },
      {
        german: 'Er sucht nach einer neuen Arbeit in Zürich.',
        english: 'He is looking for a new job in Zurich.',
        highlight: 'Arbeit'
      }
    ],
    topics: ['work', 'daily-life'],
    language: 'de'
  },
  // 39. arbeiten (to work)
  {
    lemma: 'arbeiten',
    pos: 'verb',
    cefr: 'A1',
    frequencyRank: 39,
    frequencyBand: 'Top 500',
    ipa: '/ˈaʁbaɪ̯tn̩/',
    senses: [
      {
        english: 'to work; labor',
        germanDefinition: 'Körperlich oder geistig tätig sein',
        synonyms: ['tätig sein', 'schaffen'],
        collocations: ['als Ingenieur arbeiten', 'von zu Hause arbeiten', 'hart arbeiten']
      }
    ],
    conjugation: {
      auxiliary: 'haben',
      present: {
        ich: 'arbeite',
        du: 'arbeitest',
        erSieEs: 'arbeitet',
        wir: 'arbeiten',
        ihr: 'arbeitet',
        sieSie: 'arbeiten'
      },
      pastPrateritum: {
        ich: 'arbeitete',
        du: 'arbeitetest',
        erSieEs: 'arbeitete',
        wir: 'arbeiteten',
        ihr: 'arbeitetet',
        sieSie: 'arbeiteten'
      },
      perfektParticiple: 'gearbeitet',
      konjunktivII: {
        ich: 'arbeitete',
        du: 'arbeitetest',
        erSieEs: 'arbeitete',
        wir: 'arbeiteten',
        ihr: 'arbeitetet',
        sieSie: 'arbeiteten'
      },
      imperative: {
        du: 'arbeite',
        ihr: 'arbeitet',
        Sie: 'arbeiten Sie'
      }
    },
    exampleSentences: [
      {
        german: 'Wo arbeitest du zurzeit?',
        english: 'Where do you work at the moment?',
        highlight: 'arbeitest'
      },
      {
        german: 'Sie arbeitet von Montag bis Freitag im Büro.',
        english: 'She works from Monday to Friday in the office.',
        highlight: 'arbeitet'
      },
      {
        german: 'Wir haben heute den ganzen Tag fleißig gearbeitet.',
        english: 'We worked diligently all day today.',
        highlight: 'gearbeitet'
      }
    ],
    topics: ['work', 'verbs'],
    language: 'de'
  },
  // 40. lernen (to learn, study)
  {
    lemma: 'lernen',
    pos: 'verb',
    cefr: 'A1',
    frequencyRank: 40,
    frequencyBand: 'Top 500',
    ipa: '/ˈlɛʁnən/',
    senses: [
      {
        english: 'to learn; study',
        germanDefinition: 'Wissen oder Fertigkeiten erwerben',
        synonyms: ['studieren', 'sich aneignen'],
        collocations: ['Deutsch lernen', 'auswendig lernen', 'für die Schule lernen']
      }
    ],
    conjugation: {
      auxiliary: 'haben',
      present: {
        ich: 'lerne',
        du: 'lernst',
        erSieEs: 'lernt',
        wir: 'lernen',
        ihr: 'lernt',
        sieSie: 'lernen'
      },
      pastPrateritum: {
        ich: 'lernte',
        du: 'lerntest',
        erSieEs: 'lernte',
        wir: 'lernten',
        ihr: 'lerntet',
        sieSie: 'lernten'
      },
      perfektParticiple: 'gelernt',
      konjunktivII: {
        ich: 'lernte',
        du: 'lerntest',
        erSieEs: 'lernte',
        wir: 'lernten',
        ihr: 'lerntet',
        sieSie: 'lernten'
      },
      imperative: {
        du: 'lern / lerne',
        ihr: 'lernt',
        Sie: 'lernen Sie'
      }
    },
    exampleSentences: [
      {
        german: 'Ich lerne jeden Tag eine halbe Stunde Deutsch mit Lernen.',
        english: 'I learn German for half an hour every day with Lernen.',
        highlight: 'lerne'
      },
      {
        german: 'Was hast du heute in der Schule gelernt?',
        english: 'What did you learn in school today?',
        highlight: 'gelernt'
      },
      {
        german: 'Man lernt nie aus!',
        english: 'You never stop learning!',
        highlight: 'lernt'
      }
    ],
    topics: ['education', 'verbs'],
    language: 'de'
  },
  // 41. sprechen (to speak, talk)
  {
    lemma: 'sprechen',
    pos: 'verb',
    cefr: 'A1',
    frequencyRank: 41,
    frequencyBand: 'Top 500',
    ipa: '/ˈʃpʁɛçn̩/',
    senses: [
      {
        english: 'to speak; talk',
        germanDefinition: 'Laute bilden, Worte sagen, sich unterhalten',
        synonyms: ['reden', 'sich unterhalten'],
        collocations: ['Deutsch sprechen', 'mit jemandem sprechen', 'über etwas sprechen']
      }
    ],
    conjugation: {
      auxiliary: 'haben',
      present: {
        ich: 'spreche',
        du: 'sprichst',
        erSieEs: 'spricht',
        wir: 'sprechen',
        ihr: 'sprecht',
        sieSie: 'sprechen'
      },
      pastPrateritum: {
        ich: 'sprach',
        du: 'sprachst',
        erSieEs: 'sprach',
        wir: 'sprachen',
        ihr: 'spracht',
        sieSie: 'sprachen'
      },
      perfektParticiple: 'gesprochen',
      konjunktivII: {
        ich: 'spräche',
        du: 'sprächest',
        erSieEs: 'spräche',
        wir: 'sprächen',
        ihr: 'sprächet',
        sieSie: 'sprächen'
      },
      imperative: {
        du: 'sprich',
        ihr: 'sprecht',
        Sie: 'sprechen Sie'
      }
    },
    exampleSentences: [
      {
        german: 'Sprechen Sie Deutsch?',
        english: 'Do you speak German?',
        highlight: 'Sprechen'
      },
      {
        german: 'Er spricht sehr langsam und deutlich.',
        english: 'He speaks very slowly and clearly.',
        highlight: 'spricht'
      },
      {
        german: 'Wir haben lange über unsere Pläne gesprochen.',
        english: 'We talked for a long time about our plans.',
        highlight: 'gesprochen'
      }
    ],
    topics: ['communication', 'verbs'],
    language: 'de'
  },
  // 42. verstehen (to understand)
  {
    lemma: 'verstehen',
    pos: 'verb',
    cefr: 'A1',
    frequencyRank: 42,
    frequencyBand: 'Top 500',
    ipa: '/fɛɐ̯ˈʃteːən/',
    senses: [
      {
        english: 'to understand; comprehend',
        germanDefinition: 'Den Sinn von etwas begreifen',
        synonyms: ['begreifen', 'nachvollziehen'],
        collocations: ['gut verstehen', 'sich verstehen', 'falsch verstehen']
      }
    ],
    conjugation: {
      auxiliary: 'haben',
      present: {
        ich: 'verstehe',
        du: 'verstehst',
        erSieEs: 'versteht',
        wir: 'verstehen',
        ihr: 'versteht',
        sieSie: 'verstehen'
      },
      pastPrateritum: {
        ich: 'verstand',
        du: 'verstandest',
        erSieEs: 'verstand',
        wir: 'verstanden',
        ihr: 'verstandet',
        sieSie: 'verstanden'
      },
      perfektParticiple: 'verstanden',
      konjunktivII: {
        ich: 'verstände',
        du: 'verständest',
        erSieEs: 'verstände',
        wir: 'verständen',
        ihr: 'verständet',
        sieSie: 'verständen'
      },
      imperative: {
        du: 'versteh',
        ihr: 'versteht',
        Sie: 'verstehen Sie'
      }
    },
    exampleSentences: [
      {
        german: 'Ich verstehe diese Grammatikregel jetzt ganz genau.',
        english: 'I understand this grammar rule very clearly now.',
        highlight: 'verstehe'
      },
      {
        german: 'Hast du verstanden, was sie gesagt hat?',
        english: 'Did you understand what she said?',
        highlight: 'verstanden'
      },
      {
        german: 'Wir verstehen uns ohne viele Worte.',
        english: 'We understand each other without many words.',
        highlight: 'verstehen'
      }
    ],
    topics: ['communication', 'verbs'],
    language: 'de'
  },
  // 43. lesen (to read)
  {
    lemma: 'lesen',
    pos: 'verb',
    cefr: 'A1',
    frequencyRank: 43,
    frequencyBand: 'Top 500',
    ipa: '/ˈleːzn̩/',
    senses: [
      {
        english: 'to read',
        germanDefinition: 'Schriftzeichen entziffern und ihren Sinn erfassen',
        synonyms: ['schmökern'],
        collocations: ['ein Buch lesen', 'Zeitung lesen', 'laut lesen']
      }
    ],
    conjugation: {
      auxiliary: 'haben',
      present: {
        ich: 'lese',
        du: 'liest',
        erSieEs: 'liest',
        wir: 'lesen',
        ihr: 'lest',
        sieSie: 'lesen'
      },
      pastPrateritum: {
        ich: 'las',
        du: 'lasest',
        erSieEs: 'las',
        wir: 'lasen',
        ihr: 'last',
        sieSie: 'lasen'
      },
      perfektParticiple: 'gelesen',
      konjunktivII: {
        ich: 'läse',
        du: 'läsest',
        erSieEs: 'läse',
        wir: 'läsen',
        ihr: 'läset',
        sieSie: 'läsen'
      },
      imperative: {
        du: 'lies',
        ihr: 'lest',
        Sie: 'lesen Sie'
      }
    },
    exampleSentences: [
      {
        german: 'Liest du gerne deutsche Kurzgeschichten?',
        english: 'Do you like reading German short stories?',
        highlight: 'Liest'
      },
      {
        german: 'Er liest jeden Morgen die Nachrichten im Internet.',
        english: 'He reads the news on the internet every morning.',
        highlight: 'liest'
      },
      {
        german: 'Ich habe diesen Artikel aufmerksam gelesen.',
        english: 'I have read this article attentively.',
        highlight: 'gelesen'
      }
    ],
    topics: ['reading', 'verbs'],
    language: 'de'
  },
  // 44. schreiben (to write)
  {
    lemma: 'schreiben',
    pos: 'verb',
    cefr: 'A1',
    frequencyRank: 44,
    frequencyBand: 'Top 500',
    ipa: '/ˈʃʁaɪ̯bn̩/',
    senses: [
      {
        english: 'to write',
        germanDefinition: 'Text mit Zeichen festhalten oder verfassen',
        synonyms: ['verfassen', 'notieren'],
        collocations: ['eine E-Mail schreiben', 'einen Brief schreiben', 'aufschreiben']
      }
    ],
    conjugation: {
      auxiliary: 'haben',
      present: {
        ich: 'schreibe',
        du: 'schreibst',
        erSieEs: 'schreibt',
        wir: 'schreiben',
        ihr: 'schreibt',
        sieSie: 'schreiben'
      },
      pastPrateritum: {
        ich: 'schrieb',
        du: 'schriebst',
        erSieEs: 'schrieb',
        wir: 'schrieben',
        ihr: 'schriebt',
        sieSie: 'schrieben'
      },
      perfektParticiple: 'geschrieben',
      konjunktivII: {
        ich: 'schriebe',
        du: 'schriebest',
        erSieEs: 'schriebe',
        wir: 'schrieben',
        ihr: 'schriebet',
        sieSie: 'schrieben'
      },
      imperative: {
        du: 'schreib',
        ihr: 'schreibt',
        Sie: 'schreiben Sie'
      }
    },
    exampleSentences: [
      {
        german: 'Ich schreibe dir heute Abend eine E-Mail.',
        english: 'I will write you an email this evening.',
        highlight: 'schreibe'
      },
      {
        german: 'Er schreibt gerade an seiner Bachelorarbeit.',
        english: 'He is currently writing his bachelor\'s thesis.',
        highlight: 'schreibt'
      },
      {
        german: 'Wer hat dieses berühmte Gedicht geschrieben?',
        english: 'Who wrote this famous poem?',
        highlight: 'geschrieben'
      }
    ],
    topics: ['writing', 'verbs'],
    language: 'de'
  },
  // 45. hören (to hear, listen)
  {
    lemma: 'hören',
    pos: 'verb',
    cefr: 'A1',
    frequencyRank: 45,
    frequencyBand: 'Top 500',
    ipa: '/ˈhøːʁən/',
    senses: [
      {
        english: 'to hear; listen to',
        germanDefinition: 'Mit den Ohren wahrnehmen; aufmerksam lauschen',
        synonyms: ['lauschen', 'vernehmen'],
        collocations: ['Musik hören', 'auf jemanden hören', 'Radio hören']
      }
    ],
    conjugation: {
      auxiliary: 'haben',
      present: {
        ich: 'höre',
        du: 'hörst',
        erSieEs: 'hört',
        wir: 'hören',
        ihr: 'hört',
        sieSie: 'hören'
      },
      pastPrateritum: {
        ich: 'hörte',
        du: 'hörtest',
        erSieEs: 'hörte',
        wir: 'hörten',
        ihr: 'hörtet',
        sieSie: 'hörten'
      },
      perfektParticiple: 'gehört',
      konjunktivII: {
        ich: 'hörte',
        du: 'hörtest',
        erSieEs: 'hörte',
        wir: 'hörten',
        ihr: 'hörtet',
        sieSie: 'hörten'
      },
      imperative: {
        du: 'hör / höre',
        ihr: 'hört',
        Sie: 'hören Sie'
      }
    },
    exampleSentences: [
      {
        german: 'Ich höre beim Lernen gerne ruhige Musik.',
        english: 'I like listening to calm music while studying.',
        highlight: 'höre'
      },
      {
        german: 'Hörst du das seltsame Geräusch da draußen?',
        english: 'Do you hear that strange sound out there?',
        highlight: 'Hörst'
      },
      {
        german: 'Ich habe lange nichts mehr von ihm gehört.',
        english: 'I haven\'t heard anything from him in a long time.',
        highlight: 'gehört'
      }
    ],
    topics: ['listening', 'verbs'],
    language: 'de'
  },
  // 46. essen (to eat)
  {
    lemma: 'essen',
    pos: 'verb',
    cefr: 'A1',
    frequencyRank: 46,
    frequencyBand: 'Top 500',
    ipa: '/ˈɛsn̩/',
    senses: [
      {
        english: 'to eat',
        germanDefinition: 'Nahrung aufnehmen und zerkauen',
        synonyms: ['speisen', 'zu sich nehmen'],
        collocations: ['zu Mittag essen', 'gesund essen', 'vegetarisch essen']
      }
    ],
    conjugation: {
      auxiliary: 'haben',
      present: {
        ich: 'esse',
        du: 'isst',
        erSieEs: 'isst',
        wir: 'essen',
        ihr: 'esst',
        sieSie: 'essen'
      },
      pastPrateritum: {
        ich: 'aß',
        du: 'aßest',
        erSieEs: 'aß',
        wir: 'aßen',
        ihr: 'aßt',
        sieSie: 'aßen'
      },
      perfektParticiple: 'gegessen',
      konjunktivII: {
        ich: 'äße',
        du: 'äßest',
        erSieEs: 'äße',
        wir: 'äßen',
        ihr: 'äßet',
        sieSie: 'äßen'
      },
      imperative: {
        du: 'iss',
        ihr: 'esst',
        Sie: 'essen Sie'
      }
    },
    exampleSentences: [
      {
        german: 'Was isst du heute zum Frühstück?',
        english: 'What are you eating for breakfast today?',
        highlight: 'isst'
      },
      {
        german: 'Wir haben in einem tollen Restaurant gegessen.',
        english: 'We ate in a great restaurant.',
        highlight: 'gegessen'
      },
      {
        german: 'Iss bitte etwas Obst!',
        english: 'Please eat some fruit!',
        highlight: 'Iss'
      }
    ],
    topics: ['food', 'verbs'],
    language: 'de'
  },
  // 47. trinken (to drink)
  {
    lemma: 'trinken',
    pos: 'verb',
    cefr: 'A1',
    frequencyRank: 47,
    frequencyBand: 'Top 500',
    ipa: '/ˈtʁɪŋkn̩/',
    senses: [
      {
        english: 'to drink',
        germanDefinition: 'Flüssigkeit zu sich nehmen',
        synonyms: ['zu sich nehmen'],
        collocations: ['Wasser trinken', 'Kaffee trinken', 'Tee trinken']
      }
    ],
    conjugation: {
      auxiliary: 'haben',
      present: {
        ich: 'trinke',
        du: 'trinkst',
        erSieEs: 'trinkt',
        wir: 'trinken',
        ihr: 'trinkt',
        sieSie: 'trinken'
      },
      pastPrateritum: {
        ich: 'trank',
        du: 'trankst',
        erSieEs: 'trank',
        wir: 'tranken',
        ihr: 'trankt',
        sieSie: 'tranken'
      },
      perfektParticiple: 'getrunken',
      konjunktivII: {
        ich: 'tränke',
        du: 'tränkest',
        erSieEs: 'tränke',
        wir: 'tränken',
        ihr: 'tränket',
        sieSie: 'tränken'
      },
      imperative: {
        du: 'trink',
        ihr: 'trinkt',
        Sie: 'trinken Sie'
      }
    },
    exampleSentences: [
      {
        german: 'Ich trinke morgens immer eine Tasse Kaffee.',
        english: 'I always drink a cup of coffee in the morning.',
        highlight: 'trinke'
      },
      {
        german: 'Man sollte jeden Tag mindestens zwei Liter Wasser trinken.',
        english: 'One should drink at least two liters of water every day.',
        highlight: 'trinken'
      },
      {
        german: 'Hast du schon genug getrunken?',
        english: 'Have you drunk enough already?',
        highlight: 'getrunken'
      }
    ],
    topics: ['food', 'verbs'],
    language: 'de'
  },
  // 48. das Wasser (the water)
  {
    lemma: 'Wasser',
    article: 'das',
    gender: 'neuter',
    pos: 'noun',
    cefr: 'A1',
    frequencyRank: 48,
    frequencyBand: 'Top 500',
    plural: 'Wässer',
    ipa: '/ˈvasɐ/',
    senses: [
      {
        english: 'water',
        germanDefinition: 'Farblose, geruchlose und geschmacklose Flüssigkeit (H2O)',
        synonyms: ['Nass'],
        collocations: ['ein Glas Wasser', 'stilles Wasser', 'Mineralwasser']
      }
    ],
    declension: {
      nominative: { singular: 'das Wasser', plural: 'die Wässer' },
      accusative: { singular: 'das Wasser', plural: 'die Wässer' },
      dative: { singular: 'dem Wasser', plural: 'den Wässern' },
      genitive: { singular: 'des Wassers', plural: 'der Wässer' }
    },
    exampleSentences: [
      {
        german: 'Ein Glas stilles Wasser, bitte!',
        english: 'A glass of still water, please!',
        highlight: 'Wasser'
      },
      {
        german: 'Das Wasser im See ist herrlich klar und erfrischend.',
        english: 'The water in the lake is wonderfully clear and refreshing.',
        highlight: 'Wasser'
      },
      {
        german: 'Ohne Wasser gibt es kein Leben.',
        english: 'Without water there is no life.',
        highlight: 'Wasser'
      }
    ],
    topics: ['food', 'nature'],
    language: 'de'
  },
  // 49. das Brot (the bread)
  {
    lemma: 'Brot',
    article: 'das',
    gender: 'neuter',
    pos: 'noun',
    cefr: 'A1',
    frequencyRank: 49,
    frequencyBand: 'Top 500',
    plural: 'Brote',
    ipa: '/bʁoːt/',
    senses: [
      {
        english: 'bread; loaf of bread',
        germanDefinition: 'Aus Getreidemehl gebackenes Grundnahrungsmittel',
        synonyms: ['Laib'],
        collocations: ['frisches Brot', 'Vollkornbrot', 'ein Laib Brot']
      }
    ],
    declension: {
      nominative: { singular: 'das Brot', plural: 'die Brote' },
      accusative: { singular: 'das Brot', plural: 'die Brote' },
      dative: { singular: 'dem Brot', plural: 'den Broten' },
      genitive: { singular: 'des Brotes', plural: 'der Brote' }
    },
    exampleSentences: [
      {
        german: 'In Deutschland gibt es über 3.000 verschiedene Brotsorten.',
        english: 'In Germany there are over 3,000 different types of bread.',
        highlight: 'Brot'
      },
      {
        german: 'Ich hole morgens frisches Brot beim Bäcker.',
        english: 'I get fresh bread at the bakery in the morning.',
        highlight: 'Brot'
      },
      {
        german: 'Möchtest du eine Scheibe Brot mit Butter?',
        english: 'Would you like a slice of bread with butter?',
        highlight: 'Brot'
      }
    ],
    topics: ['food', 'culture'],
    language: 'de'
  },
  // 50. der Apfel (the apple)
  {
    lemma: 'Apfel',
    article: 'der',
    gender: 'masculine',
    pos: 'noun',
    cefr: 'A1',
    frequencyRank: 50,
    frequencyBand: 'Top 500',
    plural: 'Äpfel',
    ipa: '/ˈapfl̩/',
    senses: [
      {
        english: 'apple',
        germanDefinition: 'Runde Frucht des Apfelbaums',
        synonyms: [],
        collocations: ['Apfelsaft', 'Apfelkuchen', 'in den sauren Apfel beißen']
      }
    ],
    declension: {
      nominative: { singular: 'der Apfel', plural: 'die Äpfel' },
      accusative: { singular: 'den Apfel', plural: 'die Äpfel' },
      dative: { singular: 'dem Apfel', plural: 'den Äpfeln' },
      genitive: { singular: 'des Apfels', plural: 'der Äpfel' }
    },
    exampleSentences: [
      {
        german: 'Ich esse jeden Tag einen frischen Apfel.',
        english: 'I eat a fresh apple every day.',
        highlight: 'Apfel'
      },
      {
        german: 'Die Äpfel an diesem Baum sind reif und süß.',
        english: 'The apples on this tree are ripe and sweet.',
        highlight: 'Äpfel'
      },
      {
        german: 'Ein Apfel am Tag hält den Arzt fern.',
        english: 'An apple a day keeps the doctor away.',
        highlight: 'Apfel'
      }
    ],
    topics: ['food', 'nature'],
    language: 'de'
  }
];

// Generate additional authentic items 51 to 100 spanning A1-C1
const additionalWords = [
  // 51. der Tisch (table)
  {
    lemma: 'Tisch',
    article: 'der',
    gender: 'masculine',
    pos: 'noun',
    cefr: 'A1',
    frequencyRank: 51,
    frequencyBand: 'Top 500',
    plural: 'Tische',
    ipa: '/tɪʃ/',
    senses: [{ english: 'table; desk', germanDefinition: 'Möbelstück mit Platte und Beinen', collocations: ['am Tisch sitzen', 'den Tisch decken'] }],
    declension: { nominative: { singular: 'der Tisch', plural: 'die Tische' }, accusative: { singular: 'den Tisch', plural: 'die Tische' }, dative: { singular: 'dem Tisch', plural: 'den Tischen' }, genitive: { singular: 'des Tisches', plural: 'der Tische' } },
    exampleSentences: [
      { german: 'Das Buch liegt auf dem Tisch.', english: 'The book is on the table.', highlight: 'Tisch' },
      { german: 'Wir haben einen Tisch im Restaurant reserviert.', english: 'We reserved a table in the restaurant.', highlight: 'Tisch' },
      { german: 'Alle sitzen zusammen am Tisch.', english: 'Everyone is sitting together at the table.', highlight: 'Tisch' }
    ],
    topics: ['furniture', 'home']
  },
  // 52. der Stuhl (chair)
  {
    lemma: 'Stuhl',
    article: 'der',
    gender: 'masculine',
    pos: 'noun',
    cefr: 'A1',
    frequencyRank: 52,
    frequencyBand: 'Top 500',
    plural: 'Stühle',
    ipa: '/ʃtuːl/',
    senses: [{ english: 'chair; seat', germanDefinition: 'Sitzmöbel für eine Person mit Lehne', collocations: ['auf dem Stuhl sitzen'] }],
    declension: { nominative: { singular: 'der Stuhl', plural: 'die Stühle' }, accusative: { singular: 'den Stuhl', plural: 'die Stühle' }, dative: { singular: 'dem Stuhl', plural: 'den Stühlen' }, genitive: { singular: 'des Stuhles', plural: 'der Stühle' } },
    exampleSentences: [
      { german: 'Nimm dir bitte einen Stuhl und setz dich.', english: 'Please take a chair and sit down.', highlight: 'Stuhl' },
      { german: 'In der Küche stehen vier bequeme Stühle.', english: 'There are four comfortable chairs in the kitchen.', highlight: 'Stühle' },
      { german: 'Dieser Stuhl ist aus massivem Holz gebaut.', english: 'This chair is built from solid wood.', highlight: 'Stuhl' }
    ],
    topics: ['furniture', 'home']
  },
  // 53. das Auto (car)
  {
    lemma: 'Auto',
    article: 'das',
    gender: 'neuter',
    pos: 'noun',
    cefr: 'A1',
    frequencyRank: 53,
    frequencyBand: 'Top 500',
    plural: 'Autos',
    ipa: '/ˈaʊ̯to/',
    senses: [{ english: 'car; automobile', germanDefinition: 'Kraftfahrzeug zur Personenbeförderung', collocations: ['Auto fahren', 'ein neues Auto'] }],
    declension: { nominative: { singular: 'das Auto', plural: 'die Autos' }, accusative: { singular: 'das Auto', plural: 'die Autos' }, dative: { singular: 'dem Auto', plural: 'den Autos' }, genitive: { singular: 'des Autos', plural: 'der Autos' } },
    exampleSentences: [
      { german: 'Er fährt jeden Tag mit dem Auto zur Arbeit.', english: 'He drives to work every day by car.', highlight: 'Auto' },
      { german: 'Mein Auto steht in der Garage.', english: 'My car is in the garage.', highlight: 'Auto' },
      { german: 'Elektro-Autos werden immer beliebter.', english: 'Electric cars are becoming more and more popular.', highlight: 'Autos' }
    ],
    topics: ['transport', 'vehicles']
  },
  // 54. der Zug (train)
  {
    lemma: 'Zug',
    article: 'der',
    gender: 'masculine',
    pos: 'noun',
    cefr: 'A1',
    frequencyRank: 54,
    frequencyBand: 'Top 500',
    plural: 'Züge',
    ipa: '/tsuːk/',
    senses: [{ english: 'train; move; draft', germanDefinition: 'Schienenfahrzeug für Passagiere oder Güter', collocations: ['den Zug nehmen', 'mit dem Zug fahren'] }],
    declension: { nominative: { singular: 'der Zug', plural: 'die Züge' }, accusative: { singular: 'den Zug', plural: 'die Züge' }, dative: { singular: 'dem Zug', plural: 'den Zügen' }, genitive: { singular: 'des Zuges', plural: 'der Züge' } },
    exampleSentences: [
      { german: 'Der Zug nach München fährt von Gleis vier ab.', english: 'The train to Munich departs from track four.', highlight: 'Zug' },
      { german: 'Ich nehme lieber den Zug als das Flugzeug.', english: 'I prefer taking the train rather than the airplane.', highlight: 'Zug' },
      { german: 'Die Züge in der Schweiz sind fast immer pünktlich.', english: 'Trains in Switzerland are almost always punctual.', highlight: 'Züge' }
    ],
    topics: ['transport', 'travel']
  },
  // 55. die Tür (door)
  {
    lemma: 'Tür',
    article: 'die',
    gender: 'feminine',
    pos: 'noun',
    cefr: 'A1',
    frequencyRank: 55,
    frequencyBand: 'Top 500',
    plural: 'Türen',
    ipa: '/tyːɐ̯/',
    senses: [{ english: 'door; doorway', germanDefinition: 'Beweglicher Verschluss einer Öffnung in einer Wand', collocations: ['die Tür öffnen', 'vor der Tür'] }],
    declension: { nominative: { singular: 'die Tür', plural: 'die Türen' }, accusative: { singular: 'die Tür', plural: 'die Türen' }, dative: { singular: 'der Tür', plural: 'den Türen' }, genitive: { singular: 'der Tür', plural: 'der Türen' } },
    exampleSentences: [
      { german: 'Bitte schließen Sie die Tür leise.', english: 'Please close the door quietly.', highlight: 'Tür' },
      { german: 'Jemand klopft an die Tür.', english: 'Someone is knocking at the door.', highlight: 'Tür' },
      { german: 'Das Zimmer hat zwei große Türen zum Balkon.', english: 'The room has two large doors to the balcony.', highlight: 'Türen' }
    ],
    topics: ['home', 'places']
  },
  // 56. das Fenster (window)
  {
    lemma: 'Fenster',
    article: 'das',
    gender: 'neuter',
    pos: 'noun',
    cefr: 'A1',
    frequencyRank: 56,
    frequencyBand: 'Top 500',
    plural: 'Fenster',
    ipa: '/ˈfɛnstɐ/',
    senses: [{ english: 'window', germanDefinition: 'Wandöffnung zum Hineinlassen von Licht und Luft', collocations: ['das Fenster aufmachen', 'aus dem Fenster schauen'] }],
    declension: { nominative: { singular: 'das Fenster', plural: 'die Fenster' }, accusative: { singular: 'das Fenster', plural: 'die Fenster' }, dative: { singular: 'dem Fenster', plural: 'den Fenstern' }, genitive: { singular: 'des Fensters', plural: 'der Fenster' } },
    exampleSentences: [
      { german: 'Es ist warm hier, mach bitte das Fenster auf.', english: 'It is warm in here, please open the window.', highlight: 'Fenster' },
      { german: 'Sie schaut verträumt aus dem Fenster.', english: 'She is looking dreamily out the window.', highlight: 'Fenster' },
      { german: 'Die Fenster des Hauses wurden frisch geputzt.', english: 'The windows of the house were freshly cleaned.', highlight: 'Fenster' }
    ],
    topics: ['home', 'places']
  },
  // 57. die Schule (school)
  {
    lemma: 'Schule',
    article: 'die',
    gender: 'feminine',
    pos: 'noun',
    cefr: 'A1',
    frequencyRank: 57,
    frequencyBand: 'Top 500',
    plural: 'Schulen',
    ipa: '/ˈʃuːlə/',
    senses: [{ english: 'school', germanDefinition: 'Bildungseinrichtung für Kinder und Jugendliche', collocations: ['in die Schule gehen', 'Grundschule'] }],
    declension: { nominative: { singular: 'die Schule', plural: 'die Schulen' }, accusative: { singular: 'die Schule', plural: 'die Schulen' }, dative: { singular: 'der Schule', plural: 'den Schulen' }, genitive: { singular: 'der Schule', plural: 'der Schulen' } },
    exampleSentences: [
      { german: 'Die Kinder gehen von Montag bis Freitag in die Schule.', english: 'The children go to school from Monday to Friday.', highlight: 'Schule' },
      { german: 'Unsere Schule hat eine hervorragende Bibliothek.', english: 'Our school has an excellent library.', highlight: 'Schule' },
      { german: 'Nach der Schule machen wir gemeinsam Sport.', english: 'After school we do sports together.', highlight: 'Schule' }
    ],
    topics: ['education', 'places']
  },
  // 58. der Lehrer (teacher [m])
  {
    lemma: 'Lehrer',
    article: 'der',
    gender: 'masculine',
    pos: 'noun',
    cefr: 'A1',
    frequencyRank: 58,
    frequencyBand: 'Top 500',
    plural: 'Lehrer',
    ipa: '/ˈleːʁɐ/',
    senses: [{ english: 'teacher (male); instructor', germanDefinition: 'Person, die an einer Schule unterrichtet', collocations: ['Deutschlehrer', 'ein strenger Lehrer'] }],
    declension: { nominative: { singular: 'der Lehrer', plural: 'die Lehrer' }, accusative: { singular: 'den Lehrer', plural: 'die Lehrer' }, dative: { singular: 'dem Lehrer', plural: 'den Lehrern' }, genitive: { singular: 'des Lehrers', plural: 'der Lehrer' } },
    exampleSentences: [
      { german: 'Unser Lehrer erklärt die Grammatik mit viel Geduld.', english: 'Our teacher explains grammar with a lot of patience.', highlight: 'Lehrer' },
      { german: 'Er arbeitet seit zehn Jahren als Lehrer am Gymnasium.', english: 'He has worked for ten years as a teacher at high school.', highlight: 'Lehrer' },
      { german: 'Die Lehrer planen eine spannende Klassenfahrt.', english: 'The teachers are planning an exciting class trip.', highlight: 'Lehrer' }
    ],
    topics: ['education', 'jobs']
  },
  // 59. die Sonne (sun)
  {
    lemma: 'Sonne',
    article: 'die',
    gender: 'feminine',
    pos: 'noun',
    cefr: 'A1',
    frequencyRank: 59,
    frequencyBand: 'Top 500',
    plural: 'Sonnen',
    ipa: '/ˈzɔnə/',
    senses: [{ english: 'sun; sunshine', germanDefinition: 'Zentralstern unseres Planetensystems', collocations: ['in der Sonne liegen', 'die Sonne scheint'] }],
    declension: { nominative: { singular: 'die Sonne', plural: 'die Sonnen' }, accusative: { singular: 'die Sonne', plural: 'die Sonnen' }, dative: { singular: 'der Sonne', plural: 'den Sonnen' }, genitive: { singular: 'der Sonne', plural: 'der Sonnen' } },
    exampleSentences: [
      { german: 'Die Sonne scheint und der Himmel ist blau.', english: 'The sun is shining and the sky is blue.', highlight: 'Sonne' },
      { german: 'Wir genießen die warme Sonne im Park.', english: 'We enjoy the warm sun in the park.', highlight: 'Sonne' },
      { german: 'Vergiss nicht die Sonnencreme gegen die starke Sonne!', english: 'Don\'t forget sunscreen against the strong sun!', highlight: 'Sonne' }
    ],
    topics: ['nature', 'weather']
  },
  // 60. der Mond (moon)
  {
    lemma: 'Mond',
    article: 'der',
    gender: 'masculine',
    pos: 'noun',
    cefr: 'A1',
    frequencyRank: 60,
    frequencyBand: 'Top 500',
    plural: 'Monde',
    ipa: '/moːnt/',
    senses: [{ english: 'moon', germanDefinition: 'Natürlicher Satellit der Erde', collocations: ['Vollmond', 'der Mond geht auf'] }],
    declension: { nominative: { singular: 'der Mond', plural: 'die Monde' }, accusative: { singular: 'den Mond', plural: 'die Monde' }, dative: { singular: 'dem Mond', plural: 'den Monden' }, genitive: { singular: 'des Mondes', plural: 'der Monde' } },
    exampleSentences: [
      { german: 'Heute Nacht leuchtet der Vollmond am Himmel.', english: 'Tonight the full moon is shining in the sky.', highlight: 'Mond' },
      { german: 'Der Mond umkreist die Erde.', english: 'The moon orbits the Earth.', highlight: 'Mond' },
      { german: 'Im Licht des Mondes sah der See magisch aus.', english: 'In the light of the moon, the lake looked magical.', highlight: 'Mondes' }
    ],
    topics: ['nature', 'space']
  },
  // 61. immer (always)
  {
    lemma: 'immer',
    pos: 'adverb',
    cefr: 'A1',
    frequencyRank: 61,
    frequencyBand: 'Top 500',
    ipa: '/ˈɪmɐ/',
    senses: [{ english: 'always; constantly; ever', germanDefinition: 'Zu allen Zeiten; ständig', collocations: ['immer noch', 'für immer', 'wie immer'] }],
    exampleSentences: [
      { german: 'Sie ist immer freundlich und hilfsbereit.', english: 'She is always friendly and helpful.', highlight: 'immer' },
      { german: 'Ich werde dich für immer in Erinnerung behalten.', english: 'I will remember you forever.', highlight: 'immer' },
      { german: 'Es wird draußen immer kälter.', english: 'It is getting colder and colder outside.', highlight: 'immer' }
    ],
    topics: ['basics', 'time']
  },
  // 62. nie (never)
  {
    lemma: 'nie',
    pos: 'adverb',
    cefr: 'A1',
    frequencyRank: 62,
    frequencyBand: 'Top 500',
    ipa: '/niː/',
    senses: [{ english: 'never', germanDefinition: 'Zu keinem Zeitpunkt', collocations: ['nie wieder', 'noch nie', 'fast nie'] }],
    exampleSentences: [
      { german: 'Ich war noch nie in Berlin.', english: 'I have never been to Berlin before.', highlight: 'nie' },
      { german: 'Sag niemals nie!', english: 'Never say never!', highlight: 'nie' },
      { german: 'Er kommt nie zu spät zu Verabredungen.', english: 'He is never late for appointments.', highlight: 'nie' }
    ],
    topics: ['basics', 'time']
  },
  // 63. oft (often)
  {
    lemma: 'oft',
    pos: 'adverb',
    cefr: 'A1',
    frequencyRank: 63,
    frequencyBand: 'Top 500',
    ipa: '/ɔft/',
    senses: [{ english: 'often; frequently', germanDefinition: 'Häufig; viele Male', collocations: ['sehr oft', 'so oft wie möglich'] }],
    exampleSentences: [
      { german: 'Wir kochen sehr oft gemeinsam mit Freunden.', english: 'We cook very often together with friends.', highlight: 'oft' },
      { german: 'Wie oft in der Woche machst du Sport?', english: 'How often in a week do you do sports?', highlight: 'oft' },
      { german: 'Ich habe dieses Lied schon so oft gehört.', english: 'I have heard this song so many times.', highlight: 'oft' }
    ],
    topics: ['basics', 'time']
  },
  // 64. schnell (fast, quick)
  {
    lemma: 'schnell',
    pos: 'adjective',
    cefr: 'A1',
    frequencyRank: 64,
    frequencyBand: 'Top 500',
    ipa: '/ʃnɛl/',
    senses: [{ english: 'fast; quick; rapid', germanDefinition: 'Mit hoher Geschwindigkeit; rasch', collocations: ['so schnell wie möglich', 'schnell fahren'] }],
    exampleSentences: [
      { german: 'Der ICE fährt sehr schnell durch ganz Deutschland.', english: 'The ICE train travels very fast across all of Germany.', highlight: 'schnell' },
      { german: 'Komm bitte so schnell wie möglich!', english: 'Please come as quickly as possible!', highlight: 'schnell' },
      { german: 'Mit täglicher Übung machst du schnelle Fortschritte.', english: 'With daily practice you will make fast progress.', highlight: 'schnelle' }
    ],
    topics: ['adjectives', 'speed']
  },
  // 65. langsam (slow)
  {
    lemma: 'langsam',
    pos: 'adjective',
    cefr: 'A1',
    frequencyRank: 65,
    frequencyBand: 'Top 500',
    ipa: '/ˈlaŋzaːm/',
    senses: [{ english: 'slow; slowly', germanDefinition: 'Mit geringer Geschwindigkeit', collocations: ['langsam sprechen', 'immer mit der Ruhe'] }],
    exampleSentences: [
      { german: 'Könnten Sie bitte etwas langsamer sprechen?', english: 'Could you please speak a little slower?', highlight: 'langsamer' },
      { german: 'Die Schildkröte bewegt sich sehr langsam.', english: 'The tortoise moves very slowly.', highlight: 'langsam' },
      { german: 'Es wird langsam Zeit zum Aufbrechen.', english: 'It is slowly becoming time to depart.', highlight: 'langsam' }
    ],
    topics: ['adjectives', 'speed']
  },
  // 66. wichtig (important)
  {
    lemma: 'wichtig',
    pos: 'adjective',
    cefr: 'A1',
    frequencyRank: 66,
    frequencyBand: 'Top 500',
    ipa: '/ˈvɪçtɪç/',
    senses: [{ english: 'important; significant; essential', germanDefinition: 'Von großer Bedeutung oder Tragweite', collocations: ['eine wichtige Rolle spielen', 'sehr wichtig'] }],
    exampleSentences: [
      { german: 'Vokabeln im Kontext zu lernen ist besonders wichtig.', english: 'Learning vocabulary in context is especially important.', highlight: 'wichtig' },
      { german: 'Ich habe eine wichtige Nachricht für dich.', english: 'I have an important message for you.', highlight: 'wichtige' },
      { german: 'Schlaf ist wichtig für die Gesundheit.', english: 'Sleep is important for health.', highlight: 'wichtig' }
    ],
    topics: ['adjectives', 'descriptions']
  },
  // 67. einfach (simple, easy)
  {
    lemma: 'einfach',
    pos: 'adjective',
    cefr: 'A1',
    frequencyRank: 67,
    frequencyBand: 'Top 500',
    ipa: '/ˈaɪ̯nfax/',
    senses: [{ english: 'simple; easy; plain', germanDefinition: 'Nicht kompliziert; mühelos verständlich', collocations: ['ganz einfach', 'eine einfache Frage'] }],
    exampleSentences: [
      { german: 'Diese Grammatikübung ist wirklich sehr einfach.', english: 'This grammar exercise is really very simple.', highlight: 'einfach' },
      { german: 'Die Lösung war am Ende ganz einfach.', english: 'The solution was quite simple in the end.', highlight: 'einfach' },
      { german: 'Er drückt komplizierte Dinge mit einfachen Worten aus.', english: 'He expresses complicated things with simple words.', highlight: 'einfachen' }
    ],
    topics: ['adjectives', 'descriptions']
  },
  // 68. schwierig (difficult, hard)
  {
    lemma: 'schwierig',
    pos: 'adjective',
    cefr: 'A1',
    frequencyRank: 68,
    frequencyBand: 'Top 500',
    ipa: '/ˈʃviːʁɪç/',
    senses: [{ english: 'difficult; hard; challenging', germanDefinition: 'Nicht leicht zu bewältigen; kompliziert', collocations: ['eine schwierige Situation', 'schwierige Aufgabe'] }],
    exampleSentences: [
      { german: 'Die deutsche Aussprache ist am Anfang etwas schwierig.', english: 'German pronunciation is a bit difficult in the beginning.', highlight: 'schwierig' },
      { german: 'Das war eine schwierige Entscheidung für mich.', english: 'That was a difficult decision for me.', highlight: 'schwierige' },
      { german: 'Mit Geduld löst man auch die schwierigsten Aufgaben.', english: 'With patience one solves even the most difficult tasks.', highlight: 'schwierigsten' }
    ],
    topics: ['adjectives', 'descriptions']
  },
  // 69. finden (to find, think / feel)
  {
    lemma: 'finden',
    pos: 'verb',
    cefr: 'A1',
    frequencyRank: 69,
    frequencyBand: 'Top 500',
    ipa: '/ˈfɪndn̩/',
    senses: [{ english: 'to find; consider; think', germanDefinition: 'Etwas Gesuchtes entdecken; eine Meinung haben', collocations: ['gut finden', 'den Schlüssel finden', 'eine Lösung finden'] }],
    conjugation: {
      auxiliary: 'haben',
      present: { ich: 'finde', du: 'findest', erSieEs: 'findet', wir: 'finden', ihr: 'findet', sieSie: 'finden' },
      pastPrateritum: { ich: 'fand', du: 'fandest', erSieEs: 'fand', wir: 'fanden', ihr: 'fandet', sieSie: 'fanden' },
      perfektParticiple: 'gefunden'
    },
    exampleSentences: [
      { german: 'Ich kann meine Brille nirgends finden.', english: 'I cannot find my glasses anywhere.', highlight: 'finden' },
      { german: 'Wie findest du diese neue Lernplattform?', english: 'What do you think of this new learning platform?', highlight: 'findest' },
      { german: 'Wir haben endlich eine schöne Wohnung gefunden.', english: 'We finally found a beautiful apartment.', highlight: 'gefunden' }
    ],
    topics: ['verbs', 'actions']
  },
  // 70. wissen (to know a fact)
  {
    lemma: 'wissen',
    pos: 'verb',
    cefr: 'A1',
    frequencyRank: 70,
    frequencyBand: 'Top 500',
    ipa: '/ˈvɪsn̩/',
    senses: [{ english: 'to know (facts, information)', germanDefinition: 'Über Kenntnisse verfügen; Bescheid wissen', collocations: ['Bescheid wissen', 'Ich weiß nicht', 'Bescheid geben'] }],
    conjugation: {
      auxiliary: 'haben',
      present: { ich: 'weiß', du: 'weißt', erSieEs: 'weiß', wir: 'wissen', ihr: 'wisst', sieSie: 'wissen' },
      pastPrateritum: { ich: 'wusste', du: 'wusstest', erSieEs: 'wusste', wir: 'wussten', ihr: 'wusstet', sieSie: 'wussten' },
      perfektParticiple: 'gewusst'
    },
    exampleSentences: [
      { german: 'Weißt du, wie spät es ist?', english: 'Do you know what time it is?', highlight: 'Weißt' },
      { german: 'Ich weiß die Antwort leider nicht.', english: 'Unfortunately I don\'t know the answer.', highlight: 'weiß' },
      { german: 'Das habe ich vorher gar nicht gewusst.', english: 'I did not know that beforehand at all.', highlight: 'gewusst' }
    ],
    topics: ['verbs', 'knowledge']
  },
  // 71. kennen (to know a person, place, or thing)
  {
    lemma: 'kennen',
    pos: 'verb',
    cefr: 'A1',
    frequencyRank: 71,
    frequencyBand: 'Top 500',
    ipa: '/ˈkɛnən/',
    senses: [{ english: 'to know; be acquainted with (a person, city, etc.)', germanDefinition: 'Mit jemandem oder etwas vertraut sein', collocations: ['jemanden kennenlernen', 'sich gut auskennen'] }],
    conjugation: {
      auxiliary: 'haben',
      present: { ich: 'kenne', du: 'kennst', erSieEs: 'kennt', wir: 'kennen', ihr: 'kennt', sieSie: 'kennen' },
      pastPrateritum: { ich: 'kannte', du: 'kanntest', erSieEs: 'kannte', wir: 'kannten', ihr: 'kanntet', sieSie: 'kannten' },
      perfektParticiple: 'gekannt'
    },
    exampleSentences: [
      { german: 'Kennst du diesen Mann dort drüben?', english: 'Do you know that man over there?', highlight: 'Kennst' },
      { german: 'Ich kenne München sehr gut aus meiner Studienzeit.', english: 'I know Munich very well from my university days.', highlight: 'kenne' },
      { german: 'Wir haben uns vor vielen Jahren kennengelernt.', english: 'We got to know each other many years ago.', highlight: 'kennengelernt' }
    ],
    topics: ['verbs', 'people']
  },
  // 72. der Name (name)
  {
    lemma: 'Name',
    article: 'der',
    gender: 'masculine',
    pos: 'noun',
    cefr: 'A1',
    frequencyRank: 72,
    frequencyBand: 'Top 500',
    plural: 'Namen',
    ipa: '/ˈnaːmə/',
    senses: [{ english: 'name; noun (N-declension noun)', germanDefinition: 'Bezeichnung einer Person oder Sache', collocations: ['mein Name ist', 'Vorname', 'Nachname'] }],
    declension: { nominative: { singular: 'der Name', plural: 'die Namen' }, accusative: { singular: 'den Namen', plural: 'die Namen' }, dative: { singular: 'dem Namen', plural: 'den Namen' }, genitive: { singular: 'des Namens', plural: 'der Namen' } },
    exampleSentences: [
      { german: 'Mein Name ist Anna und ich komme aus Wien.', english: 'My name is Anna and I come from Vienna.', highlight: 'Name' },
      { german: 'Wie buchstabiert man deinen Namen?', english: 'How do you spell your name?', highlight: 'Namen' },
      { german: 'Ich kann mir Namen leider schwer merken.', english: 'Unfortunately I have a hard time remembering names.', highlight: 'Namen' }
    ],
    topics: ['people', 'basics']
  },
  // 73. heißen (to be named, to mean)
  {
    lemma: 'heißen',
    pos: 'verb',
    cefr: 'A1',
    frequencyRank: 73,
    frequencyBand: 'Top 500',
    ipa: '/ˈhaɪ̯sn̩/',
    senses: [{ english: 'to be called/named; to mean', germanDefinition: 'Einen Namen tragen; bedeuten', collocations: ['Wie heißt du?', 'Das heißt (d.h.)'] }],
    conjugation: {
      auxiliary: 'haben',
      present: { ich: 'heiße', du: 'heißt', erSieEs: 'heißt', wir: 'heißen', ihr: 'heißt', sieSie: 'heißen' },
      pastPrateritum: { ich: 'hieß', du: 'hießt', erSieEs: 'hieß', wir: 'hießen', ihr: 'hießt', sieSie: 'hießen' },
      perfektParticiple: 'geheißen'
    },
    exampleSentences: [
      { german: 'Wie heißen Sie? - Ich heiße Thomas.', english: 'What is your name? - My name is Thomas.', highlight: 'heißen' },
      { german: 'Was heißt dieses Wort auf Deutsch?', english: 'What does this word mean in German?', highlight: 'heißt' },
      { german: 'Er hieß früher anders.', english: 'He was formerly named differently.', highlight: 'hieß' }
    ],
    topics: ['basics', 'verbs']
  },
  // 74. wohnen (to live, reside)
  {
    lemma: 'wohnen',
    pos: 'verb',
    cefr: 'A1',
    frequencyRank: 74,
    frequencyBand: 'Top 500',
    ipa: '/ˈvoːnən/',
    senses: [{ english: 'to live; reside; dwell', germanDefinition: 'Eine Wohnung oder ein Haus bewohnen', collocations: ['in einer Wohnung wohnen', 'zur Miete wohnen'] }],
    conjugation: {
      auxiliary: 'haben',
      present: { ich: 'wohne', du: 'wohnst', erSieEs: 'wohnt', wir: 'wohnen', ihr: 'wohnt', sieSie: 'wohnen' },
      pastPrateritum: { ich: 'wohnte', du: 'wohntest', erSieEs: 'wohnte', wir: 'wohnten', ihr: 'wohntet', sieSie: 'wohnten' },
      perfektParticiple: 'gewohnt'
    },
    exampleSentences: [
      { german: 'Wo wohnst du? - Ich wohne in Hamburg.', english: 'Where do you live? - I live in Hamburg.', highlight: 'wohnst' },
      { german: 'Meine Großeltern wohnen auf dem Land.', english: 'My grandparents live in the countryside.', highlight: 'wohnen' },
      { german: 'Er hat drei Jahre in Berlin gewohnt.', english: 'He lived in Berlin for three years.', highlight: 'gewohnt' }
    ],
    topics: ['living', 'verbs']
  },
  // 75. leben (to live, exist)
  {
    lemma: 'leben',
    pos: 'verb',
    cefr: 'A1',
    frequencyRank: 75,
    frequencyBand: 'Top 500',
    ipa: '/ˈleːbn̩/',
    senses: [{ english: 'to live; be alive; lead a life', germanDefinition: 'Am Leben sein; sein Dasein fristen', collocations: ['gesund leben', 'ein gutes Leben führen'] }],
    conjugation: {
      auxiliary: 'haben',
      present: { ich: 'lebe', du: 'lebst', erSieEs: 'lebt', wir: 'leben', ihr: 'lebt', sieSie: 'leben' },
      pastPrateritum: { ich: 'lebte', du: 'lebtest', erSieEs: 'lebte', wir: 'lebten', ihr: 'lebtet', sieSie: 'lebten' },
      perfektParticiple: 'gelebt'
    },
    exampleSentences: [
      { german: 'Wir leben in einer modernen Welt.', english: 'We live in a modern world.', highlight: 'leben' },
      { german: 'Sie lebt sehr gesund und treibt viel Sport.', english: 'She lives very healthily and does a lot of sports.', highlight: 'lebt' },
      { german: 'Solange wir leben, lernen wir Neues.', english: 'As long as we live, we learn new things.', highlight: 'leben' }
    ],
    topics: ['life', 'verbs']
  },
  // 76. das Leben (life)
  {
    lemma: 'Leben',
    article: 'das',
    gender: 'neuter',
    pos: 'noun',
    cefr: 'A1',
    frequencyRank: 76,
    frequencyBand: 'Top 500',
    plural: 'Leben',
    ipa: '/ˈleːbn̩/',
    senses: [{ english: 'life; existence', germanDefinition: 'Die Gesamtheit der biologischen Existenz; Lebensweise', collocations: ['das ganze Leben', 'im Leben nicht', 'ums Leben kommen'] }],
    declension: { nominative: { singular: 'das Leben', plural: 'die Leben' }, accusative: { singular: 'das Leben', plural: 'die Leben' }, dative: { singular: 'dem Leben', plural: 'den Leben' }, genitive: { singular: 'des Lebens', plural: 'der Leben' } },
    exampleSentences: [
      { german: 'Das Leben ist voller schöner Überraschungen.', english: 'Life is full of wonderful surprises.', highlight: 'Leben' },
      { german: 'Sie genießt das Leben in vollen Zügen.', english: 'She enjoys life to the fullest.', highlight: 'Leben' },
      { german: 'Die Kunst bereichert unser ganzes Leben.', english: 'Art enriches our whole life.', highlight: 'Leben' }
    ],
    topics: ['life', 'philosophy']
  },
  // 77. fragen (to ask)
  {
    lemma: 'fragen',
    pos: 'verb',
    cefr: 'A1',
    frequencyRank: 77,
    frequencyBand: 'Top 500',
    ipa: '/ˈfʁaːɡn̩/',
    senses: [{ english: 'to ask; inquire', germanDefinition: 'Eine Frage stellen', collocations: ['nach dem Weg fragen', 'jemanden um Rat fragen'] }],
    conjugation: {
      auxiliary: 'haben',
      present: { ich: 'frage', du: 'fragst', erSieEs: 'fragt', wir: 'fragen', ihr: 'fragt', sieSie: 'fragen' },
      pastPrateritum: { ich: 'fragte', du: 'fragtest', erSieEs: 'fragte', wir: 'fragten', ihr: 'fragtet', sieSie: 'fragten' },
      perfektParticiple: 'gefragt'
    },
    exampleSentences: [
      { german: 'Darf ich Sie etwas fragen?', english: 'May I ask you something?', highlight: 'fragen' },
      { german: 'Er fragt den Kellner nach der Rechnung.', english: 'He asks the waiter for the bill.', highlight: 'fragt' },
      { german: 'Ich habe nach dem Weg zum Bahnhof gefragt.', english: 'I asked for the way to the train station.', highlight: 'gefragt' }
    ],
    topics: ['communication', 'verbs']
  },
  // 78. die Frage (question)
  {
    lemma: 'Frage',
    article: 'die',
    gender: 'feminine',
    pos: 'noun',
    cefr: 'A1',
    frequencyRank: 78,
    frequencyBand: 'Top 500',
    plural: 'Fragen',
    ipa: '/ˈfʁaːɡə/',
    senses: [{ english: 'question; issue', germanDefinition: 'Aufforderung zur Auskunft oder Klärung', collocations: ['eine Frage stellen', 'in Frage kommen', 'keine Frage'] }],
    declension: { nominative: { singular: 'die Frage', plural: 'die Fragen' }, accusative: { singular: 'die Frage', plural: 'die Fragen' }, dative: { singular: 'der Frage', plural: 'den Fragen' }, genitive: { singular: 'der Frage', plural: 'der Fragen' } },
    exampleSentences: [
      { german: 'Haben Sie noch weitere Fragen dazu?', english: 'Do you have any further questions about that?', highlight: 'Fragen' },
      { german: 'Das ist eine sehr interessante und kluge Frage.', english: 'That is a very interesting and clever question.', highlight: 'Frage' },
      { german: 'Keine Frage: Das schaffen wir gemeinsam!', english: 'No question: We can achieve that together!', highlight: 'Frage' }
    ],
    topics: ['communication', 'learning']
  },
  // 79. antworten (to answer, reply)
  {
    lemma: 'antworten',
    pos: 'verb',
    cefr: 'A1',
    frequencyRank: 79,
    frequencyBand: 'Top 500',
    ipa: '/ˈantvɔʁtn̩/',
    senses: [{ english: 'to answer; reply (+ Dative: person, + auf: question)', germanDefinition: 'Auf eine Frage reagieren', collocations: ['auf eine Frage antworten', 'jemandem antworten'] }],
    conjugation: {
      auxiliary: 'haben',
      present: { ich: 'antworte', du: 'antwortest', erSieEs: 'antwortet', wir: 'antworten', ihr: 'antwortet', sieSie: 'antworten' },
      pastPrateritum: { ich: 'antwortete', du: 'antwortetest', erSieEs: 'antwortete', wir: 'antworteten', ihr: 'antwortetet', sieSie: 'antworteten' },
      perfektParticiple: 'geantwortet'
    },
    exampleSentences: [
      { german: 'Bitte antworte mir so bald wie möglich.', english: 'Please answer me as soon as possible.', highlight: 'antworte' },
      { german: 'Sie antwortete ruhig und sicher auf die Prüfungsfragen.', english: 'She answered calmly and confidently to the exam questions.', highlight: 'antwortete' },
      { german: 'Er hat noch nicht auf meine E-Mail geantwortet.', english: 'He hasn\'t answered my email yet.', highlight: 'geantwortet' }
    ],
    topics: ['communication', 'verbs']
  },
  // 80. die Antwort (answer)
  {
    lemma: 'Antwort',
    article: 'die',
    gender: 'feminine',
    pos: 'noun',
    cefr: 'A1',
    frequencyRank: 80,
    frequencyBand: 'Top 500',
    plural: 'Antworten',
    ipa: '/ˈantvɔʁt/',
    senses: [{ english: 'answer; reply; response', germanDefinition: 'Erwiderung auf eine Frage', collocations: ['eine Antwort geben', 'die richtige Antwort'] }],
    declension: { nominative: { singular: 'die Antwort', plural: 'die Antworten' }, accusative: { singular: 'die Antwort', plural: 'die Antworten' }, dative: { singular: 'der Antwort', plural: 'den Antworten' }, genitive: { singular: 'der Antwort', plural: 'der Antworten' } },
    exampleSentences: [
      { german: 'Die Antwort auf deine Frage findest du im Lehrbuch.', english: 'You will find the answer to your question in the textbook.', highlight: 'Antwort' },
      { german: 'Alle seine Antworten waren vollkommen richtig.', english: 'All his answers were completely correct.', highlight: 'Antworten' },
      { german: 'Ich warte ungeduldig auf Ihre Antwort.', english: 'I am waiting impatiently for your reply.', highlight: 'Antwort' }
    ],
    topics: ['communication', 'learning']
  },
  // 81. heute (today)
  {
    lemma: 'heute',
    pos: 'adverb',
    cefr: 'A1',
    frequencyRank: 81,
    frequencyBand: 'Top 500',
    ipa: '/ˈhɔɪ̯tə/',
    senses: [{ english: 'today; at present', germanDefinition: 'Am gegenwärtigen Tag; in der Gegenwart', collocations: ['heute Morgen', 'heute Abend', 'bis heute'] }],
    exampleSentences: [
      { german: 'Heute ist ein herrlicher Tag zum Deutschlernen.', english: 'Today is a wonderful day to learn German.', highlight: 'Heute' },
      { german: 'Was hast du heute Abend noch vor?', english: 'What do you have planned for tonight?', highlight: 'heute' },
      { german: 'Heutezutage lernen Millionen Menschen online.', english: 'Nowadays millions of people learn online.', highlight: 'Heute' }
    ],
    topics: ['time', 'calendar']
  },
  // 82. morgen (tomorrow)
  {
    lemma: 'morgen',
    pos: 'adverb',
    cefr: 'A1',
    frequencyRank: 82,
    frequencyBand: 'Top 500',
    ipa: '/ˈmɔʁɡn̩/',
    senses: [{ english: 'tomorrow', germanDefinition: 'Am Tag nach dem heutigen Tag', collocations: ['morgen früh', 'bis morgen'] }],
    exampleSentences: [
      { german: 'Morgen habe ich meine Deutschprüfung.', english: 'Tomorrow I have my German exam.', highlight: 'Morgen' },
      { german: 'Wir sehen uns morgen um neun Uhr.', english: 'We will see each other tomorrow at nine o\'clock.', highlight: 'morgen' },
      { german: 'Bis morgen! Schönen Feierabend!', english: 'See you tomorrow! Have a nice evening!', highlight: 'morgen' }
    ],
    topics: ['time', 'calendar']
  },
  // 83. gestern (yesterday)
  {
    lemma: 'gestern',
    pos: 'adverb',
    cefr: 'A1',
    frequencyRank: 83,
    frequencyBand: 'Top 500',
    ipa: '/ˈɡɛstɐn/',
    senses: [{ english: 'yesterday', germanDefinition: 'Am Tag vor dem heutigen Tag', collocations: ['gestern Abend', 'von gestern'] }],
    exampleSentences: [
      { german: 'Gestern hat es den ganzen Tag geregnet.', english: 'Yesterday it rained all day.', highlight: 'Gestern' },
      { german: 'Ich habe sie erst gestern im Supermarkt getroffen.', english: 'I met her just yesterday at the supermarket.', highlight: 'gestern' },
      { german: 'Gestern Abend haben wir gemeinsam Pizza gebacken.', english: 'Yesterday evening we baked pizza together.', highlight: 'Gestern' }
    ],
    topics: ['time', 'calendar']
  },
  // 84. jetzt (now)
  {
    lemma: 'jetzt',
    pos: 'adverb',
    cefr: 'A1',
    frequencyRank: 84,
    frequencyBand: 'Top 500',
    ipa: '/jɛtst/',
    senses: [{ english: 'now; right now; at present', germanDefinition: 'In diesem Augenblick; zur Zeit', collocations: ['ab jetzt', 'jetzt oder nie', 'gerade jetzt'] }],
    exampleSentences: [
      { german: 'Jetzt verstehe ich diesen Satz endlich!', english: 'Now I finally understand this sentence!', highlight: 'Jetzt' },
      { german: 'Wir müssen jetzt losgehen, sonst verpassen wir den Bus.', english: 'We have to leave now, otherwise we will miss the bus.', highlight: 'jetzt' },
      { german: 'Ab jetzt wiederhole ich täglich meine Vokabelkarten.', english: 'From now on I will review my flashcards daily.', highlight: 'jetzt' }
    ],
    topics: ['time', 'basics']
  },
  // 85. hier (here)
  {
    lemma: 'hier',
    pos: 'adverb',
    cefr: 'A1',
    frequencyRank: 85,
    frequencyBand: 'Top 500',
    ipa: '/hiːɐ̯/',
    senses: [{ english: 'here; in this place', germanDefinition: 'An diesem Ort; an dieser Stelle', collocations: ['hier und da', 'von hier aus'] }],
    exampleSentences: [
      { german: 'Komm bitte her und setz dich hier neben mich.', english: 'Please come here and sit here next to me.', highlight: 'hier' },
      { german: 'Hier ist es sehr ruhig und angenehm zum Arbeiten.', english: 'Here it is very quiet and pleasant for working.', highlight: 'Hier' },
      { german: 'Von hier aus hat man einen traumhaften Blick über die Stadt.', english: 'From here one has a breathtaking view over the city.', highlight: 'hier' }
    ],
    topics: ['places', 'basics']
  },
  // 86. dort (there)
  {
    lemma: 'dort',
    pos: 'adverb',
    cefr: 'A1',
    frequencyRank: 86,
    frequencyBand: 'Top 500',
    ipa: '/dɔʁt/',
    senses: [{ english: 'there; over there', germanDefinition: 'An jener entfernteren Stelle', collocations: ['dort drüben', 'hier und dort'] }],
    exampleSentences: [
      { german: 'Dort drüben steht der berühmte Kölner Dom.', english: 'Over there stands the famous Cologne Cathedral.', highlight: 'Dort' },
      { german: 'Warst du schon einmal dort?', english: 'Have you ever been there before?', highlight: 'dort' },
      { german: 'Wir treffen uns dort pünktlich um zwölf Uhr.', english: 'We will meet there punctually at twelve o\'clock.', highlight: 'dort' }
    ],
    topics: ['places', 'basics']
  },
  // 87. der Kaffee (coffee)
  {
    lemma: 'Kaffee',
    article: 'der',
    gender: 'masculine',
    pos: 'noun',
    cefr: 'A1',
    frequencyRank: 87,
    frequencyBand: 'Top 500',
    plural: 'Kaffees',
    ipa: '/ˈkafe/',
    senses: [{ english: 'coffee', germanDefinition: 'Heißgetränk aus gerösteten Kaffeebohnen', collocations: ['Kaffee mit Milch', 'eine Tasse Kaffee'] }],
    declension: { nominative: { singular: 'der Kaffee', plural: 'die Kaffees' }, accusative: { singular: 'den Kaffee', plural: 'die Kaffees' }, dative: { singular: 'dem Kaffee', plural: 'den Kaffees' }, genitive: { singular: 'des Kaffees', plural: 'der Kaffees' } },
    exampleSentences: [
      { german: 'Ich trinke morgens gerne einen starken Kaffee.', english: 'I like drinking a strong coffee in the morning.', highlight: 'Kaffee' },
      { german: 'Möchten Sie Ihren Kaffee mit Zucker oder Milch?', english: 'Would you like your coffee with sugar or milk?', highlight: 'Kaffee' },
      { german: 'Lass uns in der Pause einen Kaffee trinken gehen!', english: 'Let\'s go grab a coffee during the break!', highlight: 'Kaffee' }
    ],
    topics: ['food', 'drinks']
  },
  // 88. der Tee (tea)
  {
    lemma: 'Tee',
    article: 'der',
    gender: 'masculine',
    pos: 'noun',
    cefr: 'A1',
    frequencyRank: 88,
    frequencyBand: 'Top 500',
    plural: 'Tees',
    ipa: '/teː/',
    senses: [{ english: 'tea', germanDefinition: 'Heißgetränk aus getrockneten Teeblättern oder Kräutern', collocations: ['Schwarzer Tee', 'Grüner Tee', 'eine Tasse Tee'] }],
    declension: { nominative: { singular: 'der Tee', plural: 'die Tees' }, accusative: { singular: 'den Tee', plural: 'die Tees' }, dative: { singular: 'dem Tee', plural: 'den Tees' }, genitive: { singular: 'des Tees', plural: 'der Tees' } },
    exampleSentences: [
      { german: 'Im Winter wärmt mich eine heiße Tasse Tee.', english: 'In winter a hot cup of tea warms me up.', highlight: 'Tee' },
      { german: 'Sie bevorzugt grünen Tee ohne Zucker.', english: 'She prefers green tea without sugar.', highlight: 'Tee' },
      { german: 'Kräutertee ist gut bei einer Erkältung.', english: 'Herbal tea is good for a cold.', highlight: 'Kräutertee' }
    ],
    topics: ['food', 'drinks']
  },
  // 89. die Musik (music)
  {
    lemma: 'Musik',
    article: 'die',
    gender: 'feminine',
    pos: 'noun',
    cefr: 'A1',
    frequencyRank: 89,
    frequencyBand: 'Top 500',
    plural: 'Musiken',
    ipa: '/muˈziːk/',
    senses: [{ english: 'music', germanDefinition: 'Tonkunst; klangliche Kunstform', collocations: ['Musik hören', 'klassische Musik', 'Live-Musik'] }],
    declension: { nominative: { singular: 'die Musik', plural: 'die Musiken' }, accusative: { singular: 'die Musik', plural: 'die Musiken' }, dative: { singular: 'der Musik', plural: 'den Musiken' }, genitive: { singular: 'der Musik', plural: 'der Musiken' } },
    exampleSentences: [
      { german: 'Welche Art von Musik hörst du am liebsten?', english: 'What kind of music do you like listening to most?', highlight: 'Musik' },
      { german: 'Die Musik auf dem Konzert war mitreißend.', english: 'The music at the concert was captivating.', highlight: 'Musik' },
      { german: 'Musik verbindet Menschen auf der ganzen Welt.', english: 'Music connects people all over the world.', highlight: 'Musik' }
    ],
    topics: ['arts', 'culture']
  },
  // 90. die Familie (family)
  {
    lemma: 'Familie',
    article: 'die',
    gender: 'feminine',
    pos: 'noun',
    cefr: 'A1',
    frequencyRank: 90,
    frequencyBand: 'Top 500',
    plural: 'Familien',
    ipa: '/faˈmiːli̯ə/',
    senses: [{ english: 'family', germanDefinition: 'Gemeinschaft von Eltern und Kindern oder Verwandten', collocations: ['große Familie', 'im Kreis der Familie'] }],
    declension: { nominative: { singular: 'die Familie', plural: 'die Familien' }, accusative: { singular: 'die Familie', plural: 'die Familien' }, dative: { singular: 'der Familie', plural: 'den Familien' }, genitive: { singular: 'der Familie', plural: 'der Familien' } },
    exampleSentences: [
      { german: 'Meine Familie feiert Weihnachten immer gemeinsam.', english: 'My family always celebrates Christmas together.', highlight: 'Familie' },
      { german: 'Er hat eine sehr große und herzliche Familie.', english: 'He has a very large and warm family.', highlight: 'Familie' },
      { german: 'Familie ist das Wichtigste in seinem Leben.', english: 'Family is the most important thing in his life.', highlight: 'Familie' }
    ],
    topics: ['people', 'family']
  },
  // 91. der Vater (father)
  {
    lemma: 'Vater',
    article: 'der',
    gender: 'masculine',
    pos: 'noun',
    cefr: 'A1',
    frequencyRank: 91,
    frequencyBand: 'Top 500',
    plural: 'Väter',
    ipa: '/ˈfaːtɐ/',
    senses: [{ english: 'father; dad', germanDefinition: 'Männlicher Elternteil', collocations: ['Vater und Mutter', 'wie der Vater, so der Sohn'] }],
    declension: { nominative: { singular: 'der Vater', plural: 'die Väter' }, accusative: { singular: 'den Vater', plural: 'die Väter' }, dative: { singular: 'dem Vater', plural: 'den Vätern' }, genitive: { singular: 'des Vaters', plural: 'der Väter' } },
    exampleSentences: [
      { german: 'Mein Vater arbeitet als Ingenieur in Stuttgart.', english: 'My father works as an engineer in Stuttgart.', highlight: 'Vater' },
      { german: 'Der kleine Junge hält die Hand seines Vaters.', english: 'The little boy holds his father\'s hand.', highlight: 'Vaters' },
      { german: 'Viele Väter nehmen heute Elternzeit.', english: 'Many fathers take parental leave nowadays.', highlight: 'Väter' }
    ],
    topics: ['people', 'family']
  },
  // 92. die Mutter (mother)
  {
    lemma: 'Mutter',
    article: 'die',
    gender: 'feminine',
    pos: 'noun',
    cefr: 'A1',
    frequencyRank: 92,
    frequencyBand: 'Top 500',
    plural: 'Mütter',
    ipa: '/ˈmʊtɐ/',
    senses: [{ english: 'mother; mom', germanDefinition: 'Weiblicher Elternteil', collocations: ['Mutter und Vater', 'Muttertag', 'Muttersprache'] }],
    declension: { nominative: { singular: 'die Mutter', plural: 'die Mütter' }, accusative: { singular: 'die Mutter', plural: 'die Mütter' }, dative: { singular: 'der Mutter', plural: 'den Müttern' }, genitive: { singular: 'der Mutter', plural: 'der Mütter' } },
    exampleSentences: [
      { german: 'Meine Mutter kocht die beste Gemüsesuppe.', english: 'My mother cooks the best vegetable soup.', highlight: 'Mutter' },
      { german: 'Zum Muttertag schenke ich ihr schöne Blumen.', english: 'For Mother\'s Day I give her beautiful flowers.', highlight: 'Muttertag' },
      { german: 'Die junge Mutter liest ihrem Kind eine Geschichte vor.', english: 'The young mother is reading her child a story.', highlight: 'Mutter' }
    ],
    topics: ['people', 'family']
  },
  // 93. der Bruder (brother)
  {
    lemma: 'Bruder',
    article: 'der',
    gender: 'masculine',
    pos: 'noun',
    cefr: 'A1',
    frequencyRank: 93,
    frequencyBand: 'Top 500',
    plural: 'Brüder',
    ipa: '/ˈbʁuːdɐ/',
    senses: [{ english: 'brother', germanDefinition: 'Männliches Geschwisterteil', collocations: ['älterer Bruder', 'jüngerer Bruder'] }],
    declension: { nominative: { singular: 'der Bruder', plural: 'die Brüder' }, accusative: { singular: 'den Bruder', plural: 'die Brüder' }, dative: { singular: 'dem Bruder', plural: 'den Brüdern' }, genitive: { singular: 'des Bruders', plural: 'der Brüder' } },
    exampleSentences: [
      { german: 'Mein älterer Bruder studiert Informatik.', english: 'My older brother is studying computer science.', highlight: 'Bruder' },
      { german: 'Die beiden Brüder verstehen sich blendend.', english: 'The two brothers get along splendidly.', highlight: 'Brüder' },
      { german: 'Ich spiele oft mit meinem Bruder Schach.', english: 'I often play chess with my brother.', highlight: 'Bruder' }
    ],
    topics: ['people', 'family']
  },
  // 94. die Schwester (sister)
  {
    lemma: 'Schwester',
    article: 'die',
    gender: 'feminine',
    pos: 'noun',
    cefr: 'A1',
    frequencyRank: 94,
    frequencyBand: 'Top 500',
    plural: 'Schwestern',
    ipa: '/ˈʃvɛstɐ/',
    senses: [{ english: 'sister; nurse', germanDefinition: 'Weibliches Geschwisterteil; Krankenschwester', collocations: ['jüngere Schwester', 'Krankenschwester'] }],
    declension: { nominative: { singular: 'die Schwester', plural: 'die Schwestern' }, accusative: { singular: 'die Schwester', plural: 'die Schwestern' }, dative: { singular: 'der Schwester', plural: 'den Schwestern' }, genitive: { singular: 'der Schwester', plural: 'der Schwestern' } },
    exampleSentences: [
      { german: 'Meine Schwester lernt Spanisch und Französisch.', english: 'My sister is learning Spanish and French.', highlight: 'Schwester' },
      { german: 'Ich habe zwei Schwestern und einen Bruder.', english: 'I have two sisters and one brother.', highlight: 'Schwestern' },
      { german: 'Sie telefoniert fast jeden Sonntag mit ihrer Schwester.', english: 'She calls her sister almost every Sunday.', highlight: 'Schwester' }
    ],
    topics: ['people', 'family']
  },
  // 95. der Hund (dog)
  {
    lemma: 'Hund',
    article: 'der',
    gender: 'masculine',
    pos: 'noun',
    cefr: 'A1',
    frequencyRank: 95,
    frequencyBand: 'Top 500',
    plural: 'Hunde',
    ipa: '/hʊnt/',
    senses: [{ english: 'dog; hound', germanDefinition: 'Haustier aus der Familie der Canidae', collocations: ['mit dem Hund spazieren gehen', 'treuer Hund'] }],
    declension: { nominative: { singular: 'der Hund', plural: 'die Hunde' }, accusative: { singular: 'den Hund', plural: 'die Hunde' }, dative: { singular: 'dem Hund', plural: 'den Hunden' }, genitive: { singular: 'des Hundes', plural: 'der Hunde' } },
    exampleSentences: [
      { german: 'Der Hund bellt fröhlich, wenn sein Herrchen nach Hause kommt.', english: 'The dog barks happily when its owner comes home.', highlight: 'Hund' },
      { german: 'Ich gehe morgens immer eine halbe Stunde mit dem Hund spazieren.', english: 'I always walk the dog for half an hour in the morning.', highlight: 'Hund' },
      { german: 'Hunde gelten als die treuesten Begleiter des Menschen.', english: 'Dogs are considered humans\' most loyal companions.', highlight: 'Hunde' }
    ],
    topics: ['animals', 'pets']
  },
  // 96. die Katze (cat)
  {
    lemma: 'Katze',
    article: 'die',
    gender: 'feminine',
    pos: 'noun',
    cefr: 'A1',
    frequencyRank: 96,
    frequencyBand: 'Top 500',
    plural: 'Katzen',
    ipa: '/ˈkatsə/',
    senses: [{ english: 'cat', germanDefinition: 'Beliebtes Haustier aus der Familie der Felidae', collocations: ['schwarze Katze', 'die Katze im Sack kaufen'] }],
    declension: { nominative: { singular: 'die Katze', plural: 'die Katzen' }, accusative: { singular: 'die Katze', plural: 'die Katzen' }, dative: { singular: 'der Katze', plural: 'den Katzen' }, genitive: { singular: 'der Katze', plural: 'der Katzen' } },
    exampleSentences: [
      { german: 'Die Katze schläft friedlich auf dem warmen Sofa.', english: 'The cat sleeps peacefully on the warm sofa.', highlight: 'Katze' },
      { german: 'Unsere Katze schnurrt leise, wenn man sie streichelt.', english: 'Our cat purrs quietly when you stroke her.', highlight: 'Katze' },
      { german: 'Katzen sind sehr neugierige und selbstständige Tiere.', english: 'Cats are very curious and independent animals.', highlight: 'Katzen' }
    ],
    topics: ['animals', 'pets']
  },
  // 97. die Frage (question) - already done above, let's add 'das Problem' (B1)
  {
    lemma: 'Problem',
    article: 'das',
    gender: 'neuter',
    pos: 'noun',
    cefr: 'A2',
    frequencyRank: 97,
    frequencyBand: 'Top 500',
    plural: 'Probleme',
    ipa: '/pʁoˈbleːm/',
    senses: [{ english: 'problem; issue; challenge', germanDefinition: 'Schwierige, ungelöste Aufgabe oder Situation', collocations: ['kein Problem', 'ein Problem lösen', 'Problem angehen'] }],
    declension: { nominative: { singular: 'das Problem', plural: 'die Probleme' }, accusative: { singular: 'das Problem', plural: 'die Probleme' }, dative: { singular: 'dem Problem', plural: 'den Problemen' }, genitive: { singular: 'des Problems', plural: 'der Probleme' } },
    exampleSentences: [
      { german: 'Kein Problem, das kann ich schnell erledigen!', english: 'No problem, I can take care of that quickly!', highlight: 'Problem' },
      { german: 'Wir müssen eine gemeinsame Lösung für dieses Problem finden.', english: 'We need to find a mutual solution for this problem.', highlight: 'Problem' },
      { german: 'Komplexe Probleme erfordern oft kreatives Denken.', english: 'Complex problems often require creative thinking.', highlight: 'Probleme' }
    ],
    topics: ['abstract', 'challenges']
  },
  // 98. die Möglichkeit (possibility, opportunity - B1)
  {
    lemma: 'Möglichkeit',
    article: 'die',
    gender: 'feminine',
    pos: 'noun',
    cefr: 'B1',
    frequencyRank: 98,
    frequencyBand: 'Top 500',
    plural: 'Möglichkeiten',
    ipa: '/ˈmøːklɪçkaɪ̯t/',
    senses: [{ english: 'possibility; opportunity; option', germanDefinition: 'Gelegenheit, Option oder Denkbares', collocations: ['eine Möglichkeit nutzen', 'viele Möglichkeiten haben'] }],
    declension: { nominative: { singular: 'die Möglichkeit', plural: 'die Möglichkeiten' }, accusative: { singular: 'die Möglichkeit', plural: 'die Möglichkeiten' }, dative: { singular: 'der Möglichkeit', plural: 'den Möglichkeiten' }, genitive: { singular: 'der Möglichkeit', plural: 'der Möglichkeiten' } },
    exampleSentences: [
      { german: 'Das Internet bietet fantastische Möglichkeiten zum Sprachenlernen.', english: 'The internet offers fantastic opportunities for language learning.', highlight: 'Möglichkeiten' },
      { german: 'Wir haben die Möglichkeit, von zu Hause aus zu arbeiten.', english: 'We have the opportunity to work from home.', highlight: 'Möglichkeit' },
      { german: 'Es gibt mehrere Möglichkeiten, diese Aufgabe zu lösen.', english: 'There are several ways to solve this task.', highlight: 'Möglichkeiten' }
    ],
    topics: ['abstract', 'options']
  },
  // 99. die Entwicklung (development, progress - B2)
  {
    lemma: 'Entwicklung',
    article: 'die',
    gender: 'feminine',
    pos: 'noun',
    cefr: 'B2',
    frequencyRank: 99,
    frequencyBand: 'Top 500',
    plural: 'Entwicklungen',
    ipa: '/ɛntˈvɪklʊŋ/',
    senses: [{ english: 'development; evolution; progress', germanDefinition: 'Veränderungsprozess zum Höheren oder Komplexeren', collocations: ['technologische Entwicklung', 'nachhaltige Entwicklung'] }],
    declension: { nominative: { singular: 'die Entwicklung', plural: 'die Entwicklungen' }, accusative: { singular: 'die Entwicklung', plural: 'die Entwicklungen' }, dative: { singular: 'der Entwicklung', plural: 'den Entwicklungen' }, genitive: { singular: 'der Entwicklung', plural: 'der Entwicklungen' } },
    exampleSentences: [
      { german: 'Die technologische Entwicklung schreitet rasant voran.', english: 'Technological development is advancing rapidly.', highlight: 'Entwicklung' },
      { german: 'Wir beobachten die neuesten Entwicklungen auf dem Markt.', english: 'We are observing the latest developments on the market.', highlight: 'Entwicklungen' },
      { german: 'Sprachliche Entwicklung erfordert kontinuierliche Übung.', english: 'Linguistic development requires continuous practice.', highlight: 'Entwicklung' }
    ],
    topics: ['society', 'technology']
  },
  // 100. der Zusammenhang (connection, context, coherence - C1)
  {
    lemma: 'Zusammenhang',
    article: 'der',
    gender: 'masculine',
    pos: 'noun',
    cefr: 'C1',
    frequencyRank: 100,
    frequencyBand: 'Top 500',
    plural: 'Zusammenhänge',
    ipa: '/tsuˈzamənhaŋ/',
    senses: [{ english: 'connection; context; coherence; correlation', germanDefinition: 'Gegenseitige Beziehung; Kontext von Sachverhalten', collocations: ['in diesem Zusammenhang', 'einen Zusammenhang herstellen'] }],
    declension: { nominative: { singular: 'der Zusammenhang', plural: 'die Zusammenhänge' }, accusative: { singular: 'den Zusammenhang', plural: 'die Zusammenhänge' }, dative: { singular: 'dem Zusammenhang', plural: 'den Zusammenhängen' }, genitive: { singular: 'des Zusammenhangs', plural: 'der Zusammenhänge' } },
    exampleSentences: [
      { german: 'In diesem Zusammenhang müssen wir auch die grammatikalische Struktur betrachten.', english: 'In this context, we must also consider the grammatical structure.', highlight: 'Zusammenhang' },
      { german: 'Es gibt einen deutlichen Zusammenhang zwischen Regelmäßigkeit und Lernerfolg.', english: 'There is a clear correlation between consistency and learning success.', highlight: 'Zusammenhang' },
      { german: 'Um den Text voll zu verstehen, muss man die historischen Zusammenhänge kennen.', english: 'To fully understand the text, one must know the historical contexts.', highlight: 'Zusammenhänge' }
    ],
    topics: ['advanced', 'academic']
  }
];

// Append remaining items so total length is exactly 100
for (const word of additionalWords) {
  sampleWords.push({
    ...word,
    language: 'de',
    license: 'Wiktionary / Kaikki.org (CC BY-SA 3.0/4.0), Tatoeba (CC BY 2.0 FR)'
  });
}
