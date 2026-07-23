const fs = require("fs");
const crypto = require("crypto");
const Evidence = require("../models/Evidence");
const ActivityLog = require("../models/ActivityLog");
const createNotification = require("../utils/notificationHelper");

const generateFileHash = (filePath) => {
  const fileBuffer = fs.readFileSync(filePath);
  return crypto.createHash("sha256").update(fileBuffer).digest("hex");
};

exports.uploadEvidence = async (req, res) => {
  try {
    const { caseId } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const hash = generateFileHash(req.file.path);

    const evidence = await Evidence.create({
      caseId,
      originalName: req.file.originalname,
      fileName: req.file.filename,
      filePath: `/uploads/${req.file.filename}`,
      fileType: req.file.mimetype,
      fileSize: req.file.size,
      hash,
      uploadedBy: req.user.id
    });

    await ActivityLog.create({
      evidenceId: evidence._id,
      caseId,
      userId: req.user.id,
      action: "Evidence Uploaded",
      remarks: `${req.file.originalname} uploaded and SHA-256 hash generated`
    });

    await createNotification({
  title: "Evidence Uploaded",
  message: `${req.file.originalname} uploaded successfully.`,
  type: "success",
  recipient: req.user._id || req.user.id,
  role: "user"
});

await createNotification({
  title: "New Evidence Submitted",
  message: `${req.user.name} uploaded evidence "${req.file.originalname}".`,
  type: "info",
  role: "admin"
});

await createNotification({
  title: "Evidence Waiting for Verification",
  message: `${req.file.originalname} requires verification.`,
  type: "warning",
  role: "verifier"
});

    res.status(201).json({
      message: "Evidence uploaded successfully",
      evidence
    });
  } catch (error) {
    res.status(500).json({
      message: "Evidence upload failed",
      error: error.message
    });
  }
};

exports.getEvidence = async (req, res) => {
  try {
    const evidence = await Evidence.find()
      .populate("caseId", "caseTitle category status")
      .populate("uploadedBy", "name email role")
      .sort({ createdAt: -1 });

    res.json(evidence);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch evidence",
      error: error.message
    });
  }
};

exports.getEvidenceByCase = async (req, res) => {
  try {
    const evidence = await Evidence.find({ caseId: req.params.caseId }).sort({
      createdAt: -1
    });

    res.json(evidence);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch case evidence",
      error: error.message
    });
  }
};

exports.verifyEvidence = async (req, res) => {
  try {
    const evidence = await Evidence.findById(req.params.id);

    if (!evidence) {
      return res.status(404).json({ message: "Evidence not found" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Verification file is required" });
    }

    const uploadedHash = generateFileHash(req.file.path);
    const status = uploadedHash === evidence.hash ? "verified" : "tampered";

    evidence.status = status;
    await evidence.save();

    await ActivityLog.create({
      evidenceId: evidence._id,
      caseId: evidence.caseId,
      userId: req.user.id,
      action: status === "verified" ? "Evidence Verified" : "Evidence Tampered",
      remarks:
        status === "verified"
          ? "Uploaded file hash matched with original evidence hash"
          : "Uploaded file hash did not match with original evidence hash"
    });

   await createNotification({
  title:
    status === "verified"
      ? "Evidence Verified"
      : "Evidence Tampered",
  message:
    status === "verified"
      ? `${evidence.originalName} has been verified successfully.`
      : `${evidence.originalName} failed verification.`,
  type: status === "verified" ? "success" : "error",
  recipient: evidence.uploadedBy,
  role: "user"
});

await createNotification({
  title:
    status === "verified"
      ? "Evidence Verified"
      : "Tampered Evidence",
  message: `${req.user.name} completed verification for "${evidence.originalName}".`,
  type: status === "verified" ? "success" : "error",
  role: "admin"
});

    res.json({
      message:
        status === "verified"
          ? "Evidence Verified Successfully"
          : "Evidence has been Tampered",
      originalHash: evidence.hash,
      uploadedHash,
      status
    });
  } catch (error) {
    res.status(500).json({
      message: "Verification failed",
      error: error.message
    });
  }
};