const express = require("express"),
  multiParty = require("connect-multiparty");

let api = express.Router(),
  userController = require("../controllers/users.controller"),
  passwordController = require("../controllers/password.controller"),
  authController = require("../controllers/auth.controller"),
  rolController = require("../controllers/rol.controller");
// galleryMiddleware = multiParty({ uploadDir: "./files/gallery" });

//users ENDPOINT
api.get("/users", userController.getUsers);
api.get("/users/:name", userController.getUserByName);
api.get("/user/:id", [authController.auth], userController.getUserByID);

api.post("/user", passwordController.encodePassword, userController.postUser);
api.post("/users", userController.postUsers);
api.post("/login", userController.loginUsers);

api.patch("/user/:id", userController.patchUser);

api.delete("/user/:id", userController.deleteUser);

module.exports = api;
