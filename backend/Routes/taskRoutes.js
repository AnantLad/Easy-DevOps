import express from 'express';
import TaskController from '../controllers/TaskController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', TaskController.getAllTasks);
router.get('/category/:category', TaskController.getTasksByCategory);
router.get('/:taskId', TaskController.getTaskById);

export default router;
