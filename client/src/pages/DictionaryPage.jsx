import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Search,
  Volume2,
  Sparkles,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Check,
  Bookmark,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  GraduationCap,
  Layers,
  Filter,
  BarChart3,
  Eye
} from 'lucide-react';
import { wordsApi } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import { Badge } from '../components/UI/Badge.jsx';
import { VocabeoNav } from '../components/VocabeoNav.jsx';
import { SentenceCard } from '../components/SentenceCard.jsx';
const CATEGORY_OPTIONS = [
  { id: 'all', label: 'All' },
  { id: 'body-parts', label: 'Body Parts' },
  { id: 'months', label: 'Months' },
  { id: 'numbers', label: 'Numbers' },
  { id: 'days', label: 'Days' },
  { id: 'seasons', label: 'Seasons' },
  { id: 'fruits', label: 'Fruits' },
  { id: 'vegetables', label: 'Vegetables' },
  { id: 'animals', label: 'Animals' },
  { id: 'essentials', label: 'Essentials' },
  { id: 'transportation', label: 'Transportation' },
  { id: 'food', label: 'Food' },
  { id: 'clothing', label: 'Clothing' },
  { id: 'family', label: 'Family' },
  { id: 'home', label: 'Home' },
  { id: 'weather', label: 'Weather' },
  { id: 'health', label: 'Health' },
  { id: 'work', label: 'Work' },
  { id: 'education', label: 'Education' },
  { id: 'sports', label: 'Sports' },
  { id: 'technology', label: 'Technology' },
  { id: 'nature', label: 'Nature' },
  { id: 'society', label: 'Society' },
  { id: 'emotions', label: 'Emotions' },
  { id: 'colors', label: 'Colors' },
  { id: 'basics', label: 'Basics' }
];

export function DictionaryPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user, openAuthModal, logout } = useAuth();

  // URL Query Parameters or Defaults
  const search = searchParams.get('search') || '';
  const sortBy = searchParams.get('sortBy') || 'frequency'; // 'frequency', 'alphabetical', 'dateSaved', 'nextReview'
  const status = searchParams.get('status') || 'all'; // 'all', 'saved', 'rest'
  const pos = searchParams.get('pos') || 'all'; // 'all', 'noun', 'verb', 'adjective', etc.
  const cefr = searchParams.get('cefr') || 'all'; // 'all', 'A1', 'A2', 'B1', etc.
  const category = searchParams.get('category') || 'all';

  const [searchInput, setSearchInput] = useState(search);
  const [words, setWords] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedWord, setSelectedWord] = useState(null);

  // User Saved & Mastered State
  const [savedIds, setSavedIds] = useState(new Set());
  const [masteredIds, setMasteredIds] = useState(new Set());

  // Fetch saved IDs for active user
  useEffect(() => {
    if (user) {
      wordsApi.getSavedWordIds()
        .then((res) => {
          if (res.success) {
            setSavedIds(new Set(res.savedIds));
            setMasteredIds(new Set(res.masteredIds));
          }
        })
        .catch(() => {});
    } else {
      setSavedIds(new Set());
      setMasteredIds(new Set());
    }
  }, [user]);

  // Fetch words list when filters change
  useEffect(() => {
    fetchWords();
  }, [searchParams, page]);

  const fetchWords = async () => {
    setLoading(true);
    try {
      const res = await wordsApi.getWords({
        search,
        sortBy,
        status: status === 'all' ? undefined : status,
        pos: pos === 'all' ? undefined : pos,
        cefr: cefr === 'all' ? undefined : cefr,
        topic: category === 'all' ? undefined : category,
        page,
        limit: 50,
      });

      if (res.success) {
        setWords(res.words);
        setTotal(res.total);
        setTotalPages(res.totalPages);

        // Keep current selected word or default to first in list
        if (res.words.length > 0) {
          const currentInList = selectedWord && res.words.find((w) => w._id === selectedWord._id);
          setSelectedWord(currentInList || res.words[0]);
        } else {
          setSelectedWord(null);
        }
      }
    } catch (err) {
      console.error('Error fetching words:', err);
    } finally {
      setLoading(false);
    }
  };

  // Filter Update Helpers
  const updateParam = (key, value) => {
    setSearchParams((prevParams) => {
      const nextParams = new URLSearchParams(prevParams);
      if (value && value !== 'all') {
        nextParams.set(key, value);
      } else {
        nextParams.delete(key);
      }
      return nextParams;
    });
    setPage(1);
  };

  // Sync searchInput when URL search param changes externally (e.g. navigation or clear)
  useEffect(() => {
    if (search !== searchInput) {
      setSearchInput(search);
    }
  }, [search]);

  // Live search as-you-type with debouncing (no Enter key required)
  useEffect(() => {
    const trimmedInput = searchInput.trim();
    if (trimmedInput === search) return;

    // Fast clear if input emptied, else debounce typing by 250ms
    const delay = trimmedInput === '' ? 0 : 250;
    const timer = setTimeout(() => {
      updateParam('search', trimmedInput);
    }, delay);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateParam('search', searchInput.trim());
  };

  const handleResetFilters = () => {
    setSearchInput('');
    setSearchParams(new URLSearchParams());
    setPage(1);
  };

  // Audio speech synthesis helper
  const playSpeech = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'de-DE';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Toggle Save / Trainer Queue
  const handleToggleSave = async (e, word) => {
    e.stopPropagation();
    if (!user) {
      openAuthModal('login');
      return;
    }

    const wordId = word._id;
    const isCurrentlySaved = savedIds.has(wordId) || masteredIds.has(wordId);

    // Optimistic UI update
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (isCurrentlySaved) {
        next.delete(wordId);
      } else {
        next.add(wordId);
      }
      return next;
    });

    try {
      await wordsApi.toggleSaveWord(wordId, isCurrentlySaved ? 'removed' : 'learning');
    } catch (err) {
      console.error('Failed to toggle save:', err);
    }
  };

  // Toggle Mastered Status
  const handleToggleMastered = async (e, word) => {
    e.stopPropagation();
    if (!user) {
      openAuthModal('login');
      return;
    }

    const wordId = word._id;
    const isMastered = masteredIds.has(wordId);

    setMasteredIds((prev) => {
      const next = new Set(prev);
      if (isMastered) {
        next.delete(wordId);
      } else {
        next.add(wordId);
      }
      return next;
    });

    try {
      await wordsApi.toggleSaveWord(wordId, isMastered ? 'learning' : 'mastered');
    } catch (err) {
      console.error('Failed to toggle mastered:', err);
    }
  };

  // Format lemma with article for display (Vocabeo format: "Antrag, der", "Haus, das" or "der, die, das")
  const formatLemma = (word) => {
    if (!word) return '';
    if (word.lemma === word.article || word.pos === 'article') {
      return word.lemma;
    }
    if (word.pos === 'noun' && word.article) {
      return `${word.lemma}, ${word.article}`;
    }
    return word.lemma;
  };

  // Check if a word is saved or mastered
  const isWordSaved = (id) => savedIds.has(id);
  const isWordMastered = (id) => masteredIds.has(id);

  // Parts of Speech Options matching Vocabeo
  const posOptions = [
    { label: 'All', value: 'all' },
    { label: 'Adjective', value: 'adjective' },
    { label: 'Adverb', value: 'adverb' },
    { label: 'Conjunction', value: 'conjunction' },
    { label: 'Interjection', value: 'interjection' },
    { label: 'Noun', value: 'noun' },
    { label: 'Number', value: 'numeral' },
    { label: 'Preposition', value: 'preposition' },
    { label: 'Pronoun', value: 'pronoun' },
    { label: 'Verb', value: 'verb' }
  ];

  // CEFR Levels
  const levels = ['All', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

  return (
    <div className="h-full w-full bg-white dark:bg-[#121316] text-slate-900 dark:text-slate-100 flex flex-col md:flex-row overflow-hidden select-none transition-colors">
      {/* ========================================================================= */}
      {/* 1. LEFT COLUMN: Filter & Control Sidebar                                  */}
      {/* ========================================================================= */}
      <aside className="w-full md:w-56 lg:w-60 bg-slate-50 dark:bg-[#18191d] border-r border-slate-200 dark:border-slate-800 flex flex-col shrink-0 p-4 space-y-4 overflow-y-auto">
        {/* Vocabeo Top Navigation Links */}
        <VocabeoNav active="browse" />

        {/* Search Input Box */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Search</label>
            <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">
              {total.toLocaleString()} words
            </span>
          </div>
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Live search lemma or English..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full px-3 py-2 pr-7 text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#121316] text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
            {searchInput && (
              <button
                type="button"
                onClick={() => {
                  setSearchInput('');
                  updateParam('search', '');
                }}
                title="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs px-0.5"
              >
                ✕
              </button>
            )}
          </form>
        </div>

        {/* Sort by */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
            Sort by
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            {[
              { label: 'Frequency', value: 'frequency' },
              { label: 'Alphabetically', value: 'alphabetical' },
              { label: 'Date Saved', value: 'dateSaved' },
              { label: 'Next Review', value: 'nextReview' }
            ].map((s) => (
              <button
                key={s.value}
                type="button"
                onClick={() => updateParam('sortBy', s.value)}
                className={`py-1.5 px-2 text-xs font-semibold border transition-colors ${
                  sortBy === s.value
                    ? 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-700'
                    : 'bg-white dark:bg-[#121316] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700/80 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Word Status */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
            Word Status
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { label: 'All', value: 'all', icon: null },
              { label: 'Saved', value: 'saved', icon: Sparkles },
              { label: 'Rest', value: 'rest', icon: null }
            ].map((st) => {
              const Icon = st.icon;
              return (
                <button
                  key={st.value}
                  type="button"
                  onClick={() => updateParam('status', st.value)}
                  className={`py-1.5 px-2 text-xs font-semibold border flex items-center justify-center gap-1 transition-colors ${
                    status === st.value
                      ? 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-700'
                      : 'bg-white dark:bg-[#121316] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700/80 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {Icon && <Icon className="w-3 h-3 text-amber-500" />}
                  {st.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Part of Speech */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
            Part of Speech
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            {posOptions.map((p) => (
              <button
                key={p.value}
                type="button"
                onClick={() => updateParam('pos', p.value)}
                className={`py-1.5 px-2 text-xs font-semibold border transition-colors ${
                  pos === p.value
                    ? 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-700'
                    : 'bg-white dark:bg-[#121316] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700/80 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Level */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
            Level
          </label>
          <div className="flex flex-wrap gap-1">
            {levels.map((lvl) => {
              const active = cefr === (lvl === 'All' ? 'all' : lvl);
              return (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => updateParam('cefr', lvl === 'All' ? 'all' : lvl)}
                  className={`py-1 px-2.5 text-xs font-semibold border transition-colors ${
                    active
                      ? 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-700'
                      : 'bg-white dark:bg-[#121316] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700/80 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {lvl}
                </button>
              );
            })}
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => updateParam('category', e.target.value)}
            className="w-full px-3 py-1.5 text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#121316] text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
          >
            <option value="all">All Categories ({total.toLocaleString()} words)</option>
            <optgroup label="Thematic Core Sets">
              <option value="body-parts">Body Parts & Anatomy</option>
              <option value="months">Months of the Year</option>
              <option value="numbers">Numbers & Counting</option>
              <option value="days">Days of the Week</option>
              <option value="seasons">Seasons & Calendar Time</option>
              <option value="fruits">Fruits & Berries</option>
              <option value="vegetables">Vegetables & Greens</option>
              <option value="animals">Animals & Wildlife</option>
              <option value="essentials">Essentials & Greetings</option>
              <option value="transportation">Transportation & Travel</option>
            </optgroup>
            <optgroup label="Everyday Living">
              <option value="food">Food & Dining</option>
              <option value="clothing">Clothing & Fashion</option>
              <option value="family">Family & People</option>
              <option value="home">Home & Living</option>
              <option value="colors">Colors & Shades</option>
              <option value="weather">Weather & Climate</option>
            </optgroup>
            <optgroup label="Society & Science">
              <option value="health">Health & Medicine</option>
              <option value="work">Work & Career</option>
              <option value="education">School & Education</option>
              <option value="technology">Technology & Digital</option>
              <option value="sports">Sports & Leisure</option>
              <option value="nature">Nature & Environment</option>
              <option value="society">Society, Law & Culture</option>
              <option value="emotions">Feelings & Emotions</option>
              <option value="basics">Basics & Grammar</option>
            </optgroup>
          </select>
        </div>

        {/* Reset filters button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={handleResetFilters}
            className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-semibold bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset filters
          </button>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* 2. MIDDLE COLUMN: High-Density German Word Table List (Wider layout)       */}
      {/* ========================================================================= */}
      <section className="w-full md:w-[500px] lg:w-[600px] xl:w-[700px] 2xl:w-[780px] border-r border-slate-200 dark:border-slate-800 flex flex-col shrink-0 h-full overflow-hidden bg-white dark:bg-[#15161a]">
        {/* Quick Thematic Category Tabs (Single-click category switcher) */}
        <div className="px-3 py-2 bg-slate-50 dark:bg-[#16171b] border-b border-slate-200 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
          {CATEGORY_OPTIONS.map((cat) => {
            const isCatActive = (category || 'all') === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => updateParam('category', cat.id)}
                className={`px-2.5 py-1 text-[11px] font-semibold whitespace-nowrap transition-colors border ${
                  isCatActive
                    ? 'bg-amber-400 text-black border-amber-500 shadow-sm'
                    : 'bg-white dark:bg-[#121316] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700/80 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Table Header Bar */}
        <div className="px-4 py-2.5 bg-slate-100 dark:bg-[#18191d] border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider shrink-0">
          <span className="w-[30%]">Word ({total.toLocaleString()})</span>
          <span className="w-[46%]">Meaning</span>
          <span className="w-[24%] text-right">Level / Actions</span>
        </div>

        {/* Scrollable Word Rows */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/80">
          {loading ? (
            <div className="p-12 text-center text-xs text-slate-400">Loading vocabulary...</div>
          ) : words.length === 0 ? (
            <div className="p-12 text-center text-xs text-slate-400 space-y-2">
              <p>No words match the selected filters.</p>
              <button
                onClick={handleResetFilters}
                className="text-emerald-600 dark:text-emerald-400 underline font-semibold"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            words.map((w) => {
              const isSelected = selectedWord?._id === w._id;
              const saved = isWordSaved(w._id);
              const mastered = isWordMastered(w._id);

              return (
                <div
                  key={w._id}
                  onClick={() => setSelectedWord(w)}
                  className={`px-4 py-3 flex items-center justify-between cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-amber-50 dark:bg-amber-950/40 border-l-2 border-amber-500 text-slate-900 dark:text-white'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  {/* German Word (Wider) */}
                  <div className="w-[30%] pr-3">
                    <span className="font-bold text-xs sm:text-sm leading-tight block truncate">
                      {formatLemma(w)}
                    </span>
                  </div>

                  {/* English Meaning (Much Wider) */}
                  <div className="w-[46%] pr-3">
                    <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 block truncate">
                      {w.senses?.[0]?.english || '—'}
                    </span>
                  </div>

                  {/* Level, Frequency & Action Badges (Wider with comfortable spacing) */}
                  <div className="w-[24%] flex items-center justify-end gap-2.5 sm:gap-3 shrink-0">
                    <span className="text-[11px] font-mono font-bold text-slate-400">
                      {w.cefr}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">
                      {w.frequencyRank || 4}
                    </span>

                    {/* Mastered checkmark button */}
                    <button
                      type="button"
                      onClick={(e) => handleToggleMastered(e, w)}
                      title={mastered ? 'Marked as mastered' : 'Mark as mastered'}
                      className={`p-1.5 transition-colors ${
                        mastered
                          ? 'text-emerald-600 bg-emerald-100 dark:bg-emerald-950/60'
                          : 'text-slate-400 hover:text-emerald-600'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>

                    {/* Save / Queue button (Sharp square swatch) */}
                    <button
                      type="button"
                      onClick={(e) => handleToggleSave(e, w)}
                      title={saved ? 'In your learning queue' : 'Save to review queue'}
                      className={`w-3.5 h-3.5 transition-colors ${
                        saved || mastered
                          ? 'bg-amber-500 ring-2 ring-amber-400/30'
                          : 'border border-slate-400 dark:border-slate-600 hover:border-amber-500'
                      }`}
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="px-4 py-2.5 bg-slate-100 dark:bg-[#18191d] border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>Page {page} of {totalPages}</span>
            <div className="flex gap-1">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="p-1 border border-slate-200 dark:border-slate-700 disabled:opacity-40"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="p-1 border border-slate-200 dark:border-slate-700 disabled:opacity-40"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </section>

      {/* ========================================================================= */}
      {/* 3. RIGHT COLUMN: Word Detail & Example Sentences (Vocabeo Detail Panel)   */}
      {/* ========================================================================= */}
      <main className="flex-1 h-full overflow-y-auto flex flex-col bg-white dark:bg-[#121316]">
        {/* Top Banner Notice (Matching screenshot: "Test mode - to save changes > Sign in") */}
        <div className="px-6 py-2.5 bg-amber-500/10 dark:bg-amber-500/10 border-b border-amber-200 dark:border-amber-800/60 flex items-center justify-between text-xs">
          {!user ? (
            <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-semibold">
              <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
              <span>Test mode -- to save changes and track FSRS reviews:</span>
              <button
                type="button"
                onClick={() => openAuthModal('login')}
                className="underline font-bold hover:text-amber-950 dark:hover:text-white"
              >
                Sign in »
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-semibold text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Connected as {user.name || user.email}</span>
              <button
                type="button"
                id="banner-sign-out-btn"
                onClick={logout}
                className="text-xs text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400 underline ml-2 font-normal cursor-pointer"
                title="Sign out of your account"
              >
                (Sign out)
              </button>
            </div>
          )}
          <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 font-mono text-xs">
            <span>{savedIds.size} words saved</span>
          </div>
        </div>

        {/* Word Detail Content */}
        {selectedWord ? (
          <div className="p-6 lg:p-8 space-y-6 max-w-4xl">
            {/* 1. HERO WORD CARD */}
            <div className="p-6 rounded-lg bg-slate-50/60 dark:bg-[#18191d] border border-slate-200 dark:border-slate-800 space-y-5">
              {/* Metadata row + Quick Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
                <div className="flex flex-wrap items-center gap-2">
                  {/* Part of Speech */}
                  <span className="px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    {selectedWord.pos || 'Word'}
                  </span>

                  {/* CEFR Level */}
                  <Badge variant={selectedWord.cefr?.toLowerCase() || 'a1'} size="xs">
                    {selectedWord.cefr || 'A1'}
                  </Badge>

                  {/* Frequency Rank */}
                  <span className="px-2 py-0.5 text-[11px] font-mono font-semibold text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    #{selectedWord.frequencyRank || 1} Freq
                  </span>

                  {/* Topics */}
                  {selectedWord.topics?.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => updateParam('category', t)}
                      title={`Filter by category "${t}"`}
                      className="px-2 py-0.5 text-[11px] capitalize font-medium bg-white hover:bg-amber-50 text-slate-600 hover:text-amber-700 dark:bg-slate-800 dark:hover:bg-amber-950 dark:text-slate-300 dark:hover:text-amber-300 border border-slate-200 dark:border-slate-700 transition-colors"
                    >
                      {t}
                    </button>
                  ))}
                </div>

                {/* Primary Action Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => handleToggleSave(e, selectedWord)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold border transition-colors ${
                      isWordSaved(selectedWord._id)
                        ? 'bg-amber-500/15 border-amber-600/40 text-amber-700 dark:text-amber-400 hover:bg-amber-500/25'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white border-transparent'
                    }`}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${isWordSaved(selectedWord._id) ? 'fill-current' : ''}`} />
                    {isWordSaved(selectedWord._id) ? 'In Review Queue' : 'Save to Queue'}
                  </button>

                  <button
                    type="button"
                    onClick={(e) => handleToggleMastered(e, selectedWord)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold border transition-colors ${
                      isWordMastered(selectedWord._id)
                        ? 'bg-emerald-500/15 border-emerald-600/40 text-emerald-700 dark:text-emerald-400'
                        : 'bg-white dark:bg-[#121316] text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                    {isWordMastered(selectedWord._id) ? 'Mastered' : 'Mark Mastered'}
                  </button>
                </div>
              </div>

              {/* Headword, Article, Audio, and Translation */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 flex-wrap">
                  {/* Article for nouns */}
                  {selectedWord.article && selectedWord.article !== selectedWord.lemma && (
                    <span
                      className={`text-sm font-bold uppercase tracking-wider px-2 py-0.5 border ${
                        selectedWord.article === 'der'
                          ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800'
                          : selectedWord.article === 'die'
                          ? 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/60 dark:text-red-300 dark:border-red-800'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
                      }`}
                    >
                      {selectedWord.article}
                    </span>
                  )}

                  {/* German Lemma */}
                  <h2 className="text-3xl sm:text-4xl font-extrabold font-heading tracking-tight text-slate-900 dark:text-white">
                    {selectedWord.lemma}
                  </h2>

                  {/* Pronunciation Audio Button */}
                  <button
                    type="button"
                    onClick={() => playSpeech(selectedWord.lemma)}
                    title="Pronounce with native German voice"
                    className="p-2 text-slate-500 hover:text-amber-600 hover:bg-white dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-colors"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>

                  {/* Plural info if noun */}
                  {selectedWord.plural && (
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 px-2 py-1 border border-slate-200 dark:border-slate-700">
                      Plural: <strong className="text-slate-800 dark:text-slate-200">{selectedWord.plural}</strong>
                    </span>
                  )}
                </div>

                {/* English Meanings & Definitions */}
                <div className="pt-1">
                  {selectedWord.senses?.length > 1 ? (
                    <div className="space-y-1.5">
                      {selectedWord.senses.map((s, idx) => (
                        <div key={idx} className="flex items-baseline gap-2.5 text-base text-slate-800 dark:text-slate-200">
                          <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 w-4">
                            {idx + 1}.
                          </span>
                          <span className="font-semibold">{s.english}</span>
                          {s.germanDefinition && (
                            <span className="text-xs text-slate-400 dark:text-slate-500 italic">
                              ({s.germanDefinition})
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xl sm:text-2xl font-semibold text-slate-800 dark:text-slate-200">
                      {selectedWord.senses?.[0]?.english || 'No definition available'}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* 2. AUTHENTIC EXAMPLE SENTENCES */}
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-1">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-amber-600" />
                  <span>Example Sentences</span>
                  <span className="text-[10px] font-mono text-slate-400 font-normal">
                    (Tatoeba Bilingual Corpus)
                  </span>
                </h3>
              </div>

              <div className="space-y-4 pt-3.5">
                {(selectedWord.exampleSentences?.length > 0
                  ? selectedWord.exampleSentences
                  : [
                      {
                        german: `Der ${selectedWord.lemma} ist im täglichen Leben sehr wichtig.`,
                        english: `The ${selectedWord.lemma} is very important in daily life.`,
                        highlight: selectedWord.lemma
                      }
                    ]
                ).map((ex, idx) => (
                  <SentenceCard
                    key={`${selectedWord._id}_${idx}`}
                    sentence={ex}
                    word={selectedWord}
                    index={idx}
                    onPlaySpeech={playSpeech}
                  />
                ))}
              </div>
            </div>

            {/* 3. GRAMMAR TABLES (Declension or Conjugation) */}
            {selectedWord.declension?.nominative && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-blue-600" />
                  <span>Noun Declension (4 German Cases)</span>
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                  <div className="p-3 bg-white dark:bg-[#18191d] border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block mb-1">
                      Nominativ
                    </span>
                    <p className="font-bold text-slate-900 dark:text-white text-sm">
                      {selectedWord.declension.nominative.singular || selectedWord.lemma}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      Pl: {selectedWord.declension.nominative.plural || selectedWord.plural || '—'}
                    </p>
                  </div>

                  <div className="p-3 bg-white dark:bg-[#18191d] border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 block mb-1">
                      Akkusativ
                    </span>
                    <p className="font-bold text-slate-900 dark:text-white text-sm">
                      {selectedWord.declension.accusative?.singular || selectedWord.lemma}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      Pl: {selectedWord.declension.accusative?.plural || selectedWord.plural || '—'}
                    </p>
                  </div>

                  <div className="p-3 bg-white dark:bg-[#18191d] border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block mb-1">
                      Dativ
                    </span>
                    <p className="font-bold text-slate-900 dark:text-white text-sm">
                      {selectedWord.declension.dative?.singular || selectedWord.lemma}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      Pl: {selectedWord.declension.dative?.plural || selectedWord.plural || '—'}
                    </p>
                  </div>

                  <div className="p-3 bg-white dark:bg-[#18191d] border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 block mb-1">
                      Genitiv
                    </span>
                    <p className="font-bold text-slate-900 dark:text-white text-sm">
                      {selectedWord.declension.genitive?.singular || selectedWord.lemma}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      Pl: {selectedWord.declension.genitive?.plural || selectedWord.plural || '—'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Verb Conjugation */}
            {selectedWord.conjugation?.present && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
                  <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verb Conjugation (Präsens)</span>
                </h4>
                <div className="p-3.5 bg-white dark:bg-[#18191d] border border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                    <div className="p-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                      <span className="text-slate-400">ich:</span>{' '}
                      <strong className="text-slate-900 dark:text-white">
                        {selectedWord.conjugation.present.ich}
                      </strong>
                    </div>
                    <div className="p-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                      <span className="text-slate-400">du:</span>{' '}
                      <strong className="text-slate-900 dark:text-white">
                        {selectedWord.conjugation.present.du}
                      </strong>
                    </div>
                    <div className="p-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                      <span className="text-slate-400">er/sie/es:</span>{' '}
                      <strong className="text-slate-900 dark:text-white">
                        {selectedWord.conjugation.present.erSieEs}
                      </strong>
                    </div>
                    <div className="p-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                      <span className="text-slate-400">wir:</span>{' '}
                      <strong className="text-slate-900 dark:text-white">
                        {selectedWord.conjugation.present.wir}
                      </strong>
                    </div>
                    <div className="p-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                      <span className="text-slate-400">ihr:</span>{' '}
                      <strong className="text-slate-900 dark:text-white">
                        {selectedWord.conjugation.present.ihr}
                      </strong>
                    </div>
                    <div className="p-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                      <span className="text-slate-400">sie/Sie:</span>{' '}
                      <strong className="text-slate-900 dark:text-white">
                        {selectedWord.conjugation.present.sieSie}
                      </strong>
                    </div>
                  </div>

                  {selectedWord.conjugation.perfektParticiple && (
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-xs flex items-center gap-3 text-slate-500">
                      <span>
                        Hilfsverb: <strong className="text-slate-900 dark:text-white">{selectedWord.conjugation.auxiliary || 'haben'}</strong>
                      </span>
                      <span>•</span>
                      <span>
                        Partizip II: <strong className="text-slate-900 dark:text-white">{selectedWord.conjugation.perfektParticiple}</strong>
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center p-12 text-center text-slate-400">
            <div className="space-y-2">
              <BookOpen className="w-8 h-8 mx-auto text-slate-400" />
              <p className="text-sm">Select any word from the list to view its complete entry.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
