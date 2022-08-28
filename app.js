const express = require("express"),
  app = express(),
  path = require("path"),
  // App Package
  cookieParser = require("cookie-parser"),
  logger = require("morgan"),
  cors = require("cors");

// Admin Router App
const verV1 = "/api/v1",
  urlRouter = "./app/api/v1",
  userRouter = require(`${urlRouter}/users/router`),
  authRouter = require(`${urlRouter}/auth/router`),
  categoriesRouter = require(`${urlRouter}/categories/router`),
  nominalRouter = require(`${urlRouter}/nominals/router`),
  voucherRouter = require(`${urlRouter}/vouchers/router`),
  bankRouter = require(`${urlRouter}/banks/router`),
  paymentRouter = require(`${urlRouter}/payments/router`),
  transactionRouter = require(`${urlRouter}/transactions/router`);

// Player Router App
const verV1Player = "/api/v1-player",
  urlRouterPlayer = "./app/api/v1-player",
  playerRouter = require(`${urlRouterPlayer}/player/router`);

// Middlewares
const notFoundMiddleware = require("./app/middlewares/not-found"),
  handlerError = require("./app/middlewares/handle-error");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.json({ message: "WELCOME TO API - TOPUP GAMES STORE" });
});

// Super Admin Middlewares
app.use(`${verV1}`, userRouter);
app.use(`${verV1}/auth`, authRouter);
app.use(`${verV1}/categories`, categoriesRouter);
app.use(`${verV1}/nominals`, nominalRouter);
app.use(`${verV1}/vouchers`, voucherRouter);
app.use(`${verV1}/banks`, bankRouter);
app.use(`${verV1}/payments`, paymentRouter);
app.use(`${verV1}/transactions`, transactionRouter);

// Player Middlewares
app.use(`${verV1Player}`, playerRouter);

// Middleware Use
app.use(notFoundMiddleware);
app.use(handlerError);

module.exports = app;
