const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const { category, difficulty, search } = req.query;
    let query = {};
    
    if (category) query.category = category;
    if (difficulty) query.difficulty = difficulty;
    if (search) query.title = { $regex: search, $options: 'i' };

    const problems = await Problem.find(query).select('-solution -testCases');
    res.json(problems);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id).select('-solution');
    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }
    res.json(problem);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const problem = new Problem(req.body);
    await problem.save();
    res.status(201).json(problem);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
