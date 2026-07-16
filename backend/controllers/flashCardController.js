const FlashCard = require('../models/FlashCard');

/**
 * @desc    Get all flashcards for a specific deck
 * @route   GET /api/decks/:deckId/flashcards
 * @access  Public
 */
const getFlashCardsByDeck = async (req, res) => {
  try {
    const { deckId } = req.params;
    const flashcards = await FlashCard.find({ deckId });
    res.status(200).json(flashcards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Create a new flashcard linked to a deck
 * @route   POST /api/decks/:deckId/flashcards
 * @access  Public
 */
const createFlashCard = async (req, res) => {
  try {
    const { deckId } = req.params;
    const { question, answer } = req.body;
    if (!question || !answer) {
      return res.status(400).json({ message: 'question and answer are required' });
    }
    const flashcard = new FlashCard({
      question,
      answer,
      deckId
    });
    const savedCard = await flashcard.save();
    res.status(201).json(savedCard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Update a flashcard's question/answer
 * @route   PUT /api/flashcards/:id
 * @access  Public
 */
const updateFlashCard = async (req, res) => {
  try {
    const { id } = req.params;
    const { question, answer } = req.body;

    const updateData = {};
    if (question !== undefined) updateData.question = question;
    if (answer !== undefined) updateData.answer = answer;
    updateData.updatedAt = Date.now();

    const updatedCard = await FlashCard.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedCard) {
      return res.status(404).json({ message: 'FlashCard not found' });
    }
    res.status(200).json(updatedCard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Delete a flashcard
 * @route   DELETE /api/flashcards/:id
 * @access  Public
 */
const deleteFlashCard = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCard = await FlashCard.findByIdAndDelete(id);
    if (!deletedCard) {
      return res.status(404).json({ message: 'FlashCard not found' });
    }
    res.status(200).json({ message: 'FlashCard deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getFlashCardsByDeck,
  createFlashCard,
  updateFlashCard,
  deleteFlashCard
};
