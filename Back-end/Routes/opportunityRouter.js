const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const auth = require('../middleware/auth');
const { isMentor } = require('../middleware/reqAndOpp')
const opportunityController = require('../Controllers/opportunityController');

router.post('/opp', auth, isMentor,asyncHandler(opportunityController.createOpportunity));
router.get('/opp', asyncHandler(opportunityController.getAllOpportunities));
router.get('/opp/:id', asyncHandler(opportunityController.getOpportunityById)); 
router.get("/opp/owner/:id", auth, asyncHandler(opportunityController.getOpportunityByUserId));
router.patch('/opp/:id',auth,  isMentor, asyncHandler(opportunityController.updateOpportunity));
router.delete('/opp/:id',auth,  isMentor, asyncHandler(opportunityController.deleteOpportunity));

module.exports = router;
