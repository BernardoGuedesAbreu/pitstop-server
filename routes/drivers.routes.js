const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const Driver = require("../models/Driver.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const { Types } = require("mongoose");

//ALL DRIVERS ROUTE
router.get("/drivers", async (req, res) => {
  try {
    const drivers = await Driver.find();

    res.json({ drivers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//CREATE A DRIVER ADMIN ONLY!!!!
router.post("/drivers", isAuthenticated, async (req, res) => {
  const id = req.payload._id;
  try {
    const user = await User.findById(id);
    if (user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const { driverId, givenName, familyName, dateOfBirth, nationality } =
      req.body;

    const newDriver = new Driver({
      driverId,
      givenName,
      familyName,
      dateOfBirth,
      nationality,
    });

    const savedDriver = await newDriver.save();

    res.status(201).json({ driver: savedDriver });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//ACESSING SPECIFIC DRIVER
router.get("/drivers/:driverId", async (req, res) => {
  const { driverId } = req.params;

  if (!Types.ObjectId.isValid(driverId)) {
    res.json({ message: "Specified id is not valid" });
    return;
  }

  try {
    let foundDriver = await Driver.findById(driverId);
    res.json(foundDriver);
  } catch (error) {
    res.json(error);
  }
});

// DELETE A DRIVER BY ID (ADMIN ONLY)
router.delete("/drivers/:driverId", isAuthenticated, async (req, res) => {
  const { driverId } = req.params;
  const id = req.payload._id;
  try {
    const user = await User.findById(id);
    if (user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    if (!Types.ObjectId.isValid(driverId)) {
      return res.status(400).json({ message: "Invalid driver ID" });
    }

    const deletedDriver = await Driver.findByIdAndDelete(driverId);

    if (!deletedDriver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    res.json({ message: "Driver deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// UPDATE A DRIVER BY ID (ADMIN ONLY)
router.put("/drivers/:driverId", isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const { driverId } = req.params;
    const { givenName, familyName, dateOfBirth, nationality } = req.body;

    if (!Types.ObjectId.isValid(driverId)) {
      return res.status(400).json({ message: "Invalid driver ID" });
    }

    const updatedDriver = await Driver.findByIdAndUpdate(
      driverId,
      { givenName, familyName, dateOfBirth, nationality },
      { new: true }
    );

    if (!updatedDriver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    res.json({ driver: updatedDriver });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
