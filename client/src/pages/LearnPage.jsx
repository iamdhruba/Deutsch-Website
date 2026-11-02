import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  BookOpen,
  BarChart3,
  Volume2,
  RotateCcw,
  Check,
  CheckCircle2,
  X,
  Lightbulb,
  GraduationCap,
  Sparkles,
  ArrowRight,
  ChevronRight,
  MoreVertical,
  HelpCircle,
  Flame,
  Award
} from 'lucide-react';
import { wordsApi } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import { Badge } from '../components/UI/Badge.jsx';
import { VocabeoNav } from '../components/VocabeoNav.jsx';
import { GermanSentenceWord } from '../components/GermanSentenceWord.jsx';

// Curated high-quality cultural visual anchors for German vocabulary immersion
const CULTURAL_IMAGES = [
  'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=700&q=80', // European train & viaduct (like Vocabeo's banner)
  'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=700&q=80', // German historic architecture
  'https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?auto=format&fit=crop&w=700&q=80', // Berlin Brandenburg gate
  'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=700&q=80', // Black Forest landscape
  'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=700&q=80', // Library & books
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=700&q=80', // Coffee & conversation
];

export function LearnPage() {
  const navigate = useNavigate();
  const { user, openAuthModal, progress } = useAuth();

  // Color themes matching Vocabeo
  const themeColors = [
    { name: 'Amber', id: 'amber', bg: 'bg-amber-600', text: 'text-amber-600', ring: 'ring-amber-500' },
    { name: 'Blue', id: 'blue', bg: 'bg-blue-600', text: 'text-blue-600', ring: 'ring-blue-500' },
    { name: 'Emerald', id: 'emerald', bg: 'bg-emerald-600', text: 'text-emerald-600', ring: 'ring-emerald-500' },
    { name: 'Rose', id: 'rose', bg: 'bg-rose-600', text: 'text-rose-600', ring: 'ring-rose-500' },
    { name: 'Indigo', id: 'indigo', bg: 'bg-indigo-600', text: 'text-indigo-600', ring: 'ring-indigo-500' },
    { name: 'Slate', id: 'slate', bg: 'bg-slate-700', text: 'text-slate-700', ring: 'ring-slate-500' },
  ];
  const [activeColor, setActiveColor] = useState('amber');

  // Review Queue state
  const [loading, setLoading] = useState(true);
  const [queue, setQueue] = useState([]);
  const [stats, setStats] = useState({ dueCount: 0, newCount: 0, totalLearning: 0 });

  // Active Session state
  const [sessionActive, setSessionActive] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [audioSpeed, setAudioSpeed] = useState(1.0); // 1.0, 1.25, 1.5
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [sessionDone, setSessionDone] = useState(false);
  const [sentenceHovered, setSentenceHovered] = useState(false);
  const [wordHovered, setWordHovered] = useState(false);

  useEffect(() => {
    setSentenceHovered(false);
    setWordHovered(false);
  }, [currentIndex, sentenceIndex]);
  const [sessionSummary, setSessionSummary] = useState({
    totalReviewed: 0,
    repeatCount: 0,
    hardCount: 0,
    goodCount: 0,
    easyCount: 0,
    knownCount: 0,
    xpEarned: 0,
  });

  // Load review queue from server
  const fetchQueue = useCallback(async () => {
    setLoading(true);
    try {
      const res = await wordsApi.getReviewQueue();
      if (res.success) {
        setQueue(res.queue || []);
        setStats(res.stats || { dueCount: 0, newCount: 0, totalLearning: 0 });
      }
    } catch (err) {
      console.error('Failed to load review queue:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQueue();
  }, [fetchQueue, user]);

  // Current Card Data
  const currentCard = queue[currentIndex] || null;
  const currentWord = currentCard?.word || null;

  // Selected example sentence for current word
  const activeSentence =
    currentWord?.exampleSentences && currentWord.exampleSentences.length > 0
      ? currentWord.exampleSentences[sentenceIndex % currentWord.exampleSentences.length]
      : {
          german: currentWord?.lemma ? `Das ist ein Beispiel für ${currentWord.lemma}.` : '',
          english: currentWord?.senses?.[0]?.english ? `This is an example for ${currentWord.senses[0].english}.` : '',
          highlight: currentWord?.lemma || '',
        };

  // Cloze Sentence Splitter: Replaces target lemma in German sentence with blank
  const renderClozeGerman = (sentence, word, revealed) => {
    if (!sentence?.german) return null;

    const germanText = sentence.german;
    const target = (sentence.highlight || word?.lemma || '').toLowerCase();

    // When revealed, every word in the German sentence has Vocabeo hover popover
    if (revealed || !target) {
      const tokens = germanText.split(/([ \t\n\r]+|[.,!?;:«»„“"()]+)/);
      return (
        <span className="text-base sm:text-lg leading-relaxed">
          {tokens.map((token, i) => {
            if (!token) return null;
            if (/^[ \t\n\r.,!?;:«»„“"()]+$/.test(token)) {
              return <span key={i}>{token}</span>;
            }
            const clean = token.replace(/^[.,!?;:«»„“"()]+|[.,!?;:«»„“"()]+$/g, '');
            const isTarget = Boolean(target && clean.toLowerCase() === target);
            return (
              <GermanSentenceWord
                key={i}
                word={token}
                isTarget={isTarget}
                targetWordObj={word}
                onPlaySpeech={speakGerman}
              />
            );
          })}
        </span>
      );
    }

    // When not yet revealed: target word is cloze ______, while other words are interactive
    const regex = new RegExp(`(${target.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi');
    const parts = germanText.split(regex);

    return (
      <span className="text-base sm:text-lg leading-relaxed">
        {parts.map((part, i) => {
          if (part.toLowerCase() === target) {
            return (
              <span
                key={i}
                className="inline-block border-b-2 border-slate-400 dark:border-slate-500 px-3 mx-1 font-mono text-slate-400"
              >
                ______
              </span>
            );
          }

          // Other words in the clue sentence
          const tokens = part.split(/([ \t\n\r]+|[.,!?;:«»„“"()]+)/);
          return (
            <React.Fragment key={i}>
              {tokens.map((token, j) => {
                if (!token) return null;
                if (/^[ \t\n\r.,!?;:«»„“"()]+$/.test(token)) {
                  return <span key={j}>{token}</span>;
                }
                return (
                  <GermanSentenceWord
                    key={j}
                    word={token}
                    isTarget={false}
                    targetWordObj={word}
                    onPlaySpeech={speakGerman}
                  />
                );
              })}
            </React.Fragment>
          );
        })}
      </span>
    );
  };

  // German Speech Synthesis (TTS)
  const speakGerman = (text, rate = audioSpeed) => {
    if (!window.speechSynthesis || !text) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'de-DE';
    utterance.rate = rate;
    window.speechSynthesis.speak(utterance);
  };

  // Auto-play audio when answer is revealed
  useEffect(() => {
    if (sessionActive && showAnswer && activeSentence?.german) {
      speakGerman(activeSentence.german, audioSpeed);
    }
  }, [showAnswer]);

  // Start learning session
  const handleStartLearning = () => {
    if (queue.length === 0) return;
    setCurrentIndex(0);
    setShowAnswer(false);
    setSentenceIndex(0);
    setSessionDone(false);
    setSessionActive(true);
  };

  // Exit active session back to dashboard
  const handleExitSession = () => {
    setSessionActive(false);
    setShowAnswer(false);
  };

  // Reveal Solution
  const handleRevealSolution = () => {
    setShowAnswer(true);
  };

  // Submit Rating
  const handleRate = async (rating) => {
    if (!currentWord) return;

    const wordId = currentWord._id;
    let earned = 10;
    if (rating === 4) earned = 15;
    else if (rating === 3) earned = 10;
    else if (rating === 2) earned = 7;
    else if (rating === 1) earned = 4;
    else if (rating === 'known') earned = 20;

    // Call API to record review
    try {
      await wordsApi.submitReview(wordId, rating);
    } catch (err) {
      console.warn('Review API fallback (recorded locally):', err.message);
    }

    // Update Session Summary
    setSessionSummary((prev) => ({
      ...prev,
      totalReviewed: prev.totalReviewed + 1,
      repeatCount: rating === 1 ? prev.repeatCount + 1 : prev.repeatCount,
      hardCount: rating === 2 ? prev.hardCount + 1 : prev.hardCount,
      goodCount: rating === 3 ? prev.goodCount + 1 : prev.goodCount,
      easyCount: rating === 4 ? prev.easyCount + 1 : prev.easyCount,
      knownCount: rating === 'known' ? prev.knownCount + 1 : prev.knownCount,
      xpEarned: prev.xpEarned + earned,
    }));

    // If 'Repeat' (1), keep card in queue by pushing to end of session
    if (rating === 1) {
      setQueue((prev) => [...prev, currentCard]);
    }

    // Move to next card
    if (currentIndex + 1 < queue.length) {
      setCurrentIndex((prev) => prev + 1);
      setShowAnswer(false);
      setSentenceIndex(0);
    } else {
      setSessionDone(true);
    }
  };

  // Keyboard Shortcuts (Vocabeo standard: Space, 1, 2, 3, 4, K, Esc)
  useEffect(() => {
    if (!sessionActive || sessionDone) return;

    const handleKeyDown = (e) => {
      // Avoid hotkeys when typing in an input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.code === 'Space') {
        e.preventDefault();
        if (!showAnswer) {
          handleRevealSolution();
        } else {
          handleRate(3); // Default spacebar rating on revealed answer is Good
        }
      } else if (e.key === '1' && showAnswer) {
        e.preventDefault();
        handleRate(1);
      } else if (e.key === '2' && showAnswer) {
        e.preventDefault();
        handleRate(2);
      } else if (e.key === '3' && showAnswer) {
        e.preventDefault();
        handleRate(3);
      } else if (e.key === '4' && showAnswer) {
        e.preventDefault();
        handleRate(4);
      } else if ((e.key === 'k' || e.key === 'K') && showAnswer) {
        e.preventDefault();
        handleRate('known');
      } else if (e.key === 'a' || e.key === 'A') {
        e.preventDefault();
        if (activeSentence?.german) speakGerman(activeSentence.german, audioSpeed);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        handleExitSession();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [sessionActive, showAnswer, sessionDone, activeSentence, currentIndex, queue]);

  // Visual image for current card
  const cardImage = CULTURAL_IMAGES[currentIndex % CULTURAL_IMAGES.length];

  // =========================================================================
  // VIEW A: ACTIVE FLASHCARD REVIEW SESSION (Crisp, Taller, Narrower)
  // =========================================================================
  if (sessionActive && !sessionDone) {
    const progressPercent = Math.round(((currentIndex + 1) / queue.length) * 100);

    return (
      <div className="h-full w-full overflow-y-auto bg-slate-50 dark:bg-[#121316] text-slate-900 dark:text-slate-100 flex flex-col items-center justify-between p-4 sm:p-8 select-none transition-colors">
        {/* Top Header / Progress Bar (Shorter length, zero radius) */}
        <div className="w-full max-w-sm flex items-center justify-between gap-4 py-2">
          <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
            {currentIndex + 1}/{queue.length}
          </span>
          <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-amber-600 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSentenceIndex((prev) => prev + 1)}
              title="Next example sentence"
              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 text-xs"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={handleExitSession}
              title="Exit review session"
              className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-slate-200 dark:hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Center Flashcard Container (Shorter length: max-w-[340px], Taller height: min-h-[500px]) */}
        <div className="w-full max-w-[340px] sm:max-w-[350px] flex flex-col items-center text-center my-auto py-10 space-y-7 min-h-[500px] justify-center">
          {/* Cultural Context Photo (Taller height: h-60/h-64, Shorter length/width: w-48/w-52, Zero border radius) */}
          <div className="w-48 h-60 sm:w-52 sm:h-64 overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm bg-slate-200 dark:bg-slate-800 shrink-0">
            <img
              src={cardImage}
              alt="Contextual concept"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* English Sense Prompt */}
          <div className="flex items-center justify-center gap-2 text-sm sm:text-base font-medium text-slate-700 dark:text-slate-300">
            <span className="w-1 h-4 bg-amber-600 inline-block" />
            <span>{currentWord?.senses?.[0]?.english || 'Translation prompt'}</span>
          </div>

          {/* German Cloze Sentence & Translation with Hover Tooltip */}
          <div className="space-y-2.5 px-1 max-w-[320px]">
            <div className="text-slate-900 dark:text-white font-medium">
              {renderClozeGerman(activeSentence, currentWord, showAnswer)}
            </div>
            <div className="text-xs sm:text-sm italic text-slate-500 dark:text-slate-400">
              {activeSentence?.english}
            </div>
          </div>

          {/* Test mode / Cloud sync badge (Sharp rectangular chip, zero radius) */}
          <div>
            {!user ? (
              <span className="px-3 py-1 text-[10px] font-bold tracking-wider uppercase bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                » test mode «
              </span>
            ) : (
              <span className="px-3 py-1 text-[10px] font-bold tracking-wider uppercase bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                FSRS Synced
              </span>
            )}
          </div>

          {/* Action Control: Solution vs FSRS Rating Buttons (Taller height: py-4, Shorter length: w-36 sm:w-40) */}
          <div className="w-full space-y-4 pt-1">
            {!showAnswer ? (
              <button
                onClick={handleRevealSolution}
                className="w-36 sm:w-40 py-4 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs tracking-wider uppercase shadow-sm transition-colors mx-auto block"
              >
                Solution
              </button>
            ) : (
              <div className="flex items-center justify-center gap-2 flex-wrap max-w-[320px] mx-auto">
                {/* 1. Repeat */}
                <button
                  onClick={() => handleRate(1)}
                  title="Repeat at end of session (Key: 1)"
                  className="px-3 py-3.5 bg-white dark:bg-[#18191d] hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold border border-slate-300 dark:border-slate-700 shadow-sm flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                  <span>Repeat</span>
                </button>

                {/* 2. Hard */}
                <button
                  onClick={() => handleRate(2)}
                  title="Hard - 1.2x interval (Key: 2)"
                  className="px-3.5 py-3.5 bg-white dark:bg-[#18191d] hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold border border-slate-300 dark:border-slate-700 shadow-sm transition-colors"
                >
                  Hard
                </button>

                {/* 3. Good (Default highlighted) */}
                <button
                  onClick={() => handleRate(3)}
                  title="Good - 2.4x interval (Key: 3 / Space)"
                  className="px-4.5 py-3.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-sm border border-amber-600 transition-colors"
                >
                  Good
                </button>

                {/* 4. Easy */}
                <button
                  onClick={() => handleRate(4)}
                  title="Easy - 3.6x interval (Key: 4)"
                  className="px-3.5 py-3.5 bg-white dark:bg-[#18191d] hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold border border-slate-300 dark:border-slate-700 shadow-sm transition-colors"
                >
                  Easy
                </button>

                {/* 5. Known */}
                <button
                  onClick={() => handleRate('known')}
                  title="Mark Known - Master word immediately (Key: K)"
                  className="p-3.5 bg-white dark:bg-[#18191d] hover:bg-amber-50 dark:hover:bg-amber-950/40 text-amber-600 border border-slate-300 dark:border-slate-700 shadow-sm transition-colors"
                >
                  <Lightbulb className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Audio Controls Row */}
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => speakGerman(activeSentence.german, audioSpeed)}
                className="text-amber-600 hover:text-amber-700 dark:text-amber-400 p-1"
                title="Play pronunciation (Key: A)"
              >
                <Volume2 className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400">
                <button
                  onClick={() => {
                    setAudioSpeed(0.85);
                    speakGerman(activeSentence.german, 0.85);
                  }}
                  className={`px-1.5 py-0.5 ${audioSpeed === 0.85 ? 'bg-amber-100 dark:bg-amber-950 font-black' : ''}`}
                >
                  ›
                </button>
                <button
                  onClick={() => {
                    setAudioSpeed(1.0);
                    speakGerman(activeSentence.german, 1.0);
                  }}
                  className={`px-1.5 py-0.5 ${audioSpeed === 1.0 ? 'bg-amber-100 dark:bg-amber-950 font-black' : ''}`}
                >
                  ››
                </button>
                <button
                  onClick={() => {
                    setAudioSpeed(1.25);
                    speakGerman(activeSentence.german, 1.25);
                  }}
                  className={`px-1.5 py-0.5 ${audioSpeed === 1.25 ? 'bg-amber-100 dark:bg-amber-950 font-black' : ''}`}
                >
                  ›››
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Character Helpers & Shortcuts (Zero border radius) */}
        <div className="w-full max-w-md flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-200 dark:border-slate-800 text-xs">
          {/* German Characters Quick Helper (Sharp square keys) */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {['ä', 'Ä', 'ö', 'Ö', 'ü', 'Ü', 'ß'].map((char) => (
              <button
                key={char}
                onClick={() => speakGerman(char)}
                className="w-8 h-8 flex items-center justify-center border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#18191d] hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold text-slate-700 dark:text-slate-300"
              >
                {char}
              </button>
            ))}
          </div>

          {/* Shortcuts Tooltip */}
          <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 font-mono text-[11px]">
            <span className="px-2 py-1 bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-sans font-bold text-[10px]">
              Shortcuts
            </span>
            <span>Space: Solution · 1-4: Rate</span>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW B: SESSION COMPLETE SUMMARY (Shorter length, Taller height, Zero Radius)
  // =========================================================================
  if (sessionDone) {
    return (
      <div className="h-full w-full overflow-y-auto bg-white dark:bg-[#121316] text-slate-900 dark:text-slate-100 flex items-center justify-center p-4">
        <div className="max-w-[340px] w-full py-16 px-6 bg-slate-50 dark:bg-[#18191d] border border-slate-200 dark:border-slate-800 shadow-sm text-center space-y-8 min-h-[520px] flex flex-col justify-between">
          <div className="w-16 h-16 bg-amber-100 dark:bg-amber-950 text-amber-600 flex items-center justify-center mx-auto">
            <GraduationCap className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
              Session Complete!
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              You reviewed {sessionSummary.totalReviewed} vocabulary words with FSRS spaced repetition.
            </p>
          </div>

          {/* Score & Summary Details */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-3 bg-white dark:bg-[#121316] border border-slate-200 dark:border-slate-800">
              <span className="block font-black text-amber-600 text-lg">+{sessionSummary.xpEarned}</span>
              <span className="text-[11px] text-slate-500">XP Gained</span>
            </div>
            <div className="p-3 bg-white dark:bg-[#121316] border border-slate-200 dark:border-slate-800">
              <span className="block font-black text-emerald-600 text-lg">{sessionSummary.goodCount + sessionSummary.easyCount}</span>
              <span className="text-[11px] text-slate-500">Remembered</span>
            </div>
            <div className="p-3 bg-white dark:bg-[#121316] border border-slate-200 dark:border-slate-800">
              <span className="block font-black text-blue-600 text-lg">{sessionSummary.knownCount}</span>
              <span className="text-[11px] text-slate-500">Mastered</span>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <button
              onClick={() => {
                setSessionDone(false);
                setSessionActive(false);
                fetchQueue();
              }}
              className="w-full py-4 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs tracking-wider uppercase transition-colors"
            >
              Return to Trainer
            </button>
            <Link
              to="/browse"
              className="block w-full py-3.5 bg-white dark:bg-[#121316] hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs tracking-wider uppercase transition-colors"
            >
              Add More Words
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW C: VOCABEO-MATCHING MAIN TRAINER DASHBOARD (Shorter length, Taller height)
  // =========================================================================
  return (
    <div className="h-full w-full bg-white dark:bg-[#121316] text-slate-900 dark:text-slate-100 flex flex-col md:flex-row overflow-hidden select-none transition-colors">
      {/* 1. LEFT SIDEBAR NAVIGATION (Zero border radius) */}
      <aside className="w-full md:w-56 lg:w-60 bg-slate-50 dark:bg-[#18191d] border-r border-slate-200 dark:border-slate-800 flex flex-col shrink-0 p-4 space-y-4 overflow-y-auto">
        {/* Vocabeo Top Navigation Links */}
        <VocabeoNav active="learn" />

        {/* Quick Review Stats Panel */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Review Status
          </label>
          <div className="space-y-1.5 text-xs">
            <div className="flex items-center justify-between p-2.5 bg-white dark:bg-[#121316] border border-slate-200 dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-400">Due Today</span>
              <span className="font-bold text-amber-600">{stats.dueCount}</span>
            </div>
            <div className="flex items-center justify-between p-2.5 bg-white dark:bg-[#121316] border border-slate-200 dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-400">Total in Learning</span>
              <span className="font-bold text-slate-900 dark:text-white">{stats.totalLearning}</span>
            </div>
            <div className="flex items-center justify-between p-2.5 bg-white dark:bg-[#121316] border border-slate-200 dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-400">Current Streak</span>
              <span className="font-bold text-emerald-600 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                {progress?.streak?.currentStreak || 0} days
              </span>
            </div>
          </div>
        </div>

        {/* Navigation back to dictionary */}
        <div className="pt-4 mt-auto border-t border-slate-200 dark:border-slate-800">
          <Link
            to="/browse"
            className="flex items-center justify-center gap-1.5 w-full py-2.5 bg-white dark:bg-[#121316] hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition-colors"
          >
            <span>+ Add words to queue</span>
          </Link>
        </div>
      </aside>

      {/* 2. MAIN CENTER CONTENT: SHORTER LENGTH + TALLER HEIGHT */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-8 flex flex-col items-center justify-start space-y-8">
        {/* Main Trainer Action Card (Shorter length: max-w-[340px] sm:max-w-[350px], Taller height: min-h-[500px], Zero Radius) */}
        <div className="w-full max-w-[340px] sm:max-w-[350px] bg-white dark:bg-[#18191d] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden text-center min-h-[500px] flex flex-col justify-between">
          {/* Top Banner (Vocabeo Signature) */}
          <div className="bg-amber-50 dark:bg-amber-950/40 border-b border-amber-200 dark:border-amber-900/50 px-4 py-3 text-xs font-semibold text-amber-800 dark:text-amber-300 flex items-center justify-center gap-2">
            {!user ? (
              <>
                <span>Test mode ~ to save your progress</span>
                <button
                  onClick={() => openAuthModal('login')}
                  className="font-bold underline hover:text-amber-950 dark:hover:text-amber-100"
                >
                  » Sign in
                </button>
              </>
            ) : (
              <span>Logged in as <b>{user.name}</b> ~ Cloud FSRS Enabled</span>
            )}
          </div>

          <div className="py-20 px-6 space-y-10 my-auto">
            {/* Word Queue Counter / Status */}
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2 text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                {queue.length > 0 ? (
                  <>
                    <span><b>{queue.length}</b> words to review</span>
                    <GraduationCap className="w-7 h-7 text-amber-600" />
                  </>
                ) : (
                  <>
                    <span><b>No</b> words to review</span>
                    <GraduationCap className="w-7 h-7 text-amber-600" />
                  </>
                )}
              </div>
            </div>

            {/* Start Learning / Add Words Buttons (Taller height: py-4, Shorter length: max-w-[240px]) */}
            <div className="space-y-3.5 max-w-[240px] mx-auto">
              <button
                onClick={handleStartLearning}
                disabled={queue.length === 0}
                className="w-full py-4 bg-amber-600 hover:bg-amber-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-xs tracking-wider uppercase shadow-sm transition-colors"
              >
                » Start learning «
              </button>

              <Link
                to="/browse"
                className="block w-full py-4 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs tracking-wider uppercase shadow-sm transition-colors text-center"
              >
                Add words
              </Link>
            </div>
          </div>
          <div className="h-2" />
        </div>

        {/* Favorite Color Theme Picker (Sharp square color swatches, Zero Radius) */}
        <div className="flex items-center gap-2.5 text-xs text-slate-600 dark:text-slate-400">
          <span>Set your favorite color</span>
          <div className="flex items-center gap-2">
            {themeColors.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveColor(t.id)}
                className={`w-4 h-4 ${t.bg} transition-transform ${
                  activeColor === t.id ? 'scale-125 ring-2 ring-offset-2 ring-slate-400' : 'opacity-80 hover:opacity-100'
                }`}
                title={t.name}
              />
            ))}
          </div>
        </div>

        {/* Rating Options & FSRS Algorithm Guide (Shorter length: max-w-[340px] sm:max-w-[350px], Zero Radius) */}
        <div className="w-full max-w-[340px] sm:max-w-[350px] space-y-4 text-xs text-slate-600 dark:text-slate-400 pb-12">
          <h3 className="text-sm font-bold text-amber-600 dark:text-amber-500">
            Rating options
          </h3>
          <p className="leading-relaxed">
            Each word has its own time interval that determines the date of the next review.
            Your rating affects how the interval changes over time.
          </p>

          <div className="space-y-4 pt-2">
            <div className="flex items-start gap-4">
              <span className="w-16 font-bold text-amber-600 shrink-0">Repeat</span>
              <p className="leading-relaxed">
                The word will show up again at the end of the session. Repeating does not alter the interval.
              </p>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-16 font-bold text-amber-600 shrink-0 leading-tight">
                Hard<br />Good<br />Easy
              </div>
              <p className="leading-relaxed">
                The interval is multiplied by the respective factor (1.2 / 2.4 / 3.6).
              </p>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-16 shrink-0 flex items-center justify-start text-amber-600">
                <div className="w-6 h-6 bg-amber-600 text-white flex items-center justify-center">
                  <Lightbulb className="w-4 h-4" />
                </div>
              </div>
              <p className="leading-relaxed">
                Words that do not need to be learned because they are just too easy can be marked as <b>"KNOWN"</b>.
                They won't show up in the learning cycle but will be counted in the statistics.
              </p>
            </div>
          </div>

          <p className="pt-2 leading-relaxed text-slate-500 dark:text-slate-400">
            The start interval of a newly added word is 10h. So if rated 'Good' on the first review the word will
            show up again after 24h (= 10h * 2.4). If rated 'Good' again on the second review the interval will
            increase to ~58h. And so on.
          </p>
        </div>
      </main>
    </div>
  );
}
