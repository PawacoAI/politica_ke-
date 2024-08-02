const mongoose = require('mongoose');

const SentimentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  sentimentScore: {
    type: Number,
    required: true
  },
  associatedTopics: [String]
});

module.exports = mongoose.model('Sentiment', SentimentSchema);
