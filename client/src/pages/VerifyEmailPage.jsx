import React, { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, AlertCircle, ArrowRight, Loader2, Sparkles, Mail } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { Logo } from '../components/UI/Logo.jsx';
import { Button } from '../components/UI/Button.jsx';

export function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const { verifyEmail, resendVerification, user } = useAuth();
  const navigate = useNavigate();

  const [status, setStatus] = useState(token ? 'verifying' : 'no_token'); // 'verifying' | 'success' | 'error' | 'no_token'
  const [errorMessage, setErrorMessage] = useState('');
  const [resendEmail, setResendEmail] = useState('');
  const [resendStatus, setResendStatus] = useState('');
  const [resending, setResending] = useState(false);

  useEffect(() => {
    if (!token) {
      setStatus('no_token');
      return;
    }

    let isMounted = true;
    verifyEmail(token).then((res) => {
      if (!isMounted) return;
      if (res.success) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMessage(res.error || 'Activation link is invalid or has expired.');
      }
    });

    return () => {
      isMounted = false;
    };
  }, [token]);

  const handleResend = async (e) => {
    e.preventDefault();
    if (!resendEmail.trim()) return;
    setResending(true);
    setResendStatus('');

    const res = await resendVerification(resendEmail.trim());
    if (res.success) {
      setResendStatus('A fresh activation link has been sent to your email.');
    } else {
      setResendStatus(res.error || 'Could not resend activation link.');
    }
    setResending(false);
  };

  return (
    <div className="h-full w-full overflow-y-auto flex items-center justify-center p-4 bg-slate-50 dark:bg-[#121316]">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-8 text-center animate-in zoom-in-95 duration-200 my-8">
        <Logo size="lg" className="mx-auto mb-4" />

        {/* 1. Verifying state */}
        {status === 'verifying' && (
          <div className="py-8 space-y-4">
            <Loader2 className="w-10 h-10 text-emerald-600 animate-spin mx-auto" />
            <h2 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
              Activating your DeutschHub account...
            </h2>
            <p className="text-xs text-slate-500">
              Please wait while we verify your registration token.
            </p>
          </div>
        )}

        {/* 2. Success state */}
        {status === 'success' && (
          <div className="space-y-5 animate-in fade-in">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-[11px] font-bold text-emerald-700 dark:text-emerald-300">
                <Sparkles className="w-3 h-3" /> Account Verified
              </div>
              <h2 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
                Willkommen bei DeutschHub! 🇩🇪
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                Your email address has been successfully confirmed. Your account is now fully active.
              </p>
            </div>

            <div className="pt-3 flex flex-col gap-2.5">
              <Button
                id="start-learning-btn"
                variant="primary"
                size="md"
                onClick={() => navigate('/learn')}
                className="w-full font-bold cursor-pointer"
              >
                Start Learning Now <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={() => navigate('/browse')}
                className="w-full cursor-pointer"
              >
                Browse A1–C2 Dictionary
              </Button>
            </div>
          </div>
        )}

        {/* 3. Error or expired state */}
        {status === 'error' && (
          <div className="space-y-5 animate-in fade-in">
            <div className="w-14 h-14 rounded-2xl bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center mx-auto shadow-inner">
              <AlertCircle className="w-8 h-8" />
            </div>

            <div className="space-y-1.5">
              <h2 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
                Activation Link Invalid or Expired
              </h2>
              <p className="text-xs text-red-600 dark:text-red-400 font-medium">
                {errorMessage}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Activation links expire after 24 hours. Enter your email below to receive a fresh activation link:
              </p>
            </div>

            <form onSubmit={handleResend} className="space-y-3 pt-2 text-left">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Your Registered Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={resendEmail}
                    onChange={(e) => setResendEmail(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              {resendStatus && (
                <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  {resendStatus}
                </p>
              )}

              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={resending}
                className="w-full font-bold cursor-pointer"
              >
                {resending ? 'Sending...' : 'Resend Activation Link'}
              </Button>
            </form>

            <div className="pt-2">
              <Link to="/" className="text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white">
                ← Return to Homepage
              </Link>
            </div>
          </div>
        )}

        {/* 4. No token provided */}
        {status === 'no_token' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
              Email Verification
            </h2>
            <p className="text-xs text-slate-500">
              Please click the link sent to your email to verify your DeutschHub account.
            </p>
            <Link to="/" className="inline-block text-xs font-semibold text-emerald-600 hover:underline">
              ← Go to Homepage
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
