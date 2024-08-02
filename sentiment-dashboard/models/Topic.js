const mongoose = require('mongoose');

const TopicSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  topicName: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  frequency: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Topic', TopicSchema);
