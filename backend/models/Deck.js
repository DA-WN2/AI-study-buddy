const mongoose = require('mongoose');

const DeckSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Deck name is required'],
    trim: true
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Deck = mongoose.model('Deck', DeckSchema);

module.exports = Deck;
