const express = require("express"),
  app = express(),
  path = require("path"),
  // App Package
  cookieParser = require("cookie-parser"),
  logger = require("morgan");

// API Routes
const verV1 = "/api/v1",
  categoriesRouter = require("./app/api/v1/categories/router");
// var indexRouter = require("./routes/index");
// var usersRouter = require("./routes/users");

// Middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// app.use("/", indexRouter);
// app.use("/users", usersRouter);

module.exports = app;
