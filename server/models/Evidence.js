const mongoose = require("mongoose");

const evidenceSchema = new mongoose.Schema(
  {
    caseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Case",
      required: true
    },
    originalName: String,
    fileName: String,
    filePath: String,
    fileType: String,
    fileSize: Number,
    hash: String,
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    status: {
      type: String,
      enum: ["pending", "verified", "tampered"],
      default: "pending"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Evidence", evidenceSchema);