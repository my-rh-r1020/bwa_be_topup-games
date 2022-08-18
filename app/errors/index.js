const CustomAPIError = require("./custom-api"),
  BadRequest = require("./bad-request"),
  NotFound = require("./not-found"),
  Unauthenticated = require("./unauthenticated"),
  Unauthorized = require("./unauthorized");

module.exports = { CustomAPIError, BadRequest, NotFound, Unauthenticated, Unauthorized };
