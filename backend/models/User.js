const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  googleId: { type: String },
  avatar: { type: String },
  solvedProblems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Problem' }],
  savedProblems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Problem' }],
  streak: { type: Number, default: 0 },
  lastActive: { type: Date, default: Date.now },
  progress: {
    easy: { type: Number, default: 0 },
    medium: { type: Number, default: 0 },
    hard: { type: Number, default: 0 }
  },
  learningPath: {
    beginner: { completed: { type: Boolean, default: false }, progress: { type: Number, default: 0 } },
    intermediate: { completed: { type: Boolean, default: false }, progress: { type: Number, default: 0 } },
    advanced: { completed: { type: Boolean, default: false }, progress: { type: Number, default: 0 } }
  },
  achievements: [{ name: String, earnedAt: Date }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
