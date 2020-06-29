const mongoose = require("mongoose");

const { Schema } = mongoose;

const userModel = Schema({
  id: { type: Number },
  name: { type: String },
  lastname: { type: String },
  age: { type: Number },
  email: { type: String },
  profile_pic: { type: String },
  password: { type: String },
  sessionID: { type: String },
});

module.exports = mongoose.model("User", userModel);
