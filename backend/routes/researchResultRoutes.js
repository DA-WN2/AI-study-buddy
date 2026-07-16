const express = require('express');
const router = express.Router();
const researchResultController = require('../controllers/researchResultController');

// Routes relative to /api/research-results
router.route('/')
  .get(researchResultController.getResearchResults)
  .post(researchResultController.saveResearchResult);

router.route('/:id')
  .get(researchResultController.getResearchResultById)
  .delete(researchResultController.deleteResearchResult);


router.post('/research', researchResultController.ResearchPipeline)
module.exports = router;