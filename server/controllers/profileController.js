const bcrypt = require("bcryptjs");
const User = require("../models/User");
const createNotification = require("../utils/notificationHelper");

const cleanUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  avatar: user.avatar,
  phone: user.phone,
  designation: user.designation,
  department: user.department
});

// Get Profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json(cleanUser(user));
  } catch (err) {
    res.status(500).json({
      message: "Unable to fetch profile",
      error: err.message
    });
  }
};

// Update Profile
exports.updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    if (email && email !== user.email) {
      const existing = await User.findOne({ email });

      if (existing) {
        return res.status(400).json({
          message: "Email already exists"
        });
      }
    }

    user.name = name || user.name;
    user.email = email || user.email;

    await user.save();

    await createNotification({
      title: "Profile Updated",
      message: "Your profile information was updated successfully.",
      type: "info",
      recipient: user._id,
      role: user.role
    });

    res.json({
      message: "Profile updated successfully",
      user: cleanUser(user)
    });
  } catch (err) {
    res.status(500).json({
      message: "Profile update failed",
      error: err.message
    });
  }
};

// Change Password
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const match = await bcrypt.compare(currentPassword, user.password);

    if (!match) {
      return res.status(400).json({
        message: "Current password is incorrect"
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters"
      });
    }

    user.password = await bcrypt.hash(newPassword, 10);

    await user.save();

    await createNotification({
      title: "Password Changed",
      message: "Your account password was changed successfully.",
      type: "warning",
      recipient: user._id,
      role: user.role
    });

    res.json({
      message: "Password updated successfully"
    });
  } catch (err) {
    res.status(500).json({
      message: "Password update failed",
      error: err.message
    });
  }
};