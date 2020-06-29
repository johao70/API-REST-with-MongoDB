const express = require("express"),
  bodyParser = require("body-parser"),
  connectDB = require("../config/db"),
  passport = require("passport"),
  cors = require("cors"),
  parseurl = require("parseurl");

let app = express(),
  session = require("express-session"),
  fileRoutes = require("../routes/files.routes"),
  userRoutes = require("../routes/users.routes"),
  db = connectDB(),
  sess = {
    //SESSION CONFIG
    secret: process.env.KEY_SESSION,
    resave: false,
    saveUninitialized: true,
    name: "sessionID",
    cookie: {
      httpOnly: false,
      maxAge: parseInt(process.env.TIME),
    },
  },
  corsOptions = {
    origin: "http://localhost:3500",
    optionsSuccessStatus: 200,
  };

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

//Cors configuration
app.use(cors(corsOptions));

//Session
app.use(session(sess));

//Passport
app.use(passport.initialize());
app.use(passport.session());

//Session examples to verificate
app.use((req, res, next) => {
  if (!req.session.views) {
    req.session.views = {};
  }
  let pathname = parseurl(req).pathname;
  req.session.views[pathname] = (req.session.views[pathname] || 0) + 1;
  next();
});

app.get("/test1", (req, res) => {
  res.send(
    `Number of visits in this page: ${req.session.views["/test1"]} times, session: ${req.sessionID}`
  );
});

//Routes
app.use("/api", fileRoutes);
app.use("/api", userRoutes);

module.exports = app;
