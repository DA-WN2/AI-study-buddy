const express = require('express');
const router = express.Router();
const { generateQuiz } = require('../controllers/quiz.controller');

// Generate quiz endpoint
router.post('/generate', generateQuiz);

module.exports = router;
