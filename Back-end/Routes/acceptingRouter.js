const router = require("express").Router();
const accepting = require("../Controllers/acceptingController");
const auth = require("../middleware/auth")
const { isMentee, isMentor } = require("../middleware/reqAndOpp")

router.patch("/accept/request", auth, isMentee,accepting.acceptRequest)
router.patch("/accept/opp", auth, isMentor, accepting.acceptOpp)

router.patch("/reject/request", auth, isMentee,accepting.rejectRequest)
router.patch("/reject/opp", auth, isMentor, accepting.rejectOpp)

module.exports = router;