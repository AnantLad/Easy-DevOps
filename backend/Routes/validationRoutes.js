import express from 'express';
import { ValidationController } from '../controllers/validationController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { validateRequest, taskValidation } from '../middleware/validateRequest.js';

const router = express.Router();

router.post(
  '/:taskId',
  authMiddleware,
  validateRequest(taskValidation),
  ValidationController.validateTask
);

export default router;