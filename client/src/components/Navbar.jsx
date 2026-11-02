import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sun,
  Moon,
  Globe,
  Menu,
  X,
  User as UserIcon,
  LogOut,
  Flame,
  Type,
  Settings,
  ChevronDown,
  Check,
  BarChart3
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import { Logo } from './UI/Logo.jsx';
import { Button } from './UI/Button.jsx';
import { Badge } from './UI/Badge.jsx';

export function Navbar() {
  const location = useLocation();
  const { user, progress, logout, openAuthModal } = useAuth();
  const {
    isDark,
    toggleTheme,
    uiLanguage,
    setUiLanguage,
    dyslexiaFont,
    setDyslexiaFont,
    fontSize,
    setFontSize
  } = useTheme();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [accessMenuOpen, setAccessMenuOpen] = useState(false);

  const userDropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    }
    if (userDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [userDropdownOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Dictionary', path: '/browse' },
    { name: 'Trainer', path: '/learn' },
    { name: 'Grammar', path: '/grammar' },
    { name: 'Stats', path: '/stats' }
  ];

  // Professional language options using ISO codes and solid badges (zero emojis)
  const languages = [
    { code: 'en', label: 'English', short: 'EN' },
    { code: 'de', label: 'Deutsch', short: 'DE' },
    { code: 'es', label: 'Español', short: 'ES' },
    { code: 'fr', label: 'Français', short: 'FR' }
  ];

  const currentLang = languages.find((l) => l.code === uiLanguage) || languages[0];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white dark:bg-[#121316] border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="w-full px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Brand Logo with Clean DeutschHub Name */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <Logo size="md" className="group-hover:scale-105 transition-transform" />
            <span className="font-heading text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              DeutschHub
            </span>
          </Link>

          {/* Desktop Navigation Links (Fixed size, zero shifting on active state) */}
          <nav className="hidden md:flex items-center gap-1.5">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3.5 py-1.5 text-xs font-semibold border transition-colors ${
                    active
                      ? 'text-amber-700 dark:text-amber-400 bg-amber-500/10 border-amber-600/30'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border-transparent'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons & Controls */}
          <div className="hidden md:flex items-center gap-2">
            {/* Accessibility Settings Toggle */}
            <div className="relative">
              <button
                onClick={() => setAccessMenuOpen(!accessMenuOpen)}
                title="Accessibility & Text Options"
                className={`p-2 rounded-lg border border-transparent hover:border-slate-200 dark:hover:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${
                  dyslexiaFont ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800' : ''
                }`}
              >
                <Type className="w-4 h-4" />
              </button>

              {accessMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 rounded-xl bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700 p-3.5 z-50 text-sm animate-in fade-in"
                  onMouseLeave={() => setAccessMenuOpen(false)}
                >
                  <p className="font-semibold text-slate-900 dark:text-white mb-2.5 flex items-center gap-1.5 text-xs uppercase tracking-wider text-slate-400">
                    <Settings className="w-3.5 h-3.5 text-emerald-600" /> Accessibility
                  </p>
                  <div className="border-t border-slate-100 dark:border-slate-700 pt-2.5 mb-3">
                    <label className="flex items-center justify-between cursor-pointer">
                      <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Dyslexia Font</span>
                      <input
                        type="checkbox"
                        checked={dyslexiaFont}
                        onChange={(e) => setDyslexiaFont(e.target.checked)}
                        className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                      />
                    </label>
                  </div>
                  <div className="border-t border-slate-100 dark:border-slate-700 pt-2.5">
                    <span className="text-xs text-slate-500 block mb-1.5 font-medium">Text Scale</span>
                    <div className="grid grid-cols-4 gap-1">
                      {['sm', 'base', 'lg', 'xl'].map((sz) => (
                        <button
                          key={sz}
                          onClick={() => setFontSize(sz)}
                          className={`py-1 text-xs rounded-md font-semibold border ${
                            fontSize === sz
                              ? 'bg-emerald-600 text-white border-emerald-600'
                              : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                          }`}
                        >
                          {sz.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Language Selector Dropdown (Zero Emojis, Clean Badges) */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold transition-colors"
                title="Select Interface Language"
              >
                <Globe className="w-3.5 h-3.5 text-slate-500" />
                <span className="font-mono font-bold">{currentLang.short}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {langDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-44 rounded-xl bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700 py-1.5 z-50 animate-in fade-in"
                  onMouseLeave={() => setLangDropdownOpen(false)}
                >
                  <p className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Interface Language
                  </p>
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setUiLanguage(l.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-1.5 text-xs text-left hover:bg-slate-100 dark:hover:bg-slate-700/60 ${
                        uiLanguage === l.code ? 'font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30' : 'text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-6 py-0.5 text-center text-[10px] font-bold rounded-md bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-mono">
                          {l.short}
                        </span>
                        <span>{l.label}</span>
                      </div>
                      {uiLanguage === l.code && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            {/* Auth Buttons or User Badge */}
            {user ? (
              <div className="relative" ref={userDropdownRef}>
                <button
                  id="user-profile-button"
                  type="button"
                  onClick={() => setUserDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Open user menu"
                >
                  <div className="w-6 h-6 rounded-md bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                    {user.name ? user.name[0].toUpperCase() : (user.email ? user.email[0].toUpperCase() : 'U')}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 max-w-[90px] truncate">
                      {user.name || user.email?.split('@')[0] || 'User'}
                    </span>
                    {progress?.streak?.currentStreak > 0 && (
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-[10px] font-bold text-amber-700 dark:text-amber-300">
                        <Flame className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                        {progress.streak.currentStreak}
                      </span>
                    )}
                  </div>
                </button>

                {userDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 rounded-xl bg-white dark:bg-slate-800 shadow-xl border border-slate-200 dark:border-slate-700 py-2 z-50 animate-in fade-in"
                  >
                    <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-700">
                      <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                        {user.name || 'Learner'}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <Badge variant="a1" size="xs">Level {progress?.currentLevel || 'A1'}</Badge>
                        <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                          {progress?.totalXp || 0} XP
                        </span>
                      </div>
                    </div>
                    <Link
                      to="/stats"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                    >
                      <BarChart3 className="w-4 h-4 text-emerald-600" />
                      Study Stats & Motivation
                    </Link>
                    <button
                      id="sign-out-button"
                      type="button"
                      onClick={async () => {
                        setUserDropdownOpen(false);
                        await logout();
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-xs text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 text-left font-medium cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => openAuthModal('login')}>
                  Sign In
                </Button>
                <Button variant="primary" size="sm" onClick={() => openAuthModal('register')}>
                  Start Free
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300"
            >
              {isDark ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 dark:text-slate-200"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-2 pb-6 space-y-3">
          <nav className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-center p-2.5 text-xs font-semibold ${
                    active
                      ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400 font-bold border border-amber-600/30'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-slate-500">Language:</span>
              <div className="flex gap-1">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => setUiLanguage(l.code)}
                    className={`px-2.5 py-1 text-xs rounded-md border font-mono font-bold ${
                      uiLanguage === l.code
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {l.short}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-2">
            {user ? (
              <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {user.name || user.email}
                  </p>
                  <p className="text-[11px] text-emerald-600 font-semibold">
                    Level {progress?.currentLevel || 'A1'} • {progress?.totalXp || 0} XP
                  </p>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-xs text-red-600 font-semibold px-2 py-1 rounded-md hover:bg-red-50 dark:hover:bg-red-950/30"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => {
                    openAuthModal('login');
                    setMobileMenuOpen(false);
                  }}
                >
                  Sign In
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => {
                    openAuthModal('register');
                    setMobileMenuOpen(false);
                  }}
                >
                  Start Free
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
