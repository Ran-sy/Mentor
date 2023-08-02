const router = require("express").Router();
const { PostMentor, GetMentors, getById, PatchMentor, DeleteMentor, getByUserId } = require('../Controllers/mentorProfileController');
const auth = require('../middleware/auth');
const upload = require("../middleware/upload");

router.post("/mentorProfile", auth, upload.single('avatar'), PostMentor);
router.get("/mentorProfile", GetMentors);
router.get("/mentorProfile/:id", auth, getById);
router.get("/mentorProfile/user/:id", auth, getByUserId);
router.patch("/mentorProfile/:id", auth, upload.single('avatar'), PatchMentor);
router.delete("/mentorProfile/:id", auth, DeleteMentor)

module.exports = router;
