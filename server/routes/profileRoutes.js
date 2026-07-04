const express = require("express");
const router = express.Router();

const {
  getProfile,
  updateProfile,
  changePassword
} = require("../controllers/profileController");

const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getProfile);

const { validateRequired } = require("../middleware/validateMiddleware");

router.put(
  "/update",
  protect,
  validateRequired(["name", "email"]),
  updateProfile
);

router.put("/password", protect, changePassword);

module.exports = router;