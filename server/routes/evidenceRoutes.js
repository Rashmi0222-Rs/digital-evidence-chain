const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const router = express.Router();

const {
  uploadEvidence,
  getEvidence,
  getEvidenceByCase,
  verifyEvidence
} = require("../controllers/evidenceController");

const { protect } = require("../middleware/authMiddleware");

const uploadDir = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadDir);
  },

  filename(req, file, cb) {
    const extension = path.extname(file.originalname);
    const baseName = path
      .basename(file.originalname, extension)
      .replace(/[^a-zA-Z0-9_-]/g, "_");

    cb(null, `${Date.now()}-${baseName}${extension}`);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 20 * 1024 * 1024
  }
});

router.post("/upload", protect, upload.single("file"), uploadEvidence);
router.post("/verify/:id", protect, upload.single("file"), verifyEvidence);
router.get("/", protect, getEvidence);
router.get("/case/:caseId", protect, getEvidenceByCase);

module.exports = router;