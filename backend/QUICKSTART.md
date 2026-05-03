# 🚀 Quick Start Guide

## Prerequisites

- Node.js 18+ 
- MongoDB 6+
- Redis 7+
- Docker (for lab environments)

## Installation (5 minutes)

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment
Copy example env and update values:
```bash
cp .env.example .env
```

Edit `.env` and set:
```env
MONGODB_URI=mongodb://localhost:27017/easy-devops
REDIS_HOST=localhost
JWT_SECRET=your_secret_key_here
```

### 3. Start Services

**Option A: Local Development**
```bash
# Terminal 1: Start MongoDB
mongod

# Terminal 2: Start Redis
redis-server

# Terminal 3: Start Backend
npm run dev
```

**Option B: Docker Compose (Recommended)**
```bash
docker-compose up -d
```

### 4. Verify Installation
```bash
curl http://localhost:5000/
```

Expected response:
```json
{
  "success": true,
  "message": "API is running"
}
```

## Basic API Usage

### 1. Sign Up
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123",
    "firstName": "Test",
    "lastName": "User"
  }'
```

Response:
```json
{
  "success": true,
  "data": {
    "user": { ... },
    "accessToken": "eyJhbGc..."
  }
}
```

### 2. Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### 3. Get Profile (Authenticated)
```bash
curl -X GET http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### 4. Get All Tasks
```bash
curl -X GET http://localhost:5000/api/tasks
```

### 5. Start a Lab
```bash
curl -X POST http://localhost:5000/api/labs/start \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "taskId": "task1"
  }'
```

### 6. Get User Progress
```bash
curl -X GET http://localhost:5000/api/progress/user \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## Project Structure Overview

```
backend/
├── config/        - Configuration (database, redis)
├── controllers/   - Request handlers
├── services/      - Business logic
├── models/        - Database schemas
├── routes/        - API endpoints
├── middleware/    - Auth, validation, errors
├── utils/         - Helpers (logger, tokens)
├── workers/       - Background jobs
├── scripts/       - Bash validators
└── tasks/         - Task definitions (JSON)
```

## Common Commands

```bash
# Development
npm run dev

# Production
npm start

# Run tests
npm test

# Lint code
npm run lint

# Format code
npm run format
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| NODE_ENV | Environment | development |
| MONGODB_URI | Database URL | localhost |
| REDIS_HOST | Cache host | localhost |
| JWT_SECRET | Token secret | required |
| LOG_LEVEL | Log verbosity | info |

## Useful API Endpoints

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| POST | /api/auth/signup | ❌ | Register |
| POST | /api/auth/login | ❌ | Login |
| GET | /api/auth/profile | ✅ | Get profile |
| POST | /api/labs/start | ✅ | Start lab |
| GET | /api/tasks | ❌ | List tasks |
| GET | /api/progress/user | ✅ | Get progress |
| POST | /api/validation/:id | ✅ | Validate task |

## Troubleshooting

### MongoDB Connection Error
```bash
# Verify MongoDB is running
mongod --version

# Start MongoDB
mongod
```

### Redis Connection Error
```bash
# Verify Redis is running
redis-cli ping

# Start Redis
redis-server
```

### Port Already in Use
```bash
# Change port in .env
PORT=3000

# Or kill process on port 5000
lsof -i :5000
kill -9 <PID>
```

### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## Testing the Full Flow

1. **Sign up** → Get access token
2. **Start lab** → Get session ID
3. **Get tasks** → See available tasks
4. **Validate task** → Check task completion
5. **Get progress** → See overall progress

## Documentation

- **API Docs**: See `docs/api.md`
- **Architecture**: See `docs/architecture.md`
- **Full Guide**: See `README.md`

## Next Steps

1. ✅ Backend running locally or in Docker
2. 📦 Connect frontend to backend API
3. 🧪 Run integration tests
4. 🚀 Deploy to production

## Need Help?

- Check `docs/` folder for detailed documentation
- Review test files in `tests/` for examples
- Check `IMPLEMENTATION_SUMMARY.md` for complete file listing

Happy coding! 🎉
