import cron from 'node-cron';
import LabSession from '../models/LabSession.js';
import { cleanupLabContainer } from '../utils/cleanup.js';
import logger from '../utils/logger.js';

// Run cleanup every hour
export const cleanupWorker = cron.schedule('0 * * * *', async () => {
  try {
    logger.info('Starting lab cleanup job');

    const expiredLabs = await LabSession.find({
      expireTime: { $lt: new Date() },
      status: 'running',
    });

    logger.info(`Found ${expiredLabs.length} expired labs`);

    for (const lab of expiredLabs) {
      try {
        await cleanupLabContainer(lab.containerId);
        lab.status = 'stopped';
        lab.endTime = new Date();
        await lab.save();
        logger.info(`Cleaned up lab ${lab._id}`);
      } catch (error) {
        logger.error(`Error cleaning up lab ${lab._id}: ${error.message}`);
      }
    }

    logger.info('Lab cleanup job completed');
  } catch (error) {
    logger.error(`Cleanup worker error: ${error.message}`);
  }
});

export default cleanupWorker;
