require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const healthRouter = require('./routes/health');
app.use('/health', healthRouter);

// Deck Routes
const deckRouter = require('./routes/deckRoutes');
app.use('/api/decks', deckRouter);

// FlashCard Routes
const flashCardRouter = require('./routes/flashCardRoutes');
app.use('/api', flashCardRouter);

// ResearchResult Routes
const researchResultRouter = require('./routes/researchResultRoutes');
app.use('/api/research-results', researchResultRouter);

// Quiz Routes
const quizRouter = require('./routes/quiz.routes');
app.use('/api/quiz', quizRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
