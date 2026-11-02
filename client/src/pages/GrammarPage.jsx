import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  FileText,
  AlertTriangle,
  Search,
  Filter,
  Check,
  RotateCcw
} from 'lucide-react';
import { marked } from 'marked';
import { grammarApi } from '../services/api.js';
import { Badge } from '../components/UI/Badge.jsx';
import { VocabeoNav } from '../components/VocabeoNav.jsx';

export function GrammarPage() {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Interactive Quiz state
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    setLoading(true);
    try {
      const res = await grammarApi.getTopics();
      if (res.success && res.topics?.length > 0) {
        setTopics(res.topics);
        loadTopicDetails(res.topics[0].slug);
      }
    } catch (err) {
      console.error('Error fetching grammar topics:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadTopicDetails = async (slug) => {
    try {
      const res = await grammarApi.getTopicBySlug(slug);
      if (res.success) {
        setSelectedTopic(res.topic);
        setExercises(res.exercises || []);
        // Reset quiz state
        setExerciseIndex(0);
        setUserAnswer('');
        setQuizSubmitted(false);
      }
    } catch (err) {
      console.error('Error loading topic details:', err);
    }
  };

  // Filter topics by CEFR and Search query
  const filteredTopics = topics.filter((t) => {
    const matchesLevel = selectedLevel === 'All' || t.level === selectedLevel;
    const matchesSearch =
      !searchQuery.trim() ||
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  const currentExercise = exercises[exerciseIndex] || null;

  const handleCheckAnswer = (choice) => {
    if (quizSubmitted) return;
    const answer = choice !== undefined ? choice : userAnswer.trim();
    const correct =
      currentExercise &&
      answer.toLowerCase() === currentExercise.correctAnswer?.toLowerCase();
    setIsCorrect(correct);
    setQuizSubmitted(true);
  };

  return (
    <div className="h-full w-full bg-white dark:bg-[#121316] text-slate-900 dark:text-slate-100 flex flex-col md:flex-row overflow-hidden select-none transition-colors">
      {/* ========================================================================= */}
      {/* 1. LEFT COLUMN: Filter & Control Sidebar                                  */}
      {/* ========================================================================= */}
      <aside className="w-full md:w-56 lg:w-60 bg-slate-50 dark:bg-[#18191d] border-r border-slate-200 dark:border-slate-800 flex flex-col shrink-0 p-4 space-y-4 overflow-y-auto">
        <VocabeoNav active="grammar" />

        {/* Search Input Box */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Search</label>
            <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">
              {filteredTopics.length} topics
            </span>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search grammar topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#121316] text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* CEFR Level Filter */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
            CEFR Level
          </label>
          <div className="grid grid-cols-5 gap-1">
            {['All', 'A1', 'A2', 'B1', 'B2'].map((lvl) => {
              const active = selectedLevel === lvl;
              return (
                <button
                  key={lvl}
                  onClick={() => setSelectedLevel(lvl)}
                  className={`py-1 text-xs font-bold border transition-colors ${
                    active
                      ? 'border-amber-600 bg-amber-600 text-white shadow-sm'
                      : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-[#121316] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {lvl}
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Categories Help */}
        <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-1 text-xs text-slate-500 dark:text-slate-400">
          <p className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
            Curriculum Scope
          </p>
          <p className="text-[11px] leading-tight">
            Complete explanations with declension tables, modal verbs, sentence word order, passive voice, and Konjunktiv II.
          </p>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* 2. MIDDLE COLUMN: Topic List Table                                        */}
      {/* ========================================================================= */}
      <section className="w-full md:w-72 lg:w-80 bg-white dark:bg-[#141518] border-r border-slate-200 dark:border-slate-800 flex flex-col shrink-0 overflow-y-auto">
        <div className="p-3 bg-slate-50 dark:bg-[#18191d] border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
          <span>Topics</span>
          <span>Level</span>
        </div>

        {loading ? (
          <div className="p-6 text-center text-xs text-slate-400">Loading topics...</div>
        ) : filteredTopics.length === 0 ? (
          <div className="p-6 text-center text-xs text-slate-400">No topics match filters</div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
            {filteredTopics.map((t) => {
              const isSelected = selectedTopic?.slug === t.slug;
              return (
                <div
                  key={t._id}
                  onClick={() => loadTopicDetails(t.slug)}
                  className={`p-3.5 cursor-pointer transition-colors text-left flex items-start justify-between gap-2 ${
                    isSelected
                      ? 'bg-amber-500/10 dark:bg-amber-500/15 border-l-4 border-amber-600'
                      : 'hover:bg-slate-50 dark:hover:bg-[#18191d]'
                  }`}
                >
                  <div className="space-y-1 pr-1">
                    <h4
                      className={`text-xs font-bold leading-tight ${
                        isSelected
                          ? 'text-amber-700 dark:text-amber-400'
                          : 'text-slate-900 dark:text-slate-100'
                      }`}
                    >
                      {t.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 line-clamp-1">
                      {t.summary}
                    </p>
                  </div>
                  <Badge variant={t.level?.toLowerCase() || 'a1'} size="xs">
                    {t.level}
                  </Badge>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ========================================================================= */}
      {/* 3. RIGHT COLUMN: Topic Detail & Interactive Practice                      */}
      {/* ========================================================================= */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-8 bg-white dark:bg-[#121316]">
        {selectedTopic ? (
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Header Banner */}
            <div className="border-b border-slate-200 dark:border-slate-800 pb-4 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant={selectedTopic.level?.toLowerCase() || 'a1'}>
                    Level {selectedTopic.level}
                  </Badge>
                  <span className="text-[11px] font-bold px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 uppercase tracking-wide border border-slate-200 dark:border-slate-700">
                    {selectedTopic.category}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black font-heading text-slate-900 dark:text-white">
                  {selectedTopic.title}
                </h2>
              </div>
            </div>

            {/* Markdown Lesson Content */}
            <div
              className="markdown-content text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed overflow-x-auto"
              dangerouslySetInnerHTML={{
                __html: marked.parse(selectedTopic.contentMarkdown || '')
              }}
            />

            {/* Common Mistakes & Pitfalls */}
            {selectedTopic.commonMistakes?.length > 0 && (
              <div className="p-4 bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 space-y-3">
                <h4 className="font-bold text-xs text-amber-900 dark:text-amber-200 flex items-center gap-2 uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                  Common Pitfalls & Mistakes
                </h4>
                <div className="space-y-2.5">
                  {selectedTopic.commonMistakes.map((m, idx) => (
                    <div key={idx} className="text-xs space-y-0.5">
                      <p className="text-red-600 dark:text-red-400 font-semibold line-through">
                        {m.mistake}
                      </p>
                      <p className="text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        {m.correction}
                      </p>
                      <p className="text-slate-600 dark:text-slate-400 italic text-[11px]">
                        {m.explanation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Cheat Sheet Summary */}
            {selectedTopic.cheatSheet?.keyRules?.length > 0 && (
              <div className="p-4 bg-slate-50 dark:bg-[#18191d] border border-slate-200 dark:border-slate-800 space-y-2">
                <h4 className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5 uppercase tracking-wider">
                  <FileText className="w-4 h-4 text-amber-600" /> Key Rules Summary
                </h4>
                <ul className="list-disc pl-5 text-xs text-slate-600 dark:text-slate-300 space-y-1">
                  {selectedTopic.cheatSheet.keyRules.map((rule, idx) => (
                    <li key={idx}>{rule}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Interactive Exercise Card */}
            {currentExercise && (
              <div className="p-5 bg-slate-50 dark:bg-[#18191d] border border-slate-200 dark:border-slate-800 space-y-4">
                <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                  <span className="uppercase tracking-wider">Interactive Drill</span>
                  <span>Exercise {exerciseIndex + 1} of {exercises.length}</span>
                </div>

                <div className="text-sm font-semibold text-slate-900 dark:text-white">
                  {currentExercise.prompt}
                </div>

                {/* Multiple Choice Options or Text Input */}
                {currentExercise.options && currentExercise.options.length > 0 ? (
                  <div className="grid grid-cols-2 gap-2">
                    {currentExercise.options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleCheckAnswer(opt)}
                        disabled={quizSubmitted}
                        className={`p-2.5 text-xs font-bold border text-left transition-colors ${
                          quizSubmitted && opt.toLowerCase() === currentExercise.correctAnswer?.toLowerCase()
                            ? 'border-emerald-600 bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : quizSubmitted && opt.toLowerCase() === userAnswer.toLowerCase() && !isCorrect
                            ? 'border-red-600 bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                            : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-[#121316] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Type your answer..."
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      disabled={quizSubmitted}
                      className="flex-1 px-3 py-2 text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#121316] text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                    <button
                      onClick={() => handleCheckAnswer()}
                      disabled={quizSubmitted || !userAnswer.trim()}
                      className="px-4 py-2 bg-amber-600 hover:bg-amber-700 disabled:opacity-40 text-white text-xs font-bold transition-colors"
                    >
                      Check
                    </button>
                  </div>
                )}

                {/* Feedback */}
                {quizSubmitted && (
                  <div className={`p-3 border text-xs space-y-1 ${
                    isCorrect
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 text-emerald-800 dark:text-emerald-300'
                      : 'bg-red-50 dark:bg-red-950/40 border-red-300 text-red-800 dark:text-red-300'
                  }`}>
                    <div className="flex items-center gap-1.5 font-bold">
                      {isCorrect ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                      <span>{isCorrect ? 'Correct! Ausgezeichnet!' : `Incorrect. Correct answer: ${currentExercise.correctAnswer}`}</span>
                    </div>
                    {currentExercise.explanation && (
                      <p className="text-[11px] leading-relaxed opacity-90">{currentExercise.explanation}</p>
                    )}
                    {exerciseIndex + 1 < exercises.length && (
                      <button
                        onClick={() => {
                          setExerciseIndex((prev) => prev + 1);
                          setUserAnswer('');
                          setQuizSubmitted(false);
                        }}
                        className="mt-2 px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition-colors"
                      >
                        Next Exercise →
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-slate-400 text-xs">
            Select a grammar topic from the list to view notes and exercises.
          </div>
        )}
      </main>
    </div>
  );
}
