const Bank = require("./model"),
  { StatusCodes } = require("http-status-codes"),
  CustomAPIError = require("../../../errors");

// Get all banks data
const getAllBanks = async (req, res, next) => {
  try {
    let condition;

    const result = await Bank.find({ condition });

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllBanks };
