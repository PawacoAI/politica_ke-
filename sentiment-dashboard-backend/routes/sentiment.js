const express = require('express');
const router = express.Router();
const { analyzeSentiment } = require('../utils/sentimentAnalysis'); // Make sure this path is correct

// Example endpoint to get sentiment data
router.get('/', async (req, res) => {
  try {
    const tweets = []; // Fetch or pass your tweets here
    const analyzedSentiments = analyzeSentiment(tweets);
    res.status(200).json(analyzedSentiments);
  } catch (error) {
    res.status(500).json({ error: 'Error analyzing sentiment', details: error.message });
  }
});

module.exports = router;
