const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

// Apply compression middleware to gzip responses
app.use(compression());

// Apply basic rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 300, // Limit each IP to 300 requests per 10 minutes (generous for 200 mostly sequential users)
  message: { message: 'Too many requests from this IP, please try again later.' }
});
app.use('/api', limiter);

app.use(cors());
app.use(express.json());

const dbUri = process.env.MONGODB_ATLAS_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017/dsa-platform';
console.log(`Connecting to MongoDB... (Atlas URI present: ${!!process.env.MONGODB_ATLAS_URI})`);

mongoose.connect(dbUri)
  .then(() => console.log('✅ MongoDB Connected successfully'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

const authRoutes = require('./routes/auth');
const problemRoutes = require('./routes/problems');
const submissionRoutes = require('./routes/submissions');
const userRoutes = require('./routes/users');
const executeRoutes = require('./routes/execute'); // Added execution route

app.use('/api/auth', authRoutes);
app.use('/api/problems', problemRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/users', userRoutes);
app.use('/api/execute', executeRoutes); // Mounted execution route

const PORT = process.env.PORT || 5000;
if (require.main === module) {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
module.exports = app;
