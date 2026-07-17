const { generateText } = require('ai');
const { models } = require('../config/models');

/**
 * @desc    Generate a structured multiple choice quiz using AI
 * @route   POST /api/quiz/generate
 */
const generateQuiz = async (req, res) => {
  try {
    const { topic, difficulty } = req.body;

    // 1. Validation
    if (!topic || !topic.trim()) {
      return res.status(400).json({ error: 'Topic is required.' });
    }
    if (!difficulty || !difficulty.trim()) {
      return res.status(400).json({ error: 'Difficulty is required.' });
    }

    // 2. Prompt setup requesting strict JSON matching the required schema
    const prompt = `
You are a specialized Quiz Generation Agent.
Generate a multiple-choice quiz about the topic "${topic.trim()}" at a "${difficulty.trim()}" difficulty level.

Strict requirements:
- Create exactly 5 questions.
- Each question must have exactly 4 options.
- The options should be plausible but only one option must be correct.
- Provide the index of the correct option (0, 1, 2, or 3) in the "correctAnswer" field.
- Your output must be a single, valid JSON object matching the format below.
- DO NOT wrap the output in markdown code blocks like \`\`\`json.
- DO NOT write any explanations, preamble, introductions, or trailing text.

Expected JSON format:
{
  "questions": [
    {
      "question": "The question text goes here.",
      "options": [
        "Option A text",
        "Option B text",
        "Option C text",
        "Option D text"
      ],
      "correctAnswer": 0
    }
  ]
}
`;

    // 3. Generate content using the writer model (openai/gpt-oss-20b or custom defined model)
    const result = await generateText({
      model: models.writer,
      prompt: prompt
    });

    let rawText = result.text.trim();

    // 4. Strip markdown codeblock wrappers if they are present
    if (rawText.startsWith('```')) {
      // Strip starting ``` or ```json
      const lines = rawText.split('\n');
      if (lines[0].startsWith('```')) {
        lines.shift();
      }
      if (lines[lines.length - 1] === '```') {
        lines.pop();
      }
      rawText = lines.join('\n').trim();
    }

    // 5. Parse output
    let parsedQuiz;
    try {
      parsedQuiz = JSON.parse(rawText);
    } catch (parseError) {
      console.error('Failed to parse quiz AI output to JSON. Raw output was:', rawText);
      return res.status(500).json({
        error: 'Failed to generate valid quiz structure. AI output was not valid JSON.',
        details: parseError.message
      });
    }

    // 6. Return response
    return res.status(200).json(parsedQuiz);

  } catch (error) {
    console.error('Error generating quiz:', error);
    return res.status(500).json({
      error: 'An internal error occurred while generating the quiz.',
      details: error.message
    });
  }
};

module.exports = {
  generateQuiz
};
