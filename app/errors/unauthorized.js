const CustomAPIError = require("./custom-api"),
  { StatusCodes } = require("http-status-codes");

class Unauthorized extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCodes = StatusCodes.FORBIDDEN;
  }
}

module.exports = Unauthorized;
