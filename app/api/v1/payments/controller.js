const Payment = require("./model"),
  Bank = require("../banks/model"),
  { StatusCodes } = require("http-status-codes"),
  CustomAPIError = require("../../../errors");

// Get all payments data
const getAllPayments = async (req, res, next) => {
  try {
    let condition = { user: req.user.id };
    const result = await Payment.find(condition).populate({ path: "banks", select: "_id namaBank noRekening imgBank" });

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

// Get one payment data
const getOnePayment = async (req, res, next) => {
  try {
    const { id: paymentId } = req.params;

    const result = await Payment.findOne({ _id: paymentId, user: req.user.id });
    if (!result) throw new CustomAPIError.NotFound(`Payment id is not found`);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

// Create new payment data
const createPayment = async (req, res, next) => {
  try {
    const { type, status, banks } = req.body,
      { id: paymentId } = req.params,
      user = req.user.id;

    // Check data
    const checkPayment = await Payment.findOne({ _id: paymentId, user });
    if (checkPayment) throw new CustomAPIError.NotFound(`Payment ${paymentId} is not found`);

    // Save new data
    const result = await Payment.create({ type, status, banks, user });
    if (!result) throw new CustomAPIError.NotFound(`Payment id is not found`);

    res.status(StatusCodes.CREATED).json({ data: result });
  } catch (err) {
    next(err);
  }
};

// Update payment data
const updatePayment = async (req, res, next) => {
  try {
    const { id: paymentId } = req.params,
      { type, status, banks } = req.body,
      user = req.user.id;

    // Check data
    // const checkBank = await Bank.findOne({ _id: banks });
    // if (checkBank) throw new CustomAPIError.NotFound(`Bank id ${banks} is not found`);

    // Update data
    const result = await Payment.findOneAndUpdate({ _id: paymentId }, { type, status, banks, user }, { new: true.valueOf, runValidators: true });
    if (!result) throw new CustomAPIError.BadRequest(`Payment id ${paymentId} is not found`);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

// Delete payment data
const deletePayment = async (req, res, next) => {
  try {
    const { id: paymentId } = req.params,
      user = req.user.id;

    const result = await Payment.findOneAndDelete({ _id: paymentId, user });
    if (!result) throw new CustomAPIError.NotFound(`Payment id ${paymentId} is not found`);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllPayments, getOnePayment, createPayment, updatePayment, deletePayment };
