const express = require("express");
const router = express.Router();

const {
  createCase,
  getCases,
  getMyCases,
  updateCaseStatus
} = require("../controllers/caseController");

const { protect, authorizeRoles } = require("../middleware/authMiddleware");

router.post("/", protect, createCase);
router.get("/", protect, authorizeRoles("admin", "verifier"), getCases);
router.get("/my-cases", protect, getMyCases);
router.put("/:id/status", protect, authorizeRoles("admin", "verifier"), updateCaseStatus);

module.exports = router;