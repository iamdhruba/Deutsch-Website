import mongoose from 'mongoose';

/**
 * UserProgress Schema
 * Tracks aggregate stats, CEFR level roadmap progress, daily study streaks,
 * and time spent learning.
 */
const UserProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      index: true
    },
    // Current CEFR placement / progress level
    currentLevel: {
      type: String,
      enum: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
      default: 'A1'
    },
    // Completed curriculum items
    completedLessons: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson'
      }
    ],
    completedUnits: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Unit'
      }
    ],
    completedGrammarTopics: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GrammarTopic'
      }
    ],
    // Daily learning streak tracking
    streak: {
      currentStreak: { type: Number, default: 0 },
      maxStreak: { type: Number, default: 0 },
      lastActiveDate: { type: Date, default: null }
    },
    // Daily study history for the calendar heatmap and activity graphs
    dailyActivity: [
      {
        date: { type: String, required: true }, // 'YYYY-MM-DD'
        reviewsCount: { type: Number, default: 0 },
        newWordsCount: { type: Number, default: 0 },
        grammarExercisesCount: { type: Number, default: 0 },
        minutesStudied: { type: Number, default: 0 }
      }
    ],
    // Total XP and total time
    totalXp: {
      type: Number,
      default: 0
    },
    totalSecondsStudied: {
      type: Number,
      default: 0
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

export const UserProgress = mongoose.model('UserProgress', UserProgressSchema);
