import React from 'react';

export function Badge({ children, variant = 'default', size = 'sm', className = '' }) {
  const base = 'inline-flex items-center font-semibold select-none';

  const variants = {
    default: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200',
    der: 'bg-blue-100 text-blue-800 border border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800',
    die: 'bg-red-100 text-red-800 border border-red-200 dark:bg-red-950/60 dark:text-red-300 dark:border-red-800',
    das: 'bg-emerald-100 text-emerald-800 border border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800',
    plural: 'bg-purple-100 text-purple-800 border border-purple-200 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800',
    a1: 'bg-teal-100 text-teal-800 dark:bg-teal-950/60 dark:text-teal-300',
    a2: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950/60 dark:text-cyan-300',
    b1: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300',
    b2: 'bg-violet-100 text-violet-800 dark:bg-violet-950/60 dark:text-violet-300',
    c1: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300',
    c2: 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300',
  };

  const sizes = {
    xs: 'text-[10px] px-2 py-0.5',
    sm: 'text-xs px-2.5 py-0.5',
    md: 'text-sm px-3 py-1',
  };

  return (
    <span className={`${base} ${variants[variant] || variants.default} ${sizes[size]} ${className}`}>
      {children}
    </span>
  );
}
