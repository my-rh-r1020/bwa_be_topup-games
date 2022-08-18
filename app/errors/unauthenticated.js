const CustomAPIError = require("./custom-api"),
  { StatusCodes } = require("http-status-codes");

class Unauthenticated extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCodes = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = Unauthenticated;
