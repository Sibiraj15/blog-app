const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false },// optional for Google login
  role: { type: String, default: "user" } 
});

module.exports = mongoose.model("User", userSchema);
