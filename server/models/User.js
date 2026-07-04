const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: ["user", "verifier", "admin"],
      default: "user"
    },

    // Profile Picture
    avatar: {
      type: String,
      default: ""
    },

    // Optional information
    phone: {
      type: String,
      default: ""
    },

    designation: {
      type: String,
      default: ""
    },

    department: {
      type: String,
      default: ""
    },

    lastLogin: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", userSchema);