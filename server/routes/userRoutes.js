const express = require("express");
const router = express.Router();

const {
  getUsers,
  updateUserRole,
  deleteUser
} = require("../controllers/userController");

const { protect, authorizeRoles } = require("../middleware/authMiddleware");

router.get("/", protect, authorizeRoles("admin"), getUsers);
router.put("/:id/role", protect, authorizeRoles("admin"), updateUserRole);
router.delete("/:id", protect, authorizeRoles("admin"), deleteUser);

module.exports = router;