const mongoose = require("mongoose");

const { Schema } = mongoose;

const userModel = Schema({
  id: { type: Number },
  name: { type: String },
  lastname: { type: String },
  age: { type: Number },
  profile_pic: { type: String },
});

module.exports = mongoose.model("User", userModel);
