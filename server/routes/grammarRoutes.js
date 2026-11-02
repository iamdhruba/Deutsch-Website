import { Router } from 'express';
import {
  getGrammarTopics,
  getGrammarTopicBySlug
} from '../controllers/grammarController.js';

const router = Router();

router.get('/', getGrammarTopics);
router.get('/:slug', getGrammarTopicBySlug);

export default router;
