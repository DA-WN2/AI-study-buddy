const { generateText } = require('ai');
const { models } = require('../config/models');

async function runWriterAgent(topic, researchNotes) {
    const result = await generateText({
        model: models.writer,
        system: `
You are a writer agent.

Your job:
- Turn research notes into a clear, polished, readable report.
- Use headings and bullet points where helpful.
- Be concise but informative.
- Do not invent facts not present in the notes.
`,
        prompt: `
Topic:
${topic}

Research Notes:
${researchNotes}

Write a high-quality report with:
1. Title
2. Executive Summary
3. Main Analysis
4. Key Takeaways

At the very end of your response, after all report content is complete, append exactly this line:
---FLASHCARDS---
Followed by exactly 4 flashcards of question and answer pairs in this format:
Q: [A clear, concise, direct question about the topic/insights]
A: [A clear, direct, and concise answer (1-2 sentences)]
Q: [Question]
A: [Answer]
Q: [Question]
A: [Answer]
Q: [Question]
A: [Answer]

Do not write any other explanation or text after the last flashcard.
`
    });

    return result.text;
}

module.exports = { runWriterAgent };