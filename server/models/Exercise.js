import mongoose from 'mongoose';

/**
 * Exercise Schema
 * Supports rich interactive practice types: gap-fill, drag-and-drop,
 * sentence building, error correction, multiple choice, and transformation.
 */
const ExerciseSchema = new mongoose.Schema(
  {
    topicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'GrammarTopic',
      index: true
    },
    unitId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Unit',
      index: true
    },
    lessonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lesson',
      index: true
    },
    // Exercise mechanics type
    type: {
      type: String,
      required: true,
      enum: [
        'gap-fill',
        'drag-and-drop',
        'sentence-building',
        'error-correction',
        'multiple-choice',
        'transformation',
        'article-drill',
        'plural-drill',
        'cloze',
        'dictation'
      ],
      index: true
    },
    // The question / prompt presented to the user
    prompt: {
      type: String,
      required: true
    },
    instructions: {
      type: String,
      default: ''
    },
    // Shuffled words/tokens for sentence-building or drag-and-drop
    tokens: [{ type: String }],
    // Choices for multiple-choice or select questions
    options: [{ type: String }],
    // Canonical correct answer (e.g. 'der', 'Häuser', or ordered tokens)
    answer: {
      type: mongoose.Schema.Types.Mixed,
      required: true
    },
    // Alternative accepted answers (e.g. slight punctuation variations or synonyms)
    acceptableAnswers: [{ type: String }],
    // Helpful pedagogical explanation when answered or reviewed
    explanation: {
      type: String,
      default: ''
    },
    hints: [{ type: String }],
    difficulty: {
      type: Number,
      default: 1,
      min: 1,
      max: 5
    },
    level: {
      type: String,
      enum: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
      default: 'A1',
      index: true
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

export const Exercise = mongoose.model('Exercise', ExerciseSchema);
