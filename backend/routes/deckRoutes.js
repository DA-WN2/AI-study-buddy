const express = require('express');
const router = express.Router();
const {
  getDecks,
  createDeck,
  getDeckById,
  updateDeck,
  deleteDeck
} = require('../controllers/deckController');

// Routes mounted at /api/decks
router.route('/')
  .get(getDecks)
  .post(createDeck);

router.route('/:id')
  .get(getDeckById)
  .put(updateDeck)
  .delete(deleteDeck);

module.exports = router;
