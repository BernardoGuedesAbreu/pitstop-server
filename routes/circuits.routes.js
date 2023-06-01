
const express = require("express");
const router = express.Router();
const User = require('../models/User.model');
const Circuits = require("../models/Circuits.model");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

//ALL CIRCUITS ROUTE
router.get("/circuits", async (req, res) => {
    try {
      
      const circuits = await Circuits.find();
  
      res.json({ circuits });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });


  
  
  //ADMIN POST ROUTE!!!!!!
  router.post(
    '/circuits',
    isAuthenticated,
    async (req, res) => {
      try {
        const user = await User.findById(req.payload._id);
        if (user.role !== 'admin') {
          return res.status(403).json({ message: 'Unauthorized' });
        }
  
        const { circuitId, circuitName, location } = req.body;
  
        const newCircuit = new Circuits({
          circuitId,
          circuitName,
          location,
        });
  
        const savedCircuit = await newCircuit.save();
  
        res.status(201).json({ circuit: savedCircuit });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  );
  
  module.exports = router;
  


 
  