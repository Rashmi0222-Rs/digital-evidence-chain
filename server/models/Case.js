const mongoose = require("mongoose");

const caseSchema = new mongoose.Schema(
  {
    caseTitle: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    category: {
      type: String,
      enum: ["legal", "insurance", "cybercrime", "academic", "complaint", "other"],
      default: "other"
    },
    status: {
      type: String,
      enum: ["open", "under review", "verified", "rejected", "closed"],
      default: "open"
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Case", caseSchema);