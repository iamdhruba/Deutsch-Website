import mongoose from 'mongoose';

/**
 * Sense Schema
 * Standalone collection for word meanings, definitions, synonyms, and collocations.
 */
const SenseSchema = new mongoose.Schema(
  {
    wordId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Word',
      required: true,
      index: true
    },
    english: {
      type: String,
      required: true,
      trim: true
    },
    germanDefinition: {
      type: String,
      default: ''
    },
    synonyms: [{ type: String }],
    collocations: [{ type: String }],
    grammarNotes: {
      type: String,
      default: ''
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

export const Sense = mongoose.model('Sense', SenseSchema);
