const express = require("express"),
  app = express(),
  path = require("path"),
  // App Package
  cookieParser = require("cookie-parser"),
  logger = require("morgan");

// API Main Router
const verV1 = "/api/v1",
  // Routers App
  // usersRouter = require(`./app${verV1}/users/router`),
  categoriesRouter = require(`./app/api/v1/categories/router`);

// Middlewares
const notFoundMiddleware = require("./app/middlewares/not-found"),
  handlerError = require("./app/middlewares/handle-error");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.json({ message: "WELCOME TO API - TOPUP GAMES STORE" });
});

// Super Admin Middlewares
app.use(`${verV1}/categories`, categoriesRouter);

// Middleware Use
app.use(notFoundMiddleware);
app.use(handlerError);

module.exports = app;
