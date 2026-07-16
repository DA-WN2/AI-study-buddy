const { generateText } = require('ai')
const { models } = require('../config/models')

async function runResearchAgent(topic) {
    const result = await generateText({
        model: models.research,
        system: `
You are a research agent.
Your job is to research the user's topic thoroughly.

Rules:
- Use the search tool when needed.
- Return structured research notes.
- Focus on facts, key concepts, recent developments, risks, and opportunities.
- Do not write the final article.
`,
        prompt: `Research this topic: ${topic}`,
        maxSteps: 5
    });

    return result.text;
}

module.exports = { runResearchAgent };