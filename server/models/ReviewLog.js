import mongoose from 'mongoose';

/**
 * ReviewLog Schema
 * Historical record of every vocabulary review attempt for stats, analytics,
 * and FSRS algorithm optimization.
 */
const ReviewLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    userWordId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserWord',
      required: true,
      index: true
    },
    wordId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Word',
      required: true,
      index: true
    },
    // FSRS Rating: 1 = Again, 2 = Hard, 3 = Good, 4 = Easy
    rating: {
      type: Number,
      enum: [1, 2, 3, 4],
      required: true
    },
    state: {
      type: Number,
      enum: [0, 1, 2, 3],
      required: true
    },
    elapsedDays: {
      type: Number,
      default: 0
    },
    scheduledDays: {
      type: Number,
      default: 0
    },
    reviewDate: {
      type: Date,
      default: Date.now,
      index: true
    },
    exerciseType: {
      type: String,
      enum: [
        'flashcard',
        'cloze',
        'dictation',
        'multiple-choice',
        'reverse',
        'article-drill',
        'plural-drill'
      ],
      default: 'flashcard'
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

ReviewLogSchema.index({ userId: 1, reviewDate: -1 });

export const ReviewLog = mongoose.model('ReviewLog', ReviewLogSchema);
