const messageController = require("../Controllers/messageController");
const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();

// add authentication
router.use(auth)

router.get("/message/receiver/:id", messageController.getReceiverMessages);
router.get("/message/sender/:id", messageController.getSenderMessages);

// /search for most relavent, /searchNewest for search by newest
router.get("/message/search", messageController.searchMessages);
router.get("/message/searchNewest", messageController.searchMessagesByDate);

router.post("/message/:id", messageController.createMessage);
router.get("/message/:id", messageController.getMessageById);

module.exports = router;
 