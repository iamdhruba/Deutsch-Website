import React from 'react';
import { Link } from 'react-router-dom';
import { Search, BookOpen, GraduationCap, BarChart3 } from 'lucide-react';

export function VocabeoNav({ active }) {
  const items = [
    { id: 'browse', label: 'Browse', path: '/browse', icon: Search },
    { id: 'learn', label: 'Learn', path: '/learn', icon: BookOpen },
    { id: 'grammar', label: 'Grammar', path: '/grammar', icon: GraduationCap },
    { id: 'stats', label: 'Stats', path: '/stats', icon: BarChart3 },
  ];

  return (
    <div className="space-y-1.5 pb-3 border-b border-slate-200 dark:border-slate-800">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = active === item.id;
        return (
          <Link
            key={item.id}
            to={item.path}
            className={`flex items-center justify-between w-full px-3 py-2.5 text-xs font-semibold transition-colors ${
              isActive
                ? 'border border-amber-600/40 bg-amber-500/10 text-amber-700 dark:text-amber-400'
                : 'border border-transparent hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-[#121316] text-slate-700 dark:text-slate-300'
            }`}
          >
            <span className="flex items-center gap-2">
              <Icon className={`w-4 h-4 ${isActive ? 'text-amber-600 dark:text-amber-400' : 'text-slate-500'}`} />
              {item.label}
            </span>
            <span className="text-xs text-slate-400 font-bold">»</span>
          </Link>
        );
      })}
    </div>
  );
}
