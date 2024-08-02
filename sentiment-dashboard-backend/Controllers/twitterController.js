const { TwitterApi } = require('twitter-api-v2');
const User = require('../models/User'); // Assuming you have a User model
const multer = require('multer');
const path = require('path');

const twitterClient = new TwitterApi({
  clientId: process.env.TWITTER_CLIENT_ID,
  clientSecret: process.env.TWITTER_CLIENT_SECRET,
});

exports.initiateOAuth = async (req, res) => {
  const { url, codeVerifier, state } = twitterClient.generateOAuth2AuthLink(process.env.TWITTER_CALLBACK_URL, { scope: ['tweet.read', 'tweet.write', 'users.read', 'offline.access'] });

  req.session.codeVerifier = codeVerifier;
  req.session.state = state;
  res.redirect(url);
};

exports.handleOAuthCallback = async (req, res) => {
  const { state, code } = req.query;

  if (state !== req.session.state) {
    return res.status(400).send('State mismatch');
  }

  const { client: loggedClient, accessToken, refreshToken } = await twitterClient.loginWithOAuth2({ code, codeVerifier: req.session.codeVerifier, redirectUri: process.env.TWITTER_CALLBACK_URL });

  // Save tokens in database
  const user = await User.findById(req.userId);
  user.twitterAccounts.push({
    accountName: loggedClient.currentUser.username,
    accessToken,
    refreshToken,
  });
  await user.save();

  res.send('Twitter account connected');
};

exports.addTwitterAccount = async (req, res) => {
  const user = await User.findById(req.userId);
  user.twitterAccounts.push({
    accountName: req.body.accountName,
    accessToken: req.body.accessToken,
    refreshToken: req.body.refreshToken,
  });
  await user.save();
  res.send(user.twitterAccounts);
};

exports.getTwitterAccounts = async (req, res) => {
  const user = await User.findById(req.userId);
  res.send(user.twitterAccounts);
};

exports.removeTwitterAccount = async (req, res) => {
  const user = await User.findById(req.userId);
  user.twitterAccounts.id(req.params.id).remove();
  await user.save();
  res.send(user.twitterAccounts);
};

exports.postTweet = async (req, res) => {
  const user = await User.findById(req.userId);
  const twitterAccount = user.twitterAccounts.id(req.body.accountId);

  const client = new TwitterApi({
    accessToken: twitterAccount.accessToken,
    refreshToken: twitterAccount.refreshToken,
  });

  // Post tweet
  const tweet = await client.v2.tweet(req.body.content, { media: { media_ids: [req.body.mediaId] } });

  res.send(tweet);
};

exports.uploadImage = async (req, res) => {
  const user = await User.findById(req.userId);
  const twitterAccount = user.twitterAccounts.id(req.body.accountId);

  const client = new TwitterApi({
    accessToken: twitterAccount.accessToken,
    refreshToken: twitterAccount.refreshToken,
  });

  // Configure multer for image uploads
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

  const upload = multer({ storage }).single('image');

  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).send({ error: 'Image upload failed', details: err.message });
    }

    // Upload image to Twitter
    const media = await client.v1.uploadMedia(path.join(__dirname, '../uploads', req.file.filename));

    res.send({ mediaId: media.media_id_string });
  });
};

exports.getAnalytics = async (req, res) => {
  const user = await User.findById(req.userId);
  const twitterAccount = user.twitterAccounts.id(req.params.accountId);

  const client = new TwitterApi({
    accessToken: twitterAccount.accessToken,
    refreshToken: twitterAccount.refreshToken,
  });

  // Fetch analytics
  const analytics = await client.v2.user(req.params.accountId);

  res.send(analytics);
};
