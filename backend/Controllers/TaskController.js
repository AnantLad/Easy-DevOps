import { successResponse, errorResponse } from '../utils/responseHandler.js';
import { loadTasks, getTaskById, getAllTasks } from '../utils/taskLoader.js';
import logger from '../utils/logger.js';

export const TaskController = {
  async getAllTasks(req, res, next) {
    try {
      const tasks = getAllTasks();

      return successResponse(res, 'Tasks retrieved successfully', { tasks });
    } catch (error) {
      logger.error(`Get all tasks controller error: ${error.message}`);
      next(error);
    }
  },

  async getTaskById(req, res, next) {
    try {
      const { taskId } = req.params;

      const task = getTaskById(taskId);

      if (!task) {
        return errorResponse(res, 'Task not found', 404);
      }

      return successResponse(res, 'Task retrieved successfully', { task });
    } catch (error) {
      logger.error(`Get task by ID controller error: ${error.message}`);
      next(error);
    }
  },

  async getTasksByCategory(req, res, next) {
    try {
      const { category } = req.params;

      const tasks = getAllTasks().filter((task) => task.category === category);

      return successResponse(res, 'Tasks retrieved successfully', { tasks });
    } catch (error) {
      logger.error(`Get tasks by category controller error: ${error.message}`);
      next(error);
    }
  },
};

export default TaskController;
