// sentiment-dashboard-backend/routes/tweets.js

const express = require('express');
const router = express.Router();
const analyzeSentiment = require('../src/utils/sentimentAnalysis'); // Adjust the path if necessary

// Example route to analyze tweets
router.post('/analyze-tweets', async (req, res) => {
  try {
    const tweets = req.body.tweets; // Assume tweets are sent in the body of the request
    const analyzedTweets = analyzeSentiment(tweets);
    res.status(200).json(analyzedTweets);
  } catch (error) {
    console.error('Error analyzing tweets:', error);
    res.status(500).json({ error: 'Error analyzing tweets', details: error.message });
  }
});

module.exports = router;
