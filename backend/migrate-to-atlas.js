const mongoose = require('mongoose');
require('dotenv').config();

const LOCAL_URI = 'mongodb://localhost:27017/dsa-platform';
const ATLAS_URI = process.env.MONGODB_ATLAS_URI;

if (!ATLAS_URI) {
    console.error("❌ ERROR: MONGODB_ATLAS_URI is not set in your .env file.");
    process.exit(1);
}

const ProblemSchema = new mongoose.Schema({
    id: { type: String, unique: true },
    title: String,
    difficulty: String,
    category: String,
    description: String,
    starterCode: Object,
    testCases: Array
}, { collection: 'problems' });

const migrate = async () => {
    try {
        console.log("Connecting to local database...");
        const localConn = await mongoose.createConnection(LOCAL_URI).asPromise();
        const LocalProblem = localConn.model('Problem', ProblemSchema);

        console.log("Connecting to Atlas cloud database...");
        const atlasConn = await mongoose.createConnection(ATLAS_URI).asPromise();
        const AtlasProblem = atlasConn.model('Problem', ProblemSchema);

        const problems = await LocalProblem.find({});
        console.log(`Found ${problems.length} problems locally.`);

        if (problems.length === 0) {
            console.log("Nothing to migrate.");
            process.exit(0);
        }

        console.log("Migrating problems to Atlas...");
        let count = 0;
        for (const prob of problems) {
            const probObj = prob.toObject();
            delete probObj._id; // Remove local ID to let Atlas generate new ones
            await AtlasProblem.updateOne({ id: probObj.id }, probObj, { upsert: true });
            count++;
            if (count % 50 === 0) console.log(`Migrated ${count}/${problems.length}...`);
        }

        console.log(`✅ SUCCESS: Migrated ${count} problems to MongoDB Atlas!`);
        process.exit(0);

    } catch (err) {
        console.error("❌ MIGRATION FAILED:", err.message);
        process.exit(1);
    }
};

migrate();
