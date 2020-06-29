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

api.patch("/user/:id", userController.patchUser);
api.patch("/users", userController.patchUsers);

api.delete("/user/:id", userController.deleteUser);

api.patch("/user_test/:id", galleryMiddleware, userController.postUserTest);

module.exports = api;
