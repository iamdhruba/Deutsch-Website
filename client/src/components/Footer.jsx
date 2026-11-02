import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShieldCheck, Sparkles, BookOpen, ExternalLink } from 'lucide-react';
import { Logo } from './UI/Logo.jsx';

export function Footer() {
  return (
    <footer className="w-full bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand & Manifesto */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <Logo size="sm" />
              <span className="font-heading text-xl font-bold text-slate-900 dark:text-white">
                DeutschHub
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
              Modern German vocabulary platform combining frequency dictionaries,
              spaced-repetition FSRS trainer, and color-coded grammar.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
              Learning Modules
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <Link to="/browse" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Frequency Dictionary (10,000+)
                </Link>
              </li>
              <li>
                <Link to="/learn" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  FSRS Spaced-Repetition Trainer
                </Link>
              </li>
              <li>
                <Link to="/grammar" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Grammar Center (A1 to C2)
                </Link>
              </li>
              <li>
                <Link to="/stats" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Stats & Mistakes Notebook
                </Link>
              </li>
            </ul>
          </div>

          {/* Open Data & Attribution */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
              Open Source & Data
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <Link
                  to="/attribution"
                  className="font-semibold text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center gap-1.5 transition-colors"
                >
                  <BookOpen className="w-4 h-4 text-emerald-600" />
                  Licenses & Attribution
                </Link>
              </li>
              <li>
                <a
                  href="https://kaikki.org"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center gap-1 transition-colors"
                >
                  Kaikki.org / Wiktionary <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://tatoeba.org"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center gap-1 transition-colors"
                >
                  Tatoeba Examples <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/open-spaced-repetition/fsrs4anki"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center gap-1 transition-colors"
                >
                  FSRS Algorithm (MIT) <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for German language learners worldwide.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/attribution" className="hover:underline">
              Creative Commons Attribution
            </Link>
            <span>•</span>
            <span>Version 1.0 (Phase 1)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
