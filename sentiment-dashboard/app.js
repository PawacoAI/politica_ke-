const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Define Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/sentiment', require('./routes/sentimentRoutes'));
app.use('/api/subscription', require('./routes/subscriptionRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
