const Payment = require("./model"),
  { StatusCodes } = require("http-status-codes"),
  CustomAPIError = require("../../../errors");

// Get all payments data
const getAllPayments = async (req, res, next) => {
  try {
    const result = await Payment.find();
    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

// Get one payment data
const getOnePayment = async (req, res, next) => {
  try {
    const {} = req.params;

    const result = await Payment.findOne({});
    if (!result) throw new CustomAPIError.NotFound(`Payment id is not found`);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

// Create new payment data
const createPayment = async (req, res, next) => {
  try {
    const {} = req.body;

    // Check data
    const checkPayment = await Payment.findOne({});
    if (checkPayment) throw new CustomAPIError.BadRequest(`Payment is already used`);

    // Save new data
    const result = await Payment.create({});
    if (!result) throw new CustomAPIError.NotFound(`Payment id is not found`);

    res.status(StatusCodes.CREATED).json({ data: result });
  } catch (err) {
    next(err);
  }
};

// Update payment data
const updatePayment = async (req, res, next) => {
  try {
    const {} = req.params,
      {} = req.body;

    // Check data
    const checkPayment = await Payment.findOne({});
    if (checkPayment) throw new CustomAPIError.BadRequest(`Payment is already used`);

    // Update data
    const result = await Payment.findOneAndUpdate({});
    if (!result) throw new CustomAPIError.BadRequest(`Payment id is not found`);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

// Delete payment data
const deletePayment = async (req, res, next) => {
  try {
    const {} = req.params;

    const result = await Payment.findOneAndDelete({});
    if (!result) throw new CustomAPIError.NotFound(`Payment id is not found`);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllPayments, getOnePayment, createPayment, updatePayment, deletePayment };
