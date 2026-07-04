const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Case = require("../models/Case");
const Evidence = require("../models/Evidence");

router.get("/stats", async (req, res) => {
  try {
    const users = await User.countDocuments();
    const cases = await Case.countDocuments();
    const evidence = await Evidence.countDocuments();
    const verified = await Evidence.countDocuments({ status: "verified" });

    const integrity = evidence > 0 ? Math.round((verified / evidence) * 100) : 100;

    res.json({
      evidence,
      users,
      cases,
      integrity
    });
  } catch (err) {
    res.status(500).json({ message: "Stats failed" });
  }
});

module.exports = router;