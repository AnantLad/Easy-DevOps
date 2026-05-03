import express from 'express';
import ScoreController from '../controllers/ScoreController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, ScoreController.addScore);
router.get('/user', authMiddleware, ScoreController.getUserScores);
router.get('/task/:taskId', ScoreController.getTaskScores);

export default router;
