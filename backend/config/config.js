import dotenv from 'dotenv';

dotenv.config();

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  
  database: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/easy-devops',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 27017,
    name: process.env.DB_NAME || 'easy-devops',
  },

  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASSWORD || '',
  },

  jwt: {
    secret: process.env.JWT_SECRET || 'easydevops028',
    expiry: process.env.JWT_EXPIRY || '7d',
    refreshSecret: process.env.REFRESH_TOKEN_SECRET || 'easydevops018',
    refreshExpiry: process.env.REFRESH_TOKEN_EXPIRY || '30d',
  },

  docker: {
    host: process.env.DOCKER_HOST || 'unix:///var/run/docker.sock',
    image: process.env.DOCKER_IMAGE || 'ubuntu:22.04',
    network: process.env.DOCKER_NETWORK || 'easy-devops-network',
  },

  lab: {
    timeout: process.env.LAB_TIMEOUT || 3600000, // 1 hour in ms
    memoryLimit: process.env.LAB_MEMORY_LIMIT || '1g',
    cpuLimit: process.env.LAB_CPU_LIMIT || '1.0',
  },

  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  },

  logging: {
    level: process.env.LOG_LEVEL || 'info',
    dir: process.env.LOG_DIR || './logs',
  },
};

export default config;
