# DSA Platform API Documentation

Base URL: `http://localhost:5000/api`

## Authentication

All protected endpoints require JWT token in Authorization header:
```
Authorization: Bearer <token>
```

---

## Auth Endpoints

### Register User
```http
POST /api/auth/register
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Login User
```http
POST /api/auth/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Google OAuth Login
```http
POST /api/auth/google
```

**Request Body:**
```json
{
  "googleId": "1234567890",
  "email": "john@example.com",
  "name": "John Doe",
  "avatar": "https://lh3.googleusercontent.com/..."
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

## Problem Endpoints

### Get All Problems
```http
GET /api/problems
```

**Query Parameters:**
- `category` (optional): Filter by category (e.g., "Arrays", "Trees")
- `difficulty` (optional): Filter by difficulty ("Easy", "Medium", "Hard")
- `search` (optional): Search by title

**Example:**
```http
GET /api/problems?category=Arrays&difficulty=Easy
```

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "id": 1,
    "title": "Two Sum",
    "difficulty": "Easy",
    "category": "Arrays",
    "topics": ["Array", "Hash Table"],
    "description": "Given an array of integers...",
    "acceptanceRate": 45.2
  }
]
```

### Get Problem by ID
```http
GET /api/problems/:id
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "id": 1,
  "title": "Two Sum",
  "difficulty": "Easy",
  "category": "Arrays",
  "topics": ["Array", "Hash Table"],
  "description": "Given an array of integers nums and an integer target...",
  "inputFormat": "nums: List[int], target: int",
  "outputFormat": "List[int]",
  "constraints": "2 <= nums.length <= 10^4",
  "examples": [
    {
      "input": "nums = [2,7,11,15], target = 9",
      "output": "[0,1]",
      "explanation": "nums[0] + nums[1] == 9"
    }
  ],
  "starterCode": {
    "python": "def twoSum(nums, target):\n    pass",
    "java": "class Solution {...}",
    "cpp": "class Solution {...}"
  },
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(n)",
  "hints": ["Use a hash map", "Check if complement exists"],
  "testCases": [
    {
      "input": {"nums": [2,7,11,15], "target": 9},
      "output": [0,1]
    }
  ]
}
```

### Create Problem (Admin)
```http
POST /api/problems
```
**Protected Route** - Requires authentication

**Request Body:**
```json
{
  "title": "New Problem",
  "difficulty": "Medium",
  "category": "Arrays",
  "topics": ["Array", "Dynamic Programming"],
  "description": "Problem description...",
  "examples": [...],
  "starterCode": {...},
  "testCases": [...]
}
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "title": "New Problem",
  "difficulty": "Medium",
  ...
}
```

---

## Submission Endpoints

### Submit Solution
```http
POST /api/submissions
```
**Protected Route** - Requires authentication

**Request Body:**
```json
{
  "problemId": "507f1f77bcf86cd799439011",
  "code": "def twoSum(nums, target):\n    seen = {}\n    ...",
  "language": "python"
}
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439013",
  "userId": "507f1f77bcf86cd799439010",
  "problemId": "507f1f77bcf86cd799439011",
  "code": "def twoSum(nums, target):...",
  "language": "python",
  "status": "Accepted",
  "runtime": 45,
  "memory": 14.2,
  "testCasesPassed": 5,
  "totalTestCases": 5,
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

**Possible Status Values:**
- `Accepted`
- `Wrong Answer`
- `Time Limit Exceeded`
- `Runtime Error`
- `Compilation Error`

### Get User Submissions
```http
GET /api/submissions/user
```
**Protected Route** - Requires authentication

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439013",
    "problemId": {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Two Sum",
      "difficulty": "Easy"
    },
    "language": "python",
    "status": "Accepted",
    "runtime": 45,
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
]
```

---

## User Endpoints

