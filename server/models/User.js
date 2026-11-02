import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

/**
 * User Schema
 * Represents a registered learner on the platform.
 */
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
    },
    passwordHash: {
      type: String,
      required: [true, 'Password is required']
    },
    name: {
      type: String,
      trim: true,
      default: ''
    },
    // OTP-based Password Reset
    resetOtp: {
      type: String,
      default: null
    },
    resetOtpExpires: {
      type: Date,
      default: null
    },
    // Registration Link / Email Verification
    isVerified: {
      type: Boolean,
      default: false
    },
    verificationToken: {
      type: String,
      default: null
    },
    verificationTokenExpires: {
      type: Date,
      default: null
    },
    settings: {
      // Interface language (English first, ready for others: 'de', 'es', 'fr', etc.)
      uiLanguage: {
        type: String,
        default: 'en'
      },
      // Target learning language (defaults to 'de' German)
      targetLanguage: {
        type: String,
        default: 'de'
      },
      // Daily learning goal (new words per day)
      dailyNewWordsGoal: {
        type: Number,
        default: 10,
        min: 1,
        max: 100
      },
      // Visual theme: 'light', 'dark', or 'system'
      theme: {
        type: String,
        enum: ['light', 'dark', 'system'],
        default: 'system'
      },
      // Accessibility: OpenDyslexic font support
      dyslexiaFont: {
        type: Boolean,
        default: false
      },
      // Text font size scaling
      fontSize: {
        type: String,
        enum: ['sm', 'base', 'lg', 'xl'],
        default: 'base'
      },
      // Audio playback speed: 0.75 (slow), 1.0 (normal), 1.25 (fast)
      audioSpeed: {
        type: Number,
        default: 1.0
      },
      // Custom study plan
      studyPlan: {
        type: String,
        enum: ['casual', 'regular', 'intensive', 'exam_8w'],
        default: 'regular'
      }
    }
  },
  {
    timestamps: true
  }
);

/**
 * Helper method to compare candidate password with hashed password
 */
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.passwordHash);
};

/**
 * Helper to return sanitized user object (without passwordHash)
 */
UserSchema.methods.toPublicJSON = function () {
  return {
    id: this._id,
    email: this.email,
    name: this.name,
    isVerified: this.isVerified,
    settings: this.settings,
    createdAt: this.createdAt
  };
};

export const User = mongoose.model('User', UserSchema);
