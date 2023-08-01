const router = require("express").Router();
const addApplicant = require("../Controllers/addApplicatController");
const auth = require("../middleware/auth")
const { isMentee, isMentor } = require("../middleware/reqAndOpp")

router.patch("/applicant/request/:id", auth, isMentor,addApplicant.addNewRequestApplicat)
router.patch("/applicant/opp/:id", auth, isMentee, addApplicant.addNewOppApplicat)

module.exports = router;