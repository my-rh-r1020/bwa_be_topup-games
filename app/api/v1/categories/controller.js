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

// Get one category
const getOneCategory = async (req, res, next) => {
  try {
    const {} = req.params;

    const result = await Category.findOne({});

    if (!result) throw new CustomAPIError.NotFound(`Category id is not found`);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

// Create a new category
const createCategory = async (req, res, next) => {
  try {
    const {} = req.body;

    // Check data category
    const check = await Category.findOne({});

    if (check) throw new CustomAPIError.BadRequest(`Category name is already used`);

    // Save data category
    const result = await Category.create({});

    res.status(StatusCodes.CREATED).json({ data: result });
  } catch (err) {
    next(err);
  }
};

// Update category data
const updateCategory = async (req, res, next) => {
  try {
    const {} = req.params;

    // Check data category
    const check = await Category.findOne({});

    if (check) throw new CustomAPIError.BadRequest(`Category name is already used`);

    // Update category data
    const result = await Category.findOneAndUpdate({});

    if (!result) throw new CustomAPIError.NotFound(`Category id is not found`);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

// Delete category data
const deleteCategory = async (req, res, next) => {
  try {
    const {} = req.params;

    const result = await Category.findOneAndDelete({});

    if (!result) throw new CustomAPIError.NotFound(`Fail to delete category id`);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllCategory, getOneCategory, createCategory, updateCategory, deleteCategory };
