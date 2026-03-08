const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/dsa-platform', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const authRoutes = require('./routes/auth');
const problemRoutes = require('./routes/problems');
const submissionRoutes = require('./routes/submissions');
const userRoutes = require('./routes/users');

app.use('/api/auth', authRoutes);
app.use('/api/problems', problemRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
if (require.main === module) {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
module.exports = app;
