import React from 'react';

/**
 * Brand logo for DeutschHub:
 * Four colors rectangle with 3px border radius in German flag colors (Schwarz, Rot, Gold, Karminrot).
 */
export function Logo({ size = 'md', className = '' }) {
  const dimensions = {
    xs: 'w-5 h-5',
    sm: 'w-7 h-7',
    md: 'w-8 h-8 sm:w-9 sm:h-9',
    lg: 'w-11 h-11 sm:w-12 sm:h-12',
    xl: 'w-14 h-14 sm:w-16 sm:h-16',
  };

  const dimClass = dimensions[size] || dimensions.md;

  return (
    <div className={`relative flex items-center justify-center shrink-0 ${dimClass} ${className}`}>
      <img
        src="/logo-mark.svg"
        alt="DeutschHub Logo"
        className="w-full h-full object-contain select-none transition-transform"
      />
    </div>
  );
}
