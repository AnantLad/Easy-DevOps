import { startLabService } from "../Services/labService.js";

export const LabController = {
  
  startLab: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { taskId } = req.body;

      if (!taskId) {
        return res.status(400).json({
          success: false,
          message: "taskId is required",
        });
      }

      const session = await startLabService(userId, taskId);

      res.status(202).json({
        success: true,
        message: "Lab is starting...",
        data: {
          sessionId: session._id,
          status: session.status,
          taskId: session.taskId,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  getLabSession: async (req, res, next) => {
    try {
      const { sessionId } = req.params;
      // TODO: Fetch lab session from database
      res.status(200).json({
        success: true,
        message: "Lab session retrieved",
        data: {
          sessionId,
          status: "running",
          taskId: null,
        },
      });
    } catch (err) {
      next(err);
    }
  },

  stopLab: async (req, res, next) => {
    try {
      const { sessionId } = req.params;
      // TODO: Stop lab session and cleanup container
      res.status(200).json({
        success: true,
        message: "Lab stopped successfully",
        data: {
          sessionId,
          status: "stopped",
        },
      });
    } catch (err) {
      next(err);
    }
  },

  getUserLabSessions: async (req, res, next) => {
    try {
      const userId = req.user.id;
      // TODO: Fetch user's lab sessions from database
      res.status(200).json({
        success: true,
        message: "User lab sessions retrieved",
        data: {
          sessions: [],
        },
      });
    } catch (err) {
      next(err);
    }
  },
}
