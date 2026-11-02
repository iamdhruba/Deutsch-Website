import { GrammarTopic } from '../models/GrammarTopic.js';
import { Exercise } from '../models/Exercise.js';

/**
 * @route   GET /api/grammar
 * @desc    Get all grammar topics list, optionally filtered by level or category
 * @access  Public
 */
export const getGrammarTopics = async (req, res, next) => {
  try {
    const { level, category, search } = req.query;
    const query = { language: 'de' };

    if (level) query.level = level.toUpperCase();
    if (category) query.category = category.toLowerCase();
    if (search && search.trim()) {
      query.$or = [
        { title: { $regex: search.trim(), $options: 'i' } },
        { summary: { $regex: search.trim(), $options: 'i' } }
      ];
    }

    const topics = await GrammarTopic.find(query).sort({ order: 1, level: 1 }).lean();

    res.status(200).json({
      success: true,
      count: topics.length,
      topics
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @route   GET /api/grammar/:slug
 * @desc    Get specific grammar topic with full explanation and exercises
 * @access  Public
 */
export const getGrammarTopicBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const topic = await GrammarTopic.findOne({ slug, language: 'de' });
    if (!topic) {
      return res.status(404).json({
        success: false,
        message: 'Grammar topic not found.'
      });
    }

    const exercises = await Exercise.find({ topicId: topic._id });

    res.status(200).json({
      success: true,
      topic,
      exercises
    });
  } catch (err) {
    next(err);
  }
};
