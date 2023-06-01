const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  profilePicture: { type: String },
  role: { type: String, enum: ["admin", "standard"], default: "standard" },
});

const User = model("User", userSchema);

module.exports = User;
