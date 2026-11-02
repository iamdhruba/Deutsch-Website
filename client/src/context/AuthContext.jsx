import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../services/api.js';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Auth modal state for easy trigger from any button
  const [authModal, setAuthModal] = useState({
    isOpen: false,
    mode: 'login', // 'login' or 'register'
  });

  // Verify active session on load
  useEffect(() => {
    const checkSession = async () => {
      try {
        const data = await authApi.getMe();
        if (data.success && data.user) {
          setUser(data.user);
          setProgress(data.progress);
        }
      } catch (err) {
        // No active session or token expired; user remains guest
        setUser(null);
        setProgress(null);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const login = async (email, password) => {
    setError(null);
    try {
      const data = await authApi.login({ email, password });
      if (data.success && data.user) {
        setUser(data.user);
        // Refresh me to get full progress
        const meData = await authApi.getMe().catch(() => null);
        if (meData?.progress) setProgress(meData.progress);
        closeAuthModal();
        return { success: true };
      }
    } catch (err) {
      const msg = err.data?.message || err.message || 'Login failed.';
      setError(msg);
      return { success: false, error: msg };
    }
  };

  const register = async (email, password, name, uiLanguage) => {
    setError(null);
    try {
      const data = await authApi.register({ email, password, name, uiLanguage });
      if (data.requiresVerification) {
        return {
          success: true,
          requiresVerification: true,
          message: data.message,
          verificationUrl: data.verificationUrl,
          email: data.email
        };
      }
      if (data.success && data.user) {
        setUser(data.user);
        const meData = await authApi.getMe().catch(() => null);
        if (meData?.progress) setProgress(meData.progress);
        closeAuthModal();
        return { success: true };
      }
      return { success: true, message: data.message };
    } catch (err) {
      const msg = err.data?.message || err.message || 'Registration failed.';
      setError(msg);
      return { success: false, error: msg };
    }
  };

  const verifyEmail = async (token) => {
    setError(null);
    try {
      const data = await authApi.verifyEmail({ token });
      if (data.success && data.user) {
        setUser(data.user);
        const meData = await authApi.getMe().catch(() => null);
        if (meData?.progress) setProgress(meData.progress);
        return { success: true, message: data.message, user: data.user };
      }
      return { success: true, message: data.message };
    } catch (err) {
      const msg = err.data?.message || err.message || 'Email verification failed.';
      setError(msg);
      return { success: false, error: msg };
    }
  };

  const resendVerification = async (email) => {
    setError(null);
    try {
      const data = await authApi.resendVerification({ email });
      return {
        success: true,
        message: data.message,
        verificationUrl: data.verificationUrl
      };
    } catch (err) {
      const msg = err.data?.message || err.message || 'Could not resend activation link.';
      setError(msg);
      return { success: false, error: msg };
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } finally {
      setUser(null);
      setProgress(null);
    }
  };

  const sendOtp = async (email) => {
    setError(null);
    try {
      const data = await authApi.sendOtp({ email });
      return {
        success: true,
        message: data.message,
        otp: data.otp,
        expiresInMinutes: data.expiresInMinutes
      };
    } catch (err) {
      const msg = err.data?.message || err.message || 'Could not send verification code.';
      setError(msg);
      return { success: false, error: msg };
    }
  };

  const verifyOtp = async (email, otp) => {
    setError(null);
    try {
      const data = await authApi.verifyOtp({ email, otp });
      return { success: true, message: data.message };
    } catch (err) {
      const msg = err.data?.message || err.message || 'Invalid or expired verification code.';
      setError(msg);
      return { success: false, error: msg };
    }
  };

  const resetPassword = async (email, otp, newPassword) => {
    setError(null);
    try {
      const data = await authApi.resetPassword({ email, otp, newPassword });
      return { success: true, message: data.message };
    } catch (err) {
      const msg = err.data?.message || err.message || 'Password reset failed.';
      setError(msg);
      return { success: false, error: msg };
    }
  };

  const updateSettings = async (settings) => {
    try {
      const data = await authApi.updateSettings(settings);
      if (data.success && data.user) {
        setUser(data.user);
        return { success: true };
      }
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const openAuthModal = (mode = 'login') => {
    setError(null);
    setAuthModal({ isOpen: true, mode });
  };

  const closeAuthModal = () => {
    setAuthModal({ isOpen: false, mode: 'login' });
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        progress,
        loading,
        error,
        login,
        register,
        logout,
        verifyEmail,
        resendVerification,
        sendOtp,
        verifyOtp,
        resetPassword,
        updateSettings,
        authModal,
        openAuthModal,
        closeAuthModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
