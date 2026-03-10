const mongoose = require('mongoose');
const Problem = require('./models/Problem');
require('dotenv').config();

const updateProblems = async () => {
    try {
        const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/dsa-platform';
        await mongoose.connect(mongoUri);
        console.log('Connected to MongoDB...');

        const problems = await Problem.find({});
        console.log(`Found ${problems.length} problems to update.`);

        for (const problem of problems) {
            // Add sample links based on title
            const slug = problem.title.toLowerCase().replace(/\s+/g, '-');
            const platformLinks = {
                leetcode: `https://leetcode.com/problems/${slug}/`,
                hackerrank: `https://www.hackerrank.com/challenges/${slug}/problem`,
                codechef: `https://www.codechef.com/problems/${slug.toUpperCase()}`
            };

            await Problem.updateOne(
                { _id: problem._id },
                { $set: { platformLinks: platformLinks } }
            );
        }

        console.log('Update complete!');
        process.exit(0);
    } catch (err) {
        console.error('Update failed:', err);
        process.exit(1);
    }
};

updateProblems();
