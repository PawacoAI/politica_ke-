const Sentiment = require('sentiment');
const sentiment = new Sentiment();

const analyzeSentiment = (tweets) => {
  return tweets.map(tweet => {
    const analysis = sentiment.analyze(tweet.text);
    return {
      ...tweet,
      sentiment: analysis
    };
  });
};

module.exports = { analyzeSentiment };
