const Category = require("./model"),
  { StatusCodes } = require("http-status-codes");

const getAllCategory = async (req, res, next) => {
  try {
    const result = await Category.find();

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllCategory };
