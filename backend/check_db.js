const mongoose = require('mongoose');
require('dotenv').config();

const ProblemSchema = new mongoose.Schema({
  id: Number,
  title: String,
  difficulty: String,
  category: String
}, { strict: false });

const Problem = mongoose.model('Problem', ProblemSchema);

async function check() {
  const dbUri = process.env.MONGODB_ATLAS_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017/dsa-platform';
  console.log(`Checking DB: ${dbUri}`);
  try {
    await mongoose.connect(dbUri);
    const count = await Problem.countDocuments();
    console.log(`Problem count: ${count}`);
    if (count > 0) {
      const first = await Problem.findOne();
      console.log('Sample problem:', first.title);
    }
    process.exit(0);
  } catch (err) {
    console.error('Connection error:', err.message);
    process.exit(1);
  }
}

check();
