
const {Schema, model} = require('mongoose');

const driverSchema = new Schema({
    driverId: String,
    givenName: String,
    familyName: String,
    dateOfBirth: Date,
    nationality: String,
    bio:String,
  });

  const Driver = model("Driver",driverSchema);

  module.exports = Driver