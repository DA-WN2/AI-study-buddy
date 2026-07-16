const { runResearchAgent } = require('../agents/researchAgents');
const { runWriterAgent } = require('../agents/writerAgents');
const { runReviewerAgent } = require('../agents/reviewerAgents');

async function runResearchPipeline(topic) {
    const researchNotes = await runResearchAgent(topic);
    const draft = await runWriterAgent(topic, researchNotes);
    const reviewResult = await runReviewerAgent(topic, researchNotes, draft);

    return {
        topic,
        researchNotes,
        draft,
        reviewResult
    };
}

module.exports = { runResearchPipeline };