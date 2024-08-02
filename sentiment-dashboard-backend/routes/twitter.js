const express = require('express');
const { TwitterApi } = require('twitter-api-v2');
const {
  initiateOAuth,
  handleOAuthCallback,
  addTwitterAccount,
  getTwitterAccounts,
  removeTwitterAccount,
  postTweet,
  uploadImage,
  getAnalytics,
} = require('../controllers/twitterController');
const router = express.Router();
require('dotenv').config();

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

// OAuth routes
router.get('/twitter/oauth/initiate', initiateOAuth);
router.get('/twitter/oauth/callback', handleOAuthCallback);

// Account management routes
router.post('/twitter/accounts', addTwitterAccount);
router.get('/twitter/accounts', getTwitterAccounts);
router.delete('/twitter/accounts/:id', removeTwitterAccount);

// Tweet and image routes
router.post('/twitter/tweet', postTweet);
router.post('/twitter/upload', uploadImage);

// Analytics route
router.get('/twitter/analytics/:accountId', getAnalytics);

module.exports = router;
