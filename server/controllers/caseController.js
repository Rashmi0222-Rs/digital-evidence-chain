const Case = require("../models/Case");
const createNotification = require("../utils/notificationHelper");

exports.createCase = async (req, res) => {
  try {
    const { caseTitle, description, category } = req.body;

    if (!caseTitle || !description || !category) {
      return res.status(400).json({
        message: "Please fill all case details"
      });
    }

    const newCase = await Case.create({
      caseTitle,
      description,
      category,
      createdBy: req.user._id || req.user.id
    });

    await createNotification({
      title: "Case Created",
      message: `Your case "${newCase.caseTitle}" has been created successfully.`,
      type: "success",
      recipient: req.user._id || req.user.id,
      role: "user"
    });

    await createNotification({
      title: "New Case Created",
      message: `${req.user.name} created case "${newCase.caseTitle}".`,
      type: "info",
      role: "admin"
    });

    await createNotification({
      title: "New Case Available",
      message: `Case "${newCase.caseTitle}" is available for review.`,
      type: "info",
      role: "verifier"
    });

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
      createdBy: req.user._id || req.user.id
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
    ).populate("createdBy", "name email role");

    if (!updatedCase) {
      return res.status(404).json({
        message: "Case not found"
      });
    }

    await createNotification({
      title: "Case Status Updated",
      message: `Your case "${updatedCase.caseTitle}" status changed to "${status}".`,
      type: "success",
      recipient: updatedCase.createdBy?._id,
      role: "user"
    });

    await createNotification({
      title: "Case Status Updated",
      message: `${req.user.name} updated "${updatedCase.caseTitle}" to "${status}".`,
      type: "info",
      role: "admin"
    });

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