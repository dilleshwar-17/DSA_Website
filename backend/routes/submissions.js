const express = require('express');
const router = express.Router();
const Submission = require('../models/Submission');
const Problem = require('../models/Problem');
const User = require('../models/User');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
  try {
    const { problemId, code, language } = req.body;
    
    const problem = await Problem.findById(problemId);
    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }

    const testCasesPassed = Math.floor(Math.random() * problem.testCases.length) + 1;
    const status = testCasesPassed === problem.testCases.length ? 'Accepted' : 'Wrong Answer';
    
    const submission = new Submission({
      userId: req.user.userId,
      problemId,
      code,
      language,
      status,
      runtime: Math.floor(Math.random() * 100) + 10,
      memory: Math.floor(Math.random() * 50) + 10,
      testCasesPassed,
      totalTestCases: problem.testCases.length
    });
    
    await submission.save();

    if (status === 'Accepted') {
      await User.findByIdAndUpdate(req.user.userId, {
        $addToSet: { solvedProblems: problemId },
        $inc: { [`progress.${problem.difficulty.toLowerCase()}`]: 1 }
      });
    }

    res.json(submission);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/user', auth, async (req, res) => {
  try {
    const submissions = await Submission.find({ userId: req.user.userId })
      .populate('problemId', 'title difficulty')
      .sort({ createdAt: -1 });
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
