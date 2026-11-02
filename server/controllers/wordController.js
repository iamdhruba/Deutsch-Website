import { Word } from '../models/Word.js';
import { UserWord } from '../models/UserWord.js';
import { UserProgress } from '../models/UserProgress.js';
import { fsrs, generatorParameters, Rating, createEmptyCard } from 'ts-fsrs';

const scheduler = fsrs(generatorParameters({ enable_fuzz: false }));

/**
 * @route   GET /api/words
 * @desc    Search, filter, sort, and paginate dictionary entries
 * @access  Public (with optional user personalization)
 */
export const getWords = async (req, res, next) => {
  try {
    const {
      search,
      cefr,
      pos,
      topic,
      frequencyBand,
      status, // 'all', 'saved', 'learning', 'mastered'
      page = 1,
      limit = 50,
      sortBy = 'frequency', // 'frequency', 'alphabetical', 'dateSaved'
      sortOrder = 'asc'
    } = req.query;

    const query = { language: 'de' };

    // Accent/Umlaut-insensitive search across German lemma and English senses
    if (search && search.trim()) {
      const cleanTerm = search.trim().toLowerCase();
      const normalizedTerm = cleanTerm
        .replace(/ä/g, 'ae')
        .replace(/ö/g, 'oe')
        .replace(/ü/g, 'ue')
        .replace(/ß/g, 'ss');

      const escapeRegex = (s) => s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
      const escapedClean = escapeRegex(cleanTerm);
      const escapedNormalized = escapeRegex(normalizedTerm);

      query.$or = [
        { lemma: { $regex: escapedClean, $options: 'i' } },
        { normalized: { $regex: escapedNormalized, $options: 'i' } },
        { 'senses.english': { $regex: escapedClean, $options: 'i' } }
      ];
    }

    if (cefr && cefr !== 'all') {
      query.cefr = cefr.toUpperCase();
    }

    if (pos && pos !== 'all') {
      // Map possible short or capital forms
      const posClean = pos.toLowerCase();
      if (posClean === 'number') {
        query.pos = 'numeral';
      } else {
        query.pos = posClean;
      }
    }

    if (topic && topic !== 'all') {
      query.topics = topic.toLowerCase();
    }

    if (frequencyBand && frequencyBand !== 'all') {
      query.frequencyBand = frequencyBand;
    }

    // Filter by user word status if authenticated
    if (status && status !== 'all' && req.user) {
      const userWordQuery = { userId: req.user._id };
      if (status === 'saved') {
        userWordQuery.status = { $in: ['learning', 'mastered'] };
      } else if (status === 'mastered') {
        userWordQuery.status = 'mastered';
      } else if (status === 'learning' || status === 'rest') {
        userWordQuery.status = 'learning';
      }

      const userWords = await UserWord.find(userWordQuery).select('wordId').lean();
      const wordIds = userWords.map((uw) => uw.wordId);

      if (status === 'new') {
        query._id = { $nin: wordIds };
      } else {
        query._id = { $in: wordIds };
      }
    }

    const pageNum = Math.max(1, parseInt(page, 10));
    const limitNum = Math.min(250, Math.max(1, parseInt(limit, 10)));
    const skip = (pageNum - 1) * limitNum;

    // Sorting options
    let sortOption = {};
    if (sortBy === 'alphabetical') {
      sortOption = { lemma: sortOrder === 'desc' ? -1 : 1 };
    } else if (sortBy === 'dateSaved') {
      sortOption = { createdAt: -1 };
    } else {
      // Default: Frequency Rank (1 = most frequent)
      sortOption = { frequencyRank: sortOrder === 'desc' ? -1 : 1, lemma: 1 };
    }

    const [words, total] = await Promise.all([
      Word.find(query).sort(sortOption).skip(skip).limit(limitNum).lean(),
      Word.countDocuments(query)
    ]);

    res.status(200).json({
      success: true,
      count: words.length,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum),
      words
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @route   GET /api/words/:id
 * @desc    Get detailed word entry by ID or lemma
 * @access  Public
 */
export const getWordById = async (req, res, next) => {
  try {
    const { id } = req.params;

    let word;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      word = await Word.findById(id).lean();
    } else {
      word = await Word.findOne({
        lemma: id,
        language: 'de'
      }).lean();
    }

    if (!word) {
      return res.status(404).json({
        success: false,
        message: 'Word not found in dictionary.'
      });
    }

    // If user is authenticated, check study state
    let userProgress = null;
    if (req.user) {
      userProgress = await UserWord.findOne({
        userId: req.user._id,
        wordId: word._id
      }).lean();
    }

    res.status(200).json({
      success: true,
      word,
      userProgress
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @route   POST /api/words/:id/save
 * @desc    Toggle saving word into user's FSRS learning queue or marking as mastered
 * @access  Private
 */
export const toggleSaveWord = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status = 'learning' } = req.body; // 'learning', 'mastered', 'removed'

    const word = await Word.findById(id);
    if (!word) {
      return res.status(404).json({
        success: false,
        message: 'Word not found'
      });
    }

    const existing = await UserWord.findOne({
      userId: req.user._id,
      wordId: word._id
    });

    if (status === 'removed' || (existing && existing.status === status && status === 'learning')) {
      // Toggle off / remove from saved
      await UserWord.deleteOne({ _id: existing._id });
      return res.status(200).json({
        success: true,
        saved: false,
        status: null,
        message: 'Word removed from learning list.'
      });
    }

    let userWordRecord;
    if (existing) {
      existing.status = status;
      userWordRecord = await existing.save();
    } else {
      userWordRecord = await UserWord.create({
        userId: req.user._id,
        wordId: word._id,
        status,
        fsrs: {
          due: new Date(),
          stability: 1.0,
          difficulty: 5.0,
          reps: 0,
          lapses: 0,
          state: 0
        },
        language: 'de'
      });

      // Update XP for saving new vocabulary
      await UserProgress.findOneAndUpdate(
        { userId: req.user._id },
        { $inc: { totalXp: 5 } }
      );
    }

    res.status(200).json({
      success: true,
      saved: true,
      status: userWordRecord.status,
      userWord: userWordRecord,
      message: `Word added to ${userWordRecord.status} queue.`
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @route   GET /api/words/user/saved-ids
 * @desc    Get all word IDs saved or mastered by the active user
 * @access  Private
 */
export const getSavedWordIds = async (req, res, next) => {
  try {
    const userWords = await UserWord.find({ userId: req.user._id })
      .select('wordId status')
      .lean();

    const savedIds = [];
    const masteredIds = [];

    for (const uw of userWords) {
      const idStr = uw.wordId.toString();
      if (uw.status === 'mastered') {
        masteredIds.push(idStr);
      } else {
        savedIds.push(idStr);
      }
    }

    res.status(200).json({
      success: true,
      savedIds,
      masteredIds,
      totalSaved: userWords.length
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @route   GET /api/words/review/queue
 * @desc    Get vocabulary review queue with FSRS intervals
 * @access  Public (guest preview) / Private (personalized)
 */
export const getReviewQueue = async (req, res, next) => {
  try {
    const isAuth = !!req.user;
    let queue = [];
    let stats = { dueCount: 0, newCount: 0, totalLearning: 0 };

    if (isAuth) {
      const userWords = await UserWord.find({
        userId: req.user._id,
        status: { $in: ['learning', 'new'] }
      })
        .populate('wordId')
        .sort({ 'fsrs.due': 1 })
        .lean();

      const validWords = userWords.filter((uw) => uw.wordId);
      const now = new Date();

      queue = validWords.map((uw) => {
        const isDue = new Date(uw.fsrs.due) <= now;
        return {
          userWordId: uw._id,
          word: uw.wordId,
          status: uw.status,
          fsrs: uw.fsrs,
          isDue
        };
      });

      stats.totalLearning = validWords.length;
      stats.dueCount = queue.filter((item) => item.isDue).length;
      stats.newCount = queue.filter((item) => item.fsrs.reps === 0).length;
    }

    // If queue is empty (or guest mode), provide foundational starter words
    if (queue.length === 0) {
      const sampleWords = await Word.find({
        language: 'de',
        'exampleSentences.0': { $exists: true }
      })
        .sort({ frequencyRank: 1 })
        .limit(15)
        .lean();

      queue = sampleWords.map((w) => ({
        userWordId: null,
        word: w,
        status: 'guest_preview',
        fsrs: {
          due: new Date(),
          stability: 1.0,
          difficulty: 5.0,
          reps: 0,
          lapses: 0,
          state: 0
        },
        isDue: true
      }));

      stats.dueCount = queue.length;
      stats.newCount = queue.length;
      stats.totalLearning = queue.length;
    }

    res.status(200).json({
      success: true,
      guestMode: !isAuth,
      stats,
      queue
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @route   POST /api/words/:id/review
 * @desc    Submit a flashcard rating (1-4 or 'known') and compute next FSRS schedule
 * @access  Private / Public (returns simulated if unauthenticated)
 */
export const submitReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rating } = req.body; // 1: Again, 2: Hard, 3: Good, 4: Easy, or 'known'

    const word = await Word.findById(id).lean();
    if (!word) {
      return res.status(404).json({ success: false, message: 'Word not found' });
    }

    // Guest mode simulation
    if (!req.user) {
      const intervalMultiplier = rating === 1 ? 0 : rating === 2 ? 1.2 : rating === 4 ? 3.6 : 2.4;
      const nextDue = new Date(Date.now() + (rating === 1 ? 10 * 60 * 1000 : 24 * 60 * 60 * 1000 * intervalMultiplier));
      return res.status(200).json({
        success: true,
        guestMode: true,
        word,
        rating,
        nextDue,
        message: 'Review recorded in local session (Sign in to sync to cloud FSRS)'
      });
    }

    // Authenticated user
    let userWord = await UserWord.findOne({
      userId: req.user._id,
      wordId: word._id
    });

    if (!userWord) {
      userWord = new UserWord({
        userId: req.user._id,
        wordId: word._id,
        status: 'learning',
        fsrs: {
          due: new Date(),
          stability: 1.0,
          difficulty: 5.0,
          reps: 0,
          lapses: 0,
          state: 0
        }
      });
    }

    const now = new Date();
    let updatedCard = null;
    let earnedXp = 10;

    if (rating === 'known') {
      userWord.status = 'mastered';
      userWord.fsrs.state = 2; // Review state
      userWord.fsrs.lastReview = now;
      userWord.fsrs.due = new Date(now.getTime() + 180 * 24 * 60 * 60 * 1000); // 180 days out
      userWord.fsrs.reps = (userWord.fsrs.reps || 0) + 1;
      earnedXp = 15;
      await userWord.save();
    } else {
      const numRating = parseInt(rating, 10);
      const ratingMap = {
        1: Rating.Again,
        2: Rating.Hard,
        3: Rating.Good,
        4: Rating.Easy
      };
      const fsrsRating = ratingMap[numRating] || Rating.Good;

      const card = {
        due: new Date(userWord.fsrs.due || now),
        stability: userWord.fsrs.stability || 1.0,
        difficulty: userWord.fsrs.difficulty || 5.0,
        elapsed_days: userWord.fsrs.elapsedDays || 0,
        scheduled_days: userWord.fsrs.scheduledDays || 0,
        reps: userWord.fsrs.reps || 0,
        lapses: userWord.fsrs.lapses || 0,
        state: userWord.fsrs.state || 0,
        last_review: userWord.fsrs.lastReview ? new Date(userWord.fsrs.lastReview) : undefined
      };

      const record = scheduler.next(card, now, fsrsRating);
      updatedCard = record.card;

      userWord.fsrs.due = record.card.due;
      userWord.fsrs.stability = record.card.stability;
      userWord.fsrs.difficulty = record.card.difficulty;
      userWord.fsrs.elapsedDays = record.card.elapsed_days;
      userWord.fsrs.scheduledDays = record.card.scheduled_days;
      userWord.fsrs.reps = record.card.reps;
      userWord.fsrs.lapses = record.card.lapses;
      userWord.fsrs.state = record.card.state;
      userWord.fsrs.lastReview = now;
      userWord.status = 'learning';

      if (numRating === 4) earnedXp = 15;
      else if (numRating === 3) earnedXp = 10;
      else if (numRating === 2) earnedXp = 7;
      else earnedXp = 4;

      await userWord.save();
    }

    // Update User Progress stats and daily streak
    const todayStr = now.toISOString().split('T')[0];
    const progress = await UserProgress.findOne({ userId: req.user._id });
    if (progress) {
      progress.totalXp = (progress.totalXp || 0) + earnedXp;
      progress.totalSecondsStudied = (progress.totalSecondsStudied || 0) + 30;

      // Update daily activity
      const dayEntry = progress.dailyActivity.find((d) => d.date === todayStr);
      if (dayEntry) {
        dayEntry.reviewsCount += 1;
        dayEntry.minutesStudied += 0.5;
      } else {
        progress.dailyActivity.push({
          date: todayStr,
          reviewsCount: 1,
          newWordsCount: rating === 'known' ? 1 : 0,
          grammarExercisesCount: 0,
          minutesStudied: 0.5
        });
      }

      // Update streak
      const lastActive = progress.streak.lastActiveDate;
      if (!lastActive) {
        progress.streak.currentStreak = 1;
        progress.streak.maxStreak = 1;
      } else {
        const lastActiveStr = lastActive.toISOString().split('T')[0];
        if (lastActiveStr !== todayStr) {
          const yesterday = new Date(now);
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayStr = yesterday.toISOString().split('T')[0];

          if (lastActiveStr === yesterdayStr) {
            progress.streak.currentStreak += 1;
            if (progress.streak.currentStreak > progress.streak.maxStreak) {
              progress.streak.maxStreak = progress.streak.currentStreak;
            }
          } else {
            progress.streak.currentStreak = 1;
          }
        }
      }
      progress.streak.lastActiveDate = now;
      await progress.save();
    }

    res.status(200).json({
      success: true,
      earnedXp,
      fsrs: userWord.fsrs,
      nextDue: userWord.fsrs.due,
      status: userWord.status,
      message: 'Review saved successfully'
    });
  } catch (err) {
    next(err);
  }
};

