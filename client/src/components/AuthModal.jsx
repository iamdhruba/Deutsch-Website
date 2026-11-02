import React, { useState, useEffect } from 'react';
import {
  X,
  Mail,
  Lock,
  User,
  ArrowRight,
  CheckCircle2,
  KeyRound,
  RefreshCw,
  ArrowLeft,
  ShieldCheck,
  MailCheck,
  ExternalLink,
  Eye,
  EyeOff
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { Logo } from './UI/Logo.jsx';
import { Button } from './UI/Button.jsx';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export function AuthModal() {
  const {
    authModal,
    closeAuthModal,
    login,
    register,
    sendOtp,
    verifyOtp,
    resetPassword,
    resendVerification,
    error
  } = useAuth();

  // Modes: 'login' | 'register' | 'forgot' | 'email_sent'
  const [mode, setMode] = useState(authModal.mode || 'login');

  // Forgot password sub-step:
  // 1. 'email' (request OTP to email)
  // 2. 'verify_otp' (enter code from email and verify)
  // 3. 'new_password' (enter new password and confirm)
  const [forgotStep, setForgotStep] = useState('email');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [devVerificationUrl, setDevVerificationUrl] = useState('');
  const [registeredEmail, setRegisteredEmail] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);

  // Sync mode whenever modal opens or mode prop updates
  useEffect(() => {
    if (authModal.isOpen) {
      setMode(authModal.mode || 'login');
      setForgotStep('email');
      setLocalError('');
      setSuccessMessage('');
      setDevVerificationUrl('');
      setOtp('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setName('');
      setShowPassword(false);
      setShowConfirmPassword(false);
    }
  }, [authModal.isOpen, authModal.mode]);

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const interval = setInterval(() => {
      setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [resendCooldown]);

  if (!authModal.isOpen) return null;

  // Handle requesting OTP for forgot password
  const handleRequestOtp = async (e) => {
    if (e) e.preventDefault();
    setLocalError('');
    setSuccessMessage('');

    const cleanEmail = email.trim();
    if (!cleanEmail || !EMAIL_REGEX.test(cleanEmail)) {
      setLocalError('Please enter a valid email address (e.g. name@example.com).');
      return;
    }

    setLoading(true);
    const res = await sendOtp(cleanEmail);
    if (res.success) {
      setForgotStep('verify_otp');
      setSuccessMessage(res.message || `A 6-digit verification code has been sent to ${cleanEmail}. Please check your inbox.`);
      setResendCooldown(30);
    } else {
      setLocalError(res.error || 'Failed to send verification code. Please check your email address.');
    }
    setLoading(false);
  };

  // Handle verifying OTP code
  const handleVerifyOtp = async (e) => {
    if (e) e.preventDefault();
    setLocalError('');
    setSuccessMessage('');

    const cleanEmail = email.trim();
    const cleanOtp = otp.trim();

    if (!cleanOtp || cleanOtp.length !== 6) {
      setLocalError('Please enter the 6-digit verification code from your email.');
      return;
    }

    setLoading(true);
    const res = await verifyOtp(cleanEmail, cleanOtp);
    if (res.success) {
      setForgotStep('new_password');
      setSuccessMessage('Code verified successfully! Now choose your new password.');
    } else {
      setLocalError(res.error || 'Invalid or expired verification code. Please check your email.');
    }
    setLoading(false);
  };

  // Handle Resending Activation Link
  const handleResendActivationLink = async () => {
    const targetEmail = (registeredEmail || email).trim();
    if (!targetEmail) return;

    setLoading(true);
    setLocalError('');
    setSuccessMessage('');

    const res = await resendVerification(targetEmail);
    if (res.success) {
      setSuccessMessage(res.message || `A fresh activation link was sent to ${targetEmail}.`);
      if (res.verificationUrl) setDevVerificationUrl(res.verificationUrl);
      setResendCooldown(30);
    } else {
      setLocalError(res.error || 'Could not resend activation link.');
    }
    setLoading(false);
  };

  // Handle Main Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    setSuccessMessage('');

    const cleanEmail = email.trim();

    // Strict email format validation
    if (!cleanEmail || !EMAIL_REGEX.test(cleanEmail)) {
      setLocalError('Please enter a valid email address (e.g. name@example.com).');
      return;
    }

    setLoading(true);

    if (mode === 'login') {
      const res = await login(cleanEmail, password);
      if (!res.success) {
        setLocalError(res.error || 'Login failed. Please check your credentials.');
      }
    } else if (mode === 'register') {
      if (password.length < 6) {
        setLocalError('Password must be at least 6 characters long.');
        setLoading(false);
        return;
      }
      const res = await register(cleanEmail, password, name);
      if (res.requiresVerification) {
        setRegisteredEmail(cleanEmail);
        if (res.verificationUrl) setDevVerificationUrl(res.verificationUrl);
        setMode('email_sent');
        setSuccessMessage(res.message);
        setResendCooldown(30);
      } else if (!res.success) {
        setLocalError(res.error || 'Registration failed. Please try again.');
      }
    } else if (mode === 'forgot') {
      if (forgotStep === 'email') {
        await handleRequestOtp(e);
        return;
      }

      if (forgotStep === 'verify_otp') {
        await handleVerifyOtp(e);
        return;
      }

      // Step 'new_password': submit password reset
      if (password.length < 6) {
        setLocalError('New password must be at least 6 characters long.');
        setLoading(false);
        return;
      }

      if (password !== confirmPassword) {
        setLocalError('Passwords do not match.');
        setLoading(false);
        return;
      }

      const cleanOtp = otp.trim();
      const res = await resetPassword(cleanEmail, cleanOtp, password);
      if (res.success) {
        setSuccessMessage('Password reset successful! You can now sign in with your new password.');
        setPassword('');
        setConfirmPassword('');
        setOtp('');
        setMode('login');
      } else {
        setLocalError(res.error || 'Password reset failed. Please request a new code.');
      }
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          id="close-auth-modal-btn"
          type="button"
          onClick={closeAuthModal}
          className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          title="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          {mode === 'forgot' ? (
            <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto mb-3 shadow-inner">
              {forgotStep === 'email' && <Mail className="w-6 h-6" />}
              {forgotStep === 'verify_otp' && <KeyRound className="w-6 h-6" />}
              {forgotStep === 'new_password' && <ShieldCheck className="w-6 h-6" />}
            </div>
          ) : mode === 'email_sent' ? (
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-3 shadow-inner">
              <MailCheck className="w-8 h-8" />
            </div>
          ) : (
            <Logo size="lg" className="mx-auto mb-3" />
          )}

          <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
            {mode === 'login' && 'Welcome Back!'}
            {mode === 'register' && 'Start Learning Free'}
            {mode === 'forgot' && (
              forgotStep === 'email'
                ? 'Forgot Password'
                : forgotStep === 'verify_otp'
                ? 'Enter Verification Code'
                : 'Set New Password'
            )}
            {mode === 'email_sent' && 'Check Your Email Inbox! ✉️'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {mode === 'login' && 'Sign in to access your spaced repetition queue.'}
            {mode === 'register' && 'Enter your details below to receive your account activation link.'}
            {mode === 'forgot' && (
              forgotStep === 'email'
                ? 'We will send a 6-digit OTP code to your registered email.'
                : forgotStep === 'verify_otp'
                ? `Enter the 6-digit code sent to ${email} to verify your request.`
                : 'Choose your new password to regain access to your account.'
            )}
            {mode === 'email_sent' && `We sent a registration activation link to ${registeredEmail || email}.`}
          </p>
        </div>

        {/* Mode switcher tabs (only on login/register) */}
        {mode === 'login' || mode === 'register' ? (
          <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-lg mb-5">
            <button
              id="switch-to-login-tab"
              type="button"
              onClick={() => {
                setMode('login');
                setPassword('');
                setConfirmPassword('');
                setShowPassword(false);
                setShowConfirmPassword(false);
                setLocalError('');
                setSuccessMessage('');
              }}
              className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-colors cursor-pointer ${
                mode === 'login'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              Sign In
            </button>
            <button
              id="switch-to-register-tab"
              type="button"
              onClick={() => {
                setMode('register');
                setPassword('');
                setConfirmPassword('');
                setShowPassword(false);
                setShowConfirmPassword(false);
                setLocalError('');
                setSuccessMessage('');
              }}
              className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-colors cursor-pointer ${
                mode === 'register'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              Create Account
            </button>
          </div>
        ) : mode === 'forgot' ? (
          <div className="flex items-center justify-between mb-4 text-xs">
            <button
              type="button"
              onClick={() => {
                if (forgotStep === 'verify_otp') {
                  setForgotStep('email');
                  setLocalError('');
                  setSuccessMessage('');
                } else if (forgotStep === 'new_password') {
                  setForgotStep('verify_otp');
                  setLocalError('');
                  setSuccessMessage('');
                } else {
                  setMode('login');
                  setLocalError('');
                  setSuccessMessage('');
                }
              }}
              className="inline-flex items-center gap-1.5 font-semibold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              {forgotStep === 'verify_otp' ? 'Change Email' : forgotStep === 'new_password' ? 'Back to Code' : 'Back to Sign In'}
            </button>
            <span className="text-[11px] font-mono text-slate-400 font-semibold">
              {forgotStep === 'email' && 'Step 1 of 3: Request Code'}
              {forgotStep === 'verify_otp' && 'Step 2 of 3: Verify Code'}
              {forgotStep === 'new_password' && 'Step 3 of 3: New Password'}
            </span>
          </div>
        ) : null}

        {/* ----------------- EMAIL SENT (REGISTRATION LINK CONFIRMATION) ----------------- */}
        {mode === 'email_sent' && (
          <div className="space-y-4 animate-in fade-in">
            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200">
              <p className="font-semibold mb-1">Activation Link Dispatched</p>
              <p className="text-[11px] text-emerald-700 dark:text-emerald-300">
                Please check your inbox at <span className="font-bold underline">{registeredEmail || email}</span> and click the button to activate your account.
              </p>
            </div>

            {/* Development / Testing Quick Link Shortcut (if available) */}
            {devVerificationUrl && (
              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs space-y-2">
                <p className="font-bold text-amber-900 dark:text-amber-200 text-[11px] uppercase tracking-wider">
                  Test / Dev Mode Shortcut:
                </p>
                <a
                  id="simulate-verify-btn"
                  href={devVerificationUrl}
                  onClick={closeAuthModal}
                  className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-colors cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Simulate Email Click & Activate Now »
                </a>
              </div>
            )}

            <div className="pt-2 flex flex-col gap-2">
              <button
                type="button"
                id="resend-activation-btn"
                disabled={resendCooldown > 0 || loading}
                onClick={handleResendActivationLink}
                className={`w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border text-xs font-semibold transition-colors ${
                  resendCooldown > 0
                    ? 'border-slate-200 dark:border-slate-700 text-slate-400 cursor-not-allowed'
                    : 'border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer'
                }`}
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                {resendCooldown > 0 ? `Resend email in ${resendCooldown}s` : 'Resend Activation Email'}
              </button>

              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setLocalError('');
                  setSuccessMessage('');
                }}
                className="w-full py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
              >
                ← Back to Sign In
              </button>
            </div>
          </div>
        )}

        {/* Success message banner */}
        {successMessage && mode !== 'email_sent' && (
          <div className="mb-4 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 font-medium flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>{successMessage}</span>
            </div>
          </div>
        )}

        {/* Error message banner */}
        {(localError || error) && (
          <div className="mb-4 p-2.5 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-xs text-red-600 dark:text-red-400 font-medium">
            {localError || error}
          </div>
        )}

        {/* Main Form (Only when NOT in email_sent mode) */}
        {mode !== 'email_sent' && (
          <form onSubmit={handleSubmit} className="space-y-3.5" autoComplete="off">
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Your Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="auth-name-input"
                    type="text"
                    autoComplete="name"
                    placeholder="e.g. Lukas or Anna"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* Email field (in login, register, or forgot step 1) */}
            {(mode !== 'forgot' || forgotStep === 'email') && (
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="auth-email-input"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* OTP Code Input (when in forgot step 2: 'verify_otp') */}
            {mode === 'forgot' && forgotStep === 'verify_otp' && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    6-Digit Verification Code
                  </label>
                  <button
                    type="button"
                    disabled={resendCooldown > 0 || loading}
                    onClick={() => handleRequestOtp()}
                    className={`text-[11px] font-semibold flex items-center gap-1 ${
                      resendCooldown > 0
                        ? 'text-slate-400 cursor-not-allowed'
                        : 'text-amber-600 dark:text-amber-400 hover:underline cursor-pointer'
                    }`}
                  >
                    <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
                    {resendCooldown > 0 ? `Resend code in ${resendCooldown}s` : 'Resend Code'}
                  </button>
                </div>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="auth-otp-input"
                    type="text"
                    required
                    maxLength={6}
                    autoComplete="one-time-code"
                    placeholder="Enter 6-digit code from email"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-base tracking-widest font-bold focus:ring-2 focus:ring-amber-500 focus:outline-none text-center"
                    autoFocus
                  />
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 text-center">
                  Check your email inbox for the code, then copy and paste it here.
                </p>
              </div>
            )}

            {/* Password fields (in login, register, or forgot step 3: 'new_password') */}
            {(mode !== 'forgot' || forgotStep === 'new_password') && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    {mode === 'forgot' ? 'New Password' : 'Password'}
                  </label>
                  {mode === 'login' && (
                    <button
                      id="forgot-password-link"
                      type="button"
                      onClick={() => {
                        setMode('forgot');
                        setForgotStep('email');
                        setPassword('');
                        setConfirmPassword('');
                        setShowPassword(false);
                        setShowConfirmPassword(false);
                        setLocalError('');
                        setSuccessMessage('');
                      }}
                      className="text-[11px] text-amber-600 dark:text-amber-400 hover:underline font-semibold cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="auth-password-input"
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    autoComplete={mode === 'register' || forgotStep === 'new_password' ? 'new-password' : 'current-password'}
                    placeholder="At least 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-10 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    autoFocus={mode === 'forgot' && forgotStep === 'new_password'}
                  />
                  <button
                    id="toggle-password-visibility-btn"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer focus:outline-none"
                    title={showPassword ? 'Hide password' : 'Show password'}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    tabIndex="-1"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            {/* Confirm Password (only in forgot step 3: 'new_password') */}
            {mode === 'forgot' && forgotStep === 'new_password' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="auth-confirm-password-input"
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    autoComplete="new-password"
                    placeholder="Re-enter your new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-9 pr-10 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                  <button
                    id="toggle-confirm-password-visibility-btn"
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer focus:outline-none"
                    title={showConfirmPassword ? 'Hide password' : 'Show password'}
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                    tabIndex="-1"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            <Button
              id="auth-submit-btn"
              type="submit"
              variant="primary"
              size="md"
              disabled={loading}
              className="w-full mt-2 font-bold cursor-pointer"
            >
              {loading ? (
                'Processing...'
              ) : mode === 'login' ? (
                <span className="flex items-center gap-1.5">
                  Sign In <ArrowRight className="w-4 h-4" />
                </span>
              ) : mode === 'register' ? (
                <span className="flex items-center gap-1.5">
                  Send Activation Link <ArrowRight className="w-4 h-4" />
                </span>
              ) : forgotStep === 'email' ? (
                <span className="flex items-center gap-1.5">
                  Send Verification Code »
                </span>
              ) : forgotStep === 'verify_otp' ? (
                <span className="flex items-center gap-1.5">
                  Verify Code »
                </span>
              ) : (
                <span className="flex items-center gap-1.5">
                  Reset Password & Sign In »
                </span>
              )}
            </Button>
          </form>
        )}

        <p className="mt-4 text-center text-[11px] text-slate-400">
          By using DeutschHub, you support open education for everyone.
        </p>
      </div>
    </div>
  );
}
