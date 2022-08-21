const Category = require("./model"),
  { StatusCodes } = require("http-status-codes"),
  CustomAPIError = require("../../../errors");

// Get All Categories data
const getAllCategory = async (req, res, next) => {
  try {
    // let condition = { user: req.user.id };
    const result = await Category.find();

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

// Get one category data
const getOneCategory = async (req, res, next) => {
  try {
    const { id: categoryId } = req.params;

    const result = await Category.findOne({ _id: categoryId });
    if (!result) throw new CustomAPIError.NotFound(`Category id ${categoryId} is not found`);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

// Create new category data
const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    // user = req.user.id;

    // Check data
    const check = await Category.findOne({ name });
    if (check) throw new CustomAPIError.BadRequest(`Category name ${name} is already used`);

    // Save new data
    const result = await Category.create({ name });
    res.status(StatusCodes.CREATED).json({ data: result });
  } catch (err) {
    next(err);
  }
};

// Update category data
const updateCategory = async (req, res, next) => {
  try {
    const { id: categoryId } = req.params,
      { name } = req.body;

    // Check data
    const check = await Category.findOne({ name, _id: { $ne: categoryId } });
    if (check) throw new CustomAPIError.BadRequest(`Category name ${name} is already used`);

    // Update data
    const result = await Category.findOneAndUpdate({ _id: categoryId }, { name }, { new: true, runValidators: true });
    if (!result) throw new CustomAPIError.NotFound(`Category id ${categoryId} is not found`);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

// Delete category data
const deleteCategory = async (req, res, next) => {
  try {
    const { id: categoryId } = req.params;

    const result = await Category.findOneAndDelete({ _id: categoryId });
    if (!result) throw new CustomAPIError.NotFound(`Fail delete category id ${categoryId}`);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllCategory, getOneCategory, createCategory, updateCategory, deleteCategory };
