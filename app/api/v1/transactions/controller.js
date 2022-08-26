const Transaction = require("./model"),
  { StatusCodes } = require("http-status-codes"),
  CustomAPIError = require("../../../errors");

// Get all transactions data
const getAllTransactions = async (req, res, next) => {
  try {
    let condition = { user: req.user.id };

    const result = await Transaction.find(condition);
    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllTransactions };
