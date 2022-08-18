const CustomAPIError = require("./custom-api"),
  { StatusCodes } = require("http-status-codes");

class BadRequestAPI extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCodes = StatusCodes.BAD_REQUEST;
  }
}

module.exports = BadRequestAPI;
