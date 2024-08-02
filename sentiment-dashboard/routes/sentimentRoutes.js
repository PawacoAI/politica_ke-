const express = require('express');
const Sentiment = require('../models/Sentiment'); // Adjust path as needed
const router = express.Router();
const authMiddleware = require('../middleware/auth'); // Assuming you have an auth middleware

// Submit Sentiment Data
router.post('/', authMiddleware, async (req, res) => {
    const { sentimentScore, associatedTopics } = req.body;

    try {
        const newSentiment = new Sentiment({
            userId: req.user.id,
            sentimentScore,
            associatedTopics
        });

        await newSentiment.save();
        res.status(201).json(newSentiment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get Sentiment Data for User
router.get('/', authMiddleware, async (req, res) => {
    try {
        const sentiments = await Sentiment.find({ userId: req.user.id }).sort({ timestamp: -1 });
        res.json(sentiments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
