import express from 'express';
import ProgressController from '../controllers/ProgressController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/user', authMiddleware, ProgressController.getUserProgress);
router.get('/leaderboard', ProgressController.getLeaderboard);

export default router;
