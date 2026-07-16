const express = require('express');
const router = express.Router();
const {
  getFlashCardsByDeck,
  createFlashCard,
  updateFlashCard,
  deleteFlashCard
} = require('../controllers/flashCardController');

// Nested routes under decks
router.route('/decks/:deckId/flashcards')
  .get(getFlashCardsByDeck)
  .post(createFlashCard);

// Flashcard routes
router.route('/flashcards/:id')
  .put(updateFlashCard)
  .delete(deleteFlashCard);

module.exports = router;
