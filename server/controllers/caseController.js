const Case = require("../models/Case");
const createNotification = require("../utils/notificationHelper");

exports.createCase = async (req, res) => {
  try {
    const { caseTitle, description, category } = req.body;

    const newCase = await Case.create({
      caseTitle,
      description,
      category,
      createdBy: req.user.id
    });

    // Create Notification
    await createNotification(
      "New Case Created",
      `Case "${newCase.caseTitle}" has been created successfully.`,
      "info"
    );

    res.status(201).json({
      message: "Case created successfully",
      case: newCase
    });
  } catch (error) {
    res.status(500).json({
      message: "Case creation failed",
      error: error.message
    });
  }
};

exports.getCases = async (req, res) => {
  try {
    const cases = await Case.find()
      .populate("createdBy", "name email role")
      .sort({ createdAt: -1 });

    res.json(cases);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch cases",
      error: error.message
    });
  }
};

exports.getMyCases = async (req, res) => {
  try {
    const cases = await Case.find({
      createdBy: req.user.id
    }).sort({
      createdAt: -1
    });

    res.json(cases);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch your cases",
      error: error.message
    });
  }
};

exports.updateCaseStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const updatedCase = await Case.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedCase) {
      return res.status(404).json({
        message: "Case not found"
      });
    }

    // Create Notification
    await createNotification(
      "Case Status Updated",
      `Case "${updatedCase.caseTitle}" status changed to "${status}".`,
      "success"
    );

    res.json({
      message: "Case status updated successfully",
      case: updatedCase
    });
  } catch (error) {
    res.status(500).json({
      message: "Case update failed",
      error: error.message
    });
  }
};