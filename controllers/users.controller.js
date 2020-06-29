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
  let id = parseInt(req.params.id);

  User.find({ id })
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
  let data = req.body.data;

  if (!data.password || !data.email) {
    res.status(404).send("Invalid user or password");
  } else {
    let encryptedPassword = bcrypt.hashSync(
      data.password,
      bcrypt.genSaltSync(10)
    );

    data.password = encryptedPassword;
    data.sessionID = req.sessionID;

    User.create(data)
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
  }
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
  let id = parseInt(req.params.id),
    data = req.body.data;

  User.findOneAndUpdate({ id }, { $set: data })
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
  let id = parseInt(req.params.id);

  User.deleteOne({ id })
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
  let email = req.body.data.email,
    password = req.body.data.password;

  // let token = jwt.sign({ data: email }, req.sessionID, {
  //   algorithm: "HS256",
  //   expiresIn: parseInt(process.env.TIME),
  // });
  // console.log(token);

  User.find({ email }).then((data) => {
    if (data[0].email === email) {
      bcrypt.compareSync(password, data[0].password)
        ? res.status(200).json({
            ok: true,
            data: data,
            msg: "ready",
          })
        : res.status(500).json({
            ok: false,
            data: null,
            msg: "Incorrect Password",
          });
    } else {
      res.status(404).json({
        ok: true,
        data: null,
        msg: "Email not found",
      });
    }
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
