const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  title: { type: String, required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
  category: { type: String, required: true },
  topics: [String],
  description: { type: String, required: true },
  inputFormat: String,
  outputFormat: String,
  constraints: String,
  examples: [{
    input: String,
    output: String,
    explanation: String
  }],
  starterCode: {
    python: String,
    java: String,
    cpp: String,
    javascript: String
  },
  solution: String,
  timeComplexity: String,
  spaceComplexity: String,
  hints: [String],
  testCases: [{
    input: mongoose.Schema.Types.Mixed,
    output: mongoose.Schema.Types.Mixed
  }],
  acceptanceRate: { type: Number, default: 0 },
  totalSubmissions: { type: Number, default: 0 },
  acceptedSubmissions: { type: Number, default: 0 },
  platformLinks: {
    leetcode: { type: String, default: '' },
    hackerrank: { type: String, default: '' },
    codechef: { type: String, default: '' }
  }
}, { timestamps: true });

module.exports = mongoose.model('Problem', problemSchema);
