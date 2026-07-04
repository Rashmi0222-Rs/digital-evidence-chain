const ActivityLog = require("../models/ActivityLog");

exports.getActivityLogs = async (req, res) => {
  try {
    const logs = await ActivityLog.find()
      .populate("userId", "name email role")
      .populate("caseId", "caseTitle category status")
      .populate("evidenceId", "originalName status")
      .sort({ createdAt: -1 });

    res.json(logs);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch activity logs",
      error: error.message
    });
  }
};