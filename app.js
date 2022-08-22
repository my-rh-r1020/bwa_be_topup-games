const express = require("express"),
  app = express(),
  path = require("path"),
  // App Package
  cookieParser = require("cookie-parser"),
  logger = require("morgan");

// API Main Router
const verV1 = "/api/v1",
  // Routers App
  urlRouter = "./app/api/v1",
  categoriesRouter = require(`${urlRouter}/categories/router`),
  nominalRouter = require(`${urlRouter}/nominals/router`),
  voucherRouter = require(`${urlRouter}/vouchers/router`),
  bankRouter = require(`${urlRouter}/banks/router`);

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
app.use(`${verV1}/nominals`, nominalRouter);
app.use(`${verV1}/vouchers`, voucherRouter);
app.use(`${verV1}/banks`, bankRouter);

// Middleware Use
app.use(notFoundMiddleware);
app.use(handlerError);

module.exports = app;
