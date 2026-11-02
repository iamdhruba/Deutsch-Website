import { Router } from 'express';
import {
  getWords,
  getWordById,
  toggleSaveWord,
  getSavedWordIds,
  getReviewQueue,
  submitReview
} from '../controllers/wordController.js';
import { requireAuth, optionalAuth } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', optionalAuth, getWords);
router.get('/review/queue', optionalAuth, getReviewQueue);
router.get('/user/saved-ids', requireAuth, getSavedWordIds);
router.get('/:id', optionalAuth, getWordById);
router.post('/:id/save', requireAuth, toggleSaveWord);
router.post('/:id/review', optionalAuth, submitReview);

export default router;
