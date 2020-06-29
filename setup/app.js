const express = require("express"),
  bodyParser = require("body-parser"),
  connectDB = require("../config/db");

let app = express(),
  fileRoutes = require("../routes/files.routes"),
  userRoutes = require("../routes/users.routes"),
  db = connectDB();

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

app.use("/api", fileRoutes);
app.use("/api", userRoutes);

module.exports = app;
