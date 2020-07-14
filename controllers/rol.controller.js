const jwt = require("jsonwebtoken");

let adminRol = (req, res, next) => {
  let token = req.headers.authorization || null;

  jwt.verify(token, req.sessionID, (err, decode) => {
    if (err) {
      return res.status(400).json({
        data: err,
        msg: "Invalid token",
      });
    } else {
      switch (decode.data.rol) {
        case "Administrator":
          console.log("Welcome administrator.");
          next();
          break;
        default:
          console.log("You don't have permissions");
          res.status(401).json({
            ok: false,
            data: null,
            msg: "You don't have permissions",
          });
      }
    }
  });
};

let clientRol = (req, res, next) => {
  let token = req.headers.authorization || null;

  jwt.verify(token, req.sessionID, (err, decode) => {
    if (err) {
      return res.status(400).json({
        data: err,
        msg: "Invalid token",
      });
    } else {
      switch (decode.data.rol) {
        case "Client":
          console.log("Welcome client.");
          next();
          break;
        default:
          res.status(401).json({
            ok: false,
            data: null,
            msg: "You don't have permissions",
          });
      }
    }
  });
};

module.exports = {
  adminRol,
  clientRol,
};
