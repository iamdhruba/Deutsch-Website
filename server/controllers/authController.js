import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import { UserProgress } from '../models/UserProgress.js';
import { generateToken } from '../middleware/authMiddleware.js';
import { sendVerificationEmail, sendOtpEmail } from '../services/emailService.js';

// Cookie options for secure httpOnly authentication
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  path: '/'
};

// Strict RFC 5322 compatible email regex
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user account & send email activation link
 * @access  Public
 */
export const register = async (req, res, next) => {
  try {
    const { email, password, name, uiLanguage } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password.'
      });
    }

    const trimmedEmail = email.toLowerCase().trim();

    // Strict email format validation
    if (!EMAIL_REGEX.test(trimmedEmail)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address (e.g. name@example.com).'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long.'
      });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    const verificationUrl = `${clientUrl}/verify-email?token=${verificationToken}`;

    const existingUser = await User.findOne({ email: trimmedEmail });
    if (existingUser) {
      // If already verified, reject duplicate registration
      if (existingUser.isVerified) {
        return res.status(409).json({
          success: false,
          message: 'An account with this email address already exists. Please sign in or reset your password.'
        });
      }

      // If registered but not verified yet, refresh verification token and resend link
      existingUser.verificationToken = verificationToken;
      existingUser.verificationTokenExpires = verificationTokenExpires;
      existingUser.passwordHash = passwordHash;
      if (name) existingUser.name = name.trim();
      await existingUser.save();

      await sendVerificationEmail({
        email: trimmedEmail,
        name: existingUser.name,
        verificationUrl
      });

      return res.status(200).json({
        success: true,
        requiresVerification: true,
        message: `An activation link has been re-sent to ${trimmedEmail}. Please check your inbox and click the link to activate your account.`,
        verificationUrl: process.env.NODE_ENV !== 'production' ? verificationUrl : undefined,
        email: trimmedEmail
      });
    }

    // Create user with isVerified: false
    const user = await User.create({
      email: trimmedEmail,
      passwordHash,
      name: name?.trim() || '',
      isVerified: false,
      verificationToken,
      verificationTokenExpires,
      settings: {
        uiLanguage: uiLanguage || 'en',
        targetLanguage: 'de',
        dailyNewWordsGoal: 10,
        theme: 'system',
        dyslexiaFont: false,
        fontSize: 'base'
      }
    });

    // Initialize user progress record
    await UserProgress.create({
      userId: user._id,
      currentLevel: 'A1',
      dailyActivity: [
        {
          date: new Date().toISOString().split('T')[0],
          reviewsCount: 0,
          newWordsCount: 0,
          grammarExercisesCount: 0,
          minutesStudied: 0
        }
      ]
    });

    // Send the activation email
    await sendVerificationEmail({
      email: trimmedEmail,
      name: user.name,
      verificationUrl
    });

    return res.status(201).json({
      success: true,
      requiresVerification: true,
      message: `Registration successful! An activation link has been sent to ${trimmedEmail}. Please check your inbox and click the link to activate your account.`,
      verificationUrl: process.env.NODE_ENV !== 'production' ? verificationUrl : undefined,
      email: trimmedEmail
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user & set cookie
 * @access  Public
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password.'
      });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    // Enforce email verification if account has a pending verification
    if (user.isVerified === false && user.verificationToken) {
      return res.status(403).json({
        success: false,
        isUnverified: true,
        email: user.email,
        message: 'Your account is not activated yet. Please click the activation link sent to your email to verify your account.'
      });
    }

    // Update streak activity timestamp in progress if needed
    const today = new Date().toISOString().split('T')[0];
    const progress = await UserProgress.findOne({ userId: user._id });
    if (progress) {
      const todayEntry = progress.dailyActivity.find((a) => a.date === today);
      if (!todayEntry) {
        progress.dailyActivity.push({
          date: today,
          reviewsCount: 0,
          newWordsCount: 0,
          grammarExercisesCount: 0,
          minutesStudied: 0
        });
        await progress.save();
      }
    }

    const token = generateToken(user._id);
    res.cookie('token', token, COOKIE_OPTIONS);

    return res.status(200).json({
      success: true,
      message: 'Logged in successfully.',
      token,
      user: user.toPublicJSON()
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @route   POST /api/auth/logout
 * @desc    Clear auth cookie & end session
 * @access  Public
 */
export const logout = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    path: '/'
  });

  return res.status(200).json({
    success: true,
    message: 'Logged out successfully.'
  });
};

/**
 * @route   GET /api/auth/me
 * @desc    Get currently logged in user profile & progress
 * @access  Private
 */
