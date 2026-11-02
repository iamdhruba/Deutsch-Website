import mongoose from 'mongoose';

/**
 * GrammarTopic Schema
 * Represents a comprehensive grammar explanation unit with color-coded examples,
 * common mistakes, mini-quiz, and cheat sheet.
 */
const GrammarTopicSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true
    },
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
    category: {
      type: String,
      required: true,
      index: true
    },
    order: {
      type: Number,
      default: 1
    },
    summary: {
      type: String,
      default: ''
    },
    // Detailed explanation content in Markdown format
    contentMarkdown: {
      type: String,
      required: true
    },
    // Common learner pitfalls and how to avoid them
    commonMistakes: [
      {
        mistake: { type: String, required: true },
        correction: { type: String, required: true },
        explanation: { type: String, default: '' }
      }
    ],
    // Quick mini-quiz to verify comprehension before interactive exercises
    miniQuiz: [
      {
        question: { type: String, required: true },
        options: [{ type: String, required: true }],
        correctIndex: { type: Number, required: true },
        explanation: { type: String, default: '' }
      }
    ],
    // Printable / savable cheat sheet data
    cheatSheet: {
      summary: { type: String, default: '' },
      keyRules: [{ type: String }],
      tableHtml: { type: String, default: '' }
    },
    // Target language
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

export const GrammarTopic = mongoose.model('GrammarTopic', GrammarTopicSchema);
