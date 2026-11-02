import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  BookOpen,
  BarChart3,
  Flame,
  Award,
  Clock,
  CheckCircle2,
  TrendingUp,
  Brain,
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';
import { useAuth } from '../context/AuthContext.jsx';
import { Badge } from '../components/UI/Badge.jsx';
import { VocabeoNav } from '../components/VocabeoNav.jsx';

export function StatsPage() {
  const { user, progress, openAuthModal } = useAuth();

  const streak = progress?.streak?.currentStreak || 0;
  const xp = progress?.totalXp || 0;
  const level = progress?.currentLevel || 'A1';

  // Sample or active user daily study history
  const activityData = [
    { day: 'Mon', reviews: 14, newWords: 5 },
    { day: 'Tue', reviews: 22, newWords: 8 },
    { day: 'Wed', reviews: 18, newWords: 6 },
    { day: 'Thu', reviews: 30, newWords: 10 },
    { day: 'Fri', reviews: 25, newWords: 7 },
    { day: 'Sat', reviews: 35, newWords: 12 },
    { day: 'Sun', reviews: 28, newWords: 9 },
  ];

  // CEFR Distribution
  const cefrStats = [
    { level: 'A1', words: 65, total: 500, percent: 13, color: 'bg-emerald-600' },
    { level: 'A2', words: 38, total: 1000, percent: 4, color: 'bg-teal-600' },
    { level: 'B1', words: 24, total: 2000, percent: 1.2, color: 'bg-blue-600' },
    { level: 'B2', words: 4, total: 2000, percent: 0.2, color: 'bg-indigo-600' },
    { level: 'C1', words: 0, total: 1500, percent: 0, color: 'bg-purple-600' },
    { level: 'C2', words: 0, total: 1000, percent: 0, color: 'bg-rose-600' },
  ];

  return (
    <div className="h-full w-full bg-white dark:bg-[#121316] text-slate-900 dark:text-slate-100 flex flex-col md:flex-row overflow-hidden select-none transition-colors">
      {/* 1. LEFT SIDEBAR NAVIGATION */}
      <aside className="w-full md:w-56 lg:w-60 bg-slate-50 dark:bg-[#18191d] border-r border-slate-200 dark:border-slate-800 flex flex-col shrink-0 p-4 space-y-4 overflow-y-auto">
        {/* Vocabeo Top Navigation Links */}
        <VocabeoNav active="stats" />

        {/* Quick Summary Pill */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Your Status
          </label>
          <div className="p-3 bg-white dark:bg-[#121316] border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Streak</span>
              <span className="font-bold text-amber-600 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                {streak} Days
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Total XP</span>
              <span className="font-bold text-emerald-600">{xp}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Placement</span>
              <span className="font-bold text-blue-600">CEFR {level}</span>
            </div>
          </div>
        </div>

        {/* FSRS Retention Indicator */}
        <div className="p-3 bg-white dark:bg-[#121316] border border-slate-200 dark:border-slate-800 space-y-1.5 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200">
            <Brain className="w-4 h-4 text-amber-600" />
            <span>FSRS Retention</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
            Target retention is maintained at 90% via FSRS mathematical spacing intervals.
          </p>
        </div>
      </aside>

      {/* 2. MAIN CENTER CONTENT */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6">
        {/* Banner */}
        <div className="max-w-4xl mx-auto bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 p-3 text-xs font-semibold text-amber-800 dark:text-amber-300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span>{!user ? 'Guest Analytics Preview ~' : 'Cloud Sync Active ~'}</span>
            <span className="text-slate-700 dark:text-slate-300 font-normal">
              {!user ? 'Sign in to preserve your daily streaks across devices.' : 'All review logs saved in MongoDB.'}
            </span>
          </div>
          {!user && (
            <button
              onClick={() => openAuthModal('login')}
              className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white font-bold transition-colors"
            >
              Sign In
            </button>
          )}
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Top 4 KPI Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-50 dark:bg-[#18191d] border border-slate-200 dark:border-slate-800 text-center space-y-1">
              <Flame className="w-5 h-5 text-amber-500 fill-amber-500 mx-auto" />
              <div className="text-2xl font-black font-heading text-slate-900 dark:text-white">
                {streak} Days
              </div>
              <p className="text-[11px] font-bold text-slate-500">Daily Streak</p>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-[#18191d] border border-slate-200 dark:border-slate-800 text-center space-y-1">
              <Award className="w-5 h-5 text-emerald-600 mx-auto" />
              <div className="text-2xl font-black font-heading text-slate-900 dark:text-white">
                {xp}
              </div>
              <p className="text-[11px] font-bold text-slate-500">Total XP</p>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-[#18191d] border border-slate-200 dark:border-slate-800 text-center space-y-1">
              <Brain className="w-5 h-5 text-blue-600 mx-auto" />
              <div className="text-2xl font-black font-heading text-slate-900 dark:text-white">
                90.2%
              </div>
              <p className="text-[11px] font-bold text-slate-500">Recall Retention</p>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-[#18191d] border border-slate-200 dark:border-slate-800 text-center space-y-1">
              <Clock className="w-5 h-5 text-purple-600 mx-auto" />
              <div className="text-2xl font-black font-heading text-slate-900 dark:text-white">
                100% Free
              </div>
              <p className="text-[11px] font-bold text-slate-500">No Paywalls</p>
            </div>
          </div>

          {/* Activity Chart & CEFR Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Reviews Activity Bar Chart */}
            <div className="lg:col-span-2 p-5 bg-slate-50 dark:bg-[#18191d] border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-amber-600" />
                    Weekly Review Activity
                  </h3>
                  <p className="text-[11px] text-slate-500">Completed FSRS flashcard reviews per day</p>
                </div>
                <span className="text-xs font-mono font-bold text-amber-600">
                  172 Total
                </span>
              </div>

              <div className="h-56 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={activityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                    <XAxis dataKey="day" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1e293b',
                        borderColor: '#334155',
                        borderRadius: '0px',
                        color: '#fff',
                        fontSize: '12px'
                      }}
                    />
                    <Bar dataKey="reviews" name="Reviews" fill="#d97706" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="newWords" name="New Words" fill="#059669" radius={[0, 0, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* CEFR Vocabulary Mastery Breakdown */}
            <div className="p-5 bg-slate-50 dark:bg-[#18191d] border border-slate-200 dark:border-slate-800 space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-blue-600" />
                  CEFR Distribution
                </h3>
                <p className="text-[11px] text-slate-500">Learned words across proficiency levels</p>
              </div>

              <div className="space-y-3 pt-1">
                {cefrStats.map((item) => (
                  <div key={item.level} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-700 dark:text-slate-300">{item.level}</span>
                      <span className="font-mono text-slate-500">{item.words} / {item.total}</span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 overflow-hidden">
                      <div
                        className={`h-full ${item.color}`}
                        style={{ width: `${Math.max(item.percent, 3)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
