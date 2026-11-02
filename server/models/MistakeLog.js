import mongoose from 'mongoose';

/**
 * MistakeLog Schema
 * Keeps track of incorrect answers across vocabulary, grammar, and unit tests
 * for the "Mistakes Notebook" where learners can review and re-practice weak spots.
 */
const MistakeLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    // Category of the mistake
    type: {
      type: String,
      enum: ['vocabulary', 'grammar', 'reading', 'listening', 'unit-test'],
      required: true,
      index: true
    },
    wordId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Word'
    },
    exerciseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exercise'
    },
    topicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'GrammarTopic'
    },
    prompt: {
      type: String,
      required: true
    },
    userAnswer: {
      type: String,
      default: ''
    },
    correctAnswer: {
      type: String,
      required: true
    },
    explanation: {
      type: String,
      default: ''
    },
    // Has the user successfully re-tested and resolved this mistake?
    resolved: {
      type: Boolean,
      default: false,
      index: true
    },
    // Number of times this specific item was missed
    repeatCount: {
      type: Number,
      default: 1
    },
    lastMistakeAt: {
      type: Date,
      default: Date.now
    },
    language: {
      type: String,
      default: 'de'
    }
  },
  {
    timestamps: true
  }
);

MistakeLogSchema.index({ userId: 1, resolved: 1, lastMistakeAt: -1 });

export const MistakeLog = mongoose.model('MistakeLog', MistakeLogSchema);
