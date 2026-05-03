import { runVaildator } from "../Services/validationService.js";

export const ValidationController = {
  validateTask: async (req, res, next) => {
    try {
      const { taskId } = req.params;
      const { input } = req.body;

      const result = await runVaildator(taskId, input);

      res.status(200).json({
        success: result.success,
        message: result.message,
        taskId,
        input,
      });
    } catch (err) {
      next(err);
    }
  }
};