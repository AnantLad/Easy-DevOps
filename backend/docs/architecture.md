# Easy DevOps Architecture

## Overview
Easy DevOps is a full-stack learning platform for DevOps and containerization technologies.

## Architecture Components

### Backend Stack
- **Runtime:** Node.js 18
- **Framework:** Express.js 5.x
- **Database:** MongoDB 6.x
- **Cache:** Redis 7.x
- **Queue:** BullMQ (Job Queue)
- **Container:** Docker
- **Authentication:** JWT

### Directory Structure

```
backend/
├── config/          - Configuration files (database, redis, app)
├── controllers/     - Request handlers
├── routes/          - API routes
├── models/          - Mongoose schemas
├── services/        - Business logic
├── middleware/      - Express middleware
├── utils/           - Utility functions
├── constants/       - Application constants
├── workers/         - Job workers
├── sockets/         - WebSocket handlers
├── scripts/         - Bash scripts and validators
├── tasks/           - Task definitions (JSON)
├── templates/       - Docker files
├── docs/            - Documentation
└── logs/            - Application logs
```

### Data Flow

1. **Client Request** → Express Router
2. **Middleware** → Authentication, Validation, Rate Limiting
3. **Controller** → Request Handling
4. **Service** → Business Logic
5. **Model** → Database Operations
6. **Response** → Client

### Queue Processing

1. Lab start request → Queue job
2. Worker picks up job
3. Docker container created
4. Session updated in database
5. Client notified via WebSocket

### Real-time Communication

- Socket.io for terminal streaming
- WebSocket for bi-directional communication
- Event-based updates

## API Structure

- `/api/auth` - Authentication endpoints
- `/api/labs` - Lab management
- `/api/tasks` - Task definitions
- `/api/validation` - Task validation
- `/api/progress` - User progress tracking
- `/api/scores` - Scoring system

## Database Schema

### Collections
- `users` - User accounts and profiles
- `labsessions` - Active lab sessions
- `tasks` - Task definitions
- `taskprogresses` - User task progress
- `scores` - User scores

### Indexes
- User email/username (unique)
- Lab session userId, status
- Task progress userId, taskId (unique)
