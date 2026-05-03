import TaskProgress from '../models/TaskProgress.js';
import Score from '../models/Score.js';
import User from '../models/User.js';
import logger from '../utils/logger.js';

export const progressService = {
  async getUserProgress(userId) {
    try {
      const taskProgress = await TaskProgress.find({ userId });
      const scores = await Score.find({ userId });
      const user = await User.findById(userId);

      const totalCompleted = taskProgress.filter((t) => t.completed).length;
      const totalScore = scores.reduce((sum, s) => sum + s.points, 0);

      return {
        user: {
          username: user.username,
          level: user.profile.level,
        },
        taskProgress,
        scores,
        summary: {
          totalTasks: taskProgress.length,
          completedTasks: totalCompleted,
          totalScore,
          labsCompleted: user.profile.labsCompleted,
        },
      };
    } catch (error) {
      logger.error(`Get user progress error: ${error.message}`);
      throw error;
    }
  },

  async updateTaskProgress(userId, taskId, completed, score) {
    try {
      const progress = await TaskProgress.findOneAndUpdate(
        { userId, taskId },
        {
          completed,
          score,
          completedAt: completed ? new Date() : null,
          $inc: { attempts: 1 },
        },
        { new: true, upsert: true }
      );

      return progress;
    } catch (error) {
      logger.error(`Update task progress error: ${error.message}`);
      throw error;
    }
  },

  async getLeaderboard(limit = 10) {
    try {
      const leaderboard = await User.find({})
        .select('username profile.level profile.totalScore profile.labsCompleted')
        .sort({ 'profile.totalScore': -1 })
        .limit(limit);

      return leaderboard;
    } catch (error) {
      logger.error(`Get leaderboard error: ${error.message}`);
      throw error;
    }
  },
};

export default progressService;
