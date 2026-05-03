import scoreService from '../services/scoreService.js';
import { successResponse, errorResponse } from '../utils/responseHandler.js';
import logger from '../utils/logger.js';

export const ScoreController = {
  async addScore(req, res, next) {
    try {
      const userId = req.user.id;
      const { taskId, points, maxPoints, feedback } = req.body;

      const score = await scoreService.addScore(userId, taskId, points, maxPoints, feedback);

      return successResponse(res, 'Score added successfully', { score });
    } catch (error) {
      logger.error(`Add score controller error: ${error.message}`);
      next(error);
    }
  },

  async getUserScores(req, res, next) {
    try {
      const userId = req.user.id;

      const scores = await scoreService.getUserScores(userId);

      return successResponse(res, 'User scores retrieved', { scores });
    } catch (error) {
      logger.error(`Get user scores controller error: ${error.message}`);
      next(error);
    }
  },

  async getTaskScores(req, res, next) {
    try {
      const { taskId } = req.params;

      const scores = await scoreService.getTaskScores(taskId);

      return successResponse(res, 'Task scores retrieved', { scores });
    } catch (error) {
      logger.error(`Get task scores controller error: ${error.message}`);
      next(error);
    }
  },
};

export default ScoreController;
