const express = require("express");
const router = express.Router();

const { globalSearch } = require("../../controllers/search/searchController");
const { protect } = require("../../middleware/authMiddleware");

router.get("/", protect, globalSearch);

module.exports = router;