import React from 'react';
import { ExternalLink, ShieldCheck, Download, BookOpen, Code2, Heart, Award } from 'lucide-react';
import { Badge } from '../components/UI/Badge.jsx';

export function AttributionPage() {
  const sources = [
    {
      name: 'Kaikki.org / German Wiktionary',
      license: 'Creative Commons Attribution-ShareAlike 3.0 / 4.0 Unported (CC BY-SA)',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
      websiteUrl: 'https://kaikki.org/dictionary/German/index.html',
      downloadUrl: 'https://kaikki.org/dictionary/German/kaikki.org-dictionary-German.jsonl.gz',
      usage: 'Headwords, grammatical inflection tables (noun declension & verb conjugation), grammatical genders, IPA pronunciation, and definitions.',
      instructions: 'Download the comprehensive German JSONL dump from Kaikki.org. The JSON lines can be piped into Lernen seed scripts using gzip decompressed streams.'
    },
    {
      name: 'Tatoeba Project',
      license: 'Creative Commons Attribution 2.0 France (CC BY 2.0 FR)',
      licenseUrl: 'https://creativecommons.org/licenses/by/2.0/fr/',
      websiteUrl: 'https://tatoeba.org',
      downloadUrl: 'https://downloads.tatoeba.org/exports/sentences.tar.bz2',
      usage: 'Bilingual German-English example sentences illustrating vocabulary in authentic conversational and written contexts.',
      instructions: 'Download sentences.tar.bz2 and links.tar.bz2 from downloads.tatoeba.org. Filter sentences by language "deu" and "eng" using the provided sentence pairing export.'
    },
    {
      name: 'SUBTLEX-DE & Leipzig Corpora Collection',
      license: 'Creative Commons Attribution-NonCommercial (CC BY-NC) / Open Academic Data',
      licenseUrl: 'https://wortschatz.uni-leipzig.de/de/download',
      websiteUrl: 'https://wortschatz.uni-leipzig.de/',
      downloadUrl: 'https://www.ugent.be/pp/experimentele-psychologie/en/research/documents/subtlex-de',
      usage: 'Word frequency rankings, lemma frequency counts, and CEFR frequency bands (Top 500, 1000, 2500, 5000+).',
      instructions: 'Frequency tables are compiled from film subtitles and written newspaper corpora, normalized against common lemmatized forms.'
    },
    {
      name: 'OpenThesaurus',
      license: 'GNU Lesser General Public License (LGPL) / CC BY-SA 4.0',
      licenseUrl: 'https://www.openthesaurus.de/about/download',
      websiteUrl: 'https://www.openthesaurus.de',
      downloadUrl: 'https://www.openthesaurus.de/export/OpenThesaurus-Textversion.zip',
      usage: 'German synonym synsets, associated phrases, antonyms, and collocations.',
      instructions: 'Download the text export of synsets from openthesaurus.de/export. Lines beginning with "#" are comments; each row contains semicolon-separated synonyms.'
    },
    {
      name: 'Mozilla Common Voice & Wikimedia Commons',
      license: 'Creative Commons Zero (CC0) / CC BY-SA 4.0',
      licenseUrl: 'https://commonvoice.mozilla.org',
      websiteUrl: 'https://commonvoice.mozilla.org/de',
      downloadUrl: 'https://commonvoice.mozilla.org/de/datasets',
      usage: 'German audio clips, native pronunciations, and listening comprehension challenge prompts.',
      instructions: 'Audio clips are sourced from open public domain voice recordings and the browser-native Web Speech Synthesis API.'
    },
    {
      name: 'FSRS (Free Spaced Repetition Scheduler)',
      license: 'MIT License',
      licenseUrl: 'https://opensource.org/licenses/MIT',
      websiteUrl: 'https://github.com/open-spaced-repetition/fsrs4anki',
      downloadUrl: 'https://www.npmjs.com/package/ts-fsrs',
      usage: 'State-of-the-art DSR (Difficulty, Stability, Retrievability) memory retention algorithm powering the review queue.',
      instructions: 'Installed via open-source package ts-fsrs / fsrs.js. Mathematical algorithm by Jarrett Ye and the Open Spaced Repetition team.'
    },
    {
      name: 'OpenDyslexic Font',
      license: 'SIL Open Font License (OFL)',
      licenseUrl: 'https://scripts.sil.org/OFL',
      websiteUrl: 'https://opendyslexic.org/',
      downloadUrl: 'https://opendyslexic.org/download',
      usage: 'Dyslexia-friendly reading font provided in accessibility preferences to make German text easier to read.',
      instructions: 'Loaded dynamically for learners who toggle Dyslexia Font mode in the navigation bar.'
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800 mb-4">
            <ShieldCheck className="w-4 h-4" /> Open Source & Data Integrity
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-slate-900 dark:text-white mb-4">
            Credits, Licenses & Data Sources
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            DeutschHub is open for everyone. In compliance with open-source and Creative Commons licenses,
            all external data sources, corpora, and algorithms are fully cataloged below with direct download instructions.
          </p>
        </div>

        {/* Source Cards */}
        <div className="space-y-6">
          {sources.map((src) => (
            <div
              key={src.name}
              className="p-6 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-emerald-600" />
                  {src.name}
                </h3>
                <span className="text-xs px-2.5 py-1 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-semibold border border-emerald-200 dark:border-emerald-800">
                  {src.license}
                </span>
              </div>

              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                <strong className="text-slate-900 dark:text-white">Role in DeutschHub:</strong> {src.usage}
              </p>

              <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-400">
                <span className="font-bold text-slate-900 dark:text-white block mb-1">
                  How to download / reproduce:
                </span>
                {src.instructions}
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
                <a
                  href={src.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                >
                  Project Website <ExternalLink className="w-3 h-3" />
                </a>
                <span>•</span>
                <a
                  href={src.licenseUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-500 hover:underline flex items-center gap-1"
                >
                  License Details <ExternalLink className="w-3 h-3" />
                </a>
                <span>•</span>
                <a
                  href={src.downloadUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-500 hover:underline flex items-center gap-1"
                >
                  Direct Download <Download className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Local Seeding Instructions Box */}
        <div className="mt-12 p-6 rounded-xl bg-emerald-900 text-white space-y-3">
          <h3 className="text-lg font-bold font-heading flex items-center gap-2">
            <Code2 className="w-5 h-5 text-emerald-400" /> Running & Expanding Seed Data
          </h3>
          <p className="text-xs text-emerald-100 leading-relaxed">
            The project includes ready-to-run seed scripts located in <code className="bg-emerald-950 px-2 py-0.5 rounded text-emerald-300">/server/seed</code>.
            To re-populate or update the database with the included 100 sample words and 3 complete grammar topics, simply execute:
          </p>
          <pre className="p-3 rounded-lg bg-black/40 text-emerald-300 font-mono text-xs overflow-x-auto">
            npm run seed --prefix server
          </pre>
          <p className="text-xs text-emerald-200">
            Every record strictly enforces the <code className="text-white">language: 'de'</code> field schema for multi-lingual extensibility.
          </p>
        </div>
      </div>
    </div>
  );
}
