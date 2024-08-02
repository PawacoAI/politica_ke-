const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User'); // Ensure you have a User model set up

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

// MongoDB connection URI
const mongoURI = 'mongodb://localhost:27017/sentimentDashboard';

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB successfully');

        // User Registration Endpoint
        app.post('/api/users/register', async (req, res) => {
            console.log('Request Headers:', req.headers); // Log request headers
            console.log('Request Body:', req.body);       // Log the incoming request body
            try {
                const { username, password, email } = req.body;

                // Check for required fields
                if (!username || !password || !email) {
                    return res.status(400).json({ error: 'All fields are required' });
                }

                // Check if user already exists
                const existingUser = await User.findOne({ email });
                if (existingUser) {
                    return res.status(400).json({ error: 'User already exists' });
                }

                // Hash the password
                const hashedPassword = await bcrypt.hash(password, 10);

                // Create and save the new user
                const newUser = new User({ username, email, password: hashedPassword });
                await newUser.save();

                res.status(201).json({ message: 'User registered successfully', user: { username, email } });
            } catch (error) {
                console.error(error);
                res.status(400).json({ error: 'Error registering user' });
            }
        });

        // User Login Endpoint
        app.post('/api/users/login', async (req, res) => {
            try {
                const { email, password } = req.body;

                // Find the user
                const user = await User.findOne({ email });
                if (!user) {
                    return res.status(400).json({ error: 'Invalid credentials' });
                }

                // Compare passwords
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    return res.status(400).json({ error: 'Invalid credentials' });
                }

                res.status(200).json({ message: 'Login successful', user: { username: user.username, email: user.email } });
            } catch (error) {
                console.error(error);
                res.status(400).json({ error: 'Error logging in' });
            }
        });

        // Other endpoints (add more as needed)
        // Example: Get all users
        app.get('/api/users', async (req, res) => {
            try {
                const users = await User.find();
                res.status(200).json(users);
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Error fetching users' });
            }
        });

        // Start the server only after the database connection is successful
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });
