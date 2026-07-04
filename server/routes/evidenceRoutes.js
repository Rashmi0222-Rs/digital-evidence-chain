const express = require("express");
const multer = require("multer");
const router = express.Router();

const {
  uploadEvidence,
  getEvidence,
  getEvidenceByCase,
  verifyEvidence
} = require("../controllers/evidenceController");

const { protect } = require("../middleware/authMiddleware");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

router.post("/upload", protect, upload.single("file"), uploadEvidence);
router.post("/verify/:id", protect, upload.single("file"), verifyEvidence);
router.get("/", protect, getEvidence);
router.get("/case/:caseId", protect, getEvidenceByCase);

module.exports = router;