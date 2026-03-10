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
    console.error('List Problems Error:', error);
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    // We search by our custom numeric `id` field, not the MongoDB `_id`
    const problem = await Problem.findOne({ id: Number(req.params.id) }).select('-solution');
    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }
    res.json(problem);
  } catch (error) {
    console.error("Error fetching problem detail:", error);
    res.status(500).json({ message: 'Server error: ' + error.message });
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
