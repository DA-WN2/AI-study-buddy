const Deck = require('../models/Deck');

/**
 * @desc    Get all decks for a user
 * @route   GET /api/decks
 * @access  Public
 */
const getDecks = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ message: 'userId query parameter is required' });
    }
    const decks = await Deck.find({ userID: userId });
    res.status(200).json(decks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Create a new deck
 * @route   POST /api/decks
 * @access  Public
 */
const createDeck = async (req, res) => {
  try {
    const { name, userId } = req.body;
    if (!name || !userId) {
      return res.status(400).json({ message: 'name and userId are required' });
    }
    const newDeck = new Deck({
      name,
      userID: userId
    });
    const savedDeck = await newDeck.save();
    res.status(201).json(savedDeck);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Get a single deck by ID
 * @route   GET /api/decks/:id
 * @access  Public
 */
const getDeckById = async (req, res) => {
  try {
    const deck = await Deck.findById(req.params.id);
    if (!deck) {
      return res.status(404).json({ message: 'Deck not found' });
    }
    res.status(200).json(deck);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Update a deck's name
 * @route   PUT /api/decks/:id
 * @access  Public
 */
const updateDeck = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'name is required' });
    }
    const updatedDeck = await Deck.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true, runValidators: true }
    );
    if (!updatedDeck) {
      return res.status(404).json({ message: 'Deck not found' });
    }
    res.status(200).json(updatedDeck);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Delete a deck
 * @route   DELETE /api/decks/:id
 * @access  Public
 */
const deleteDeck = async (req, res) => {
  try {
    const deletedDeck = await Deck.findByIdAndDelete(req.params.id);
    if (!deletedDeck) {
      return res.status(404).json({ message: 'Deck not found' });
    }
    res.status(200).json({ message: 'Deck deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDecks,
  createDeck,
  getDeckById,
  updateDeck,
  deleteDeck
};
