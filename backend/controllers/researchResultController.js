const ResearchResult = require('../models/ResearchResult');
const { runResearchPipeline } = require('../services/orchestrator');

/**
 * @desc    Get all research results for a specific user
 * @route   GET /api/research-results
 * @access  Public
 */
const getResearchResults = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ message: 'userId query parameter is required' });
    }
    const results = await ResearchResult.find({ userId });
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Create/save a new research result
 * @route   POST /api/research-results
 * @access  Public
 */
const createResearchResult = async (req, res) => {
  try {
    const { topic, content, userId, deckId } = req.body;
    if (!topic || !content || !userId) {
      return res.status(400).json({ message: 'topic, content, and userId are required' });
    }
    const newResult = new ResearchResult({
      topic,
      content,
      userId,
      deckId
    });
    const savedResult = await newResult.save();
    res.status(201).json(savedResult);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Get a single research result by ID
 * @route   GET /api/research-results/:id
 * @access  Public
 */
const getResearchResultById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await ResearchResult.findById(id);
    if (!result) {
      return res.status(404).json({ message: 'ResearchResult not found' });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Delete a research result by ID
 * @route   DELETE /api/research-results/:id
 * @access  Public
 */
const deleteResearchResult = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedResult = await ResearchResult.findByIdAndDelete(id);
    if (!deletedResult) {
      return res.status(404).json({ message: 'ResearchResult not found' });
    }
    res.status(200).json({ message: 'ResearchResult deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const ResearchPipeline = async (req, res) => {
  try {
    const { topic } = req.body;
    if (!topic) {
      return res.status(400).json({ error: 'topic required' });
    }
    const result = await runResearchPipeline(topic);
    res.status(200).json({ succss: true, data: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const saveResearchResult = async (req, res) => {
  try {
    const { topic, content, userId, deckId } = req.body;
    if (!topic || !content || !userId) {
      return res.status(400).json({ error: 'topic, content, and userId are required' });
    }
    const newResult = new ResearchResult({ topic, content, userId, deckId });
    const savedResult = await newResult.save();
    res.status(201).json(savedResult);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getResearchResults,
  saveResearchResult,
  getResearchResultById,
  deleteResearchResult,
  ResearchPipeline
};
