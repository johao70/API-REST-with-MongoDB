const fs = require("fs"),
  User = require("../models/userModel"),
  bcrypt = require("bcrypt"),
  jwt = require("jsonwebtoken");

let getUsers = (req, res) => {
  User.find()
    .then((data) => {
      res.status(200).json({
        ok: true,
        data: data,
        msg: "ready",
        token: req.token,
      });
    })
    .catch((err) => {
      res.status(500).json({
        ok: false,
        data: null,
        msg: err,
      });
    });
};

let getUserByID = (req, res) => {
  let _id = req.params.id;

  User.find({ _id })
    .then((data) => {
      res.status(200).json({
        ok: true,
        data: data,
        msg: "ready",
      });
    })
    .catch((err) => {
      res.status(500).json({
        ok: false,
        data: null,
        msg: err,
      });
    });
};

let getUserByName = (req, res) => {
  let name = req.params.name;

  User.find({ name })
    .then((data) => {
      res.status(200).json({
        ok: true,
        data: data,
        msg: "ready",
      });
    })
    .catch((err) => {
      res.status(500).json({
        ok: false,
        data: null,
        msg: err,
      });
    });
};

let postUser = (req, res) => {
  let user = req.body.user;

  User.create(user)
    .then((data) => {
      res.status(200).json({
        ok: true,
        data: data,
        msg: "ready",
      });
    })
    .catch((err) => {
      res.status(500).json({
        ok: false,
        data: null,
        msg: "No se pudo crear el usuario",
      });
    });
};

let postUsers = (req, res) => {
  let data = req.body.data; //Array de Objetos

  User.insertMany(data)
    .then((data) => {
      res.status(200).json({
        ok: true,
        data: data,
        msg: "ready",
      });
    })
    .catch((err) => {
      res.status(500).json({
        ok: false,
        data: null,
        msg: err,
      });
    });
};

let patchUser = (req, res) => {
  let _id = req.params.id,
    data = req.body.data;

  User.findOneAndUpdate({ _id }, { $set: data })
    .then((data) => {
      res.status(200).json({
        ok: true,
        data: data,
        msg: "ready",
      });
    })
    .catch((err) => {
      res.status(500).json({
        ok: false,
        data: null,
        msg: err,
      });
    });
};

let deleteUser = (req, res) => {
  let _id = req.params.id;

  User.deleteOne({ _id })
    .then((data) => {
      res.status(200).json({
        ok: true,
        data: data,
        msg: "ready",
      });
    })
    .catch((err) => {
      res.status(500).json({
        ok: false,
        data: null,
        msg: err,
      });
    });
};

let loginUsers = (req, res) => {
  let data = req.body.data,
    email = data.email,
    password = data.password;

  User.find({ email })
    .then((data) => {
      if (data[0].email === email) {
        let tokenBody = {
            email: data[0].email,
            rol: data[0].rol,
            name: data[0].name,
          },
          token = jwt.sign({ data: tokenBody }, req.sessionID, {
            algorithm: "HS256",
            expiresIn: 60,
          });

        bcrypt.compareSync(password, data[0].password)
          ? res.status(200).json({
              ok: true,
              data: data,
              msg: "ready",
              token,
            })
          : res.status(404).json({
              ok: false,
              data: null,
              msg: "Incorrect Password",
            });
      }
    })
    .catch((err) => {
      res.status(404).json({
        ok: false,
        data: null,
        msg: "Email not found",
      });
    });
};

module.exports = {
  getUsers,
  getUserByID,
  getUserByName,
  postUser,
  postUsers,
  patchUser,
  deleteUser,
  loginUsers,
};
