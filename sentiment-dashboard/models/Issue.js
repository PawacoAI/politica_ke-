const mongoose = require('mongoose');

const IssueSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  issueDescription: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  severity: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Issue', IssueSchema);
