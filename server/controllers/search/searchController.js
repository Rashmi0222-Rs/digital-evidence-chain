const User = require("../../models/User");
const Case = require("../../models/Case");
const Evidence = require("../../models/Evidence");
const ActivityLog = require("../../models/ActivityLog");

exports.globalSearch = async (req, res) => {
  try {
    const q = req.query.q || "";

    if (!q.trim()) {
      return res.json({
        users: [],
        cases: [],
        evidence: [],
        activities: []
      });
    }

    const regex = new RegExp(q, "i");

    const users = await User.find({
      $or: [{ name: regex }, { email: regex }, { role: regex }]
    })
      .select("-password")
      .limit(5);

    const cases = await Case.find({
      $or: [{ caseTitle: regex }, { description: regex }, { category: regex }]
    }).limit(5);

    const evidence = await Evidence.find({
      $or: [{ originalName: regex }, { fileType: regex }, { status: regex }]
    })
      .populate("caseId", "caseTitle")
      .limit(5);

    const activities = await ActivityLog.find({
      $or: [{ action: regex }, { remarks: regex }]
    }).limit(5);

    res.json({
      users,
      cases,
      evidence,
      activities
    });
  } catch (error) {
    res.status(500).json({
      message: "Search failed",
      error: error.message
    });
  }
};