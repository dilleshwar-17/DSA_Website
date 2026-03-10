const mongoose = require('mongoose');
require('dotenv').config({ path: 'c:/Users/srira/OneDrive/Desktop/DataNauts/Classes/dsa-platform/backend/.env' });

const ATLAS_URI = "mongodb+srv://dsaUser:dsaUser1@cluster1.gfw4cbs.mongodb.net/?appName=Cluster1";

const ProblemSchema = new mongoose.Schema({
  id: { type: Object }, // Use Object to be safe with types
  title: String
}, { strict: false });

const Problem = mongoose.model('Problem', ProblemSchema);

async function check() {
  console.log(`Checking Atlas DB...`);
  try {
    await mongoose.connect(ATLAS_URI, { serverSelectionTimeoutMS: 10000 });
    const count = await Problem.countDocuments();
    console.log(`Atlas Problem count: ${count}`);
    if (count > 0) {
      const sample = await Problem.findOne();
      console.log(`Sample problem: ${sample.title}`);
    }
    process.exit(0);
  } catch (err) {
    console.error('Atlas Connection error:', err.message);
    process.exit(1);
  }
}

check();
