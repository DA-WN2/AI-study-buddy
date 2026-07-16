const mongoose = require('mongoose');

const ResearchResultSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: [true, 'Topic is required'],
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    trim: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  deckId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Deck'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const ResearchResult = mongoose.model('ResearchResult', ResearchResultSchema);

module.exports = ResearchResult;
