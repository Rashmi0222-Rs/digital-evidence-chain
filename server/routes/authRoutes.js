const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const { validateRequired } = require("../middleware/validateMiddleware");

router.post(
  "/register",
  validateRequired(["name", "email", "password", "role"]),
  authController.registerUser
);

router.post(
  "/login",
  validateRequired(["email", "password"]),
  authController.loginUser
);

module.exports = router;