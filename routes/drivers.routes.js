const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const Driver = require("../models/Driver.model");
const { isAuthenticated } = require('../middleware/jwt.middleware');

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
router.post('/drivers', isAuthenticated, async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
      if (user.role !== 'admin') {
        return res.status(403).json({ message: 'Unauthorized' });
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
      res.status(500).json({ message: 'Internal server error' });
    }
  });


  //ACESSING SPECIFIC DRIVER
  router.get('/drivers/:driverId', async (req,res)=>{
    const {driverId} = req.params;

    if(!Types.ObjectId.isValid(driverId)){
        res.json({message: 'Specified id is not valid'});
        return;
    }

    try{
        let foundDriver = await Driver.findById(driverId)
        res.json(foundDriver);
    }
    catch(error){
        res.json(error);
    }
});

module.exports = router;
