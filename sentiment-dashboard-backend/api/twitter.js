const express = require('express');
const { TwitterApi } = require('twitter-api-v2');
const router = express.Router();
require('dotenv').config();

console.log('TWITTER_API_KEY:', process.env.TWITTER_API_KEY);
console.log('TWITTER_API_SECRET_KEY:', process.env.TWITTER_API_SECRET_KEY);
console.log('TWITTER_ACCESS_TOKEN:', process.env.TWITTER_ACCESS_TOKEN);
console.log('TWITTER_ACCESS_TOKEN_SECRET:', process.env.TWITTER_ACCESS_TOKEN_SECRET);

const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET_KEY,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

const rwClient = twitterClient.readWrite;

router.get('/tweets', async (req, res) => {
  try {
    const tweets = await rwClient.v2.search('from:twitterdev');
    res.status(200).json(tweets);
  } catch (error) {
    console.error('Error fetching tweets:', error);
    console.error('Error details:', error.errors || error.message);
    res.status(500).json({ error: 'Error fetching tweets', details: error.message });
  }
});

module.exports = router;
