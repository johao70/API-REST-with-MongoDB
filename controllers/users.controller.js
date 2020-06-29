const fs = require("fs"),
  User = require("../models/userModel");

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

let postUserTest = (req, res) => {
  let id = parseInt(req.params.id),
    data = req.body.data,
    file = req.files.file;

  if (file == undefined) {
    return res.status(400).json({ msg: "No file" });
  } else {
    let url = file.path;

    url = url.split("/");
    let urlFile = [url[url.length - 1]];

    data.profile_pic = urlFile[0];
    return res.status(200).send(console.log(data.data));

    // User.findOneAndUpdate({ id }, { $set: data })
    // .then((data) => {
    //   res.status(200).json({
    //     ok: true,
    //     data: data,
    //     msg: "ready",
    //   });
    // })
    // .catch((err) => {
    //   res.status(500).json({
    //     ok: false,
    //     data: null,
    //     msg: err,
    //   });
    // });
  }
};

let patchUsers = (req, res) => {
  //NO FUNCIONA :V
  let data = req.body.data; //Array de Objetos

  data.forEach((element, i) => {
    let id = parseInt(element.id);

    User.findOneAndUpdate({ id }, { $set: element });
    if (i + 1 === data.length) {
      res.status(200).json({
        ok: true,
        data: data,
        msg: "ready",
      });
    }
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

module.exports = {
  getUsers,
  getUserByID,
  getUserByName,
  postUser,
  postUsers,
  patchUser,
  patchUsers,
  deleteUser,

  postUserTest,
};
