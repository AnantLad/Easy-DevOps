import Score from '../models/Score.js';
import User from '../models/User.js';
import logger from '../utils/logger.js';

export const scoreService = {
  async addScore(userId, taskId, points, maxPoints, feedback = null) {
    try {
      const percentage = (points / maxPoints) * 100;

      const score = await Score.findOneAndUpdate(
        { userId, taskId },
        {
          points,
          maxPoints,
          percentage,
          feedback,
          isCompleted: points === maxPoints,
          completedAt: points === maxPoints ? new Date() : null,
          $inc: { attempts: 1 },
        },
        { new: true, upsert: true }
      );

      // Update user's total score
      const totalScore = await Score.aggregate([
        { $match: { userId } },
        { $group: { _id: null, total: { $sum: '$points' } } },
      ]);

      await User.findByIdAndUpdate(userId, {
        'profile.totalScore': totalScore[0]?.total || 0,
      });

      logger.info(`Score added for user ${userId} on task ${taskId}`);
      return score;
    } catch (error) {
      logger.error(`Add score error: ${error.message}`);
      throw error;
    }
  },

  async getUserScores(userId) {
    try {
      const scores = await Score.find({ userId }).sort({ createdAt: -1 });
      return scores;
    } catch (error) {
      logger.error(`Get user scores error: ${error.message}`);
      throw error;
    }
  },

  async getTaskScores(taskId) {
    try {
      const scores = await Score.find({ taskId })
        .populate('userId', 'username email')
        .sort({ points: -1 });
      return scores;
    } catch (error) {
      logger.error(`Get task scores error: ${error.message}`);
      throw error;
    }
  },
};

export default scoreService;
