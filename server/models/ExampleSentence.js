import mongoose from 'mongoose';

/**
 * ExampleSentence Schema
 * Standalone collection for bilingual example sentences with Tatoeba attribution.
 */
const ExampleSentenceSchema = new mongoose.Schema(
  {
    wordId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Word',
      index: true
    },
    german: {
      type: String,
      required: true,
      trim: true
    },
    english: {
      type: String,
      required: true,
      trim: true
    },
    highlight: {
      type: String,
      default: ''
    },
    audioUrl: {
      type: String,
      default: ''
    },
    license: {
      type: String,
      default: 'Tatoeba (CC BY 2.0 FR)'
    },
    language: {
      type: String,
      default: 'de',
      index: true
    }
  },
  {
    timestamps: true
  }
);

// Full text search index on German and English
ExampleSentenceSchema.index({ german: 'text', english: 'text' });

export const ExampleSentence = mongoose.model('ExampleSentence', ExampleSentenceSchema);
