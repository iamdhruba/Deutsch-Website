/**
 * 13 Additional Comprehensive German Grammar Topics for Lernen (Phase 1 & 3 Expansion)
 * Sourced & crafted for A1 to C2 coverage.
 */

export const moreGrammarTopics = [
  // TOPIC 4: Separable & Inseparable Verbs
  {
    slug: 'separable-inseparable-verbs',
    title: 'Separable and Inseparable Verbs (Trennbare und Untrennbare Verben)',
    level: 'A2',
    category: 'verbs',
    order: 4,
    summary:
      'Master German prefix verbs: how prefixes change meaning, the rule of stress, separating in present tense, and prefix behavior in Perfekt (ge- insertion).',
    contentMarkdown: `
# Separable and Inseparable Verbs

In German, prefixes attached to verb stems completely transform their meaning. Understanding whether a prefix separates is one of the biggest milestones in German mastery.

---

## 1. Golden Rule of Prefix Stress

- **Stressed Prefix = SEPARABLE**: When pronouncing, if the accent is on the prefix, it separates to the end of the clause in the present tense!
  - *áufstehen* (to get up) -> *Ich **stehe** jeden Morgen um sieben Uhr **auf**.*
  - *éinkaufen* (to shop) -> *Wir **kaufen** heute im Supermarkt **ein**.*
  - *mítbringen* (to bring along) -> *Er **bringt** einen leckeren Kuchen **mit**.*

- **Unstressed Prefix = INSEPARABLE**: The prefix never separates!
  - *verstéhen* (to understand) -> *Ich **verstehe** die Grammatikregel.*
  - *bekómmen* (to receive) -> *Sie **bekommt** morgen einen Brief.*

---

## 2. Inseparable Prefixes Mnemonic: "Be-Ge-Er-Ver-Zer-Ent-Emp-Miss"

Remember this rhythmic rhyme: **be-, ge-, er-, ver-, zer-, ent-, emp-, miss-**. These 8 prefixes NEVER separate, and in the *Perfekt* tense, they **do NOT take a "ge-"**!
- *besuchen* -> *hat besucht* (NOT ge-besucht)
- *erklären* -> *hat erklärt*
- *vergessen* -> *hat vergessen*

---

## 3. Separable Prefixes in the Perfekt: The "-ge-" Sandwich

Separable verbs insert the **-ge-** between the prefix and the stem participle:
- *auf* + *ge* + *standen* = **aufgestanden**
- *ein* + *ge* + *kauft* = **eingekauft**
- *ab* + *ge* + *fahren* = **abgefahren**
`,
    commonMistakes: [
      {
        mistake: 'Ich aufstehe um sieben Uhr.',
        correction: 'Ich stehe um sieben Uhr auf.',
        explanation: 'In main clauses, the conjugated stem verb takes Position 2, and the separable prefix is kicked to the very end of the sentence.'
      },
      {
        mistake: 'Ich habe ihn gestern ge-besucht.',
        correction: 'Ich habe ihn gestern besucht.',
        explanation: 'Inseparable prefixes (be-, ver-, etc.) never take an additional "ge-" in the Perfekt participle.'
      }
    ],
    cheatSheet: {
      summary: 'Separable vs Inseparable Cheat Sheet',
      keyRules: [
        'Separable: auf-, an-, ab-, ein-, aus-, mit-, vor-, zu-, zurück-',
        'Inseparable: be-, ge-, er-, ver-, zer-, ent-, emp-, miss-',
        'Dual (depends on literal vs figurative): über-, unter-, durch-, um-',
        'Perfekt separable: prefix + ge + stem + t/en (aufgeräumt)'
      ]
    },
    language: 'de',
    exercises: [
      {
        type: 'gap-fill',
        prompt: 'Wir ___ heute im Supermarkt ___ (einkaufen).',
        answer: 'kaufen ... ein',
        acceptableAnswers: ['kaufen ein', 'kaufen...ein'],
        explanation: 'Separable verb einkaufen: conjugated stem "kaufen" in Position 2, prefix "ein" at the end.'
      }
    ]
  },

  // TOPIC 5: Modal Verbs
  {
    slug: 'modal-verbs',
    title: 'Modal Verbs: können, müssen, dürfen, sollen, wollen, möchten, mögen',
    level: 'A1',
    category: 'verbs',
    order: 5,
    summary:
      'Learn the 6 core German modal verbs and möchten: their distinct vowel mutations in singular, sentence bracket syntax (Satzklammer), and nuances of obligation vs permission.',
    contentMarkdown: `
# German Modal Verbs (Modalverben)

Modal verbs express ability, obligation, permission, desire, or intention. They alter the mood of an infinitive verb.

---

## 1. The Conjugation Table of German Modal Verbs

Notice the universal pattern: **ich** and **er/sie/es** are **identical** and have **no ending** (-t is omitted)!

| Pronoun | können (can) | müssen (must) | dürfen (may) | sollen (should) | wollen (want) | möchten (would like) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **ich** | <span class="text-blue-600 font-bold">kann</span> | <span class="text-blue-600 font-bold">muss</span> | <span class="text-blue-600 font-bold">darf</span> | <span class="text-blue-600 font-bold">soll</span> | <span class="text-blue-600 font-bold">will</span> | <span class="text-blue-600 font-bold">möchte</span> |
| **du** | kannst | musst | darfst | sollst | willst | möchtest |
| **er/sie/es** | <span class="text-blue-600 font-bold">kann</span> | <span class="text-blue-600 font-bold">muss</span> | <span class="text-blue-600 font-bold">darf</span> | <span class="text-blue-600 font-bold">soll</span> | <span class="text-blue-600 font-bold">will</span> | <span class="text-blue-600 font-bold">möchte</span> |
| **wir** | können | müssen | dürfen | sollen | wollen | möchten |
| **ihr** | könnt | müsst | dürft | sollt | wollt | möchtet |
| **sie/Sie** | können | müssen | dürfen | sollen | wollen | möchten |

---

## 2. Sentence Bracket (Satzklammer)

The conjugated modal verb sits in **Position 2**, and the main verb is placed in its **Infinitive form at the very end**:
- *Ich **kann** sehr gut Deutsch **sprechen**.*
- *Du **musst** heute deine Hausaufgaben **machen**.*
- *Hier **darf** man leider nicht **rauchen**.*
`,
    commonMistakes: [
      {
        mistake: 'Er kannt Deutsch sprechen.',
        correction: 'Er kann Deutsch sprechen.',
        explanation: 'Modal verbs in the 1st and 3rd person singular do NOT take a -t ending: ich kann, er kann.'
      },
      {
        mistake: 'Du musst nicht rauchen. (meaning "You are forbidden to smoke")',
        correction: 'Du darfst nicht rauchen.',
        explanation: 'In German, "nicht müssen" means you don\'t have to (optional). Prohibition is strictly "nicht dürfen"!'
      }
    ],
    cheatSheet: {
      summary: 'Modal Verbs Quick Rules',
      keyRules: [
        'ich = er/sie/es (always identical, zero suffix: ich will / er will)',
        'Singular stem changes vowel (können -> kann, müssen -> muss, dürfen -> darf)',
        'Main verb is always Infinitive at the very end of the clause',
        'nicht dürfen = forbidden; nicht müssen = no obligation'
      ]
    },
    language: 'de',
    exercises: [
      {
        type: 'gap-fill',
        prompt: 'Er ___ (können) fünf Sprachen fließend sprechen.',
        answer: 'kann',
        acceptableAnswers: ['kann'],
        explanation: '3rd person singular of können is er kann (no -t suffix).'
      }
    ]
  },

  // TOPIC 6: Conversational Past (Das Perfekt)
  {
    slug: 'perfekt-conversational-past',
    title: 'Conversational Past: Das Perfekt (haben vs. sein)',
    level: 'A2',
    category: 'verbs',
    order: 6,
    summary:
      'Learn how to speak about past events in everyday conversational German using the Perfekt tense, choosing between haben and sein, and forming regular and irregular participles (Partizip II).',
    contentMarkdown: `
# The Conversational Past: Das Perfekt

In spoken German and everyday emails, the **Perfekt** is the standard past tense. It corresponds roughly to English "I have learned" or "I learned".

---

## 1. Structure of the Perfekt

$$\\text{Position 2: Conjugated Auxiliary (haben / sein)} + \\dots + \\text{End of Sentence: Partizip II}$$

- *Ich **habe** gestern ein deutsches Buch **gelesen**.*
- *Wir **sind** am Wochenende nach Berlin **gefahren**.*

---

## 2. Choosing between "haben" and "sein"

- **Use SEIN (approx. 10% of verbs)**:
  1. Verbs of **Movement from A to B**: *gehen, fahren, laufen, fliegen, kommen, reisen, schwimmen*
  2. Verbs of **Change of State**: *aufwachen (wake up), einschlafen (fall asleep), sterben (die), wachsen (grow)*
  3. Three Special Verbs: *sein (ist gewesen), werden (ist geworden), bleiben (ist geblieben)*

- **Use HABEN (approx. 90% of verbs)**:
  - All transitive verbs (that take an accusative direct object): *essen, trinken, kaufen, lesen, sehen, machen*
  - All reflexive verbs: *sich freuen, sich interessieren*
`,
    commonMistakes: [
      {
        mistake: 'Ich habe nach Berlin gefahren.',
        correction: 'Ich bin nach Berlin gefahren.',
        explanation: 'Fahren expresses movement from point A to point B, which strictly requires the auxiliary "sein": ich bin gefahren.'
      },
      {
        mistake: 'Er hat zu Hause geblieben.',
        correction: 'Er ist zu Hause geblieben.',
        explanation: '"Bleiben" always takes "sein" as auxiliary: er ist geblieben.'
      }
    ],
    cheatSheet: {
      summary: 'Perfekt Auxiliary Selection',
      keyRules: [
        'SEIN: Movement from A to B (gehen, fahren, fliegen)',
        'SEIN: Change of state (aufwachen, sterben, wachsen)',
        'SEIN: Special trio (sein, werden, bleiben)',
        'HABEN: All verbs with direct objects (haben ein Buch gelesen)'
      ]
    },
    language: 'de',
    exercises: [
      {
        type: 'gap-fill',
        prompt: 'Wir ___ gestern Abend lange im Restaurant geblieben. (haben / sein)',
        answer: 'sind',
        acceptableAnswers: ['sind', 'Sind'],
        explanation: 'Bleiben requires "sein": wir sind geblieben.'
      }
    ]
  },

  // TOPIC 7: Narrative Past (Präteritum)
  {
    slug: 'praeteritum-narrative-past',
    title: 'Narrative Past: Das Präteritum (Simple Past)',
    level: 'A2',
    category: 'verbs',
    order: 7,
    summary:
      'Master the simple past used in books, newspapers, and stories, plus the essential verbs where Präteritum is preferred over Perfekt even in spoken German (war, hatte, wollte, wusste).',
    contentMarkdown: `
# Narrative Past: Das Präteritum

While *Perfekt* dominates spoken German, the **Präteritum** is the voice of literature, fairy tales, newspapers, and formal reports.

---

## 1. Verbs ALWAYS preferred in Präteritum (Even in Speech!)

Native German speakers almost always use the Präteritum for these common verbs instead of the clunky Perfekt:
- **sein** -> *ich war, du warst, er war, wir waren, ihr wart, sie waren*
- **haben** -> *ich hatte, du hattest, er hatte, wir hatten, ihr hattet, sie hatten*
- **Modal Verbs** -> *konnte, musste, durfte, sollte, wollte*
- **wissen** -> *ich wusste, du wusstest*
- **es gibt** -> *es gab* (there was / there were)

---

## 2. Regular Verbs Formation

Add **-te, -test, -te, -ten, -tet, -ten** to the verb stem:
- *lernen* -> *ich lernte, du lerntest, er lernte, wir lernten*
- *arbeiten* -> *ich arbeitete, du arbeitetest* (adds -e- for pronunciation)
`,
    commonMistakes: [
      {
        mistake: 'Gestern bin ich krank gewesen.',
        correction: 'Gestern war ich krank.',
        explanation: 'While grammatically possible, "ich war" sounds 100x more natural in German than "ich bin gewesen".'
      }
    ],
    cheatSheet: {
      summary: 'Präteritum Essentials',
      keyRules: [
        'Always use Präteritum for sein (war) and haben (hatte)',
        'Always use Präteritum for modal verbs (konnte, musste, wollte)',
        'Regular verbs add -te to the stem (machte, lernte, wohnte)',
        'Irregular verbs change stem vowel with no suffix for ich/er (ging, kam, sah)'
      ]
    },
    language: 'de',
    exercises: [
      {
        type: 'gap-fill',
        prompt: 'Letztes Jahr ___ (sein) ich drei Wochen in Deutschland.',
        answer: 'war',
        acceptableAnswers: ['war'],
        explanation: 'Simple past of sein for ich is "war".'
      }
    ]
  },

  // TOPIC 8: Two-Way Prepositions (Wechselpräpositionen)
  {
    slug: 'two-way-prepositions',
    title: 'Two-Way Prepositions: Wechselpräpositionen (Akkusativ vs. Dativ)',
    level: 'A2',
    category: 'prepositions',
    order: 8,
    summary:
      'Master the 9 dual-case prepositions (an, auf, hinter, in, neben, über, unter, vor, zwischen) and the universal rule: Wohin? (Motion/Direction = Akkusativ) vs. Wo? (Stationary Location = Dativ).',
    contentMarkdown: `
# Two-Way Prepositions (Wechselpräpositionen)

Nine German prepositions can take either the **Akkusativ** or the **Dativ** depending entirely on the context.

---

## The 9 Prepositions
$$\\text{an, auf, hinter, in, neben, über, unter, vor, zwischen}$$

---

## The Golden Question: Wohin? vs. Wo?

### 1. Akkusativ for Direction / Movement (*Wohin?* = Where to?)
When movement crosses a boundary from point A into/onto point B:
- *Ich lege das Buch **auf den Tisch** (Akkusativ: der -> den).*
- *Wir gehen **in das Kino** (in das = ins Kino).*

### 2. Dativ for Fixed Location / Position (*Wo?* = Where at?)
When something remains stationary or within an existing space:
- *Das Buch liegt **auf dem Tisch** (Dativ: der -> dem).*
- *Wir sind **im Kino** (in dem = im Kino).*

---

## Paired Placement Verbs: Active vs Passive

| Action (Wohin? + Akkusativ) | State/Location (Wo? + Dativ) |
| :--- | :--- |
| **legen** (to lay down): *Ich lege den Stift auf den Tisch.* | **liegen** (to lie): *Der Stift liegt auf dem Tisch.* |
| **stellen** (to place upright): *Er stellt die Vase auf das Regal.* | **stehen** (to stand): *Die Vase steht auf dem Regal.* |
| **setzen** (to seat): *Sie setzt das Kind auf den Stuhl.* | **sitzen** (to sit): *Das Kind sitzt auf dem Stuhl.* |
| **hängen** (to hang up): *Ich hänge das Bild an die Wand.* | **hängen** (to be hanging): *Das Bild hängt an der Wand.* |
`,
    commonMistakes: [
      {
        mistake: 'Das Buch liegt auf den Tisch.',
        correction: 'Das Buch liegt auf dem Tisch.',
        explanation: '"Liegen" describes a stationary position (Wo?), requiring the Dative case (dem Tisch).'
      },
      {
        mistake: 'Ich stelle die Tasse auf dem Tisch.',
        correction: 'Ich stelle die Tasse auf den Tisch.',
        explanation: '"Stellen" is an action moving the object toward a destination (Wohin?), requiring the Accusative case (den Tisch).'
      }
    ],
    cheatSheet: {
      summary: 'Wechselpräpositionen Formula',
      keyRules: [
        'Prepositions: an, auf, hinter, in, neben, über, unter, vor, zwischen',
        'Wohin? -> Movement / Direction -> AKKUSATIV (den/die/das)',
        'Wo? -> Stationary Position / Location -> DATIV (dem/der/dem/den)',
        'stellen/legen/setzen = Akkusativ; stehen/liegen/sitzen = Dativ'
      ]
    },
    language: 'de',
    exercises: [
      {
        type: 'gap-fill',
        prompt: 'Das Bild hängt an ___ (die Wand, Dativ).',
        answer: 'der Wand',
        acceptableAnswers: ['der Wand', 'der'],
        explanation: 'The picture is hanging (Wo? = Dativ). Feminine "die Wand" in Dative becomes "der Wand".'
      }
    ]
  },

  // TOPIC 9: Subordinate Clauses (Weil, Dass, Wenn, Obwohl)
  {
    slug: 'subordinate-clauses-weil-dass-wenn',
    title: 'Subordinate Clauses: Nebensätze mit weil, dass, wenn, obwohl',
    level: 'A2',
    category: 'syntax',
    order: 9,
    summary:
      'Understand how German subordinate conjunctions (weil, dass, wenn, obwohl, da, damit) push the conjugated verb to the very end of the clause (Verb-Endstellung).',
    contentMarkdown: `
# Subordinate Clauses (Nebensätze)

In German, conjunctions are split into coordinating conjunctions (Position 0: *und, aber, oder, denn, sondern*) and **subordinating conjunctions**, which kick the conjugated verb to the **very end**.

---

## 1. The Verb-Kicker Conjunctions
- **weil** (because)
- **dass** (that)
- **wenn** (if / whenever)
- **obwohl** (although)
- **ob** (whether / if)
- **da** (since / as)
- **damit** (so that / in order that)
- **bevor / während / nachdem** (before / while / after)

---

## 2. Sentence Architecture

$$\\text{Main Clause} + \\text{COMMA} + \\text{Subordinating Conjunction} + \\dots + \\text{Conjugated Verb (END)}$$

- *Ich lerne Deutsch, **weil** ich in Berlin **wohne**.*
- *Ich weiß, **dass** du heute viel zu tun **hast**.*
- *Wir gehen spazieren, **obwohl** es **regnet**.*

---

## 3. Subordinate Clause in Position 1: "Verb-Verb Collision"

When the sentence starts with the subordinate clause, the main clause begins **immediately with its conjugated verb**:

- *Weil es regnet, **bleiben** wir zu Hause.*
- *Wenn du Zeit hast, **können** wir Kaffee trinken.*
`,
    commonMistakes: [
      {
        mistake: 'Ich bleibe zu Hause, weil ich bin krank.',
        correction: 'Ich bleibe zu Hause, weil ich krank bin.',
        explanation: '"Weil" is a subordinating conjunction and kicks the conjugated verb "bin" to the absolute end of the clause.'
      },
      {
        mistake: 'Weil ich müde bin, ich gehe ins Bett.',
        correction: 'Weil ich müde bin, gehe ich ins Bett.',
        explanation: 'When the subordinate clause occupies Position 1, the main clause verb must follow immediately in Position 2: "gehe ich".'
      }
    ],
    cheatSheet: {
      summary: 'Nebensatz Rules',
      keyRules: [
        'Always place a comma before the conjunction',
        'Conjugated verb is placed at the very end of the subordinate clause',
        'If sentence starts with Nebensatz: Nebensatz ..., [Verb] [Subject] ...',
        'Coordinating conjunctions (ADUSO: aber, denn, und, sondern, oder) do NOT kick the verb'
      ]
    },
    language: 'de',
    exercises: [
      {
        type: 'sentence-building',
        prompt: 'Form a subordinate clause starting with "Ich weiß, dass":',
        tokens: ['Ich weiß, dass', 'er', 'heute', 'kommt.'],
        answer: 'Ich weiß, dass er heute kommt.',
        explanation: 'Conjugated verb "kommt" is placed at the end after "dass".'
      }
    ]
  },

  // TOPIC 10: Adjective Declension
  {
    slug: 'adjective-declension',
    title: 'Adjective Endings: Adjektivdeklination (The Three Patterns)',
    level: 'B1',
    category: 'adjectives',
    order: 10,
    summary:
      'Crack the code of German adjective endings: Weak declension (after der/die/das), Mixed declension (after ein/kein/mein), and Strong declension (no article).',
    contentMarkdown: `
# German Adjective Endings (Adjektivdeklination)

When an adjective stands directly in front of a noun (attributively), it must take an inflectional ending matching the gender, number, and case of the noun.

---

## Pattern 1: Weak Declension (After Definite Articles: der, die, das)

The definite article has already signaled the case and gender, so the adjective only ever needs **-e** or **-en**!

- Nominative Singular: **-e** for all genders (*der gute Mann, die gute Frau, das gute Kind*)
- Accusative Feminine & Neuter: **-e** (*die gute Frau, das gute Kind*)
- **EVERYWHERE ELSE = -EN**: All plurals, all dative, all genitive, and masculine accusative (*den guten Mann*)!

---

## Pattern 2: Mixed Declension (After Indefinite Articles: ein, kein, mein, dein)

Where the article is "blind" (ein Mann, ein Kind have no ending to show gender), the adjective steps up to carry the gender signal:

- Masc. Nominative: *ein gut**er** Mann* (-er from der)
- Fem. Nominative: *eine gut**e** Frau* (-e from die)
- Neut. Nominative: *ein gut**es** Kind* (-es from das)
- Masc. Accusative: *einen gut**en** Mann*
- Neut. Accusative: *ein gut**es** Kind*
- Everywhere else (Dative, Genitive, Plural): **-en** (*einem guten Mann, meinen guten Freunden*)
`,
    commonMistakes: [
      {
        mistake: 'Ein gut Mann liest ein Buch.',
        correction: 'Ein guter Mann liest ein Buch.',
        explanation: 'Because "ein" has no ending in the masculine nominative, the adjective must take "-er" to signal the masculine gender.'
      }
    ],
    cheatSheet: {
      summary: 'Adjective Endings Rules',
      keyRules: [
        'After der/die/das: Only -e or -en (plural, dative, genitive, masc. akk are always -en)',
        'After ein/kein: ein guter Mann, eine gute Frau, ein gutes Kind',
        'Dative and Genitive adjectives ALWAYS end in -en when preceded by an article',
        'Predicate adjectives (Das Buch ist gut) NEVER take endings'
      ]
    },
    language: 'de',
    exercises: [
      {
        type: 'gap-fill',
        prompt: 'Ich trinke jeden Morgen ein___ (heiß) Kaffee. (Masculine Accusative)',
        answer: 'einen heißen',
        acceptableAnswers: ['einen heißen', 'heißen'],
        explanation: 'Kaffee is masculine. In the accusative with "ein", the article is "einen" and the adjective takes "-en".'
      }
    ]
  },

  // TOPIC 11: Reflexive Verbs
  {
    slug: 'reflexive-verbs',
    title: 'Reflexive Verbs & Pronouns: Sich freuen, sich erinnern, sich waschen',
    level: 'A2',
    category: 'verbs',
    order: 11,
    summary:
      'Learn how German reflexive verbs work, when to use Akkusativ (mich/dich) vs Dativ (mir/dir) reflexive pronouns, and the most common daily reflexive expressions.',
    contentMarkdown: `
# Reflexive Verbs (Reflexive Verben)

Reflexive verbs indicate that the subject performs an action on or for itself. In German, they are paired with a reflexive pronoun (*sich*).

---

## 1. Reflexive Pronouns Table

| Subject | Akkusativ Reflexive Pronoun | Dativ Reflexive Pronoun (When body part/object is specified) |
| :--- | :--- | :--- |
| **ich** | <span class="text-blue-600 font-bold">mich</span> | <span class="text-amber-600 font-bold">mir</span> |
| **du** | <span class="text-blue-600 font-bold">dich</span> | <span class="text-amber-600 font-bold">dir</span> |
| **er/sie/es** | <span class="text-blue-600 font-bold">sich</span> | <span class="text-amber-600 font-bold">sich</span> |
| **wir** | <span class="text-blue-600 font-bold">uns</span> | <span class="text-amber-600 font-bold">uns</span> |
| **ihr** | <span class="text-blue-600 font-bold">euch</span> | <span class="text-amber-600 font-bold">euch</span> |
| **sie/Sie** | <span class="text-blue-600 font-bold">sich</span> | <span class="text-amber-600 font-bold">sich</span> |

Notice that only **ich (mich vs mir)** and **du (dich vs dir)** differ between Akkusativ and Dativ!

---

## 2. The Dative Shift Rule

If you wash yourself in general, it's Akkusativ:
- *Ich wasche **mich**.* (Akkusativ)

If you specify a body part (which becomes the direct object in the Akkusativ), the reflexive pronoun shifts to **Dativ**:
- *Ich wasche **mir** die Hände (Akkusativ).*
- *Du putzt **dir** die Zähne.*
`,
    commonMistakes: [
      {
        mistake: 'Ich wasche mich die Hände.',
        correction: 'Ich wasche mir die Hände.',
        explanation: 'Because "die Hände" is already the direct object (Akkusativ), the reflexive pronoun shifts to the Dative: "mir".'
      }
    ],
    cheatSheet: {
      summary: 'Reflexive Quick Rules',
      keyRules: [
        'sich is used for 3rd person singular and plural (er/sie/es/sie/Sie)',
        'Only ich (mich/mir) and du (dich/dir) change between Akkusativ and Dativ',
        'When a body part or object is mentioned: use Dativ (Ich putze mir die Zähne)',
        'Common verbs: sich freuen auf/über, sich interessieren für, sich erinnern an'
      ]
    },
    language: 'de',
    exercises: [
      {
        type: 'gap-fill',
        prompt: 'Ich freue ___ sehr über deinen Brief. (Reflexive pronoun)',
        answer: 'mich',
        acceptableAnswers: ['mich'],
        explanation: 'Sich freuen takes the accusative reflexive pronoun: ich freue mich.'
      }
    ]
  },

  // TOPIC 12: Passive Voice
  {
    slug: 'passive-voice',
    title: 'Passive Voice: Das Passiv (Vorgangspassiv & Zustandspassiv)',
    level: 'B1',
    category: 'verbs',
    order: 12,
    summary:
      'Learn how to construct the German process passive (werden + Partizip II) and state passive (sein + Partizip II), transform active sentences, and express the agent using von and durch.',
    contentMarkdown: `
# The Passive Voice: Das Passiv

In the passive voice, the focus shifts from **who** performs an action to **what is being done**.

---

## 1. Process Passive (Vorgangspassiv): werden + Partizip II

Used for ongoing or completed processes:

$$\\text{Subject} + \\text{Conjugated WERDEN} + \\dots + \\text{Partizip II}$$

- Present: *Das Haus **wird** gerade **renoviert**.*
- Präteritum: *Das Haus **wurde** im Jahr 1990 **gebaut**.*
- Perfekt: *Das Haus **ist** renoviert **worden**.* (Notice *worden*, not *geworden*!)

---

## 2. Expressing the Agent: von vs. durch

- **von (+ Dativ)**: For people, institutions, or forces of nature acting directly:
  - *Der Roman wurde **von Goethe** geschrieben.*
  - *Die Stadt wurde **vom Sturm** verwüstet.*

- **durch (+ Akkusativ)**: For means, instruments, or indirect causes:
  - *Das Problem wurde **durch modernste Technologie** gelöst.*
`,
    commonMistakes: [
      {
        mistake: 'Das Auto ist repariert geworden.',
        correction: 'Das Auto ist repariert worden.',
        explanation: 'In the passive Perfekt, the participle of werden drops the "ge-" and becomes "worden": ist repariert worden.'
      }
    ],
    cheatSheet: {
      summary: 'Passiv Formula',
      keyRules: [
        'Vorgangspassiv: werden + Partizip II',
        'Präteritum passiv: wurde + Partizip II',
        'Perfekt passiv: sein + Partizip II + worden',
        'Agent = von + Dativ (people); durch + Akkusativ (instruments/means)'
      ]
    },
    language: 'de',
    exercises: [
      {
        type: 'gap-fill',
        prompt: 'Der Kuchen ___ von meiner Mutter gebacken. (Present tense passive)',
        answer: 'wird',
        acceptableAnswers: ['wird'],
        explanation: 'Passive present: wird + gebacken.'
      }
    ]
  },

  // TOPIC 13: Konjunktiv II
  {
    slug: 'konjunktiv-2',
    title: 'Konjunktiv II: Polite Requests, Wishes, and Hypotheses',
    level: 'B1',
    category: 'verbs',
    order: 13,
    summary:
      'Master the German subjunctive II for hypothetical situations (if I had...), polite café requests (I would like...), and wishes using würde + Infinitiv, hätte, and wäre.',
    contentMarkdown: `
# Konjunktiv II: Subjunctive II

The Konjunktiv II is the key to polite conversation, expressing dreams, counterfactual conditions ("if I were rich..."), and giving soft advice.

---

## 1. Polite Requests: würde + Infinitiv

For 95% of verbs, simply conjugate **werden in Konjunktiv II (würde-)** + **Infinitive at the end**:

| Pronoun | Form |
| :--- | :--- |
| **ich** | <span class="text-blue-600 font-bold">würde</span> |
| **du** | <span class="text-blue-600 font-bold">würdest</span> |
| **er/sie/es** | <span class="text-blue-600 font-bold">würde</span> |
| **wir** | <span class="text-blue-600 font-bold">würden</span> |
| **ihr** | <span class="text-blue-600 font-bold">würdet</span> |
| **sie/Sie** | <span class="text-blue-600 font-bold">würden</span> |

- *Könnten Sie mir bitte helfen?* (Could you please help me?)
- *Ich **würde** gern ein Glas Wasser **trinken**.*

---

## 2. The Core One-Word Exceptions: wäre & hätte

Never say "ich würde sein" or "ich würde haben"! Use the authentic one-word forms:

- **sein -> wäre**:
  - *Wenn ich reich **wäre**, **würde** ich um die Welt **reisen**.*
- **haben -> hätte**:
  - *Wenn ich mehr Zeit **hätte**, **würde** ich Deutsch noch schneller lernen.*
`,
    commonMistakes: [
      {
        mistake: 'Wenn ich Zeit würde haben...',
        correction: 'Wenn ich Zeit hätte...',
        explanation: 'Never use "würde haben". Always use the dedicated Konjunktiv II form "hätte".'
      }
    ],
    cheatSheet: {
      summary: 'Konjunktiv II Formula',
      keyRules: [
        'würde + Infinitiv at the end for almost all verbs',
        'haben -> hätte (ich hätte gern ein Wasser)',
        'sein -> wäre (Wenn ich du wäre...)',
        'können -> könnte (Könnten Sie mir helfen?)'
      ]
    },
    language: 'de',
    exercises: [
      {
        type: 'gap-fill',
        prompt: 'Wenn ich mehr Geld ___, würde ich ein Haus kaufen. (haben in Konjunktiv II)',
        answer: 'hätte',
        acceptableAnswers: ['hätte'],
        explanation: 'Konjunktiv II of haben for ich is "hätte".'
      }
    ]
  }
];
