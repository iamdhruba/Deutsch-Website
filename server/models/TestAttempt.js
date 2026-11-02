import mongoose from 'mongoose';

/**
 * TestAttempt Schema
 * Records results of diagnostic placement tests, unit checkpoints,
 * and Goethe/telc-style mock exams.
 */
const TestAttemptSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    testType: {
      type: String,
      enum: ['placement', 'unit-test', 'level-exam', 'mock-goethe', 'mock-telc', 'mock-osd'],
      required: true,
      index: true
    },
    level: {
      type: String,
      enum: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'Adaptive'],
      required: true
    },
    unitId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Unit'
    },
    score: {
      type: Number,
      required: true
    },
    maxScore: {
      type: Number,
      required: true
    },
    percentage: {
      type: Number,
      required: true
    },
    passed: {
      type: Boolean,
      default: false
    },
    // Detailed breakdown of questions and answers
    answers: [
      {
        questionId: String,
        prompt: String,
        userAnswer: mongoose.Schema.Types.Mixed,
        correctAnswer: mongoose.Schema.Types.Mixed,
        isCorrect: Boolean,
        explanation: String
      }
    ],
    // Placement test recommendation
    recommendedLevel: {
      type: String,
      enum: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', null],
      default: null
    },
    timeTakenSeconds: {
      type: Number,
      default: 0
    },
    completedAt: {
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

TestAttemptSchema.index({ userId: 1, completedAt: -1 });

export const TestAttempt = mongoose.model('TestAttempt', TestAttemptSchema);
