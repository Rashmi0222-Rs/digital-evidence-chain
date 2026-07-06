const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    message: {
      type: String,
      required: true
    },

    type: {
      type: String,
      enum: ["success", "warning", "error", "info"],
      default: "info"
    },

    // Personal notification
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },

    // Role notification
    role: {
      type: String,
      enum: ["admin", "verifier", "user", "all"],
      default: "all"
    },

    read: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Notification", notificationSchema);