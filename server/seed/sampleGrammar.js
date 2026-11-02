/**
 * 3 Complete German Grammar Topics with Color-Coded Explanations,
 * Common Pitfalls, Mini-Quizzes, and Interactive Exercises.
 *
 * Color Coding Conventions:
 * - Masculine (der)  : Blue   (#2563eb / text-blue-600)
 * - Feminine (die)   : Red    (#dc2626 / text-red-600)
 * - Neuter (das)     : Green  (#16a34a / text-green-600)
 * - Plural (die)     : Purple (#9333ea / text-purple-600)
 *
 * Cases:
 * - Nominativ : Sky Blue  (#0284c7)
 * - Akkusativ : Amber     (#d97706)
 * - Dativ     : Emerald   (#059669)
 * - Genitiv   : Violet    (#7c3aed)
 */

export const sampleGrammarTopics = [
  // =========================================================================
  // TOPIC 1: Nouns & Articles (der, die, das)
  // =========================================================================
  {
    slug: 'nouns-gender-articles',
    title: 'Nouns: Gender Rules and Articles (der, die, das)',
    level: 'A1',
    category: 'nouns',
    order: 1,
    summary:
      'Master the three German grammatical genders (masculine, feminine, neuter), the definite and indefinite articles, reliable noun suffix patterns, and compound noun rules.',
    contentMarkdown: `
# German Nouns & Grammatical Gender

In German, every noun has a grammatical gender and **must always be capitalized**. Unlike English where almost everything is "the", German has three distinct genders:

- <span class="text-blue-600 font-bold">der</span> (masculine)
- <span class="text-red-600 font-bold">die</span> (feminine)
- <span class="text-green-600 font-bold">das</span> (neuter)
- <span class="text-purple-600 font-bold">die</span> (plural for all genders)

---

## 1. Definite and Indefinite Articles in the Nominative

| Gender | Definite Article | Indefinite Article | Negative Article | Example Noun | Meaning |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Masculine** | <span class="text-blue-600 font-bold">der</span> | <span class="text-blue-600 font-bold">ein</span> | kein | <span class="text-blue-600 font-bold">der Mann</span> | the man |
| **Feminine** | <span class="text-red-600 font-bold">die</span> | <span class="text-red-600 font-bold">eine</span> | keine | <span class="text-red-600 font-bold">die Frau</span> | the woman |
| **Neuter** | <span class="text-green-600 font-bold">das</span> | <span class="text-green-600 font-bold">ein</span> | kein | <span class="text-green-600 font-bold">das Kind</span> | the child |
| **Plural** | <span class="text-purple-600 font-bold">die</span> | — | keine | <span class="text-purple-600 font-bold">die Kinder</span> | the children |

---

## 2. Cheat Codes: Suffixes that Determine Gender 100%

While German gender can seem arbitrary, **noun endings are your superpower**. Memorize these suffixes:

### Masculine Noun Suffixes (<span class="text-blue-600">der</span>)
- **-ling**: der Schmetterling (butterfly), der Lehrling (apprentice)
- **-or**: der Motor, der Reaktor
- **-ismus**: der Optimismus, der Tourismus
- **-ist**: der Polizist, der Tourist
- **Days, Months, Seasons & Directions**: der Montag, der Januar, der Sommer, der Norden

### Feminine Noun Suffixes (<span class="text-red-600">die</span>) - Almost 100% Reliable!
- **-ung**: die Zeitung (newspaper), die Wohnung (apartment), die Übung (exercise)
- **-heit / -keit**: die Freiheit (freedom), die Möglichkeit (possibility)
- **-schaft**: die Freundschaft (friendship), die Mannschaft (team)
- **-tät**: die Universität, die Realität
- **-ion**: die Station, die Nation, die Lektion
- **-ei**: die Bäckerei (bakery), die Bücherei (library)

### Neuter Noun Suffixes (<span class="text-green-600">das</span>)
- **-chen / -lein** (Diminutives): das Mädchen (girl), das Brötchen (bread roll)
- **-ment**: das Dokument, das Instrument
- **-tum**: das Eigentum (property), das Wachstum (growth)
- **-um**: das Zentrum, das Museum
- **Verbal Infinitives used as Nouns**: das Essen (eating/food), das Lernen (learning), das Leben (life)

---

## 3. The Golden Rule of Compound Nouns

German is famous for combining words into long compounds. The gender rule is simple and unwavering:
> **The LAST word in a compound noun always determines its gender and plural form!**

- der Tisch (table) + die Decke (cover) = <span class="text-red-600 font-bold">die Tischdecke</span> (tablecloth)
- das Auto (car) + der Schlüssel (key) = <span class="text-blue-600 font-bold">der Autoschlüssel</span> (car key)
- die Kinder (children) + das Buch (book) = <span class="text-green-600 font-bold">das Kinderbuch</span> (children's book)
`,
    commonMistakes: [
      {
        mistake: 'Assuming "das Mädchen" (the girl) should be "die" because a girl is female.',
        correction: 'Always use "das Mädchen".',
        explanation:
          'Grammatical gender in German belongs to the word form, not the biological sex. The diminutive suffix "-chen" strictly forces every noun to be neuter (das).'
      },
      {
        mistake: 'Determining the gender of a compound noun from the first word (e.g. "der Autoschlüssel" called "das Autoschlüssel").',
        correction: 'Use "der Autoschlüssel".',
        explanation:
          'In German compound nouns, the final element (Schlüssel = der) dictates the gender for the whole word, regardless of how many words precede it.'
      },
      {
        mistake: 'Writing German nouns in lowercase (e.g. "ich habe ein buch").',
        correction: 'Always capitalize: "Ich habe ein Buch."',
        explanation: 'Every noun in German must start with a capital letter, even in the middle of a sentence.'
      }
    ],
    miniQuiz: [
      {
        question: 'Which article belongs to the noun "Wohnung" (apartment)?',
        options: ['der', 'die', 'das', 'den'],
        correctIndex: 1,
        explanation: 'Nouns ending in "-ung" are 100% feminine in German (die Wohnung).'
      },
      {
        question: 'Why is "das Mädchen" neuter even though it refers to a young female person?',
        options: [
          'It is an irregular exception with no explanation',
          'All children are neuter in German',
          'The diminutive suffix "-chen" always creates neuter nouns',
          'It is an old loanword from Latin'
        ],
        correctIndex: 2,
        explanation: 'The diminutive suffix "-chen" automatically makes any noun grammatically neuter.'
      },
      {
        question: 'What is the gender of the compound word "Haustür" (Haus + Tür)?',
        options: ['das (from das Haus)', 'die (from die Tür)', 'der (masculine)', 'neuter plural'],
        correctIndex: 1,
        explanation: 'In German compound nouns, the last word (die Tür) dictates the gender of the whole compound (die Haustür).'
      }
    ],
    cheatSheet: {
      summary: 'Quick guide to German noun gender and suffixes',
      keyRules: [
        'der: -ling, -or, -ismus, -ist, days, months, seasons',
        'die: -ung, -heit, -keit, -schaft, -tät, -ion, -ei',
        'das: -chen, -lein, -ment, -tum, -um, nominalized verbs (das Essen)',
        'Compound nouns take the gender of the last word'
      ],
      tableHtml: `
        <table class="w-full text-sm border-collapse">
          <thead><tr class="bg-gray-100 dark:bg-gray-800"><th class="p-2 border">Gender</th><th class="p-2 border">Definite</th><th class="p-2 border">Indefinite</th><th class="p-2 border">Key Suffixes</th></tr></thead>
          <tbody>
            <tr><td class="p-2 border font-bold text-blue-600">Masculine</td><td class="p-2 border font-bold text-blue-600">der</td><td class="p-2 border">ein</td><td class="p-2 border">-ling, -or, -ismus, -ist</td></tr>
            <tr><td class="p-2 border font-bold text-red-600">Feminine</td><td class="p-2 border font-bold text-red-600">die</td><td class="p-2 border">eine</td><td class="p-2 border">-ung, -heit, -keit, -schaft, -tät, -ion</td></tr>
            <tr><td class="p-2 border font-bold text-green-600">Neuter</td><td class="p-2 border font-bold text-green-600">das</td><td class="p-2 border">ein</td><td class="p-2 border">-chen, -lein, -ment, -tum, -um</td></tr>
          </tbody>
        </table>
      `
    },
    language: 'de',
    exercises: [
      {
        type: 'article-drill',
        prompt: 'Choose the correct definite article for "Zeitung" (newspaper):',
        options: ['der', 'die', 'das'],
        answer: 'die',
        explanation: 'Words ending in "-ung" are always feminine (die Zeitung).'
      },
      {
        type: 'article-drill',
        prompt: 'Choose the correct definite article for "Brötchen" (bread roll):',
        options: ['der', 'die', 'das'],
        answer: 'das',
        explanation: 'Diminutives ending in "-chen" are always neuter (das Brötchen).'
      },
      {
        type: 'article-drill',
        prompt: 'Choose the correct definite article for "Freiheit" (freedom):',
        options: ['der', 'die', 'das'],
        answer: 'die',
        explanation: 'Words ending in "-heit" are always feminine (die Freiheit).'
      },
      {
        type: 'article-drill',
        prompt: 'Choose the correct definite article for "Optimismus" (optimism):',
        options: ['der', 'die', 'das'],
        answer: 'der',
        explanation: 'Words ending in "-ismus" are always masculine (der Optimismus).'
      },
      {
        type: 'gap-fill',
        prompt: 'Er liest ___ Buch auf der Couch. (indefinite article for neuter noun "Buch")',
        answer: 'ein',
        acceptableAnswers: ['ein', 'Ein'],
        explanation: 'Buch is neuter (das Buch), so the indefinite article in the accusative/nominative is "ein".'
      },
      {
        type: 'gap-fill',
        prompt: 'Wir haben ___ neue Wohnung in Berlin gefunden. (indefinite article for feminine noun "Wohnung")',
        answer: 'eine',
        acceptableAnswers: ['eine', 'Eine'],
        explanation: 'Wohnung is feminine (die Wohnung), so the indefinite article is "eine".'
      },
      {
        type: 'error-correction',
        prompt: 'Find and fix the error: "Das Autoschlüssel liegt auf dem Tisch."',
        answer: 'Der Autoschlüssel liegt auf dem Tisch.',
        acceptableAnswers: ['Der Autoschlüssel', 'Der'],
        explanation: 'Schlüssel is masculine (der Schlüssel), so compound "Autoschlüssel" must also be masculine: "Der Autoschlüssel".'
      },
      {
        type: 'multiple-choice',
        prompt: 'What is the correct definite article for "Wörterbuch" (Wort + Buch)?',
        options: ['der Wörterbuch', 'die Wörterbuch', 'das Wörterbuch'],
        answer: 'das Wörterbuch',
        explanation: 'The final word is "Buch" (das Buch, neuter), so the compound is "das Wörterbuch".'
      }
    ]
  },

  // =========================================================================
  // TOPIC 2: The 4 Cases in German (Nominativ, Akkusativ, Dativ, Genitiv)
  // =========================================================================
  {
    slug: 'four-cases-overview',
    title: 'The 4 Cases in German: Nominativ, Akkusativ, Dativ, Genitiv',
    level: 'A1',
    category: 'cases',
    order: 2,
    summary:
      'Learn how German cases reveal sentence structure: Nominativ (subject), Akkusativ (direct object & movement), Dativ (indirect object & location), and Genitiv (possession).',
    contentMarkdown: `
# The Four Cases in German

Cases tell you the **grammatical role** of every noun in a German sentence: who is doing the action, to whom, and for whom.

1. **Nominativ** (<span class="text-sky-600 font-bold">Subject</span>): Who or what is performing the action?
2. **Akkusativ** (<span class="text-amber-600 font-bold">Direct Object</span>): Who or what is directly receiving the action?
3. **Dativ** (<span class="text-emerald-600 font-bold">Indirect Object</span>): To whom or for whom is something done?
4. **Genitiv** (<span class="text-purple-600 font-bold">Possession</span>): Whose is it?

---

## 1. Master Declension Table (Definite Articles)

| Case | Masculine | Feminine | Neuter | Plural |
| :--- | :--- | :--- | :--- | :--- |
| **Nominativ** | <span class="text-sky-600 font-bold">der</span> | <span class="text-sky-600 font-bold">die</span> | <span class="text-sky-600 font-bold">das</span> | <span class="text-sky-600 font-bold">die</span> |
| **Akkusativ** | <span class="text-amber-600 font-bold">den</span> *(changes!)* | <span class="text-amber-600 font-bold">die</span> | <span class="text-amber-600 font-bold">das</span> | <span class="text-amber-600 font-bold">die</span> |
| **Dativ** | <span class="text-emerald-600 font-bold">dem</span> | <span class="text-emerald-600 font-bold">der</span> | <span class="text-emerald-600 font-bold">dem</span> | <span class="text-emerald-600 font-bold">den (+n)</span> |
| **Genitiv** | <span class="text-purple-600 font-bold">des (+s/es)</span> | <span class="text-purple-600 font-bold">der</span> | <span class="text-purple-600 font-bold">des (+s/es)</span> | <span class="text-purple-600 font-bold">der</span> |

> **Pro Tip**: In the Akkusativ, **only masculine** changes form (<span class="text-blue-600">der</span> -> <span class="text-amber-600">den</span>, <span class="text-blue-600">ein</span> -> <span class="text-amber-600">einen</span>). Feminine, neuter, and plural stay completely identical to the Nominativ!

---

## 2. Indefinite Articles (ein / eine / ein)

| Case | Masculine | Feminine | Neuter | Plural (Negation) |
| :--- | :--- | :--- | :--- | :--- |
| **Nominativ** | ein | eine | ein | keine |
| **Akkusativ** | **einen** | eine | ein | keine |
| **Dativ** | **einem** | **einer** | **einem** | **keinen (+n)** |
| **Genitiv** | **eines (+s)** | **einer** | **eines (+s)** | **keiner** |

---

## 3. Case-Triggering Prepositions

Prepositions in German dictate the case of the noun that follows:

### Akkusativ Prepositions: **FUDOG**
- **F**ür (for)
- **U**m (around / at)
- **D**urch (through)
- **O**hne (without)
- **G**egen (against)

### Dativ Prepositions: **AUS-BEI-MIT-NACH-SEIT-VON-ZU**
- **Aus** (out of / from)
- **Bei** (at / near / with)
- **Mit** (with)
- **Nach** (after / to)
- **Seit** (since / for)
- **Von** (from / of)
- **Zu** (to)

---

## 4. Example in Action: All Cases in One Sentence!

> **Der Vater** (<span class="text-sky-600 font-semibold">Nom: Subject</span>) gibt **dem Kind** (<span class="text-emerald-600 font-semibold">Dat: Indirect Object</span>) **den Apfel** (<span class="text-amber-600 font-semibold">Akk: Direct Object</span>) **des Nachbarn** (<span class="text-purple-600 font-semibold">Gen: Possessor</span>).
>
> *(The father gives the neighbor's apple to the child.)*
`,
    commonMistakes: [
      {
        mistake: 'Saying "Ich sehe der Mann" instead of "Ich sehe den Mann".',
        correction: 'Use "Ich sehe den Mann" (or "einen Mann").',
        explanation:
          'The verb "sehen" requires an accusative direct object. The masculine article "der" transforms into "den" in the accusative.'
      },
      {
        mistake: 'Forgetting the extra "-n" on plural nouns in the Dativ (e.g. "mit den Kindern" vs "mit den Kinder").',
        correction: 'Always add "-n" to the plural noun in the Dativ: "mit den Kindern".',
        explanation:
          'In the Dativ plural, almost all nouns add an "-n" to their plural ending if they do not already end in "-n" or "-s".'
      },
      {
        mistake: 'Using Akkusativ after "mit" (e.g. "Ich gehe mit meinen Freund").',
        correction: 'Use Dativ: "Ich gehe mit meinem Freund."',
        explanation: 'The preposition "mit" ALWAYS triggers the Dativ case, without exception.'
      }
    ],
    miniQuiz: [
      {
        question: 'Which definite article replaces "der" in the Akkusativ?',
        options: ['dem', 'den', 'des', 'die'],
        correctIndex: 1,
        explanation: 'Masculine "der" changes to "den" (and "ein" to "einen") in the Akkusativ.'
      },
      {
        question: 'Which case is ALWAYS triggered by the preposition "mit"?',
        options: ['Nominativ', 'Akkusativ', 'Dativ', 'Genitiv'],
        correctIndex: 2,
        explanation: '"Mit" is a strictly Dativ preposition (aus, bei, mit, nach, seit, von, zu).'
      },
      {
        question: 'In which sentence is "den Hund" used correctly in the Akkusativ?',
        options: [
          'Den Hund schläft im Garten.',
          'Ich füttere jeden Tag den Hund.',
          'Er geht mit den Hund spazieren.',
          'Das ist das Spielzeug den Hund.'
        ],
        correctIndex: 1,
        explanation: 'In "Ich füttere jeden Tag den Hund", the dog is the direct object (Akkusativ).'
      }
    ],
    cheatSheet: {
      summary: 'German Case System Cheat Sheet',
      keyRules: [
        'Nominativ: Subject (der / die / das / die)',
        'Akkusativ: Direct Object / FUDOG prepositions (den / die / das / die)',
        'Dativ: Indirect Object / aus-bei-mit-nach-seit-von-zu (dem / der / dem / den + n)',
        'Genitiv: Possession / wegen, während, trotz, statt (des + s / der / des + s / der)'
      ],
      tableHtml: `
        <table class="w-full text-sm border-collapse">
          <thead><tr class="bg-gray-100 dark:bg-gray-800"><th class="p-2 border">Case</th><th class="p-2 border">Masculine</th><th class="p-2 border">Feminine</th><th class="p-2 border">Neuter</th><th class="p-2 border">Plural</th></tr></thead>
          <tbody>
            <tr><td class="p-2 border font-bold">Nom</td><td class="p-2 border text-blue-600">der / ein</td><td class="p-2 border text-red-600">die / eine</td><td class="p-2 border text-green-600">das / ein</td><td class="p-2 border text-purple-600">die / keine</td></tr>
            <tr><td class="p-2 border font-bold">Akk</td><td class="p-2 border text-blue-600 font-bold">den / einen</td><td class="p-2 border text-red-600">die / eine</td><td class="p-2 border text-green-600">das / ein</td><td class="p-2 border text-purple-600">die / keine</td></tr>
            <tr><td class="p-2 border font-bold">Dat</td><td class="p-2 border text-blue-600">dem / einem</td><td class="p-2 border text-red-600">der / einer</td><td class="p-2 border text-green-600">dem / einem</td><td class="p-2 border text-purple-600">den / keinen (+n)</td></tr>
            <tr><td class="p-2 border font-bold">Gen</td><td class="p-2 border text-blue-600">des / eines (+s)</td><td class="p-2 border text-red-600">der / einer</td><td class="p-2 border text-green-600">des / eines (+s)</td><td class="p-2 border text-purple-600">der / keiner</td></tr>
          </tbody>
        </table>
      `
    },
    language: 'de',
    exercises: [
      {
        type: 'gap-fill',
        prompt: 'Ich sehe ___ Mann auf der Straße. (Akkusativ definite article for "Mann")',
        answer: 'den',
        acceptableAnswers: ['den', 'Den'],
        explanation: 'Mann is masculine, so in the Akkusativ it takes "den".'
      },
      {
        type: 'gap-fill',
        prompt: 'Wir fahren mit ___ Zug nach Hamburg. (Dativ definite article for masculine "Zug")',
        answer: 'dem',
        acceptableAnswers: ['dem', 'Dem'],
        explanation: 'The preposition "mit" requires Dativ: "mit dem Zug".'
      },
      {
        type: 'multiple-choice',
        prompt: 'Das Geschenk ist für ___ Freundin. (Akkusativ possessive/article for feminine)',
        options: ['meine', 'meiner', 'meinem', 'meines'],
        answer: 'meine',
        explanation: 'Für triggers the Akkusativ. Feminine singular in Akkusativ is "meine".'
      },
      {
        type: 'sentence-building',
        prompt: 'Build the correct German sentence: "The mother gives the child the ball."',
        tokens: ['Die Mutter', 'gibt', 'dem Kind', 'den Ball.'],
        answer: 'Die Mutter gibt dem Kind den Ball.',
        explanation: 'Word order: Subject (Die Mutter) + Verb (gibt) + Dativ object (dem Kind) + Akkusativ object (den Ball).'
      },
      {
        type: 'error-correction',
        prompt: 'Find and fix the error: "Ich helfe der Mann."',
        answer: 'Ich helfe dem Mann.',
        acceptableAnswers: ['Ich helfe dem Mann', 'dem Mann'],
        explanation: 'The verb "helfen" always takes a Dativ object (dem Mann).'
      }
    ]
  },

  // =========================================================================
  // TOPIC 3: Present Tense (Präsens) & V2 Word Order
  // =========================================================================
  {
    slug: 'present-tense-verbs-v2-word-order',
    title: 'Present Tense (Präsens) and V2 Word Order',
    level: 'A1',
    category: 'verbs',
    order: 3,
    summary:
      'Conjugate regular and irregular verbs in the present tense, master stem-vowel changes (e -> i/ie, a -> ä), and apply the fundamental German Verb Second (V2) syntax rule.',
    contentMarkdown: `
# Present Tense (Präsens) & Verb-Second (V2) Word Order

The Present Tense (*Präsens*) in German expresses both the simple present and continuous present:
- **Ich lerne Deutsch** = "I learn German" OR "I am learning German" (no continuous "-ing" form needed!).

---

## 1. Regular Verb Endings

To conjugate a regular verb, take off the infinitive ending **-en** and attach personal endings:

| Pronoun | Ending | lernen (to learn) | machen (to make/do) | wohnen (to live) |
| :--- | :--- | :--- | :--- | :--- |
| **ich** | **-e** | ich lern**e** | ich mach**e** | ich wohn**e** |
| **du** | **-st** | du lern**st** | du mach**st** | du wohn**st** |
| **er / sie / es** | **-t** | er lern**t** | sie mach**t** | es wohn**t** |
| **wir** | **-en** | wir lern**en** | wir mach**en** | wir wohn**en** |
| **ihr** | **-t** | ihr lern**t** | ihr mach**t** | ihr wohn**t** |
| **sie / Sie** | **-en** | sie lern**en** | Sie mach**en** | sie wohn**en** |

---

## 2. Stem-Vowel Changing Verbs (Strong Verbs)

Certain common verbs change their stem vowel **only for "du" and "er/sie/es"**:

### e -> i / ie
- **sprechen** (to speak): ich spreche, **du sprichst**, **er spricht**, wir sprechen
- **sehen** (to see): ich sehe, **du siehst**, **er sieht**, wir sehen
- **lesen** (to read): ich lese, **du liest**, **er liest**, wir lesen
- **essen** (to eat): ich esse, **du isst**, **er isst**, wir essen

### a -> ä
- **fahren** (to travel/drive): ich fahre, **du fährst**, **er fährt**, wir fahren
- **schlafen** (to sleep): ich schlafe, **du schläfst**, **er schläft**, wir schlafen

---

## 3. The Golden Rule of German Syntax: Verb Second (V2)

In a standard German declarative main clause, **the conjugated verb is ALWAYS in the SECOND position (Position 2)**.

### Pattern A: Subject in Position 1
| Position 1 | Position 2 (VERB) | Rest of Sentence |
| :--- | :--- | :--- |
| **Ich** | <span class="text-blue-600 font-bold">lerne</span> | heute fleißig Deutsch. |
| **Wir** | <span class="text-blue-600 font-bold">gehen</span> | am Abend ins Kino. |

### Pattern B: Time / Place in Position 1 (Inversion)
If you start the sentence with something else (time, adverb, place), the verb **stays firmly in Position 2**, and the subject simply flips behind it:
| Position 1 | Position 2 (VERB) | Subject | Rest of Sentence |
| :--- | :--- | :--- | :--- |
| **Heute** | <span class="text-blue-600 font-bold">lerne</span> | **ich** | fleißig Deutsch. |
| **Morgen** | <span class="text-blue-600 font-bold">fahren</span> | **wir** | nach Wien. |

> **Critical**: English allows "Today I learn", but in German you MUST say "Heute **lerne ich**"!
`,
    commonMistakes: [
      {
        mistake: 'Putting the verb in third position after an adverb: "Heute ich lerne Deutsch."',
        correction: 'Use Verb-Second: "Heute lerne ich Deutsch."',
        explanation:
          'German main clauses strictly enforce the Verb-Second (V2) rule. If "Heute" occupies Position 1, the conjugated verb "lerne" MUST come in Position 2.'
      },
      {
        mistake: 'Forgetting the stem-vowel change for "du" and "er" (e.g. saying "Du sprechst" or "Er fahrt").',
        correction: 'Use "Du sprichst" and "Er fährt".',
        explanation: 'Strong verbs change stem vowels (e->i/ie, a->ä) in the second and third person singular.'
      },
      {
        mistake: 'Translating English "am doing" with "sein + machen" (e.g. "Ich bin machend").',
        correction: 'Just use the simple present: "Ich mache" (or "Ich mache gerade").',
        explanation: 'German has no continuous progressive tense. "Ich mache" means both "I do" and "I am doing".'
      }
    ],
    miniQuiz: [
      {
        question: 'Which is the correct form for "du" with the verb "sprechen"?',
        options: ['du sprecht', 'du sprichst', 'du sprechst', 'du sprechtst'],
        correctIndex: 1,
        explanation: 'Sprechen is an e->i stem-changing verb: du sprichst.'
      },
      {
        question: 'What is the correct German word order starting with "Morgen" (Tomorrow)?',
        options: [
          'Morgen wir fahren nach Berlin.',
          'Morgen fahren wir nach Berlin.',
          'Morgen wir nach Berlin fahren.',
          'Fahren morgen wir nach Berlin.'
        ],
        correctIndex: 1,
        explanation: 'Due to V2 word order, the conjugated verb "fahren" must be in Position 2: "Morgen fahren wir nach Berlin."'
      },
      {
        question: 'How do you say "I am reading a book right now" in German?',
        options: [
          'Ich bin lesend ein Buch.',
          'Ich habe ein Buch gelesen.',
          'Ich lese gerade ein Buch.',
          'Ich bin ein Buch lesen.'
        ],
        correctIndex: 2,
        explanation: 'German uses the simple present tense with "gerade" for ongoing actions: "Ich lese gerade ein Buch."'
      }
    ],
    cheatSheet: {
      summary: 'Present Tense Conjugation and V2 Syntax',
      keyRules: [
        'Endings: ich -e, du -st, er/sie/es -t, wir -en, ihr -t, sie/Sie -en',
        'Stem vowel changes only apply to "du" and "er/sie/es" (sprechen -> du sprichst, fahren -> er fährt)',
        'V2 Rule: In main clauses, the conjugated verb is always in Position 2',
        'Inversion: If time/place is in Position 1, Subject moves to Position 3'
      ],
      tableHtml: `
        <table class="w-full text-sm border-collapse">
          <thead><tr class="bg-gray-100 dark:bg-gray-800"><th class="p-2 border">Pronoun</th><th class="p-2 border">Regular (lernen)</th><th class="p-2 border">e -> i (sprechen)</th><th class="p-2 border">a -> ä (fahren)</th></tr></thead>
          <tbody>
            <tr><td class="p-2 border font-bold">ich</td><td class="p-2 border">lerne</td><td class="p-2 border">spreche</td><td class="p-2 border">fahre</td></tr>
            <tr><td class="p-2 border font-bold">du</td><td class="p-2 border">lernst</td><td class="p-2 border font-bold text-blue-600">sprichst</td><td class="p-2 border font-bold text-blue-600">fährst</td></tr>
            <tr><td class="p-2 border font-bold">er/sie/es</td><td class="p-2 border">lernt</td><td class="p-2 border font-bold text-blue-600">spricht</td><td class="p-2 border font-bold text-blue-600">fährt</td></tr>
            <tr><td class="p-2 border font-bold">wir</td><td class="p-2 border">lernen</td><td class="p-2 border">sprechen</td><td class="p-2 border">fahren</td></tr>
            <tr><td class="p-2 border font-bold">ihr</td><td class="p-2 border">lernt</td><td class="p-2 border">sprecht</td><td class="p-2 border">fahrt</td></tr>
            <tr><td class="p-2 border font-bold">sie/Sie</td><td class="p-2 border">lernen</td><td class="p-2 border">sprechen</td><td class="p-2 border">fahren</td></tr>
          </tbody>
        </table>
      `
    },
    language: 'de',
    exercises: [
      {
        type: 'gap-fill',
        prompt: 'Er ___ (sprechen) sehr gut Deutsch. (Conjugate in present tense)',
        answer: 'spricht',
        acceptableAnswers: ['spricht', 'Spricht'],
        explanation: 'Sprechen changes stem vowel from e to i in third person singular: er spricht.'
      },
      {
        type: 'sentence-building',
        prompt: 'Arrange into correct German word order starting with "Heute":',
        tokens: ['Heute', 'koche', 'ich', 'eine Suppe.'],
        answer: 'Heute koche ich eine Suppe.',
        explanation: 'Position 1 = Heute, Position 2 = conjugated verb (koche), Position 3 = subject (ich).'
      },
      {
        type: 'error-correction',
        prompt: 'Find and fix the error: "Gestern ich habe Musik gehört."',
        answer: 'Gestern habe ich Musik gehört.',
        acceptableAnswers: ['Gestern habe ich', 'habe ich'],
        explanation: 'V2 word order: the conjugated auxiliary "habe" must be in Position 2 immediately following "Gestern".'
      },
      {
        type: 'multiple-choice',
        prompt: 'Which conjugation for "du" is correct for "fahren"?',
        options: ['du fahrst', 'du fährst', 'du fahrt', 'du fährtst'],
        answer: 'du fährst',
        explanation: 'Fahren is an a -> ä stem-changing verb: du fährst.'
      }
    ]
  }
];
