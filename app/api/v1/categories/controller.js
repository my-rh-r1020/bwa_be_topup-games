const Category = require("./model"),
  { StatusCodes } = require("http-status-codes"),
  CustomAPIError = require("../../../errors");

// Get All Categories
const getAllCategory = async (req, res, next) => {
  try {
    let condition = { user: req.user.id };

    const result = await Category.find(condition);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllCategory };
