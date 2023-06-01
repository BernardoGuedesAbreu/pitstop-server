const express = require("express");
const router = express.Router();
const Driver = require("../models/Driver.model");
const Results = require("../models/Results.model");
const Circuit = require("../models/Circuits.model");
const Constructor = require("../models/Constructor.model");

router.get("/dashboard", async (req, res) => {
  try {
    const drivers = await Driver.find();
    const results = await Results.find();
    const circuits = await Circuit.find();
    const constructors = await Constructor.find();

    res.json({ drivers, results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
