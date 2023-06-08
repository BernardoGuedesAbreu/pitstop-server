
const {Schema, model} = require('mongoose');

const driverSchema = new Schema({
    driverId: String,
    givenName: String,
    familyName: String,
    dateOfBirth: Date,
    nationality: String,
    url: {
      type: String,
      default: "https://cdn.discordapp.com/attachments/1095737455967207474/1116368210569199657/Yuki.png"
    },
  });

  const Driver = model("Driver",driverSchema);

  module.exports = Driver