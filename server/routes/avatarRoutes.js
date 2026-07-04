const express = require("express");
const router = express.Router();

const User = require("../models/User");
const { protect } = require("../middleware/authMiddleware");
const uploadAvatar = require("../middleware/uploadAvatar");

router.post("/", protect, uploadAvatar.single("avatar"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Avatar file required" });
    }

    const user = await User.findById(req.user.id);

   user.avatar = `uploads/avatars/${req.file.filename}`;
    await user.save();

    res.json({
      message: "Avatar uploaded successfully",
      avatar: user.avatar,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar
      }
    });
  } catch (err) {
    res.status(500).json({
      message: "Avatar upload failed",
      error: err.message
    });
  }
});

module.exports = router;