export const getMe = async (req, res, next) => {
  try {
    const progress = await UserProgress.findOne({ userId: req.user._id });

    return res.status(200).json({
      success: true,
      user: req.user.toPublicJSON(),
      progress: progress || null
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @route   PATCH /api/auth/settings
 * @desc    Update user preferences (theme, UI language, dyslexia font, etc.)
 * @access  Private
 */
export const updateSettings = async (req, res, next) => {
  try {
    const allowedSettings = [
      'uiLanguage',
      'targetLanguage',
      'dailyNewWordsGoal',
      'theme',
      'dyslexiaFont',
      'fontSize',
      'audioSpeed',
      'studyPlan'
    ];

    const updates = {};
    for (const key of allowedSettings) {
      if (req.body[key] !== undefined) {
        updates[`settings.${key}`] = req.body[key];
      }
    }

    if (req.body.name !== undefined) {
      updates.name = req.body.name;
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      success: true,
      message: 'Settings updated.',
      user: user.toPublicJSON()
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @route   POST /api/auth/send-otp
 * @desc    Generate and send 6-digit OTP for password reset
 * @access  Public
 */
export const sendResetOtp = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Please provide your registered email address.'
      });
    }

    const trimmedEmail = email.toLowerCase().trim();

    if (!EMAIL_REGEX.test(trimmedEmail)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address (e.g. name@example.com).'
      });
    }

    const user = await User.findOne({ email: trimmedEmail });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'No account found with this email address. Please check spelling or register.'
      });
    }

    // Generate secure random 6-digit code
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    // Valid for 10 minutes
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    user.resetOtp = otp;
    user.resetOtpExpires = expiresAt;
    await user.save();

    // Dispatch OTP via email
    const emailResult = await sendOtpEmail({ email: trimmedEmail, name: user.name, otp });

    if (!emailResult.success) {
      if (emailResult.notConfigured) {
        return res.status(503).json({
          success: false,
          message: 'Email service is not configured yet. Please configure SMTP_USER and SMTP_PASS in server/.env with your Gmail App Password.'
        });
      }

      return res.status(500).json({
        success: false,
        message: `Failed to deliver email: ${emailResult.error || 'SMTP delivery failure'}. Please check your SMTP settings in server/.env.`
      });
    }

    console.log(`[AUTH OTP] Password reset code successfully emailed to ${trimmedEmail}`);

    return res.status(200).json({
      success: true,
      message: `A 6-digit verification code has been sent to ${trimmedEmail}. Please check your inbox.`,
      email: trimmedEmail,
      expiresInMinutes: 10
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @route   POST /api/auth/verify-otp
 * @desc    Verify OTP code for password reset
 * @access  Public
 */
export const verifyResetOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and 6-digit verification code.'
      });
    }

    const trimmedEmail = email.toLowerCase().trim();
    const cleanOtp = otp.toString().trim();

    const user = await User.findOne({ email: trimmedEmail });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'No account found with this email address.'
      });
    }

    if (!user.resetOtp || user.resetOtp !== cleanOtp) {
      return res.status(400).json({
        success: false,
        message: 'Invalid verification code. Please check the code and try again.'
      });
    }

    if (!user.resetOtpExpires || user.resetOtpExpires < new Date()) {
      return res.status(400).json({
        success: false,
        message: 'Verification code has expired. Please request a new code.'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Verification code confirmed.'
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @route   POST /api/auth/reset-password
 * @desc    Verify OTP and reset password for an existing account
 * @access  Public
 */
export const resetPassword = async (req, res, next) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Please provide your registered email, verification code, and new password.'
      });
    }

    const trimmedEmail = email.toLowerCase().trim();
    const cleanOtp = otp ? otp.toString().trim() : '';

    if (!EMAIL_REGEX.test(trimmedEmail)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address (e.g. name@example.com).'
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 6 characters long.'
      });
    }

    const user = await User.findOne({ email: trimmedEmail });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'No account found with this email address. Please check spelling or register.'
      });
    }

    // Verify OTP code
    if (!cleanOtp || !user.resetOtp || user.resetOtp !== cleanOtp) {
      return res.status(400).json({
        success: false,
        message: 'Invalid verification code. Please check the code or request a new one.'
      });
    }

    if (!user.resetOtpExpires || user.resetOtpExpires < new Date()) {
      return res.status(400).json({
        success: false,
        message: 'Verification code has expired. Please request a new code.'
      });
    }

    const salt = await bcrypt.genSalt(10);
    user.passwordHash = await bcrypt.hash(newPassword, salt);
    user.resetOtp = null;
    user.resetOtpExpires = null;
    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Password reset successful! You can now sign in with your new password.'
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @route   POST /api/auth/verify-email
 * @desc    Verify email address using registration link token & activate account
 * @access  Public
 */
export const verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Verification token is required.'
      });
    }

    const cleanToken = token.trim();
    const user = await User.findOne({
      verificationToken: cleanToken,
      verificationTokenExpires: { $gt: new Date() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'This activation link is invalid or has expired. Please request a new activation link.'
      });
    }

    user.isVerified = true;
    user.verificationToken = null;
    user.verificationTokenExpires = null;
    await user.save();

    // Auto-login newly activated user
    const authToken = generateToken(user._id);
    res.cookie('token', authToken, COOKIE_OPTIONS);

    return res.status(200).json({
      success: true,
      message: 'Account activated successfully! Welcome to DeutschHub.',
      token: authToken,
      user: user.toPublicJSON()
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @route   POST /api/auth/resend-verification
 * @desc    Resend registration activation link to user email
 * @access  Public
 */
export const resendVerificationEmail = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Please provide your registered email address.'
      });
    }

    const trimmedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: trimmedEmail });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'No account found with this email address. Please register.'
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: 'Your account is already activated. Please sign in.'
      });
    }

    const verificationToken = crypto.randomBytes(32).toString('hex');
    user.verificationToken = verificationToken;
    user.verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    await user.save();

    const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    const verificationUrl = `${clientUrl}/verify-email?token=${verificationToken}`;
    await sendVerificationEmail({ email: trimmedEmail, name: user.name, verificationUrl });

    return res.status(200).json({
      success: true,
      message: `A fresh activation link has been sent to ${trimmedEmail}. Please check your inbox.`,
      verificationUrl: process.env.NODE_ENV !== 'production' ? verificationUrl : undefined
    });
  } catch (err) {
    next(err);
  }
};


