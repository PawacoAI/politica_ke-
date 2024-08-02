const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./utils/errorHandler');
const authRoutes = require('./routes/auth');
const sentimentRoutes = require('./routes/sentiment');
const userRoutes = require('./routes/user');
const twitterRoutes = require('./routes/twitter');

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

// Define CORS options
const corsOptions = {
    origin: 'http://localhost:3000', // Allow frontend to connect from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow methods as needed
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow headers including Authorization
};

// Use CORS middleware with options
app.use(cors(corsOptions));

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/sentiments', sentimentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/twitter', twitterRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
