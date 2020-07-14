const env = require("dotenv").config(),
  app = require("./app"),
  port = process.env.PORT || 3000,
  fs = require("fs"),
  httpsOptions = {
    key: fs.readFileSync('./config/cert.key'),
    cert: fs.readFileSync('./config/cert.pem')
};

// let https = require("https").Server(httpsOptions, app),
//   io = require("../controllers/socketDocs.controller")(https);

let http = require("http").Server(app),
  io = require("../controllers/socketDocs.controller")(http);

http.listen(port, (err) => {
  !err
    ? console.log(`The service is running at http://localhost:${port}/`)
    : console.log(`the service is not working`);
});
