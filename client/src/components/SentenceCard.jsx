import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Volume2, Image as ImageIcon } from 'lucide-react';
import { getContextualImage, extractKeywords } from '../utils/sentenceImage.js';
import { GermanSentenceWord } from './GermanSentenceWord.jsx';

export function SentenceCard({
  sentence,
  word,
  index = 0,
  onPlaySpeech
}) {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [showHint, setShowHint] = useState(false);

  const { keyword } = extractKeywords(sentence, word);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    getContextualImage(sentence, word, index).then((url) => {
      if (isMounted) {
        setImageUrl(url);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [sentence?.german, word?.lemma, index]);

  // Clean primary short meaning for the taupe popover pill (matching screenshot)
  const targetMeaning =
    word?.senses?.[0]?.english
      ?.replace(/\(.*?\)/g, '')
      .replace(/\[.*?\]/g, '')
      .split(/[;,/]/)[0]
      ?.trim() ||
    word?.lemma ||
    'meaning';

  // Render English sentence with the target word highlighted
  const renderEnglishSentence = () => {
    if (!sentence?.english) return null;
    const cleanMeaning = targetMeaning.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b(${cleanMeaning})\\b`, 'i');

    if (!regex.test(sentence.english)) {
      return <span>{sentence.english}</span>;
    }

    const parts = sentence.english.split(regex);
    return parts.map((part, i) =>
      part.toLowerCase() === targetMeaning.toLowerCase() ? (
        <strong key={i} className="font-bold text-stone-900 dark:text-stone-100 not-italic">
          {part}
        </strong>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  // Render German sentence where EVERY word is interactive with Vocabeo hover popover
  const renderGermanSentence = () => {
    if (!sentence?.german) return null;
    const highlightTarget = (sentence.highlight || word?.lemma || '').toLowerCase();

    // Split sentence into words and whitespace/punctuation delimiters
    const tokens = sentence.german.split(/([ \t\n\r]+|[.,!?;:«»„“"()]+)/);

    return tokens.map((token, i) => {
      if (!token) return null;

      // If token is whitespace or punctuation, render as normal text
      if (/^[ \t\n\r.,!?;:«»„“"()]+$/.test(token)) {
        return <span key={i}>{token}</span>;
      }

      // Check if this word matches the primary target word
      const clean = token.replace(/^[.,!?;:«»„“"()]+|[.,!?;:«»„“"()]+$/g, '');
      const isTarget = Boolean(highlightTarget && clean.toLowerCase() === highlightTarget);

      return (
        <GermanSentenceWord
          key={i}
          word={token}
          isTarget={isTarget}
          targetWordObj={word}
          onPlaySpeech={onPlaySpeech}
        />
      );
    });
  };

  return (
    <div className="relative p-3.5 sm:p-4 rounded-md border-[1.5px] border-[#7c695d] dark:border-[#8e7b70] bg-[#fdfcfb] dark:bg-[#181615] transition-all duration-200 flex flex-col sm:flex-row items-start sm:items-center gap-3.5 sm:gap-4 shadow-sm hover:shadow-md group">
      {/* Contextual Concept Image */}
      <div className="relative w-full sm:w-28 sm:h-20 h-36 rounded overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={sentence.english || keyword || 'Sentence illustration'}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            onError={(e) => {
              e.target.src =
                'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=400&q=80';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400">
            <ImageIcon className="w-6 h-6 animate-pulse" />
          </div>
        )}

        {/* Visual Keyword Tag */}
        {keyword && keyword !== 'culture' && (
          <span className="absolute bottom-1 left-1 max-w-[90%] truncate px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-black/70 backdrop-blur-sm text-white rounded">
            {keyword}
          </span>
        )}
      </div>

      {/* German Sentence & Always Visible English Translation */}
      <div className="flex-1 min-w-0 space-y-1">
        {/* German Sentence */}
        <div className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white leading-relaxed">
          {renderGermanSentence()}
        </div>

        {/* English Translation: Always Visible directly below */}
        <p className="text-xs sm:text-sm italic text-stone-600 dark:text-stone-300 leading-normal">
          {renderEnglishSentence()}
        </p>

        {/* Optional Contextual Note when Lightbulb is clicked */}
        {showHint && word?.senses?.[0]?.germanDefinition && (
          <div className="text-[11px] text-stone-500 dark:text-stone-400 pt-1 flex items-center gap-1.5 animate-in fade-in duration-150">
            <span className="font-bold text-[#715d56] uppercase text-[9px] tracking-wider px-1 bg-stone-100 dark:bg-stone-800 rounded">
              DEF
            </span>
            <span>{word.senses[0].germanDefinition}</span>
          </div>
        )}
      </div>

      {/* Audio Pronunciation Button (Matching Screenshot icon) */}
      <div className="flex items-center gap-1 shrink-0 self-end sm:self-center">
        <button
          type="button"
          onClick={() => onPlaySpeech?.(sentence.german)}
          title="Listen to native audio pronunciation"
          className="p-2 rounded text-stone-500 hover:text-[#715d56] dark:text-stone-400 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
        >
          <Volume2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

