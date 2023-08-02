const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const auth = require('../middleware/auth');
const { isMentor } = require('../middleware/reqAndOpp')
const opportunityController = require('../Controllers/opportunityController');

router.post('/opp', isMentor, auth, asyncHandler(opportunityController.createOpportunity));
router.get('/opp', asyncHandler(opportunityController.getAllOpportunities));
router.get('/opp/:id', isMentor, auth, asyncHandler(opportunityController.getOpportunityById));
router.get("/opp/owner/:id", auth, asyncHandler(opportunityController.getOpportunityByUserId));
router.patch('/opp/:id', isMentor, auth, asyncHandler(opportunityController.updateOpportunity));
router.delete('/opp/:id', isMentor, auth, asyncHandler(opportunityController.deleteOpportunity));

module.exports = router;
