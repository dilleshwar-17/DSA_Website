const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Problem = require('./models/Problem');
require('dotenv').config();

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/dsa-platform';
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected for seeding...');

    // Read problems data
    const problemsFilePath = path.join(__dirname, 'data', 'problems.json');
    const problemData = JSON.parse(fs.readFileSync(problemsFilePath, 'utf-8'));

    // Remove any 'id' field as MongoDB uses '_id'
    const formattedData = problemData.map(problem => {
      const { id, ...rest } = problem;
      return rest;
    });

    console.log('Clearing existing problems...');
    await Problem.deleteMany({});

    console.log(`Inserting ${formattedData.length} problems...`);
    await Problem.insertMany(formattedData);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
