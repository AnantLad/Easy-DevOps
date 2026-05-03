# Easy DevOps API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All authenticated endpoints require a JWT token in the `Authorization` header:
```
Authorization: Bearer <token>
```

## Endpoints

### Authentication

#### Sign Up
- **POST** `/auth/signup`
- **Request Body:**
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string",
    "firstName": "string",
    "lastName": "string"
  }
  ```

#### Login
- **POST** `/auth/login`
- **Request Body:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

#### Get Profile
- **GET** `/auth/profile` (Protected)

#### Update Profile
- **PATCH** `/auth/profile` (Protected)

### Labs

#### Start Lab
- **POST** `/labs/start` (Protected)
- **Request Body:**
  ```json
  {
    "taskId": "string"
  }
  ```

#### Get Lab Session
- **GET** `/labs/:sessionId` (Protected)

#### Stop Lab
- **DELETE** `/labs/:sessionId` (Protected)

#### Get User Lab Sessions
- **GET** `/labs/user/sessions` (Protected)

### Tasks

#### Get All Tasks
- **GET** `/tasks`

#### Get Task by ID
- **GET** `/tasks/:taskId`

#### Get Tasks by Category
- **GET** `/tasks/category/:category`

### Progress

#### Get User Progress
- **GET** `/progress/user` (Protected)

#### Get Leaderboard
- **GET** `/progress/leaderboard`

### Scores

#### Add Score
- **POST** `/scores` (Protected)
- **Request Body:**
  ```json
  {
    "taskId": "string",
    "points": "number",
    "maxPoints": "number",
    "feedback": "string"
  }
  ```

#### Get User Scores
- **GET** `/scores/user` (Protected)

#### Get Task Scores
- **GET** `/scores/task/:taskId`

### Validation

#### Validate Task
- **POST** `/validation/:taskId` (Protected)
- **Request Body:**
  ```json
  {
    "sessionId": "string"
  }
  ```

## Error Responses

All error responses follow this format:
```json
{
  "success": false,
  "message": "Error message",
  "timestamp": "2024-01-01T00:00:00Z"
}
```

## Status Codes

- `200` - OK
- `201` - Created
- `202` - Accepted
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error
