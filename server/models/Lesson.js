import mongoose from 'mongoose';

/**
 * Lesson Schema
 * A granular learning step within a curriculum Unit.
 */
const LessonSchema = new mongoose.Schema(
  {
    unitId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Unit',
      required: true,
      index: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    order: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      enum: ['grammar', 'vocabulary', 'reading', 'listening', 'speaking', 'writing', 'unit-test'],
      default: 'grammar',
      index: true
    },
    summary: {
      type: String,
      default: ''
    },
    contentMarkdown: {
      type: String,
      default: ''
    },
    vocabularyWords: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Word'
      }
    ],
    exercises: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exercise'
      }
    ],
    speakingPrompt: {
      prompt: String,
      sampleDialogue: [{ speaker: String, text: String, translation: String }]
    },
    writingPrompt: {
      prompt: String,
      checklist: [String],
      sampleResponse: String
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

LessonSchema.index({ unitId: 1, order: 1 });

export const Lesson = mongoose.model('Lesson', LessonSchema);
