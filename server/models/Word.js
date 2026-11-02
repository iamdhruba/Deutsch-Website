import mongoose from 'mongoose';

/**
 * Word Schema
 * Represents a dictionary entry with frequency ranking, grammatical inflection,
 * senses, and CEFR level.
 */
const WordSchema = new mongoose.Schema(
  {
    lemma: {
      type: String,
      required: [true, 'Lemma (headword) is required'],
      trim: true,
      index: true
    },
    // Normalized form (lowercased, umlauts mapped to plain letters, ß to ss)
    // Used for instant accent/umlaut-insensitive search
    normalized: {
      type: String,
      index: true
    },
    // Article for nouns: 'der' (masculine, blue), 'die' (feminine, red), 'das' (neuter, green)
    article: {
      type: String,
      enum: ['der', 'die', 'das', null],
      default: null
    },
    gender: {
      type: String,
      enum: ['masculine', 'feminine', 'neuter', null],
      default: null
    },
    // Part of speech
    pos: {
      type: String,
      required: true,
      enum: [
        'article',
        'noun',
        'verb',
        'adjective',
        'adverb',
        'pronoun',
        'preposition',
        'conjunction',
        'particle',
        'numeral',
        'interjection',
        'phrase',
        'other'
      ],
      index: true
    },
    // CEFR Proficiency Level
    cefr: {
      type: String,
      enum: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
      default: 'A1',
      index: true
    },
    // Frequency ranking (e.g. 1 = most frequent word like 'der', 'sein')
    frequencyRank: {
      type: Number,
      index: true
    },
    // Frequency band grouping (e.g. 'Top 500', '500-1000', '1000-2500', '2500-5000', '5000+')
    frequencyBand: {
      type: String,
      default: 'Top 500'
    },
    // Plural form for nouns (e.g. 'Häuser')
    plural: {
      type: String,
      default: null
    },
    // Conjugation tables for verbs
    conjugation: {
      auxiliary: {
        type: String,
        enum: ['haben', 'sein', 'haben/sein', null],
        default: null
      },
      present: {
        ich: String,
        du: String,
        erSieEs: String,
        wir: String,
        ihr: String,
        sieSie: String
      },
      pastPrateritum: {
        ich: String,
        du: String,
        erSieEs: String,
        wir: String,
        ihr: String,
        sieSie: String
      },
      perfektParticiple: String, // e.g. 'gesehen', 'gegangen'
      konjunktivII: {
        ich: String,
        du: String,
        erSieEs: String,
        wir: String,
        ihr: String,
        sieSie: String
      },
      imperative: {
        du: String,
        ihr: String,
        Sie: String
      }
    },
    // Declension tables for nouns
    declension: {
      nominative: { singular: String, plural: String },
      accusative: { singular: String, plural: String },
      dative: { singular: String, plural: String },
      genitive: { singular: String, plural: String }
    },
    // Pronunciation IPA and audio URL
    ipa: {
      type: String,
      default: ''
    },
    audioUrl: {
      type: String,
      default: ''
    },
    // Semantic definitions and translations
    senses: [
      {
        english: { type: String, required: true },
        germanDefinition: { type: String, default: '' },
        synonyms: [{ type: String }],
        collocations: [{ type: String }],
        grammarNotes: { type: String, default: '' }
      }
    ],
    // Example sentences
    exampleSentences: [
      {
        german: { type: String, required: true },
        english: { type: String, default: '' },
        highlight: { type: String }, // Word/phrase highlighted in example
        audioUrl: { type: String, default: '' }
      }
    ],
    // Semantic topics / tags (e.g. 'family', 'food', 'travel', 'technology')
    topics: [{ type: String, index: true }],
    // Target language of the dictionary word (extensible for multi-language)
    language: {
      type: String,
      default: 'de',
      index: true
    },
    // Source data attribution and licensing
    license: {
      type: String,
      default: 'Wiktionary / Kaikki.org (CC BY-SA 3.0/4.0), Tatoeba (CC BY 2.0 FR)'
    }
  },
  {
    timestamps: true
  }
);

/**
 * Pre-save hook: Normalize lemma for fast accent/umlaut-insensitive search
 */
WordSchema.pre('save', function (next) {
  if (this.lemma) {
    this.normalized = this.lemma
      .toLowerCase()
      .replace(/ä/g, 'ae')
      .replace(/ö/g, 'oe')
      .replace(/ü/g, 'ue')
      .replace(/ß/g, 'ss')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }
  next();
});

// Text index for full-text search across German lemma, senses, and English translations
WordSchema.index({
  lemma: 'text',
  normalized: 'text',
  'senses.english': 'text'
});

export const Word = mongoose.model('Word', WordSchema);
