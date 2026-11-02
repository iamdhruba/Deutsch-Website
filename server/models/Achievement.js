import mongoose from 'mongoose';

/**
 * Achievement Schema
 * Badges and milestones celebrating learner consistency and mastery.
 * Note: Free motivation system (no paywalls, no hearts/lives).
 */
const AchievementSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      default: 'Award'
    },
    category: {
      type: String,
      enum: ['vocabulary', 'streak', 'grammar', 'reading', 'level', 'general'],
      default: 'general'
    },
    xpReward: {
      type: Number,
      default: 50
    },
    criteria: {
      type: {
        type: String,
        enum: ['words_mastered', 'streak_days', 'grammar_topics', 'time_minutes', 'exam_passed']
      },
      threshold: Number
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

export const Achievement = mongoose.model('Achievement', AchievementSchema);
