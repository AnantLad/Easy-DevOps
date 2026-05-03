import express from 'express';
import AuthController from '../controllers/AuthController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { authLimiter } from '../middleware/rateLimiter.js';
import { validateRequest, loginValidation, signupValidation } from '../middleware/validateRequest.js';

const router = express.Router();

router.post('/signup', authLimiter, validateRequest(signupValidation), AuthController.signup);
router.post('/login', authLimiter, validateRequest(loginValidation), AuthController.login);
router.get('/profile', authMiddleware, AuthController.getProfile);
router.patch('/profile', authMiddleware, AuthController.updateProfile);

export default router;
