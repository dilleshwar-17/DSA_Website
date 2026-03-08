# DSA Learning Platform

A complete full-stack Data Structures and Algorithms learning platform similar to Visualgo, AlgoExpert, and LeetCode.

## Features

- **500+ Coding Problems** - Comprehensive collection categorized by topics and difficulty
- **200+ Algorithm Visualizations** - Interactive visualizations for arrays, trees, graphs, DP, and more
- **Code Playground** - Monaco editor with support for Python, Java, C++, JavaScript
- **Learning Roadmap** - Structured paths from beginner to advanced
- **Progress Tracking** - Detailed analytics and performance metrics
- **Authentication** - JWT and Google OAuth login
- **Dark Mode** - Full dark/light theme support
- **Responsive Design** - Works on all devices

## Tech Stack

### Frontend
- Next.js 14 (React)
- Tailwind CSS
- Framer Motion (animations)
- D3.js (visualizations)
- Monaco Editor (code playground)
- Recharts (analytics charts)

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Passport.js (Google OAuth)

## Project Structure

```
dsa-platform/
├── frontend/
│   ├── components/
│   │   ├── ui/
│   │   │   └── Navbar.js
│   │   ├── visualizations/
│   │   │   ├── ArrayVisualizer.js
│   │   │   ├── TreeVisualizer.js
│   │   │   └── GraphVisualizer.js
│   │   ├── playground/
│   │   └── dashboard/
│   ├── pages/
│   │   ├── index.js (Home)
│   │   ├── problems.js
│   │   ├── problem/[id].js
│   │   ├── visualizations.js
│   │   ├── roadmap.js
│   │   ├── dashboard.js
│   │   ├── leaderboard.js
│   │   ├── login.js
│   │   ├── signup.js
│   │   ├── features.js
│   │   └── pricing.js
│   ├── styles/
│   │   └── globals.css
│   └── package.json
│
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Problem.js
│   │   └── Submission.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── problems.js
│   │   ├── submissions.js
│   │   └── users.js
│   ├── middleware/
│   │   └── auth.js
│   ├── data/
│   │   ├── problems.json (500+ problems)
│   │   └── generate_problems.py
│   ├── server.js
│   └── package.json
│
└── README.md
```

## Installation

### Prerequisites
- Node.js (v16+)
- MongoDB
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/dsa-platform
JWT_SECRET=your-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

4. Start MongoDB:
```bash
mongod
```

5. Start backend server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Open browser at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/google` - Google OAuth login

### Problems
- `GET /api/problems` - Get all problems (with filters)
- `GET /api/problems/:id` - Get problem by ID
- `POST /api/problems` - Create new problem (admin)

### Submissions
- `POST /api/submissions` - Submit solution
- `GET /api/submissions/user` - Get user submissions

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `POST /api/users/save-problem/:id` - Save problem
- `GET /api/users/leaderboard` - Get leaderboard

## Problem Categories

1. **Arrays** (50+ problems)
2. **Binary Search** (40+ problems)
3. **Sliding Window** (35+ problems)
4. **Two Pointers** (30+ problems)
5. **Stacks** (40+ problems)
6. **Queues** (30+ problems)
7. **Heaps** (35+ problems)
8. **Greedy** (40+ problems)
9. **Trees** (60+ problems)
10. **Graphs** (50+ problems)
11. **Backtracking** (45+ problems)
12. **Dynamic Programming** (70+ problems)
13. **Advanced DP** (40+ problems)

## Visualization Categories

1. **Array Algorithms**
   - Binary Search
   - Sorting Algorithms
   - Two Pointers
   - Sliding Window

2. **Tree Algorithms**
   - Tree Traversals
   - BST Operations
   - AVL Trees

3. **Graph Algorithms**
   - BFS/DFS
   - Dijkstra
   - Topological Sort

4. **Dynamic Programming**
   - Knapsack
   - LCS/LIS
   - Coin Change

## Features in Detail

### Code Playground
- Multi-language support (Python, Java, C++, JavaScript)
- Monaco editor with syntax highlighting
- Run code with test cases
- Submit solutions
- Real-time output console

### Progress Tracking
- Problems solved by difficulty
- Daily streak tracking
- Weekly activity charts
- Learning path progress
- Achievements system

### Learning Roadmap
- **Beginner Track**: Arrays, Two Pointers, Sliding Window, Binary Search
- **Intermediate Track**: Stacks, Heaps, Greedy, Trees, Graphs
- **Advanced Track**: Backtracking, DP, Advanced DP

## Database Schema

### User
```javascript
{
  name: String,
  email: String,
  password: String,
  googleId: String,
  solvedProblems: [ObjectId],
  savedProblems: [ObjectId],
  streak: Number,
  progress: { easy, medium, hard },
  learningPath: { beginner, intermediate, advanced }
}
```

### Problem
```javascript
{
  title: String,
  difficulty: String,
  category: String,
  description: String,
  examples: Array,
  starterCode: Object,
  solution: String,
  testCases: Array,
  timeComplexity: String,
  spaceComplexity: String
}
```

### Submission
```javascript
{
  userId: ObjectId,
  problemId: ObjectId,
  code: String,
  language: String,
  status: String,
  runtime: Number,
  memory: Number
}
```

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## License

MIT License

## Contact

For questions or support, please open an issue on GitHub.
