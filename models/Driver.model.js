
const {Schema, model} = require('mongoose');

const driverSchema = new Schema({
    driverId: String,
    givenName: String,
    familyName: String,
    dateOfBirth: Date,
    nationality: String,
    url: {
      type: String,
      default: "../2019-drivers/Yuki-png"
    },
  });

  const Driver = model("Driver",driverSchema);

  module.exports = Driver