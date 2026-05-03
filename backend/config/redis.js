import IORedis from 'ioredis';
import config from './config.js';
import logger from '../utils/logger.js';

let redis = null;

export const connectRedis = async () => {
  try {
    redis = new IORedis({
      host: config.redis.host,
      port: config.redis.port,
      password: config.redis.password || undefined,
      retryStrategy: (times) => {
        const delay = Math.min(times * 50, 2000);
        return delay;
      },
    });

    redis.on('connect', () => {
      logger.info('Redis connected');
    });

    redis.on('error', (err) => {
      logger.error(`Redis error: ${err.message}`);
    });

    return redis;
  } catch (error) {
    logger.error(`Error connecting to Redis: ${error.message}`);
    process.exit(1);
  }
};

export const getRedis = () => {
  if (!redis) {
    throw new Error('Redis not initialized. Call connectRedis first.');
  }
  return redis;
};

export const disconnectRedis = async () => {
  if (redis) {
    await redis.quit();
    logger.info('Redis disconnected');
  }
};

export default redis;
