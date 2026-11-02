import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lightbulb, GraduationCap, Search } from 'lucide-react';
import { getWordMeaning, subscribeToWordLookups } from '../utils/germanDictionary.js';

export function GermanSentenceWord({
  word,
  isTarget = false,
  targetWordObj = null,
  onPlaySpeech
}) {
  const navigate = useNavigate();
  const [, setTick] = useState(0);

  // Subscribe to background dictionary cache updates
  useEffect(() => {
    return subscribeToWordLookups(() => {
      setTick((t) => t + 1);
    });
  }, []);

  const cleanWord = word.replace(/^[.,!?;:«»„“"()]+|[.,!?;:«»„“"()]+$/g, '');
  const info = getWordMeaning(cleanWord, isTarget ? targetWordObj : null);
  const displayMeaning = info?.meaning || cleanWord;
  const lookupLemma = info?.lemma || cleanWord;

  const handleSearch = (e) => {
    e.stopPropagation();
    navigate(`/browse?search=${encodeURIComponent(lookupLemma)}`);
  };

  const handleGrammar = (e) => {
    e.stopPropagation();
    navigate('/grammar');
  };

  const handleLightbulb = (e) => {
    e.stopPropagation();
    if (onPlaySpeech) {
      onPlaySpeech(cleanWord);
    }
  };

  const [isHovered, setIsHovered] = useState(false);

  return (
    <span
      className={`vocabeo-word-wrap inline-block ${isHovered ? 'is-hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* German Word */}
      <span
        className={`transition-all duration-150 cursor-pointer ${
          isTarget
            ? 'font-bold text-stone-900 dark:text-stone-100 border-b-2 border-[#715d56] pb-0.5'
            : 'text-stone-800 dark:text-stone-200 hover:text-[#715d56] dark:hover:text-[#ded5ce] hover:border-b-2 hover:border-[#715d56]/70 pb-0.5'
        }`}
      >
        {word}
      </span>

      {/* Floating Vocabeo Popover (Top: 💡 🎓 🔍 | Bottom: English Meaning) */}
      <div className="vocabeo-popover flex flex-col items-stretch min-w-[105px] rounded-md overflow-hidden shadow-lg border border-[#cfc4bc] dark:border-[#524741] select-none">
        {/* Top 3-Button Action Bar */}
        <div className="flex items-stretch divide-x divide-[#d2c7bf] dark:divide-[#4d443f] bg-white dark:bg-[#201d1b]">
          <button
            type="button"
            onClick={handleLightbulb}
            title={info?.germanDefinition || `Listen & notes for "${cleanWord}"`}
            className="flex-1 py-1.5 px-2.5 flex items-center justify-center hover:bg-[#ede6e0] dark:hover:bg-[#332e2b] text-[#5c4a42] dark:text-[#d6c7be] transition-colors"
          >
            <Lightbulb className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleGrammar}
            title="Grammar rules & declension center"
            className="flex-1 py-1.5 px-2.5 flex items-center justify-center hover:bg-[#ede6e0] dark:hover:bg-[#332e2b] text-[#5c4a42] dark:text-[#d6c7be] transition-colors"
          >
            <GraduationCap className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleSearch}
            title={`Search "${lookupLemma}" in dictionary`}
            className="flex-1 py-1.5 px-2.5 flex items-center justify-center hover:bg-[#ede6e0] dark:hover:bg-[#332e2b] text-[#5c4a42] dark:text-[#d6c7be] transition-colors"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>

        {/* Solid Mocha / Taupe Meaning Pill (#715d56) with larger text */}
        <div className="bg-[#715d56] text-white text-sm sm:text-[14px] font-bold py-1.5 px-3.5 text-center whitespace-nowrap tracking-wide">
          {displayMeaning}
        </div>
      </div>
    </span>
  );
}
