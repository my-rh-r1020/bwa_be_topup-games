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

    const result = await Nominal.findOne({});

    if (!result) throw new CustomAPIError.NotFound(`Nominal id ${nominalId} is not found`);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

// Create new nominal data
const createNominal = async (req, res, next) => {
  try {
    const {} = req.body;

    // Check nominal data
    const check = await Nominal.findOne({});

    if (check) throw new CustomAPIError.BadRequest(`Nominal is already used`);

    // Save new nominal data
    const result = await Nominal.create({});

    if (!result) throw new CustomAPIError.NotFound(`Nominal id ${nominalId} is not found`);

    res.status(StatusCodes.CREATED).json({ data: result });
  } catch (err) {
    next(err);
  }
};

// Delete nominal data
const deleteNominal = async (req, res, next) => {
  try {
    const {} = req.params;

    const result = await Nominal.findOneAndDelete({});

    if (!result) throw new CustomAPIError.NotFound(`Fail to delete nominal id`);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllNominals, getOneNominal, createNominal };
