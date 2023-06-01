const express = require("express");
const router = express.Router();
const Constructor = require("../models/Constructor.model");
//ALL ConstructorS ROUTE
router.get("/constructors", async (req, res) => {
  try {
    const constructors = await Constructor.find();

    res.json({ constructors });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
module.exports = router;