### Get User Profile
```http
GET /api/users/profile
```
**Protected Route** - Requires authentication

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439010",
  "name": "John Doe",
  "email": "john@example.com",
  "avatar": "https://...",
  "solvedProblems": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Two Sum",
      "difficulty": "Easy",
      "category": "Arrays"
    }
  ],
  "savedProblems": [...],
  "streak": 7,
  "lastActive": "2024-01-15T10:30:00.000Z",
  "progress": {
    "easy": 25,
    "medium": 15,
    "hard": 5
  },
  "learningPath": {
    "beginner": {
      "completed": false,
      "progress": 60
    },
    "intermediate": {
      "completed": false,
      "progress": 30
    },
    "advanced": {
      "completed": false,
      "progress": 10
    }
  },
  "achievements": [
    {
      "name": "First Problem Solved",
      "earnedAt": "2024-01-10T08:00:00.000Z"
    }
  ]
}
```

### Update User Profile
```http
PUT /api/users/profile
```
**Protected Route** - Requires authentication

**Request Body:**
```json
{
  "name": "John Smith",
  "avatar": "https://new-avatar-url.com/image.jpg"
}
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439010",
  "name": "John Smith",
  "email": "john@example.com",
  "avatar": "https://new-avatar-url.com/image.jpg",
  ...
}
```

### Save Problem
```http
POST /api/users/save-problem/:problemId
```
**Protected Route** - Requires authentication

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439010",
  "savedProblems": [
    "507f1f77bcf86cd799439011",
    "507f1f77bcf86cd799439012"
  ],
  ...
}
```

### Get Leaderboard
```http
GET /api/users/leaderboard
```

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439010",
    "name": "John Doe",
    "avatar": "https://...",
    "progress": {
      "easy": 50,
      "medium": 30,
      "hard": 10
    }
  },
  {
    "_id": "507f1f77bcf86cd799439014",
    "name": "Jane Smith",
    "avatar": "https://...",
    "progress": {
      "easy": 45,
      "medium": 28,
      "hard": 8
    }
  }
]
```

---

## Error Responses

### 400 Bad Request
```json
{
  "message": "Invalid input data"
}
```

### 401 Unauthorized
```json
{
  "message": "No token, authorization denied"
}
```

### 404 Not Found
```json
{
  "message": "Problem not found"
}
```

### 500 Server Error
```json
{
  "message": "Server error"
}
```

---

## Rate Limiting

- **Anonymous users**: 100 requests per 15 minutes
- **Authenticated users**: 1000 requests per 15 minutes
- **Admin users**: Unlimited

---

## Pagination

For endpoints returning lists, use query parameters:
```http
GET /api/problems?page=1&limit=20
```

**Response includes:**
```json
{
  "data": [...],
  "pagination": {
    "currentPage": 1,
    "totalPages": 25,
    "totalItems": 500,
    "itemsPerPage": 20
  }
}
```

---

## Webhooks (Future)

Subscribe to events:
- `problem.solved`
- `submission.created`
- `user.achievement`

---

## SDK Examples

### JavaScript/Node.js
```javascript
const axios = require('axios');

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

// Get all problems
const problems = await api.get('/problems');

// Submit solution
const submission = await api.post('/submissions', {
  problemId: '507f1f77bcf86cd799439011',
  code: 'def twoSum(nums, target):...',
  language: 'python'
});
```

### Python
```python
import requests

headers = {
    'Authorization': f'Bearer {token}'
}

# Get all problems
response = requests.get('http://localhost:5000/api/problems', headers=headers)
problems = response.json()

# Submit solution
data = {
    'problemId': '507f1f77bcf86cd799439011',
    'code': 'def twoSum(nums, target):...',
    'language': 'python'
}
response = requests.post('http://localhost:5000/api/submissions', json=data, headers=headers)
submission = response.json()
```

---

## Testing

Use Postman collection: [Download](./postman_collection.json)

Or use curl:
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"pass123"}'

# Get problems
curl http://localhost:5000/api/problems

# Submit solution (with auth)
curl -X POST http://localhost:5000/api/submissions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"problemId":"123","code":"...","language":"python"}'
```

---

## Support

For API issues or questions:
- Email: api-support@dsaplatform.com
- GitHub: Open an issue
- Discord: #api-help channel
