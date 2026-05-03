import progressService from '../services/progressService.js';
import { successResponse, errorResponse } from '../utils/responseHandler.js';
import logger from '../utils/logger.js';

export const ProgressController = {
  async getUserProgress(req, res, next) {
    try {
      const userId = req.user.id;

      const progress = await progressService.getUserProgress(userId);

      return successResponse(res, 'User progress retrieved', progress);
    } catch (error) {
      logger.error(`Get user progress controller error: ${error.message}`);
      next(error);
    }
  },

  async getLeaderboard(req, res, next) {
    try {
      const { limit = 10 } = req.query;

      const leaderboard = await progressService.getLeaderboard(parseInt(limit));

      return successResponse(res, 'Leaderboard retrieved', { leaderboard });
    } catch (error) {
      logger.error(`Get leaderboard controller error: ${error.message}`);
      next(error);
    }
  },
};

export default ProgressController;
