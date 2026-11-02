import { Router } from 'express';
import {
  register,
  login,
  logout,
  sendResetOtp,
  verifyResetOtp,
  resetPassword,
  verifyEmail,
  resendVerificationEmail,
  getMe,
  updateSettings
} from '../controllers/authController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/send-otp', sendResetOtp);
router.post('/forgot-password', sendResetOtp);
router.post('/verify-otp', verifyResetOtp);
router.post('/reset-password', resetPassword);
router.post('/verify-email', verifyEmail);
router.post('/resend-verification', resendVerificationEmail);
router.get('/me', requireAuth, getMe);
router.patch('/settings', requireAuth, updateSettings);

export default router;
