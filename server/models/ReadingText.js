import mongoose from 'mongoose';

/**
 * ReadingText Schema
 * Graded reading passages (stories, dialogues, news, emails) with parallel translations,
 * clickable word lookups, and comprehension questions.
 */
const ReadingTextSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    level: {
      type: String,
      enum: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
      required: true,
      index: true
    },
    genre: {
      type: String,
      enum: ['story', 'dialogue', 'news', 'email', 'cultural', 'article'],
      default: 'story'
    },
    // Full passage in German
    contentGerman: {
      type: String,
      required: true
    },
    // Parallel translation in English
    contentEnglish: {
      type: String,
      required: true
    },
    // Sentence/paragraph-level alignment for parallel side-by-side reading
    sections: [
      {
        german: { type: String, required: true },
        english: { type: String, required: true },
        audioUrl: { type: String, default: '' }
      }
    ],
    // Audio narration URL
    audioUrl: {
      type: String,
      default: ''
    },
    // Key words introduced in this text
    keyWords: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Word'
      }
    ],
    // Comprehension check questions
    questions: [
      {
        question: { type: String, required: true },
        options: [{ type: String, required: true }],
        correctIndex: { type: Number, required: true },
        explanation: { type: String, default: '' }
      }
    ],
    license: {
      type: String,
      default: 'Creative Commons CC BY-SA 4.0'
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

export const ReadingText = mongoose.model('ReadingText', ReadingTextSchema);
