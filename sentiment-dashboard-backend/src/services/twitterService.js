// backend/src/services/twitterService.js
const { TwitterApi } = require('twitter-api-v2');
const Sentiment = require('sentiment');

const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET_KEY,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

const sentiment = new Sentiment();

const fetchTweets = async (query) => {
  try {
    const tweets = await twitterClient.v2.search(query, { max_results: 10 });
    return tweets.data.data.map(tweet => {
      const analysis = sentiment.analyze(tweet.text);
      return { text: tweet.text, sentimentScore: analysis.score };
    });
  } catch (error) {
    console.error('Error fetching tweets:', error);
    throw error;
  }
};

module.exports = { fetchTweets };
