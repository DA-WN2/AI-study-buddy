const mongoose = require('mongoose');

const FlashCardSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, 'Question is required'],
    trim: true
  },
  answer: {
    type: String,
    required: [true, 'Answer is required'],
    trim: true
  },
  deckId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Deck',
    required: [true, 'Deck ID is required']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware to update the updatedAt field before saving
FlashCardSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const FlashCard = mongoose.model('FlashCard', FlashCardSchema);

module.exports = FlashCard;
