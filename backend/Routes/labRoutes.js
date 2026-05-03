import express from 'express';
import { LabController } from "../Controllers/labController.js"
import { authMiddleware } from '../middleware/authMiddleware.js';
import { labLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.post('/start', labLimiter, authMiddleware, LabController.startLab);
router.get('/:sessionId', authMiddleware, LabController.getLabSession);
router.delete('/:sessionId', authMiddleware, LabController.stopLab);
router.get('/user/sessions', authMiddleware, LabController.getUserLabSessions);

export default router;