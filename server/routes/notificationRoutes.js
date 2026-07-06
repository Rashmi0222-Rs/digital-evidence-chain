const express = require("express");
const router = express.Router();

const {
  getNotifications,
  createNotification,
  markRead,
  deleteNotification,
  clearAll
} = require("../controllers/notificationController");

const { protect, authorizeRoles } = require("../middleware/authMiddleware");

// Get notifications for logged-in user
router.get("/", protect, getNotifications);

// Only Admin can manually create system notifications
router.post("/", protect, authorizeRoles("admin"), createNotification);

// Mark notification as read
router.put("/:id", protect, markRead);

// Delete notification
router.delete("/:id", protect, deleteNotification);

// Clear notifications visible to logged-in user
router.delete("/", protect, clearAll);

module.exports = router;