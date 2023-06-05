const {Schema, model} = require('mongoose');

const circuitSchema = new Schema({
  circuitId: { type: String, required: true },
  circuitName: { type: String, required: true },
  location: {
    lat: { type: Number},
    long: { type: Number},
    locality: { type: String },
    country: { type: String },
  },
});

const Circuits = model('Circuit', circuitSchema);

module.exports = Circuits;
