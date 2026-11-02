import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { wordsApi } from '../services/api.js';
import { VocabeoNav } from '../components/VocabeoNav.jsx';
import { Logo } from '../components/UI/Logo.jsx';
import { Badge } from '../components/UI/Badge.jsx';

export function HomePage() {
  const navigate = useNavigate();
  const { user, openAuthModal } = useAuth();

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);

  // Quick live word lookup teaser on home page
  useEffect(() => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setSearching(true);
      try {
        const res = await wordsApi.getWords({ search: searchTerm.trim(), limit: 4 });
        if (res.success) {
          setSearchResults(res.words);
        }
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setSearching(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/browse?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const playSpeech = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'de-DE';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Vocabeo 3x3 Feature Grid Data with distinct muted solid color markers
  const features = [
    {
      color: 'bg-amber-600',
      title: 'Browse',
      highlight: 'Browse',
      text: 'the 6,000+ most common German words',
      link: '/browse'
    },
    {
      color: 'bg-blue-600',
      title: 'Filter',
      highlight: 'Filter',
      text: 'words by word class & level (A1–C2)',
      link: '/browse'
    },
    {
      color: 'bg-emerald-600',
      title: 'Decide',
      highlight: 'Decide',
      text: "exactly which words you'd like to learn",
      link: '/browse'
    },
    {
      color: 'bg-teal-600',
      title: 'Most frequent',
      highlight: 'Start with the',
      boldText: 'most frequent',
      text: 'words first',
      link: '/browse'
    },
    {
      color: 'bg-rose-600',
      title: 'Learn in context',
      highlight: 'Learn',
      text: 'in context with authentic example sentences',
      link: '/learn'
    },
    {
      color: 'bg-indigo-600',
      title: 'Save to queue',
      highlight: 'Save',
      text: 'words directly into your FSRS review queue',
      link: '/learn'
    },
    {
      color: 'bg-purple-600',
      title: 'Audio & images',
      highlight: 'Remember easily with',
      boldText: 'audio & images',
      text: '',
      link: '/learn'
    },
    {
      color: 'bg-amber-700',
      title: 'Spaced repetition',
      highlight: 'Learn effectively with',
      boldText: 'spaced repetition',
      text: '',
      link: '/learn'
    },
    {
      color: 'bg-slate-600',
      title: 'Statistics',
      highlight: 'View',
      boldText: 'statistics',
      text: 'on saved & mastered words',
      link: '/stats'
    }
  ];

  return (
    <div className="h-full w-full bg-white dark:bg-[#121316] text-slate-900 dark:text-slate-100 flex flex-col md:flex-row overflow-hidden select-none transition-colors">
      {/* 1. LEFT SIDEBAR NAVIGATION (Clean Minimal Vocabeo App Shell) */}
      <aside className="w-full md:w-56 lg:w-60 bg-slate-50 dark:bg-[#18191d] border-r border-slate-200 dark:border-slate-800 flex flex-col shrink-0 p-4 overflow-y-auto">
        <VocabeoNav active="home" />
      </aside>

      {/* 2. MAIN CENTER CONTENT (Clean Minimal Vocabeo-Style Card) */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-8 flex flex-col items-center justify-start space-y-8">
        <div className="w-full max-w-2xl space-y-8 my-auto py-6">
          {/* Logo & Headline */}
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center gap-3">
              <Logo size="lg" />
              <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
                DeutschHub
              </h1>
            </div>

            <h2 className="text-base sm:text-lg font-semibold text-slate-800 dark:text-slate-200">
              Learn the most frequent German words - quickly & effectively
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-lg mx-auto leading-relaxed">
              <b>DeutschHub</b> is designed to help you easily build up your <b>German vocabulary</b> and keep it for the long term.
              As a combination of <b>Mini Dictionary</b> and a <b>Vocabulary Trainer</b> it allows you to:
            </p>
          </div>

          {/* Clean Instant Word Search (Centered on top of Browse & Filter) */}
          <div className="max-w-md sm:max-w-lg mx-auto w-full relative">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search any word (e.g. Antrag, Haus, lernen)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-24 py-2.5 text-xs sm:text-sm border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#18191d] text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500 shadow-sm"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <button
                type="submit"
                className="absolute right-1 top-1/2 -translate-y-1/2 px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-bold tracking-wider uppercase transition-colors"
              >
                Search
              </button>
            </form>

            {/* Instant Search Results Dropdown */}
            {searchResults.length > 0 && (
              <div className="absolute left-0 right-0 mt-1 bg-white dark:bg-[#18191d] shadow-lg border border-slate-200 dark:border-slate-800 p-2 text-left z-30 max-h-72 overflow-y-auto">
                {searchResults.map((w) => (
                  <div
                    key={w._id}
                    onClick={() => navigate(`/browse?search=${encodeURIComponent(w.lemma)}`)}
                    className="flex items-center justify-between p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                  >
                    <div>
                      <span className="font-bold text-xs text-slate-900 dark:text-white">
                        {w.pos === 'noun' && w.article ? `${w.lemma}, ${w.article}` : w.lemma}
                      </span>
                      <p className="text-[11px] text-slate-500 truncate max-w-xs">
                        {w.senses?.[0]?.english}
                      </p>
                    </div>
                    <Badge variant={w.cefr?.toLowerCase() || 'a1'} size="xs">
                      {w.cefr}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 3x3 Minimal Feature Grid (Vocabeo Signature Layout) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {features.map((f, i) => (
              <Link
                key={i}
                to={f.link}
                className="p-5 min-h-[115px] bg-slate-50 dark:bg-[#18191d] hover:bg-slate-100 dark:hover:bg-[#202227] border border-slate-200/80 dark:border-slate-800/80 transition-colors text-left flex flex-col justify-between group"
              >
                {/* Colored Accent Chip (Square, zero radius) */}
                <div className={`w-3.5 h-3.5 ${f.color} mb-3 opacity-90 group-hover:scale-110 transition-transform`} />
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-snug">
                  {f.boldText ? (
                    <>
                      {f.highlight} <b>{f.boldText}</b> {f.text}
                    </>
                  ) : (
                    <>
                      <b>{f.highlight}</b> {f.text}
                    </>
                  )}
                </p>
              </Link>
            ))}
          </div>

          {/* Two Primary Action Buttons (Taller height: py-4, Shorter length: w-40 sm:w-44, Zero radius) */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 pt-2">
            <Link
              to="/browse"
              className="w-40 sm:w-44 py-4 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs tracking-wider uppercase shadow-sm transition-colors text-center"
            >
              » Browse words «
            </Link>
            <Link
              to="/learn"
              className="w-40 sm:w-44 py-4 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs tracking-wider uppercase shadow-sm transition-colors text-center"
            >
              » Start learning «
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
