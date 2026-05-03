import express from 'express';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { connectRedis } from './config/redis.js';
import { initTerminalSocket } from './sockets/terminalSocket.js';
import routes from './routes/index.js';
import errorMiddleware from './middleware/errorMiddleware.js';
import { generalLimiter } from './middleware/rateLimiter.js';
import logger from './utils/logger.js';
import config from './config/config.js';
import cleanupWorker from './workers/cleanupWorker.js';

dotenv.config();

const app = express();
const server = http.createServer(app);

// Initialize database connections
await connectDB();
await connectRedis();

// Middleware
app.use(helmet());
app.use(cors(config.cors));
app.use(morgan('dev'));
app.use(generalLimiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api', routes);

// Error handling middleware
app.use(errorMiddleware);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    timestamp: new Date().toISOString(),
  });
});

// Initialize WebSocket
initTerminalSocket(server);

// Start cleanup worker
cleanupWorker;

// Start server
server.listen(config.port, () => {
  logger.info(`Server listening on port ${config.port}`);
});