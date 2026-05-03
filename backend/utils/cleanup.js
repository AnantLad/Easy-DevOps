import { exec } from 'child_process';
import { promisify } from 'util';
import logger from './logger.js';

const execAsync = promisify(exec);

export const cleanupLabContainer = async (containerId) => {
  try {
    await execAsync(`docker rm -f ${containerId}`);
    logger.info(`Container ${containerId} cleaned up successfully`);
    return true;
  } catch (error) {
    logger.error(`Error cleaning up container ${containerId}: ${error.message}`);
    return false;
  }
};

export const cleanupExpiredLabs = async (labSessions) => {
  const results = [];

  for (const lab of labSessions) {
    try {
      const success = await cleanupLabContainer(lab.containerId);
      results.push({
        labId: lab._id,
        success,
      });
    } catch (error) {
      logger.error(`Cleanup error for lab ${lab._id}: ${error.message}`);
      results.push({
        labId: lab._id,
        success: false,
      });
    }
  }

  return results;
};

export default { cleanupLabContainer, cleanupExpiredLabs };
