const { generateText } = require('ai');
const { models } = require('../config/models');

async function runReviewerAgent(topic, researchNotes, draft) {
    const review = await generateText({
        model: models.reviewer,
        system: `
You are a reviewer agent.

Your job:
- Critique the draft for clarity, completeness, accuracy relative to the notes, and structure.
- Identify weak arguments, redundancy, unsupported claims, and missing insights.
- Then produce an improved final version.
`,
        prompt: `
Topic:
${topic}

Research Notes:
${researchNotes}

Draft:
${draft}

Return your response in this format:

REVIEW_FEEDBACK:
- bullet points

FINAL_DRAFT:
[improved draft]
`
    });

    return review.text;
}

module.exports = { runReviewerAgent };