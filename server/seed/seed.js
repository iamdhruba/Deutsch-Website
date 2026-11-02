import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { connectDB } from '../config/db.js';
import {
  User,
  Word,
  Sense,
  ExampleSentence,
  GrammarTopic,
  Exercise,
  Unit,
  Lesson,
  UserProgress,
  UserWord,
  Achievement
} from '../models/index.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { sampleGrammarTopics } from './sampleGrammar.js';
import { moreGrammarTopics } from './moreGrammar.js';
import { buildLargeVocabulary } from './buildLargeVocabulary.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const allGrammarTopics = [...sampleGrammarTopics, ...moreGrammarTopics];

const seedDatabase = async (shouldExit = true) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      console.log('[Seed] Connecting to database...');
      await connectDB();
    }

    console.log('[Seed] Cleaning up existing collections...');
    await Promise.all([
      User.deleteMany({}),
      Word.deleteMany({}),
      Sense.deleteMany({}),
      ExampleSentence.deleteMany({}),
      GrammarTopic.deleteMany({}),
      Exercise.deleteMany({}),
      Unit.deleteMany({}),
      Lesson.deleteMany({}),
      UserProgress.deleteMany({}),
      UserWord.deleteMany({}),
      Achievement.deleteMany({})
    ]);

    // 1. Seed Comprehensive Vocabulary Words (>6350 words, beating Vocabeo)
    const jsonPath = path.join(__dirname, 'largeVocabularyData.json');
    let wordsToSeed = [];
    if (fs.existsSync(jsonPath)) {
      console.log('[Seed] Reading pre-built large vocabulary data...');
      wordsToSeed = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
    } else {
      console.log('[Seed] Generating large vocabulary dataset...');
      wordsToSeed = await buildLargeVocabulary();
    }

    console.log(`[Seed] Seeding ${wordsToSeed.length} vocabulary words in fast batches...`);
    const insertedWords = [];
    const batchSize = 500;

    for (let i = 0; i < wordsToSeed.length; i += batchSize) {
      const chunk = wordsToSeed.slice(i, i + batchSize);
      const inserted = await Word.insertMany(chunk, { ordered: false });
      insertedWords.push(...inserted);
      console.log(`[Seed] Seeded ${insertedWords.length} / ${wordsToSeed.length} words...`);
    }
    console.log(`[Seed] Successfully seeded ${insertedWords.length} words.`);

    // 2. Seed Complete Grammar Topics and Interactive Exercises
    console.log(`[Seed] Seeding ${allGrammarTopics.length} complete grammar topics...`);
    let totalExercisesCount = 0;

    for (const topicData of allGrammarTopics) {
      const { exercises = [], ...topicFields } = topicData;

      const createdTopic = await GrammarTopic.create(topicFields);

      for (const ex of exercises) {
        await Exercise.create({
          ...ex,
          topicId: createdTopic._id,
          level: createdTopic.level,
          language: 'de'
        });
        totalExercisesCount++;
      }
    }
    console.log(
      `[Seed] Seeded ${allGrammarTopics.length} grammar topics with ${totalExercisesCount} exercises.`
    );

    // 3. Seed A1 Starter Unit & Lessons
    console.log('[Seed] Seeding curriculum starter units and lessons...');
    const unit1 = await Unit.create({
      level: 'A1',
      unitNumber: 1,
      title: 'Unit 1: Erste Schritte (First Steps)',
      description: 'Greetings, alphabet, numbers, and basic introductions.',
      topicsCovered: ['Greetings', 'Numbers 1-20', 'Personal Pronouns', 'Verb sein'],
      order: 1,
      icon: 'Smile',
      language: 'de'
    });

    await Lesson.create([
      {
        unitId: unit1._id,
        title: '1. Hallo! Begrüßung und Kennenlernen',
        order: 1,
        type: 'grammar',
        summary: 'Learn how to greet people formally and informally.',
        contentMarkdown: '# Begrüßung im Deutschen\n\n- Hallo (informal)\n- Guten Tag (formal)\n- Wie geht es dir? (informal)\n- Wie geht es Ihnen? (formal)',
        vocabularyWords: insertedWords.slice(0, 5).map((w) => w._id),
        language: 'de'
      },
      {
        unitId: unit1._id,
        title: '2. Nomen und Artikel: der, die, das',
        order: 2,
        type: 'grammar',
        summary: 'Understand the three grammatical genders in German.',
        contentMarkdown: '# Nomen und Artikel\n\nJedes Nomen hat ein Geschlecht: der, die, oder das.',
        vocabularyWords: insertedWords.slice(10, 15).map((w) => w._id),
        language: 'de'
      }
    ]);

    // 4. Seed Motivational Achievements (100% Free - No pay-to-win)
    console.log('[Seed] Seeding achievements...');
    await Achievement.create([
      {
        code: 'FIRST_WORD',
        title: 'Erster Schritt (First Step)',
        description: 'Complete your first vocabulary review with FSRS spaced repetition.',
        icon: 'Footprints',
        category: 'vocabulary',
        xpReward: 20,
        criteria: { type: 'words_mastered', threshold: 1 }
      },
      {
        code: 'STREAK_3',
        title: 'Dreiklang (3-Day Streak)',
        description: 'Study German for 3 consecutive days.',
        icon: 'Flame',
        category: 'streak',
        xpReward: 50,
        criteria: { type: 'streak_days', threshold: 3 }
      },
      {
        code: 'STREAK_7',
        title: 'Wochenmeister (Weekly Champion)',
        description: 'Maintain a 7-day study streak.',
        icon: 'Zap',
        category: 'streak',
        xpReward: 100,
        criteria: { type: 'streak_days', threshold: 7 }
      },
      {
        code: 'CENTURION_100',
        title: 'Wortgewandt (100 Words Mastered)',
        description: 'Master your first 100 high-frequency German words.',
        icon: 'BookOpen',
        category: 'vocabulary',
        xpReward: 250,
        criteria: { type: 'words_mastered', threshold: 100 }
      },
      {
        code: 'GRAMMAR_A1',
        title: 'Grammatik-Pionier',
        description: 'Complete all A1 foundational grammar topics and mini-quizzes.',
        icon: 'Award',
        category: 'grammar',
        xpReward: 200,
        criteria: { type: 'grammar_topics', threshold: 3 }
      }
    ]);

    // 5. Create Demo User with Pre-populated Learning Progress
    console.log('[Seed] Creating demo learner account (demo@lernen.org)...');
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('Lernen123!', salt);

    const demoUser = await User.create({
      email: 'demo@lernen.org',
      passwordHash,
      name: 'Max Learner',
      settings: {
        uiLanguage: 'en',
        targetLanguage: 'de',
        dailyNewWordsGoal: 15,
        theme: 'system',
        dyslexiaFont: false,
        fontSize: 'base',
        studyPlan: 'regular'
      }
    });

    // Create demo user progress
    await UserProgress.create({
      userId: demoUser._id,
      currentLevel: 'A1',
      streak: {
        currentStreak: 4,
        maxStreak: 5,
        lastActiveDate: new Date()
      },
      dailyActivity: [
        {
          date: new Date(Date.now() - 3 * 86400000).toISOString().split('T')[0],
          reviewsCount: 12,
          newWordsCount: 10,
          grammarExercisesCount: 4,
          minutesStudied: 20
        },
        {
          date: new Date(Date.now() - 2 * 86400000).toISOString().split('T')[0],
          reviewsCount: 18,
          newWordsCount: 12,
          grammarExercisesCount: 6,
          minutesStudied: 25
        },
        {
          date: new Date(Date.now() - 1 * 86400000).toISOString().split('T')[0],
          reviewsCount: 15,
          newWordsCount: 8,
          grammarExercisesCount: 5,
          minutesStudied: 22
        },
        {
          date: new Date().toISOString().split('T')[0],
          reviewsCount: 14,
          newWordsCount: 10,
          grammarExercisesCount: 3,
          minutesStudied: 18
        }
      ],
      totalXp: 340,
      totalSecondsStudied: 5100
    });

    // Add some words to demo user queue
    for (let i = 0; i < 15; i++) {
      const word = insertedWords[i];
      await UserWord.create({
        userId: demoUser._id,
        wordId: word._id,
        status: i < 5 ? 'mastered' : 'learning',
        fsrs: {
          due: new Date(Date.now() + (i % 3) * 86400000),
          stability: 2.5 + i,
          difficulty: 4.8,
          reps: i + 1,
          lapses: 0,
          state: 2,
          lastReview: new Date()
        },
        language: 'de'
      });
    }

    console.log('====================================================');
    console.log(' [Lernen Seed Complete] ');
    console.log(` - ${insertedWords.length} Words Seeded (Exceeding Vocabeo's 6,350 words!)`);
    console.log(` - ${allGrammarTopics.length} Complete Grammar Topics with ${totalExercisesCount} Exercises`);
    console.log(` - 1 Starter Unit & 2 Starter Lessons`);
    console.log(` - 5 Motivational Achievements`);
    console.log(` - Demo Account: demo@lernen.org / Lernen123!`);
    console.log('====================================================');

    if (shouldExit) {
      process.exit(0);
    }
    return true;
  } catch (err) {
    console.error('[Seed Error]:', err);
    if (shouldExit) {
      process.exit(1);
    }
    throw err;
  }
};

export { seedDatabase };

// Auto-run if executed directly from CLI (e.g. `npm run seed`)
if (process.argv[1] && (process.argv[1].endsWith('seed.js') || process.argv[1].endsWith('seed'))) {
  seedDatabase(true);
}
