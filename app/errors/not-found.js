const CustomAPIError = require("./custom-api"),
  { StatusCodes } = require("http-status-codes");

class NotFound extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCodes = StatusCodes.NOT_FOUND;
  }
}

module.exports = NotFound;
