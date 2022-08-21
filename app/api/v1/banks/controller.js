const Bank = require("./model"),
  { StatusCodes } = require("http-status-codes"),
  CustomAPIError = require("../../../errors");

// Get all banks data
const getAllBanks = async (req, res, next) => {
  try {
    // let condition;
    const result = await Bank.find();

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

// Get one bank data
const getOneBank = async (req, res, next) => {
  try {
    const { id: bankId } = req.params;

    const result = await Bank.findOne({ _id: bankId });
    if (!result) throw new CustomAPIError.NotFound(`Bank id ${bankId} is not found`);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

// Create new bank data
const createBank = async (req, res, next) => {
  try {
    const {} = req.body;

    // Check data
    const check = await Bank.findOne({});
    if (check) throw new CustomAPIError.BadRequest(`Bank name is already used`);

    // Save new data
    const result = await Bank.create({});
    res.status(StatusCodes.CREATED).json({ data: result });
  } catch (err) {
    next(err);
  }
};

// Update bank data
const updateBank = async (req, res, next) => {
  try {
    const {} = req.params,
      {} = req.body;

    // Check data
    const check = await Bank.findOne({});
    if (check) throw new CustomAPIError.BadRequest(`Bank name ${name} is already used`);

    // Update data
    const result = await Bank.findOneAndUpdate({});
    if (!result) throw new CustomAPIError.NotFound(`Bank id ${bankId} is not found`);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

// Delete bank data
const deleteBank = async (req, res, next) => {
  try {
    const {} = req.params;

    const result = await Bank.findOneAndDelete({});
    if (!result) throw new CustomAPIError.NotFound(`Fail to delete bank id`);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllBanks, getOneBank, createBank, updateBank, deleteBank };
