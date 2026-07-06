const Notification = require("../models/Notification");

const createNotification = async ({
  title,
  message,
  type = "info",
  recipient = null,
  role = "all"
}) => {
  try {
    await Notification.create({
      title,
      message,
      type,
      recipient,
      role
    });
  } catch (err) {
    console.error("Notification Error:", err.message);
  }
};

module.exports = createNotification;