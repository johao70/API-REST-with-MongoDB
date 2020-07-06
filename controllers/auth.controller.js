const jwt = require("jsonwebtoken");

//Middleware(next) nos permite dar paso al siguiente proceso.
let auth = (req, res, next) => {
  let token = req.headers.authorization || null;

  jwt.verify(token, process.env.KEY_JWT, (err, decode) => {
    if (err) {
      return res.status(400).json({
        data: err,
        msg: "Invalid token",
      });
    } else {
      let token = jwt.sign({ data: decode.data }, process.env.KEY_JWT, {
        algorithm: "HS256",
        expiresIn: 600000,
      });

      console.log(decode);
      req.decode = decode;
      req.token = token;

      next();
    }
  });
};

module.exports = {
  auth,
};
