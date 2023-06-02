const express = require("express");
const router = express.Router();
const Result = require("../models/Results.model");
//ALL RESULTS ROUTE
router.get("/results", async (req, res) => {
  try {
    const results = await Result.find();

    res.json({ results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
module.exports = router;