const express = require("express");
const router = express.Router();

const {
  getNotifications,
  createNotification,
  markRead,
  deleteNotification,
  clearAll
} = require("../controllers/notificationController");

router.get("/", getNotifications);

router.post("/", createNotification);

router.put("/:id", markRead);

router.delete("/:id", deleteNotification);

router.delete("/", clearAll);

module.exports = router;