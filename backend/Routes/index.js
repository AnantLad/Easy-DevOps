import express from 'express';
import labRoute from './labRoutes.js';
import validationRoute from './validationRoutes.js';
import authRoutes from './authRoutes.js';
import progressRoutes from './progressRoutes.js';
import scoreRoutes from './scoreRoutes.js';
import taskRoutes from './taskRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/labs', labRoute);
router.use('/validation', validationRoute);
router.use('/progress', progressRoutes);
router.use('/scores', scoreRoutes);
router.use('/tasks', taskRoutes);

export default router;
