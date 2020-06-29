const express = require("express"),
  multiParty = require("connect-multiparty");

let api = express.Router(),
  userController = require("../controllers/users.controller"),
  galleryMiddleware = multiParty({ uploadDir: "./files/gallery" });

//users ENDPOINT
api.get("/", (req, res) => {
  res.send("Hola API");
});

api.get("/users", userController.getUsers);
api.get("/users/:name", userController.getUserByName);
api.get("/user/:id", userController.getUserByID);

api.post("/user", userController.postUser);
api.post("/users", userController.postUsers);
api.post("/login", userController.loginUsers);

api.patch("/user/:id", userController.patchUser);

api.delete("/user/:id", userController.deleteUser);

module.exports = api;
