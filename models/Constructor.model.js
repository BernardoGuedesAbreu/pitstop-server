let {Schema, model} = require('mongoose');

let constructorSchema = new Schema({
    name: String,
    nationality: String,
    bio: String,
    championships: Number,
  });

  let Constructor = model("Contructor",constructorSchema);

  module.exports = Constructor