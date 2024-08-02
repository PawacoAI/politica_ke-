const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/User'); // Adjust the path if necessary

dotenv.config();

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Registration endpoint
router.post('/register', async (req, res) => {
    try {
        const { username, password, email } = req.body;

        // Check for required fields
        if (!username || !password || !email) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ error: 'Username or email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({ username, email, password: hashedPassword });

        // Save user to the database
        await newUser.save();

        res.status(201).json({
            message: 'User registered successfully',
            user: { 
                _id: newUser._id,
                username: newUser.username, 
                email: newUser.email, 
                token: generateToken(newUser._id)
            }
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Error registering user', details: error.message });
    }
});

// Login endpoint
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Convert email to lowercase
        const userEmail = email.toLowerCase();

        // Log received data
        console.log('Login Request Body:', req.body);

        // Find the user
        const user = await User.findOne({ email: userEmail });
        console.log('User Found:', user);

        if (!user) {
            console.log('User not found with email:', userEmail);
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Compare passwords using the instance method
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            console.log('Password mismatch for email:', userEmail);
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        res.status(200).json({
            message: 'Login successful',
            user: { 
                _id: user._id,
                username: user.username, 
                email: user.email, 
                token: generateToken(user._id) 
            }
        });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Error logging in', details: error.message });
    }
});

// Get all users endpoint
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Error fetching users', details: error.message });
    }
});

module.exports = router;
