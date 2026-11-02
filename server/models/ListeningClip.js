import mongoose from 'mongoose';

/**
 * ListeningClip Schema
 * Audio listening practice at every CEFR level with speed control,
 * transcript toggles, dictation challenges, and comprehension questions.
 */
const ListeningClipSchema = new mongoose.Schema(
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
    audioUrl: {
      type: String,
      default: ''
    },
    durationSeconds: {
      type: Number,
      default: 30
    },
    transcriptGerman: {
      type: String,
      required: true
    },
    transcriptEnglish: {
      type: String,
      default: ''
    },
    // Dictation task text (sentence for the user to listen and transcribe)
    dictationPrompt: {
      type: String,
      default: ''
    },
    // Comprehension check
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
      default: 'Common Voice / Wikimedia Commons (CC BY-SA 4.0 / CC0)'
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

export const ListeningClip = mongoose.model('ListeningClip', ListeningClipSchema);
