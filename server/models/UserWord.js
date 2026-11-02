import mongoose from 'mongoose';

/**
 * UserWord Schema
 * Tracks a user's study progress on an individual vocabulary word,
 * powered by the Free Spaced Repetition Scheduler (FSRS) algorithm.
 */
const UserWordSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    wordId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Word',
      required: true,
      index: true
    },
    // User study status
    status: {
      type: String,
      enum: ['new', 'learning', 'mastered', 'ignored'],
      default: 'learning',
      index: true
    },
    // FSRS Spaced-Repetition State
    fsrs: {
      due: {
        type: Date,
        default: Date.now,
        index: true
      },
      stability: {
        type: Number,
        default: 0
      },
      difficulty: {
        type: Number,
        default: 0
      },
      elapsedDays: {
        type: Number,
        default: 0
      },
      scheduledDays: {
        type: Number,
        default: 0
      },
      reps: {
        type: Number,
        default: 0
      },
      lapses: {
        type: Number,
        default: 0
      },
      // FSRS State: 0 = New, 1 = Learning, 2 = Review, 3 = Relearning
      state: {
        type: Number,
        enum: [0, 1, 2, 3],
        default: 0
      },
      lastReview: {
        type: Date,
        default: null
      }
    },
    // Leech detection: words the learner repeatedly forgets/fails (lapses >= 4)
    isLeech: {
      type: Boolean,
      default: false
    },
    // Personal notes or mnemonics
    personalNote: {
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

// Compound unique index so each user has at most one record per word
UserWordSchema.index({ userId: 1, wordId: 1 }, { unique: true });
// Compound index for querying user queue by status and due date
UserWordSchema.index({ userId: 1, status: 1, 'fsrs.due': 1 });

export const UserWord = mongoose.model('UserWord', UserWordSchema);
