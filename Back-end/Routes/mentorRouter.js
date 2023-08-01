const router = require("express").Router();
const { PostMentor, GetMentors, getById, PatchMentor, DeleteMentor, getByUserId } = require('../Controllers/mentorProfileController');
const auth = require('../middleware/auth');
const upload = require("../middleware/upload");

router.use(auth)

router.post("/mentorProfile", upload.single('avatar'), PostMentor);
router.get("/mentorProfile", GetMentors);
router.get("/mentorProfile/:id", getById);
router.get("/mentorProfile/user/:id", getByUserId);
router.patch("/mentorProfile/:id", upload.single('avatar'), PatchMentor);
router.delete("/mentorProfile/:id", DeleteMentor)

module.exports = router;
