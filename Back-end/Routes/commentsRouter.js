const express = require("express")
const Comment = require('../Controllers/commentsController')

const auth = require("../middleware/auth");
const router = express.Router()
// router.post("/comment/:mentorApplicationId", auth, Comment.addComment);
router.post("/comment/:mentorApplicationId", auth, Comment.addComment);
router.delete("/comment/:commentId", auth, Comment.deleteComment);
router.get("/comment/:mentorApplicationId", Comment.getComment);
module.exports = router