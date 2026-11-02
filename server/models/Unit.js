import mongoose from 'mongoose';

/**
 * Unit Schema
 * Represents a thematic curriculum unit in the A1-C2 learning path.
 */
const UnitSchema = new mongoose.Schema(
  {
    level: {
      type: String,
      enum: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
      required: true,
      index: true
    },
    unitNumber: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      default: ''
    },
    topicsCovered: [{ type: String }],
    order: {
      type: Number,
      default: 1
    },
    icon: {
      type: String,
      default: 'BookOpen'
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

UnitSchema.index({ level: 1, unitNumber: 1 }, { unique: true });

export const Unit = mongoose.model('Unit', UnitSchema);
