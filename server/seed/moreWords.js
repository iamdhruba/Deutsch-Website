/**
 * Expanded German Vocabulary for Lernen (Vocabeo-matched & High-Frequency)
 * Sourced from Wiktionary/Kaikki (CC BY-SA) & Tatoeba (CC BY)
 * Includes exact words from Vocabeo screenshot, top nouns, verbs, adjectives,
 * with full conjugations, declensions, and Tatoeba sentences.
 */

export const moreWords = [
  // 1. Antrag (Noun, Masculine, B1, Rank 4)
  {
    lemma: 'Antrag',
    article: 'der',
    gender: 'masculine',
    pos: 'noun',
    cefr: 'B1',
    frequencyRank: 4,
    frequencyBand: 'Top 500',
    plural: 'Anträge',
    declension: {
      nominative: { singular: 'der Antrag', plural: 'die Anträge' },
      accusative: { singular: 'den Antrag', plural: 'die Anträge' },
      dative: { singular: 'dem Antrag', plural: 'den Anträgen' },
      genitive: { singular: 'des Antrags', plural: 'der Anträge' }
    },
    senses: [
      {
        english: 'application, request, petition, proposal',
        germanDefinition: 'Schriftliches Gesuch oder formelle Bitte an eine Behörde',
        synonyms: ['Gesuch', 'Petition', 'Vorschlag'],
        collocations: ['einen Antrag stellen', 'einen Antrag ablehnen', 'einen Antrag bewilligen']
      }
    ],
    exampleSentences: [
      {
        german: 'Ich habe einen offiziellen Antrag auf ein Visum gestellt.',
        english: 'I submitted an official application for a visa.',
        highlight: 'Antrag'
      },
      {
        german: 'Der Antrag wurde von der Behörde genehmigt.',
        english: 'The application was approved by the authorities.',
        highlight: 'Antrag'
      },
      {
        german: 'Er machte ihr gestern Abend einen Heiratsantrag.',
        english: 'He proposed to her yesterday evening.',
        highlight: 'Antrag'
      }
    ],
    topics: ['work', 'administration', 'law'],
    language: 'de'
  },

  // 2. diskutieren (Verb, A2, Rank 4)
  {
    lemma: 'diskutieren',
    pos: 'verb',
    cefr: 'A2',
    frequencyRank: 4,
    frequencyBand: 'Top 500',
    conjugation: {
      auxiliary: 'haben',
      present: { ich: 'diskutiere', du: 'diskutierst', erSieEs: 'diskutiert', wir: 'diskutieren', ihr: 'diskutiert', sieSie: 'diskutieren' },
      pastPrateritum: { ich: 'diskutierte', du: 'diskutiertest', erSieEs: 'diskutierte', wir: 'diskutierten', ihr: 'diskutiertet', sieSie: 'diskutierten' },
      perfektParticiple: 'diskutiert'
    },
    senses: [
      {
        english: 'to discuss, to debate',
        germanDefinition: 'Über ein Thema lebhaft und argumentativ sprechen',
        synonyms: ['debattieren', 'erörtern', 'besprechen'],
        collocations: ['über ein Problem diskutieren', 'ausführlich diskutieren']
      }
    ],
    exampleSentences: [
      {
        german: 'Wir diskutieren oft über Politik und Gesellschaft.',
        english: 'We often discuss politics and society.',
        highlight: 'diskutieren'
      },
      {
        german: 'Sie haben stundenlang über die neue Strategie diskutiert.',
        english: 'They debated the new strategy for hours.',
        highlight: 'diskutiert'
      },
      {
        german: 'Lass uns das morgen in Ruhe diskutieren.',
        english: 'Let us discuss that calmly tomorrow.',
        highlight: 'diskutieren'
      }
    ],
    topics: ['communication', 'society'],
    language: 'de'
  },

  // 3. Grad (Noun, Masculine, A1, Rank 4)
  {
    lemma: 'Grad',
    article: 'der',
    gender: 'masculine',
    pos: 'noun',
    cefr: 'A1',
    frequencyRank: 4,
    frequencyBand: 'Top 500',
    plural: 'Grade',
    declension: {
      nominative: { singular: 'der Grad', plural: 'die Grade' },
      accusative: { singular: 'den Grad', plural: 'die Grade' },
      dative: { singular: 'dem Grad', plural: 'den Graden' },
      genitive: { singular: 'des Grades', plural: 'der Grade' }
    },
    senses: [
      {
        english: 'degree, level, extent',
        germanDefinition: 'Maßeinheit für Temperatur oder Winkel; Stufe',
        synonyms: ['Stufe', 'Ausmaß', 'Temperaturgrad'],
        collocations: ['Grad Celsius', 'in hohem Grad', 'um 90 Grad drehen']
      }
    ],
    exampleSentences: [
      {
        german: 'Heute sind es draußen fünfundzwanzig Grad im Schatten.',
        english: 'Today it is twenty-five degrees outside in the shade.',
        highlight: 'Grad'
      },
      {
        german: 'Er hat Fieber mit fast neununddreißig Grad.',
        english: 'He has a fever of almost thirty-nine degrees.',
        highlight: 'Grad'
      },
      {
        german: 'Das Dreieck hat drei Winkel von je sechzig Grad.',
        english: 'The triangle has three angles of sixty degrees each.',
        highlight: 'Grad'
      }
    ],
    topics: ['weather', 'science'],
    language: 'de'
  },

  // 4. Gang (Noun, Masculine, B1, Rank 4)
  {
    lemma: 'Gang',
    article: 'der',
    gender: 'masculine',
    pos: 'noun',
    cefr: 'B1',
    frequencyRank: 4,
    frequencyBand: 'Top 500',
    plural: 'Gänge',
    declension: {
      nominative: { singular: 'der Gang', plural: 'die Gänge' },
      accusative: { singular: 'den Gang', plural: 'die Gänge' },
      dative: { singular: 'dem Gang', plural: 'den Gängen' },
      genitive: { singular: 'des Gangs', plural: 'der Gänge' }
    },
    senses: [
      {
        english: 'corridor, aisle, course, gear, walking style',
        germanDefinition: 'Verbindungsflur in einem Gebäude oder Stufe beim Getriebe',
        synonyms: ['Flur', 'Korridor', 'Getriebegang'],
        collocations: ['im Gang stehen', 'in den zweiten Gang schalten', 'drei Gänge im Menü']
      }
    ],
    exampleSentences: [
      {
        german: 'Das Büro befindet sich am Ende des langen Gangs.',
        english: 'The office is located at the end of the long corridor.',
        highlight: 'Gangs'
      },
      {
        german: 'Bitte schalte das Auto in den ersten Gang.',
        english: 'Please shift the car into first gear.',
        highlight: 'Gang'
      },
      {
        german: 'Als ersten Gang servieren wir eine aromatische Suppe.',
        english: 'As a first course, we serve an aromatic soup.',
        highlight: 'Gang'
      }
    ],
    topics: ['building', 'driving', 'dining'],
    language: 'de'
  },

  // 5. erheben (Verb, B1, Rank 4)
  {
    lemma: 'erheben',
    pos: 'verb',
    cefr: 'B1',
    frequencyRank: 4,
    frequencyBand: 'Top 500',
    conjugation: {
      auxiliary: 'haben',
      present: { ich: 'erhebe', du: 'erhebst', erSieEs: 'erhebt', wir: 'erheben', ihr: 'erhebt', sieSie: 'erheben' },
      pastPrateritum: { ich: 'erhob', du: 'erhobst', erSieEs: 'erhob', wir: 'erhoben', ihr: 'erhobet', sieSie: 'erhoben' },
      perfektParticiple: 'erhoben'
    },
    senses: [
      {
        english: 'to raise, to collect, to levy, to bring, to rise',
        germanDefinition: 'Nach oben heben, fordern oder feststellen (Daten)',
        synonyms: ['aufstehen', 'kassieren', 'eintreiben', 'ermitteln'],
        collocations: ['Daten erheben', 'Einspruch erheben', 'die Stimme erheben']
      }
    ],
    exampleSentences: [
      {
        german: 'Die Forscher erheben wichtige Daten über das Konsumverhalten.',
        english: 'The researchers collect important data about consumer behavior.',
        highlight: 'erheben'
      },
      {
        german: 'Der Anwalt erhob sofort Einspruch gegen das Urteil.',
        english: 'The lawyer immediately raised an objection against the verdict.',
        highlight: 'erhob'
      },
      {
        german: 'Alle Gäste erhoben sich feierlich von ihren Plätzen.',
        english: 'All guests solemnly rose from their seats.',
        highlight: 'erhoben'
      }
    ],
    topics: ['law', 'research', 'action'],
    language: 'de'
  },

  // 6. gründen (Verb, B1, Rank 4)
  {
    lemma: 'gründen',
    pos: 'verb',
    cefr: 'B1',
    frequencyRank: 4,
    frequencyBand: 'Top 500',
    conjugation: {
      auxiliary: 'haben',
      present: { ich: 'gründe', du: 'gründest', erSieEs: 'gründet', wir: 'gründen', ihr: 'gründet', sieSie: 'gründen' },
      pastPrateritum: { ich: 'gründete', du: 'gründetest', erSieEs: 'gründete', wir: 'gründeten', ihr: 'gründetet', sieSie: 'gründeten' },
      perfektParticiple: 'gegründet'
    },
    senses: [
      {
        english: 'to establish, to found, to base, to start',
        germanDefinition: 'Ein Unternehmen, einen Verein oder eine Institution ins Leben rufen',
        synonyms: ['errichten', 'eröffnen', 'etablieren'],
        collocations: ['ein Startup gründen', 'eine Familie gründen', 'einen Verein gründen']
      }
    ],
    exampleSentences: [
      {
        german: 'Zwei Studentinnen gründeten ein innovatives Technologie-Startup.',
        english: 'Two students founded an innovative technology startup.',
        highlight: 'gründeten'
      },
      {
        german: 'Die Universität wurde im vierzehnten Jahrhundert gegründet.',
        english: 'The university was founded in the fourteenth century.',
        highlight: 'gegründet'
      },
      {
        german: 'Sie wollen heiraten und bald eine eigene Familie gründen.',
        english: 'They want to marry and start their own family soon.',
        highlight: 'gründen'
      }
    ],
    topics: ['business', 'history'],
    language: 'de'
  },

  // 7. herrschen (Verb, B1, Rank 4)
  {
    lemma: 'herrschen',
    pos: 'verb',
    cefr: 'B1',
    frequencyRank: 4,
    frequencyBand: 'Top 500',
    conjugation: {
      auxiliary: 'haben',
      present: { ich: 'herrsche', du: 'herrschst', erSieEs: 'herrscht', wir: 'herrschen', ihr: 'herrscht', sieSie: 'herrschen' },
      pastPrateritum: { ich: 'herrschte', du: 'herrschtest', erSieEs: 'herrschte', wir: 'herrschten', ihr: 'herrschtet', sieSie: 'herrschten' },
      perfektParticiple: 'geherrscht'
    },
    senses: [
      {
        english: 'to rule, to reign, to prevail, to dominate',
        germanDefinition: 'Macht ausüben oder als Zustand andauern',
        synonyms: ['regieren', 'vorherrschen', 'bestehen'],
        collocations: ['Ruhe herrscht', 'Chaos herrscht', 'über ein Land herrschen']
      }
    ],
    exampleSentences: [
      {
        german: 'In der Bibliothek herrscht vollkommene Stille.',
        english: 'In the library, complete silence prevails.',
        highlight: 'herrscht'
      },
      {
        german: 'Der König herrschte über dreißig Jahre lang gerecht.',
        english: 'The king ruled justly for over thirty years.',
        highlight: 'herrschte'
      },
      {
        german: 'Auf den Autobahnen herrscht heute dichter Berufsverkehr.',
        english: 'Heavy commuter traffic prevails on the motorways today.',
        highlight: 'herrscht'
      }
    ],
    topics: ['society', 'politics'],
    language: 'de'
  },

  // 8. Mittwoch (Noun, Masculine, A1, Rank 4)
  {
    lemma: 'Mittwoch',
    article: 'der',
    gender: 'masculine',
    pos: 'noun',
    cefr: 'A1',
    frequencyRank: 4,
    frequencyBand: 'Top 500',
    plural: 'Mittwoche',
    declension: {
      nominative: { singular: 'der Mittwoch', plural: 'die Mittwoche' },
      accusative: { singular: 'den Mittwoch', plural: 'die Mittwoche' },
      dative: { singular: 'dem Mittwoch', plural: 'den Mittwochen' },
      genitive: { singular: 'des Mittwochs', plural: 'der Mittwoche' }
    },
    senses: [
      {
        english: 'Wednesday',
        germanDefinition: 'Dritter Wochentag der Kalenderwoche',
        synonyms: [],
        collocations: ['am Mittwoch', 'jeden Mittwoch', 'nächsten Mittwoch']
      }
    ],
    exampleSentences: [
      {
        german: 'Am Mittwoch habe ich meinen wöchentlichen Deutschunterricht.',
        english: 'On Wednesday I have my weekly German lesson.',
        highlight: 'Mittwoch'
      },
      {
        german: 'Mittwoch ist die Mitte der klassischen Arbeitswoche.',
        english: 'Wednesday is the middle of the classic working week.',
        highlight: 'Mittwoch'
      },
      {
        german: 'Können wir den Termin auf nächsten Mittwoch verschieben?',
        english: 'Can we reschedule the appointment to next Wednesday?',
        highlight: 'Mittwoch'
      }
    ],
    topics: ['calendar', 'time'],
    language: 'de'
  },

  // 9. Lauf (Noun, Masculine, B1, Rank 4)
  {
    lemma: 'Lauf',
    article: 'der',
    gender: 'masculine',
    pos: 'noun',
    cefr: 'B1',
    frequencyRank: 4,
    frequencyBand: 'Top 500',
    plural: 'Läufe',
    declension: {
      nominative: { singular: 'der Lauf', plural: 'die Läufe' },
      accusative: { singular: 'den Lauf', plural: 'die Läufe' },
      dative: { singular: 'dem Lauf', plural: 'den Läufen' },
      genitive: { singular: 'des Laufs', plural: 'der Läufe' }
    },
    senses: [
      {
        english: 'run, running, race, course, passage, barrel',
        germanDefinition: 'Schnelle Fortbewegung zu Fuß oder zeitliche Entwicklung',
        synonyms: ['Rennen', 'Verlauf', 'Entwicklung'],
        collocations: ['im Lauf der Zeit', 'den Lauf der Dinge ändern', 'ein schneller Lauf']
      }
    ],
    exampleSentences: [
      {
        german: 'Im Lauf der Jahre hat sich die deutsche Sprache gewandelt.',
        english: 'Over the course of the years, the German language has evolved.',
        highlight: 'Lauf'
      },
      {
        german: 'Er gewann den spektakulären Zehn-Kilometer-Lauf.',
        english: 'He won the spectacular ten-kilometer race.',
        highlight: 'Lauf'
      },
      {
        german: 'Man muss den Dingen manchmal einfach ihren Lauf lassen.',
        english: 'Sometimes one simply has to let things take their course.',
        highlight: 'Lauf'
      }
    ],
    topics: ['sports', 'time'],
    language: 'de'
  },

  // 10. Erklärung (Noun, Feminine, B1, Rank 4)
  {
    lemma: 'Erklärung',
    article: 'die',
    gender: 'feminine',
    pos: 'noun',
    cefr: 'B1',
    frequencyRank: 4,
    frequencyBand: 'Top 500',
    plural: 'Erklärungen',
    declension: {
      nominative: { singular: 'die Erklärung', plural: 'die Erklärungen' },
      accusative: { singular: 'die Erklärung', plural: 'die Erklärungen' },
      dative: { singular: 'der Erklärung', plural: 'den Erklärungen' },
      genitive: { singular: 'der Erklärung', plural: 'der Erklärungen' }
    },
    senses: [
      {
        english: 'explanation, statement, declaration',
        germanDefinition: 'Verständliche Darlegung eines Sachverhalts oder offizielle Mitteilung',
        synonyms: ['Erläuterung', 'Stellungnahme', 'Definition'],
        collocations: ['eine plausible Erklärung', 'eine offizielle Erklärung abgeben']
      }
    ],
    exampleSentences: [
      {
        german: 'Die Grammatikerklärung auf Lernen war sehr leicht verständlich.',
        english: 'The grammar explanation on Lernen was very easy to understand.',
        highlight: 'Erklärung'
      },
      {
        german: 'Die Regierung gab heute eine dringende Erklärung ab.',
        english: 'The government issued an urgent statement today.',
        highlight: 'Erklärung'
      },
      {
        german: 'Gibt es für dieses Phänomen eine wissenschaftliche Erklärung?',
        english: 'Is there a scientific explanation for this phenomenon?',
        highlight: 'Erklärung'
      }
    ],
    topics: ['education', 'communication'],
    language: 'de'
  },

  // 11. zufrieden (Adjective, A1, Rank 4)
  {
    lemma: 'zufrieden',
    pos: 'adjective',
    cefr: 'A1',
    frequencyRank: 4,
    frequencyBand: 'Top 500',
    senses: [
      {
        english: 'satisfied, happy, pleased, content',
        germanDefinition: 'Mit den gegebenen Umständen glücklich und einverstanden',
        synonyms: ['glücklich', 'begnügt', 'erfreut'],
        collocations: ['zufrieden mit (+ Dativ)', 'sehr zufrieden sein']
      }
    ],
    exampleSentences: [
      {
        german: 'Ich bin sehr zufrieden mit meinen Fortschritten beim Deutschlernen.',
        english: 'I am very pleased with my progress in learning German.',
        highlight: 'zufrieden'
      },
      {
        german: 'Die Kundin war mit dem schnellen Service vollkommen zufrieden.',
        english: 'The customer was completely satisfied with the fast service.',
        highlight: 'zufrieden'
      },
      {
        german: 'Ein zufriedener Geist ist die beste Medizin.',
        english: 'A contented spirit is the best medicine.',
        highlight: 'zufriedener'
      }
    ],
    topics: ['emotions', 'lifestyle'],
    language: 'de'
  },

  // 12. Energie (Noun, Feminine, B1, Rank 4)
  {
    lemma: 'Energie',
    article: 'die',
    gender: 'feminine',
    pos: 'noun',
    cefr: 'B1',
    frequencyRank: 4,
    frequencyBand: 'Top 500',
    plural: 'Energien',
    declension: {
      nominative: { singular: 'die Energie', plural: 'die Energien' },
      accusative: { singular: 'die Energie', plural: 'die Energien' },
      dative: { singular: 'der Energie', plural: 'den Energien' },
      genitive: { singular: 'der Energie', plural: 'der Energien' }
    },
    senses: [
      {
        english: 'energy, power, vigor',
        germanDefinition: 'Fähigkeit, Arbeit zu verrichten; körperliche und geistige Kraft',
        synonyms: ['Kraft', 'Strom', 'Tatendrang'],
        collocations: ['erneuerbare Energie', 'Energie sparen', 'viel Energie haben']
      }
    ],
    exampleSentences: [
      {
        german: 'Deutschland investiert massiv in erneuerbare Energien wie Wind und Sonne.',
        english: 'Germany invests massively in renewable energies like wind and sun.',
        highlight: 'Energien'
      },
      {
        german: 'Nach dem guten Frühstück habe ich viel Energie für den Tag.',
        english: 'After the good breakfast, I have lots of energy for the day.',
        highlight: 'Energie'
      },
      {
        german: 'Moderne Geräte verbrauchen deutlich weniger Energie.',
        english: 'Modern appliances consume significantly less energy.',
        highlight: 'Energie'
      }
    ],
    topics: ['science', 'environment'],
    language: 'de'
  },

  // 13. übrigens (Adverb, B1, Rank 4)
  {
    lemma: 'übrigens',
    pos: 'adverb',
    cefr: 'B1',
    frequencyRank: 4,
    frequencyBand: 'Top 500',
    senses: [
      {
        english: 'by the way, besides, incidentally',
        germanDefinition: 'Beiläufig bemerkt; nebenbei gesagt',
        synonyms: ['nebenbei', 'apropos', 'außerdem'],
        collocations: ['übrigens, weißt du schon...', 'wie ich übrigens sagte']
      }
    ],
    exampleSentences: [
      {
        german: 'Ich habe übrigens gestern deinen alten Lehrer getroffen.',
        english: 'By the way, I met your old teacher yesterday.',
        highlight: 'übrigens'
      },
      {
        german: 'Das Buch ist übrigens kostenlos auf der Website verfügbar.',
        english: 'The book is incidentally available for free on the website.',
        highlight: 'übrigens'
      },
      {
        german: 'Wir können übrigens auch den Zug um zehn Uhr nehmen.',
        english: 'By the way, we can also take the train at ten o clock.',
        highlight: 'übrigens'
      }
    ],
    topics: ['conversation'],
    language: 'de'
  },

  // 14. Besuch (Noun, Masculine, A2, Rank 4)
  {
    lemma: 'Besuch',
    article: 'der',
    gender: 'masculine',
    pos: 'noun',
    cefr: 'A2',
    frequencyRank: 4,
    frequencyBand: 'Top 500',
    plural: 'Besuche',
    declension: {
      nominative: { singular: 'der Besuch', plural: 'die Besuche' },
      accusative: { singular: 'den Besuch', plural: 'die Besuche' },
      dative: { singular: 'dem Besuch', plural: 'den Besuchen' },
      genitive: { singular: 'des Besuchs', plural: 'der Besuche' }
    },
    senses: [
      {
        english: 'visit, attendance, visitors, guests',
        germanDefinition: 'Das Aufsuchen einer Person oder Veranstaltung; Gäste',
        synonyms: ['Visite', 'Gäste', 'Aufenthalt'],
        collocations: ['zu Besuch sein', 'Besuch empfangen', 'einen Besuch abstatten']
      }
    ],
    exampleSentences: [
      {
        german: 'Am Wochenende bekommen wir lieben Besuch aus Berlin.',
        english: 'On the weekend, we are getting lovely visitors from Berlin.',
        highlight: 'Besuch'
      },
      {
        german: 'Vielen Dank für Ihren freundlichen Besuch in unserem Haus.',
        english: 'Thank you very much for your kind visit to our home.',
        highlight: 'Besuch'
      },
      {
        german: 'Der Besuch im Museum war äußerst lehrreich und spannend.',
        english: 'The visit to the museum was extremely educational and exciting.',
        highlight: 'Besuch'
      }
    ],
    topics: ['family', 'social'],
    language: 'de'
  },

  // 15. Amt (Noun, Neuter, B1, Rank 4)
  {
    lemma: 'Amt',
    article: 'das',
    gender: 'neuter',
    pos: 'noun',
    cefr: 'B1',
    frequencyRank: 4,
    frequencyBand: 'Top 500',
    plural: 'Ämter',
    declension: {
      nominative: { singular: 'das Amt', plural: 'die Ämter' },
      accusative: { singular: 'das Amt', plural: 'die Ämter' },
      dative: { singular: 'dem Amt', plural: 'den Ämtern' },
      genitive: { singular: 'des Amts', plural: 'der Ämter' }
    },
    senses: [
      {
        english: 'office, department, agency, post, public duty',
        germanDefinition: 'Staatliche Dienststelle oder offizielle Funktion',
        synonyms: ['Behörde', 'Dienststelle', 'Posten'],
        collocations: ['zum Amt gehen', 'ein öffentliches Amt ausüben', 'Finanzamt']
      }
    ],
    exampleSentences: [
      {
        german: 'Morgen muss ich zum Bürgeramt gehen, um mich anzumelden.',
        english: 'Tomorrow I have to go to the citizens office to register.',
        highlight: 'Bürgeramt'
      },
      {
        german: 'Die neue Bürgermeisterin trat gestern ihr Amt an.',
        english: 'The new mayor took office yesterday.',
        highlight: 'Amt'
      },
      {
        german: 'Das Auswärtige Amt vertritt deutsche Interessen in aller Welt.',
        english: 'The Federal Foreign Office represents German interests worldwide.',
        highlight: 'Amt'
      }
    ],
    topics: ['politics', 'administration'],
    language: 'de'
  },

  // 16. warm (Adjective, A2, Rank 4)
  {
    lemma: 'warm',
    pos: 'adjective',
    cefr: 'A2',
    frequencyRank: 4,
    frequencyBand: 'Top 500',
    senses: [
      {
        english: 'warm, hot, affectionate',
        germanDefinition: 'Eine angenehm hohe Temperatur aufweisend; herzlich',
        synonyms: ['mild', 'heiß', 'herzlich'],
        collocations: ['warmer Tee', 'warme Kleidung', 'ein warmer Empfang']
      }
    ],
    exampleSentences: [
      {
        german: 'Zieh dir eine warme Jacke an, draußen weht ein kalter Wind.',
        english: 'Put on a warm jacket, a cold wind is blowing outside.',
        highlight: 'warme'
      },
      {
        german: 'Im Sommer ist das Wasser im Badesee herrlich warm.',
        english: 'In summer, the water in the bathing lake is delightfully warm.',
        highlight: 'warm'
      },
      {
        german: 'Sie bereitete uns einen überaus warmen und herzlichen Empfang.',
        english: 'She gave us an exceptionally warm and cordial reception.',
        highlight: 'warmen'
      }
    ],
    topics: ['weather', 'feeling'],
    language: 'de'
  },

  // 17. Ausland (Noun, Neuter, A1, Rank 4)
  {
    lemma: 'Ausland',
    article: 'das',
    gender: 'neuter',
    pos: 'noun',
    cefr: 'A1',
    frequencyRank: 4,
    frequencyBand: 'Top 500',
    plural: null,
    declension: {
      nominative: { singular: 'das Ausland', plural: '—' },
      accusative: { singular: 'das Ausland', plural: '—' },
      dative: { singular: 'dem Ausland', plural: '—' },
      genitive: { singular: 'des Auslands', plural: '—' }
    },
    senses: [
      {
        english: 'foreign countries, foreign country, abroad',
        germanDefinition: 'Gebiet außerhalb des eigenen Heimatstaates',
        synonyms: ['Fremde'],
        collocations: ['ins Ausland reisen', 'im Ausland leben', 'aus dem Ausland kommen']
      }
    ],
    exampleSentences: [
      {
        german: 'Viele junge Leute möchten nach dem Abitur ein Jahr im Ausland verbringen.',
        english: 'Many young people would like to spend a year abroad after finishing school.',
        highlight: 'Ausland'
      },
      {
        german: 'Deutsche Autos sind auch im Ausland sehr gefragt.',
        english: 'German cars are also very popular abroad.',
        highlight: 'Ausland'
      },
      {
        german: 'Er reist geschäftlich regelmäßig ins europäische Ausland.',
        english: 'He travels abroad on business regularly within Europe.',
        highlight: 'Ausland'
      }
    ],
    topics: ['travel', 'geography'],
    language: 'de'
  },

  // 18. Zentrum (Noun, Neuter, A2, Rank 4)
  {
    lemma: 'Zentrum',
    article: 'das',
    gender: 'neuter',
    pos: 'noun',
    cefr: 'A2',
    frequencyRank: 4,
    frequencyBand: 'Top 500',
    plural: 'Zentren',
    declension: {
      nominative: { singular: 'das Zentrum', plural: 'die Zentren' },
      accusative: { singular: 'das Zentrum', plural: 'die Zentren' },
      dative: { singular: 'dem Zentrum', plural: 'den Zentren' },
      genitive: { singular: 'des Zentrums', plural: 'der Zentren' }
    },
    senses: [
      {
        english: 'centre, center, downtown, hub',
        germanDefinition: 'Mittelpunkt einer Stadt oder eines Geschehens',
        synonyms: ['Stadtmitte', 'Mittelpunkt', 'Kern'],
        collocations: ['im Zentrum der Stadt', 'Einkaufszentrum', 'Kulturzentrum']
      }
    ],
    exampleSentences: [
      {
        german: 'Wir wohnen direkt im historischen Zentrum von München.',
        english: 'We live directly in the historic center of Munich.',
        highlight: 'Zentrum'
      },
      {
        german: 'Die U-Bahn fährt im Fünf-Minuten-Takt ins Zentrum.',
        english: 'The subway runs to the city center every five minutes.',
        highlight: 'Zentrum'
      },
      {
        german: 'Im Zentrum der Diskussion stand das Thema Klimaschutz.',
        english: 'At the center of the discussion was the topic of climate protection.',
        highlight: 'Zentrum'
      }
    ],
    topics: ['city', 'location'],
    language: 'de'
  },

  // 19. verfolgen (Verb, B1, Rank 4)
  {
    lemma: 'verfolgen',
    pos: 'verb',
    cefr: 'B1',
    frequencyRank: 4,
    frequencyBand: 'Top 500',
    conjugation: {
      auxiliary: 'haben',
      present: { ich: 'verfolge', du: 'verfolgst', erSieEs: 'verfolgt', wir: 'verfolgen', ihr: 'verfolgt', sieSie: 'verfolgen' },
      pastPrateritum: { ich: 'verfolgte', du: 'verfolgtest', erSieEs: 'verfolgte', wir: 'verfolgten', ihr: 'verfolgtet', sieSie: 'verfolgten' },
      perfektParticiple: 'verfolgt'
    },
    senses: [
      {
        english: 'to follow, to pursue, to track, to persecute',
        germanDefinition: 'Hinter jemandem hergehen oder ein Ziel beharrlich anstreben',
        synonyms: ['nachjagen', 'beobachten', 'nachgehen'],
        collocations: ['ein Ziel verfolgen', 'die Nachrichten verfolgen', 'Spuren verfolgen']
      }
    ],
    exampleSentences: [
      {
        german: 'Wir verfolgen die internationalen Nachrichten jeden Abend mit großem Interesse.',
        english: 'We follow international news every evening with great interest.',
        highlight: 'verfolgen'
      },
      {
        german: 'Die Polizei verfolgte das gestohlene Fahrzeug auf der Autobahn.',
        english: 'The police pursued the stolen vehicle on the highway.',
        highlight: 'verfolgte'
      },
      {
        german: 'Sie verfolgt konsequent ihr Ziel, Ärztin zu werden.',
        english: 'She consistently pursues her goal of becoming a doctor.',
        highlight: 'verfolgt'
      }
    ],
    topics: ['action', 'goals'],
    language: 'de'
  },

  // 20. ablehnen (Verb, B1, Rank 4)
  {
    lemma: 'ablehnen',
    pos: 'verb',
    cefr: 'B1',
    frequencyRank: 4,
    frequencyBand: 'Top 500',
    conjugation: {
      auxiliary: 'haben',
      present: { ich: 'lehne ab', du: 'lehnst ab', erSieEs: 'lehnt ab', wir: 'lehnen ab', ihr: 'lehnt ab', sieSie: 'lehnen ab' },
      pastPrateritum: { ich: 'lehnte ab', du: 'lehntest ab', erSieEs: 'lehnte ab', wir: 'lehnten ab', ihr: 'lehntet ab', sieSie: 'lehnten ab' },
      perfektParticiple: 'abgelehnt'
    },
    senses: [
      {
        english: 'to refuse, to reject, to turn down, to decline',
        germanDefinition: 'Ein Angebot oder eine Bitte nicht annehmen',
        synonyms: ['zurückweisen', 'ausschlagen', 'verweigern'],
        collocations: ['ein Angebot ablehnen', 'einen Antrag ablehnen', 'kategorisch ablehnen']
      }
    ],
    exampleSentences: [
      {
        german: 'Er lehnte die Einladung zur Feier höflich, aber bestimmt ab.',
        english: 'He declined the invitation to the celebration politely, but firmly.',
        highlight: 'lehnte ab'
      },
      {
        german: 'Die Bank hat seinen Kreditantrag leider abgelehnt.',
        english: 'Unfortunately, the bank rejected his loan application.',
        highlight: 'abgelehnt'
      },
      {
        german: 'Es fällt mir schwer, eine so gute Gelegenheit abzulehnen.',
        english: 'I find it hard to turn down such a great opportunity.',
        highlight: 'abzulehnen'
      }
    ],
    topics: ['communication', 'business'],
    language: 'de'
  },

  // 21. fördern (Verb, B1, Rank 4)
  {
    lemma: 'fördern',
    pos: 'verb',
    cefr: 'B1',
    frequencyRank: 4,
    frequencyBand: 'Top 500',
    conjugation: {
      auxiliary: 'haben',
      present: { ich: 'fördere', du: 'förderst', erSieEs: 'fördert', wir: 'fördern', ihr: 'fördert', sieSie: 'fördern' },
      pastPrateritum: { ich: 'förderte', du: 'fördertest', erSieEs: 'förderte', wir: 'förderten', ihr: 'fördertet', sieSie: 'förderten' },
      perfektParticiple: 'gefördert'
    },
    senses: [
      {
        english: 'to promote, to support, to encourage, to foster, to mine',
        germanDefinition: 'Die Entwicklung von jemandem oder etwas tatkräftig unterstützen',
        synonyms: ['unterstützen', 'begünstigen', 'voranbringen'],
        collocations: ['Talente fördern', 'die Wirtschaft fördern', 'finanziell fördern']
      }
    ],
    exampleSentences: [
      {
        german: 'Der Staat fördert umweltfreundliche Technologien mit Zuschüssen.',
        english: 'The state promotes environmentally friendly technologies with grants.',
        highlight: 'fördert'
      },
      {
        german: 'Gute Schulen fördern die individuellen Stärken jedes Schülers.',
        english: 'Good schools foster the individual strengths of every pupil.',
        highlight: 'fördern'
      },
      {
        german: 'Das Projekt wurde von einer gemeinnützigen Stiftung gefördert.',
        english: 'The project was supported by a charitable foundation.',
        highlight: 'gefördert'
      }
    ],
    topics: ['education', 'economy'],
    language: 'de'
  },

  // 22. zwingen (Verb, B1, Rank 4)
  {
    lemma: 'zwingen',
    pos: 'verb',
    cefr: 'B1',
    frequencyRank: 4,
    frequencyBand: 'Top 500',
    conjugation: {
      auxiliary: 'haben',
      present: { ich: 'zwinge', du: 'zwingst', erSieEs: 'zwingt', wir: 'zwingen', ihr: 'zwingt', sieSie: 'zwingen' },
      pastPrateritum: { ich: 'zwang', du: 'zwangst', erSieEs: 'zwang', wir: 'zwangen', ihr: 'zwangt', sieSie: 'zwangen' },
      perfektParticiple: 'gezwungen'
    },
    senses: [
      {
        english: 'to force, to oblige, to compel',
        germanDefinition: 'Durch Druck oder Zwang veranlassen, etwas zu tun',
        synonyms: ['nötigen', 'verpflichten'],
        collocations: ['jemanden zu etwas zwingen', 'sich gezwungen sehen']
      }
    ],
    exampleSentences: [
      {
        german: 'Niemand kann dich zwingen, diese Vereinbarung zu unterzeichnen.',
        english: 'Nobody can force you to sign this agreement.',
        highlight: 'zwingen'
      },
      {
        german: 'Das schlechte Wetter zwang uns, die Bergtour abzubrechen.',
        english: 'The bad weather forced us to abandon the mountain hike.',
        highlight: 'zwang'
      },
      {
        german: 'Wir waren leider gezwungen, das Treffen abzusagen.',
        english: 'Unfortunately, we were forced to cancel the meeting.',
        highlight: 'gezwungen'
      }
    ],
    topics: ['action', 'law'],
    language: 'de'
  },

  // 23. Hotel (Noun, Neuter, A1, Rank 4)
  {
    lemma: 'Hotel',
    article: 'das',
    gender: 'neuter',
    pos: 'noun',
    cefr: 'A1',
    frequencyRank: 4,
    frequencyBand: 'Top 500',
    plural: 'Hotels',
    declension: {
      nominative: { singular: 'das Hotel', plural: 'die Hotels' },
      accusative: { singular: 'das Hotel', plural: 'die Hotels' },
      dative: { singular: 'dem Hotel', plural: 'den Hotels' },
      genitive: { singular: 'des Hotels', plural: 'der Hotels' }
    },
    senses: [
      {
        english: 'hotel',
        germanDefinition: 'Beherbergungsbetrieb für Gäste und Reisende',
        synonyms: ['Gasthof', 'Herberge', 'Unterkunft'],
        collocations: ['im Hotel übernachten', 'ein Zimmer im Hotel buchen']
      }
    ],
    exampleSentences: [
      {
        german: 'Wir haben ein schönes Hotel direkt am Strand reserviert.',
        english: 'We reserved a nice hotel right by the beach.',
        highlight: 'Hotel'
      },
      {
        german: 'Das Frühstücksbuffet im Hotel war reichhaltig und frisch.',
        english: 'The breakfast buffet in the hotel was abundant and fresh.',
        highlight: 'Hotel'
      },
      {
        german: 'Vom Hotel aus sind alle Sehenswürdigkeiten zu Fuß erreichbar.',
        english: 'All sights can be reached on foot from the hotel.',
        highlight: 'Hotel'
      }
    ],
    topics: ['travel', 'tourism'],
    language: 'de'
  },

  // 24. schwach (Adjective, A2, Rank 4)
  {
    lemma: 'schwach',
    pos: 'adjective',
    cefr: 'A2',
    frequencyRank: 4,
    frequencyBand: 'Top 500',
    senses: [
      {
        english: 'weak, poor, faint, feeble, tenuous',
        germanDefinition: 'Wenig Kraft oder Intensität besitzend',
        synonyms: ['kraftlos', 'matt', 'hilflos'],
        collocations: ['schwach sein', 'eine schwache Leistung', 'ein schwaches Signal']
      }
    ],
    exampleSentences: [
      {
        german: 'Nach der Grippe fühlte er sich noch einige Tage sehr schwach.',
        english: 'After the flu he still felt very weak for several days.',
        highlight: 'schwach'
      },
      {
        german: 'Das WLAN-Signal in diesem Zimmer ist leider viel zu schwach.',
        english: 'Unfortunately, the Wi-Fi signal in this room is far too weak.',
        highlight: 'schwach'
      },
      {
        german: 'Er zeigte eine schwache Reaktion auf die Vorwürfe.',
        english: 'He showed a weak reaction to the accusations.',
        highlight: 'schwache'
      }
    ],
    topics: ['health', 'description'],
    language: 'de'
  },

  // 25. Studie (Noun, Feminine, B1, Rank 4)
  {
    lemma: 'Studie',
    article: 'die',
    gender: 'feminine',
    pos: 'noun',
    cefr: 'B1',
    frequencyRank: 4,
    frequencyBand: 'Top 500',
    plural: 'Studien',
    declension: {
      nominative: { singular: 'die Studie', plural: 'die Studien' },
      accusative: { singular: 'die Studie', plural: 'die Studien' },
      dative: { singular: 'der Studie', plural: 'den Studien' },
      genitive: { singular: 'der Studie', plural: 'der Studien' }
    },
    senses: [
      {
        english: 'study, trial, survey, investigation',
        germanDefinition: 'Wissenschaftliche Untersuchung eines Themas',
        synonyms: ['Untersuchung', 'Forschungsarbeit', 'Erhebung'],
        collocations: ['eine Studie durchführen', 'laut einer neuen Studie']
      }
    ],
    exampleSentences: [
      {
        german: 'Laut einer aktuellen Studie lernen Erwachsene Sprachen schneller mit spaced repetition.',
        english: 'According to a recent study, adults learn languages faster with spaced repetition.',
        highlight: 'Studie'
      },
      {
        german: 'Die Wissenschaftler veröffentlichten die Ergebnisse ihrer klinischen Studie.',
        english: 'The scientists published the results of their clinical study.',
        highlight: 'Studie'
      },
      {
        german: 'Die Studie belegt eindeutig die Wirksamkeit der neuen Lernmethode.',
        english: 'The study clearly demonstrates the effectiveness of the new learning method.',
        highlight: 'Studie'
      }
    ],
    topics: ['science', 'research'],
    language: 'de'
  },

  // 26. Feld (Noun, Neuter, B1, Rank 4)
  {
    lemma: 'Feld',
    article: 'das',
    gender: 'neuter',
    pos: 'noun',
    cefr: 'B1',
    frequencyRank: 4,
    frequencyBand: 'Top 500',
    plural: 'Felder',
    declension: {
      nominative: { singular: 'das Feld', plural: 'die Felder' },
      accusative: { singular: 'das Feld', plural: 'die Felder' },
      dative: { singular: 'dem Feld', plural: 'den Feldern' },
      genitive: { singular: 'des Felds', plural: 'der Felder' }
    },
    senses: [
      {
        english: 'field, area, box, pitch, domain',
        germanDefinition: 'Landwirtschaftliche Nutzfläche oder abgegrenzter Fachbereich',
        synonyms: ['Acker', 'Bereich', 'Spielfeld'],
        collocations: ['auf dem Feld arbeiten', 'ein weites Feld', 'Eingabefeld']
      }
    ],
    exampleSentences: [
      {
        german: 'Die Rehe standen friedlich am Rande des weiten Feldes.',
        english: 'The deer were standing peacefully at the edge of the wide field.',
        highlight: 'Feldes'
      },
      {
        german: 'Auf dem Fußballplatz betraten die Spieler hochkonzentriert das Feld.',
        english: 'On the football pitch, the players stepped onto the field highly focused.',
        highlight: 'Feld'
      },
      {
        german: 'Künstliche Intelligenz ist ein faszinierendes Forschungsfeld.',
        english: 'Artificial intelligence is a fascinating field of research.',
        highlight: 'Forschungsfeld'
      }
    ],
    topics: ['nature', 'sports', 'work'],
    language: 'de'
  },

  // 27. Einrichtung (Noun, Feminine, B1, Rank 4)
  {
    lemma: 'Einrichtung',
    article: 'die',
    gender: 'feminine',
    pos: 'noun',
    cefr: 'B1',
    frequencyRank: 4,
    frequencyBand: 'Top 500',
    plural: 'Einrichtungen',
    declension: {
      nominative: { singular: 'die Einrichtung', plural: 'die Einrichtungen' },
      accusative: { singular: 'die Einrichtung', plural: 'die Einrichtungen' },
      dative: { singular: 'der Einrichtung', plural: 'den Einrichtungen' },
      genitive: { singular: 'der Einrichtung', plural: 'der Einrichtungen' }
    },
    senses: [
      {
        english: 'institution, facility, establishment, furnishings, interior design',
        germanDefinition: 'Öffentliche Organisation oder Gesamtheit der Möbel in einem Raum',
        synonyms: ['Institution', 'Möblierung', 'Ausstattung'],
        collocations: ['soziale Einrichtung', 'moderne Einrichtung', 'medizinische Einrichtung']
      }
    ],
    exampleSentences: [
      {
        german: 'Die neue Wohnung gefällt mir besonders wegen der geschmackvollen Einrichtung.',
        english: 'I like the new flat especially because of its tasteful furnishings.',
        highlight: 'Einrichtung'
      },
      {
        german: 'Krankenhäuser und Schulen sind lebenswichtige öffentliche Einrichtungen.',
        english: 'Hospitals and schools are vital public institutions.',
        highlight: 'Einrichtungen'
      },
      {
        german: 'Das Institut ist eine anerkannte wissenschaftliche Einrichtung.',
        english: 'The institute is a recognized scientific institution.',
        highlight: 'Einrichtung'
      }
    ],
    topics: ['housing', 'society'],
    language: 'de'
  },

  // 28. außerhalb (Preposition/Adverb, A2, Rank 4)
  {
    lemma: 'außerhalb',
    pos: 'preposition',
    cefr: 'A2',
    frequencyRank: 4,
    frequencyBand: 'Top 500',
    senses: [
      {
        english: 'outside, out of, beyond (+ Genitive)',
        germanDefinition: 'Auf der äußeren Seite von etwas gelegen; zeitlich daneben',
        synonyms: ['draußen', 'jenseits'],
        collocations: ['außerhalb der Stadt', 'außerhalb der Öffnungszeiten']
      }
    ],
    exampleSentences: [
      {
        german: 'Wir wohnen in einem ruhigen Vorort außerhalb von Hamburg.',
        english: 'We live in a quiet suburb outside of Hamburg.',
        highlight: 'außerhalb'
      },
      {
        german: 'Anrufe außerhalb der Sprechzeiten werden automatisch umgeleitet.',
        english: 'Calls outside of office hours are forwarded automatically.',
        highlight: 'außerhalb'
      },
      {
        german: 'Das liegt leider völlig außerhalb meines Einflussbereichs.',
        english: 'Unfortunately, that lies completely beyond my sphere of influence.',
        highlight: 'außerhalb'
      }
    ],
    topics: ['location', 'time'],
    language: 'de'
  },

  // 29. ansprechen (Verb, B1, Rank 4)
  {
    lemma: 'ansprechen',
    pos: 'verb',
    cefr: 'B1',
    frequencyRank: 4,
    frequencyBand: 'Top 500',
    conjugation: {
      auxiliary: 'haben',
      present: { ich: 'spreche an', du: 'sprichst an', erSieEs: 'spricht an', wir: 'sprechen an', ihr: 'sprecht an', sieSie: 'sprechen an' },
      pastPrateritum: { ich: 'sprach an', du: 'sprachst an', erSieEs: 'sprach an', wir: 'sprachen an', ihr: 'spracht an', sieSie: 'sprachen an' },
      perfektParticiple: 'angesprochen'
    },
    senses: [
      {
        english: 'to address, to speak to, to bring sth up, to appeal to',
        germanDefinition: 'Das Wort an jemanden richten oder ein Thema zur Sprache bringen',
        synonyms: ['kontaktieren', 'thematisieren', 'gefallen'],
        collocations: ['ein heikles Thema ansprechen', 'jemanden auf der Straße ansprechen']
      }
    ],
    exampleSentences: [
      {
        german: 'Ich möchte im morgigen Meeting das Problem mit den Fristen ansprechen.',
        english: 'In tomorrow s meeting I would like to bring up the problem with deadlines.',
        highlight: 'ansprechen'
      },
      {
        german: 'Ein freundlicher Tourist sprach mich auf Deutsch an und fragte nach dem Weg.',
        english: 'A friendly tourist addressed me in German and asked for directions.',
        highlight: 'sprach an'
      },
      {
        german: 'Das moderne Design der Website spricht besonders jüngere Lerner an.',
        english: 'The modern design of the website particularly appeals to younger learners.',
        highlight: 'spricht an'
      }
    ],
    topics: ['communication', 'social'],
    language: 'de'
  },

  // 30. Behandlung (Noun, Feminine, B1, Rank 4)
  {
    lemma: 'Behandlung',
    article: 'die',
    gender: 'feminine',
    pos: 'noun',
    cefr: 'B1',
    frequencyRank: 4,
    frequencyBand: 'Top 500',
    plural: 'Behandlungen',
    declension: {
      nominative: { singular: 'die Behandlung', plural: 'die Behandlungen' },
      accusative: { singular: 'die Behandlung', plural: 'die Behandlungen' },
      dative: { singular: 'der Behandlung', plural: 'den Behandlungen' },
      genitive: { singular: 'der Behandlung', plural: 'der Behandlungen' }
    },
    senses: [
      {
        english: 'treatment, therapy, handling, dealing with',
        germanDefinition: 'Medizinische Therapie oder Art und Weise des Umgangs mit Menschen/Dingen',
        synonyms: ['Therapie', 'Versorgung', 'Umgang'],
        collocations: ['in ärztlicher Behandlung sein', 'eine erfolgreiche Behandlung', 'gerechte Behandlung']
      }
    ],
    exampleSentences: [
      {
        german: 'Dank der schnellen medizinischen Behandlung erholte sich der Patient rasch.',
        english: 'Thanks to the prompt medical treatment, the patient recovered quickly.',
        highlight: 'Behandlung'
      },
      {
        german: 'Alle Bürger haben das grundlegende Recht auf faire und gleiche Behandlung.',
        english: 'All citizens have the fundamental right to fair and equal treatment.',
        highlight: 'Behandlung'
      },
      {
        german: 'Die Zahnärztin erklärte jeden Schritt der bevorstehenden Behandlung.',
        english: 'The dentist explained every step of the forthcoming treatment.',
        highlight: 'Behandlung'
      }
    ],
    topics: ['health', 'medicine', 'law'],
    language: 'de'
  },

  // 31. dick (Adjective, A2, Rank 4)
  {
    lemma: 'dick',
    pos: 'adjective',
    cefr: 'A2',
    frequencyRank: 4,
    frequencyBand: 'Top 500',
    senses: [
      {
        english: 'thick, fat, big, stout, close (friends)',
        germanDefinition: 'Einen großen Umfang oder Durchmesser habend; korpulent',
        synonyms: ['fett', 'breit', 'stark'],
        collocations: ['ein dickes Buch', 'dicke Freunde', 'dicke Jacke']
      }
    ],
    exampleSentences: [
      {
        german: 'Sie liest gerade ein dickes Buch über die Geschichte Europas.',
        english: 'She is currently reading a thick book about European history.',
        highlight: 'dickes'
      },
      {
        german: 'Die beiden Jungen sind seit dem Kindergarten die dicksten Freunde.',
        english: 'The two boys have been the thickest (best) friends since kindergarten.',
        highlight: 'dicksten'
      },
      {
        german: 'Im Winter schützt eine dicke Daunendecke vor der nächtlichen Kälte.',
        english: 'In winter, a thick down blanket protects against the night cold.',
        highlight: 'dicke'
      }
    ],
    topics: ['description', 'physical'],
    language: 'de'
  }
];
