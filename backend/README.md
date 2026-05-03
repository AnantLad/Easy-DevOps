# Easy DevOps Backend

A comprehensive learning platform for DevOps and containerization technologies with interactive labs, real-time terminal, and task validation.

## Features

- 🔐 **User Authentication** - JWT-based authentication system
- 🏋️ **Interactive Labs** - Hands-on Linux, Docker, and Kubernetes environments
- ✅ **Task Validation** - Automated task validation scripts
- 📊 **Progress Tracking** - Real-time progress monitoring
- 🏆 **Leaderboard** - Competitive scoring system
- 💾 **Job Queue** - BullMQ for async processing
- 🔄 **Real-time Updates** - Socket.io for live terminal streaming
- 🧹 **Auto Cleanup** - Scheduled cleanup of expired labs

## Tech Stack

- **Runtime:** Node.js 18+
- **Framework:** Express.js 5.x
- **Database:** MongoDB 6.x
- **Cache:** Redis 7.x
- **Queue:** BullMQ
- **Container:** Docker
- **Authentication:** JWT
- **Logging:** Winston

## Prerequisites

- Node.js 18+ installed
- MongoDB 6+ running
- Redis 7+ running
- Docker installed (for lab environments)
- npm or yarn package manager

## Installation

1. **Clone the repository**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create .env file**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/easy-devops
   REDIS_HOST=localhost
   REDIS_PORT=6379
   JWT_SECRET=your_secret_key
   ```

## Quick Start

### Using npm
```bash
# Development
npm run dev

# Production
npm run build
npm start
```

### Using Docker Compose
```bash
docker-compose up -d
```

This will start:
- MongoDB on port 27017
- Redis on port 6379
- Backend API on port 5000

## Project Structure

```
backend/
├── config/          - Configuration files
├── controllers/     - Request handlers
├── routes/          - API endpoints
├── models/          - MongoDB schemas
├── services/        - Business logic
├── middleware/      - Express middleware
├── utils/           - Helper utilities
├── constants/       - App constants
├── workers/         - Job processors
├── sockets/         - WebSocket handlers
├── scripts/         - Validation scripts
├── tasks/           - Task definitions
├── templates/       - Docker files
├── docs/            - API documentation
└── tests/           - Test files
```

## API Documentation

See [docs/api.md](./docs/api.md) for complete API documentation.

### Key Endpoints

- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/labs/start` - Start a lab session
- `GET /api/tasks` - Get all tasks
- `POST /api/validation/:taskId` - Validate a task
- `GET /api/progress/user` - Get user progress
- `GET /api/progress/leaderboard` - Get leaderboard

## Development

### Running Tests
```bash
npm test
```

### Linting
```bash
npm run lint
```

### Database Migrations
```bash
npm run migrate
```

## Architecture

See [docs/architecture.md](./docs/architecture.md) for detailed architecture information.

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| NODE_ENV | Environment mode | development |
| PORT | Server port | 5000 |
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/easy-devops |
| REDIS_HOST | Redis host | localhost |
| REDIS_PORT | Redis port | 6379 |
| JWT_SECRET | JWT signing secret | your_secret_key |
| DOCKER_IMAGE | Default Docker image | ubuntu:22.04 |
| LAB_TIMEOUT | Lab session timeout (ms) | 3600000 |

## Database

### Collections

- **users** - User accounts and profiles
- **labsessions** - Active lab sessions
- **tasks** - Task definitions
- **taskprogresses** - User progress tracking
- **scores** - User scoring

### Connection

MongoDB is required for data persistence. Make sure MongoDB is running before starting the server.

```bash
# Start MongoDB (if using local instance)
mongod
```

## Queue System

The application uses BullMQ for job processing:

- **Lab Queue** - Processes lab creation jobs
- **Validation Queue** - Processes task validation
- **Cleanup Queue** - Scheduled cleanup jobs

Jobs are processed by workers in the `/workers` directory.

## WebSocket Events

### Lab Terminal Events

- `joinLab` - Connect to lab terminal
- `input` - Send command to terminal
- `output` - Receive terminal output
- `disconnect` - Disconnect from terminal
- `error` - Error event

## Logging

Logs are saved to `/logs` directory:

- `combined.log` - All logs
- `error.log` - Error logs only

Logging level can be configured via `LOG_LEVEL` environment variable.

## Security

- JWT-based authentication
- Rate limiting on sensitive endpoints
- CORS configuration
- Helmet for HTTP headers
- Password hashing with bcryptjs

## Docker

### Building Image
```bash
docker build -t easy-devops-backend .
```

### Running Container
```bash
docker run -p 5000:5000 \
  -e MONGODB_URI=mongodb://host.docker.internal:27017/easy-devops \
  -e REDIS_HOST=host.docker.internal \
  easy-devops-backend
```

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## License

This project is licensed under the ISC License - see LICENSE file for details.

## Support

For issues and questions:
- Create an issue on GitHub
- Check existing documentation
- Contact the development team

## Roadmap

- [ ] GraphQL support
- [ ] Advanced caching strategies
- [ ] Performance monitoring
- [ ] Enhanced security features
- [ ] Mobile API support
- [ ] Advanced analytics
