const Nominal = require("./model"),
  { StatusCodes } = require("http-status-codes"),
  CustomAPIError = require("../../../errors");

// Get all nominals data
const getAllNominals = async (req, res, next) => {
  try {
    const result = await Nominal.find();

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

// Get one nominal data
const getOneNominal = async (req, res, next) => {
  try {
    const { id: nominalId } = req.params;

    const result = await Nominal.findOne({ _id: nominalId });
    if (!result) throw new CustomAPIError.NotFound(`Nominal id ${nominalId} is not found`);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

// Create new nominal data
const createNominal = async (req, res, next) => {
  try {
    const { coinQuantity, coinName, price } = req.body;

    // Check data
    const check = await Nominal.findOne({ coinName });
    if (check) throw new CustomAPIError.BadRequest(`Nominal ${coinName} is already used`);

    // Save new data
    const result = await Nominal.create({ coinQuantity, coinName, price });
    res.status(StatusCodes.CREATED).json({ data: result });
  } catch (err) {
    next(err);
  }
};

// Update nominal data
const updateNominal = async (req, res, next) => {
  try {
    const { id: nominalId } = req.params,
      { coinQuantity, coinName, price } = req.body;

    // Check data
    const check = await Nominal.findOne({ coinQuantity, coinName, price, _id: { $ne: nominalId } });
    if (check) throw new CustomAPIError.BadRequest(`Nominal ${coinName} is already used`);

    // Update data
    const result = await Nominal.findOneAndUpdate({ _id: nominalId }, { coinQuantity, coinName, price }, { new: true.valueOf, runValidators: true });
    if (!result) throw new CustomAPIError.NotFound(`Nominal id ${nominalId} is not found`);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

// Delete nominal data
const deleteNominal = async (req, res, next) => {
  try {
    const { id: nominalId } = req.params;

    const result = await Nominal.findOneAndDelete({ _id: nominalId });
    if (!result) throw new CustomAPIError.NotFound(`Fail delete nominal id ${nominalId}`);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllNominals, getOneNominal, createNominal, updateNominal, deleteNominal };
