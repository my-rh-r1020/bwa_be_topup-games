const Voucher = require("./model"),
  { StatusCodes } = require("http-status-codes"),
  CustomAPIError = require("../../../errors");

// Get all vouchers data
const getAllVouchers = async (req, res, next) => {
  try {
    const result = await Voucher.find();
    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

// Get one voucher data
const getOneVoucher = async (req, res, next) => {
  try {
    const {} = req.params;

    const result = await Voucher.findOne({});
    if (!result) throw new CustomAPIError.NotFound(`Voucher id ${voucherId} is not found`);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

// Create new voucher data
const createVoucher = async (req, res, next) => {
  try {
    const {} = req.body;

    // Check data
    const check = await Voucher.findOne({});
    if (check) throw new CustomAPIError.BadRequest(`Voucher  is already used`);

    // Save new data
    const result = await Voucher.create({});
    res.status(StatusCodes.CREATED).json({ data: result });
  } catch (err) {
    next(err);
  }
};

// Update voucher data
const updateVoucher = async (req, res, next) => {
  try {
    const {} = req.params,
      {} = req.body;

    // Check data
    const check = await Voucher.findOne({});
    if (check) throw new CustomAPIError.BadRequest(`Voucher  is already used`);

    // Update data
    const result = await Voucher.findOneAndUpdate({});
    if (!result) throw new CustomAPIError.NotFound(`Voucher id ${voucherId} is not found`);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

// Delete voucher data
const deleteVoucher = async (req, res, next) => {
  try {
    const {} = req.params;

    const result = await Voucher.findOneAndDelete({});
    if (!result) throw new CustomAPIError.NotFound(`Fail delete voucher id `);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};
