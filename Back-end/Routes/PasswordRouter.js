const { forgetPassword, resetPassword } = require('../Controllers/passwordController');
const express = require("express");
const router = express.Router();

router.post('/forgetPassword', forgetPassword)
router.post('/resetPassword/:id/:token', resetPassword)

module.exports = router;
