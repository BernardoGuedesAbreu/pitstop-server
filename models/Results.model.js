
const {Schema, model} = require('mongoose');

const resultSchema = new Schema({
  season: Number,
  round: Number,
  circuitName: String,
  circuitLocation: {
    country: String,
  },
  date: Date,
  results: [
    {
      driverId: String,
      position: String,
      points: Number,
      constructor: String,
      grid: Number,
      time: String,
      fastestLap: {
        time: String,
        averageSpeed: Number,
      },
    },
  ],
});

const Result = model("Result", resultSchema);

module.exports = Result;

