const Notification = require("../models/Notification");

// Get all notifications
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find()
      .sort({ createdAt: -1 });

    res.json(notifications);

  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch notifications",
      error: err.message
    });
  }
};

// Create notification
exports.createNotification = async (req, res) => {
  try {
    const notification = await Notification.create(req.body);

    res.status(201).json(notification);

  } catch (err) {
    res.status(500).json({
      message: "Failed to create notification",
      error: err.message
    });
  }
};

// Mark notification as read
exports.markRead = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({
        message: "Notification not found"
      });
    }

    notification.read = true;

    await notification.save();

    res.json(notification);

  } catch (err) {
    res.status(500).json({
      message: "Unable to update notification",
      error: err.message
    });
  }
};

// Delete notification
exports.deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({
        message: "Notification not found"
      });
    }

    await notification.deleteOne();

    res.json({
      message: "Notification removed successfully"
    });

  } catch (err) {
    res.status(500).json({
      message: "Unable to delete notification",
      error: err.message
    });
  }
};

// Clear all notifications
exports.clearAll = async (req, res) => {
  try {
    await Notification.deleteMany({});

    res.json({
      message: "All notifications cleared successfully"
    });

  } catch (err) {
    res.status(500).json({
      message: "Unable to clear notifications",
      error: err.message
    });
  }
};