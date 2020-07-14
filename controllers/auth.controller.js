const jwt = require("jsonwebtoken");

//Middleware(next) nos permite dar paso al siguiente proceso.
let auth = (req, res, next) => {
  let token = req.headers.authorization || null;

  jwt.verify(token, req.sessionID, (err, decode) => {
    if (err) {
      return res.status(400).json({
        data: err,
        msg: "Invalid token",
      });
    } else {
      let token = jwt.sign({ data: decode.data }, req.sessionID, {
        algorithm: "HS256",
        expiresIn: 600000,
      });

      req.decode = decode;
      req.token = token;

      next();
    }
  });
};

module.exports = {
  auth,
};
