const express = require("express");
const router = express.Router();

const {
  sendOtp,
  resetPassword
} = require("../controllers/forgotPasswordController");

router.post("/send-otp", sendOtp);
router.post("/reset", resetPassword);

module.exports = router;