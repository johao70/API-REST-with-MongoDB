const bcrypt = require("bcrypt");

//Middleware(next) nos permite dar paso al siguiente proceso.
let encodePassword = (req, res, next) => {
  let user = req.body.user || null;

  if (!user || !user.password || user.password == "") {
    return res.status(200).send("Invalid password");
  } else {
    let encodePassword = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
    req.body.user.password = encodePassword;
    req.body.user.createAt = new Date();
    req.body.user.sessionID = req.sessionID;

    next();
  }
};

module.exports = { encodePassword };
