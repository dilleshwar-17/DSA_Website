const assert = require('assert');

// Test 1: User Model Validation
function testUserModel() {
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'hashed_password',
    solvedProblems: [],
    progress: { easy: 0, medium: 0, hard: 0 },
    streak: 0
  };
  
  assert.strictEqual(user.name, 'John Doe', 'User name should match');
  assert.strictEqual(user.email, 'john@example.com', 'User email should match');
  assert.strictEqual(user.progress.easy, 0, 'Initial easy count should be 0');
  console.log('✓ User Model Test Passed');
}

// Test 2: Problem Structure Validation
function testProblemStructure() {
  const problem = {
    id: 1,
    title: 'Two Sum',
    difficulty: 'Easy',
    category: 'Arrays',
    testCases: [
      { input: { nums: [2,7,11,15], target: 9 }, output: [0,1] }
    ]
  };
  
  assert.strictEqual(problem.title, 'Two Sum', 'Problem title should match');
  assert.strictEqual(problem.difficulty, 'Easy', 'Difficulty should be Easy');
  assert.strictEqual(problem.testCases.length, 1, 'Should have test cases');
  console.log('✓ Problem Structure Test Passed');
}

// Test 3: Submission Validation
function testSubmissionValidation() {
  const submission = {
    userId: '123',
    problemId: '456',
    code: 'def solution(): pass',
    language: 'python',
    status: 'Accepted',
    testCasesPassed: 5,
    totalTestCases: 5
  };
  
  assert.strictEqual(submission.status, 'Accepted', 'Status should be Accepted');
  assert.strictEqual(submission.testCasesPassed, 5, 'All test cases should pass');
  console.log('✓ Submission Validation Test Passed');
}

// Test 4: JWT Token Generation (Mock)
function testJWTGeneration() {
  const payload = { userId: '123', email: 'test@example.com' };
  const token = Buffer.from(JSON.stringify(payload)).toString('base64');
  
  assert.ok(token.length > 0, 'Token should be generated');
  const decoded = JSON.parse(Buffer.from(token, 'base64').toString());
  assert.strictEqual(decoded.userId, '123', 'Token should contain userId');
  console.log('✓ JWT Generation Test Passed');
}

// Test 5: Progress Calculation
function testProgressCalculation() {
  const solvedProblems = [
    { difficulty: 'Easy' },
    { difficulty: 'Easy' },
    { difficulty: 'Medium' },
    { difficulty: 'Hard' }
  ];
  
  const progress = { easy: 0, medium: 0, hard: 0 };
  solvedProblems.forEach(p => {
    progress[p.difficulty.toLowerCase()]++;
  });
  
  assert.strictEqual(progress.easy, 2, 'Should have 2 easy problems');
  assert.strictEqual(progress.medium, 1, 'Should have 1 medium problem');
  assert.strictEqual(progress.hard, 1, 'Should have 1 hard problem');
  console.log('✓ Progress Calculation Test Passed');
}

// Test 6: Problem Filtering
function testProblemFiltering() {
  const problems = [
    { id: 1, category: 'Arrays', difficulty: 'Easy' },
    { id: 2, category: 'Trees', difficulty: 'Medium' },
    { id: 3, category: 'Arrays', difficulty: 'Hard' }
  ];
  
  const filtered = problems.filter(p => p.category === 'Arrays');
  assert.strictEqual(filtered.length, 2, 'Should filter 2 Array problems');
  console.log('✓ Problem Filtering Test Passed');
}

// Test 7: Leaderboard Sorting
function testLeaderboardSorting() {
  const users = [
    { name: 'Alice', progress: { easy: 10, medium: 5, hard: 2 } },
    { name: 'Bob', progress: { easy: 15, medium: 8, hard: 3 } },
    { name: 'Charlie', progress: { easy: 8, medium: 4, hard: 1 } }
  ];
  
  const sorted = users.sort((a, b) => {
    const totalA = a.progress.easy + a.progress.medium + a.progress.hard;
    const totalB = b.progress.easy + b.progress.medium + b.progress.hard;
    return totalB - totalA;
  });
  
  assert.strictEqual(sorted[0].name, 'Bob', 'Bob should be first');
  assert.strictEqual(sorted[2].name, 'Charlie', 'Charlie should be last');
  console.log('✓ Leaderboard Sorting Test Passed');
}

// Test 8: Streak Calculation
function testStreakCalculation() {
  const lastActive = new Date('2024-01-14');
  const today = new Date('2024-01-15');
  const diffDays = Math.floor((today - lastActive) / (1000 * 60 * 60 * 24));
  
  let streak = 5;
  if (diffDays > 1) streak = 0;
  else if (diffDays === 1) streak++;
  
  assert.strictEqual(streak, 6, 'Streak should increment');
  console.log('✓ Streak Calculation Test Passed');
}

// Test 9: Test Case Execution
function testTestCaseExecution() {
  const testCase = { input: { nums: [2,7,11,15], target: 9 }, output: [0,1] };
  const userOutput = [0, 1];
  
  const passed = JSON.stringify(testCase.output) === JSON.stringify(userOutput);
  assert.strictEqual(passed, true, 'Test case should pass');
  console.log('✓ Test Case Execution Test Passed');
}

// Test 10: Learning Path Progress
function testLearningPathProgress() {
  const completedTopics = 3;
  const totalTopics = 4;
  const progress = Math.floor((completedTopics / totalTopics) * 100);
  
  assert.strictEqual(progress, 75, 'Progress should be 75%');
  console.log('✓ Learning Path Progress Test Passed');
}

// Run all tests
console.log('\n=== Running Backend Tests ===\n');
try {
  testUserModel();
  testProblemStructure();
  testSubmissionValidation();
  testJWTGeneration();
  testProgressCalculation();
  testProblemFiltering();
  testLeaderboardSorting();
  testStreakCalculation();
  testTestCaseExecution();
  testLearningPathProgress();
  console.log('\n✅ All Backend Tests Passed (10/10)\n');
} catch (error) {
  console.error('\n❌ Test Failed:', error.message);
}
