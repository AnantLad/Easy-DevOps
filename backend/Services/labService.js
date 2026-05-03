import LabSession from "../models/LabSession.js";
import { labQueue } from "../queue/labQueue.js";
import logger from "../utils/logger.js";

export const startLabService = async (userId, taskId) => {
    // Create a new lab session in the database
    const session = new LabSession({
        userId,
        taskId,
        status: "starting",
    });

    await session.save();

    // push job to the queue
    await labQueue.add("startLab", {
        userId,
        sessionId: session._id,
        taskId,
    });
    
    logger.info(`Lab session created for user ${userId} with task ${taskId}`);
    return session;
};