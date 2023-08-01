const express = require("express");
const router = express.Router();
const calendarController = require("../Controllers/calenderController");
const auth = require("../middleware/auth");

router.get("/calendar", auth, calendarController.getProfileCalendar);

module.exports = router;
