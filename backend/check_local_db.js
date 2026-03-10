const mongoose = require('mongoose');
const ProblemSchema = new mongoose.Schema({
  id: Number,
  title: String,
  difficulty: String,
  category: String
}, { strict: false });

const Problem = mongoose.model('Problem', ProblemSchema);

async function check() {
  const localUri = 'mongodb://127.0.0.1:27017/dsa-platform';
  console.log(`Checking Local DB: ${localUri}`);
  try {
    await mongoose.connect(localUri);
    const count = await Problem.countDocuments();
    console.log(`Local Problem count: ${count}`);
    if (count > 0) {
      const first = await Problem.findOne();
      console.log('Sample problem:', first.title);
    }
    process.exit(0);
  } catch (err) {
    console.error('Local Connection error:', err.message);
    process.exit(1);
  }
}

check();
