const fs = require("fs"),
  User = require("../models/userModel"),
  bcrypt = require("bcrypt"),
  jwt = require("jsonwebtoken");

let getUsers = (req, res) => {
  console.log(req);
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
  let { name } = req.params;

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
  let { data } = req.body;

  User.create(data)
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
        msg: "No se pudo crear el usuario",
      });
    });
};

let postUsers = (req, res) => {
  let { data } = req.body; //Array de Objetos

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
  let { data } = req.body,
    email = data.email,
    password = data.password;

  User.find({ email })
    .then((data) => {
      if (data[0].email === email) {
        let token;
        bcrypt.compareSync(password, data[0].password)
          ? ((token = jwt.sign({ data: data[0] }, req.sessionID, {
              algorithm: "HS256",
              expiresIn: 120,
            })),
            res.status(200).json({
              ok: true,
              data: null,
              msg: "User OK",
              token,
            }))
          : res.status(404).json({
              ok: false,
              data: null,
              msg: "Incorrect password",
              token: null,
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
