const Voucher = require("./model"),
  Category = require("../categories/model"),
  Nominal = require("../nominals/model"),
  fs = require("fs"),
  { StatusCodes } = require("http-status-codes"),
  CustomAPIError = require("../../../errors"),
  config = require("../../../config");

// Get all vouchers data
const getAllVouchers = async (req, res, next) => {
  try {
    const result = await Voucher.find().populate({ path: "category", select: "_id name" }).populate({ path: "nominal", select: "_id coinName price" });
    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

// Get one voucher data
const getOneVoucher = async (req, res, next) => {
  try {
    const { id: voucherId } = req.params;

    const result = await Voucher.findOne({ _id: voucherId });
    if (!result) throw new CustomAPIError.NotFound(`Voucher id ${voucherId} is not found`);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

// Create new voucher data
const createVoucher = async (req, res, next) => {
  try {
    const { gameName, status, category, nominal } = req.body;
    // user = req.user.id;

    // Check data
    const checkVoucher = await Voucher.findOne({ gameName }),
      checkCategory = await Category.findOne({ _id: category }),
      checkNominal = await Nominal.findOne({ _id: nominal });

    if (checkVoucher) throw new CustomAPIError.BadRequest(`Voucher ${gameName} is already used`);
    if (!checkCategory) throw new CustomAPIError.NotFound(`Category id ${category} is not found!`);
    if (!checkNominal) throw new CustomAPIError.NotFound(`Nominal id ${nominal} is not found!`);

    // Save new data
    let result;

    if (!req.file) {
      result = await Voucher.create({ gameName, status, category, nominal });
    } else {
      result = await Voucher.create({ gameName, status, thumbnail: req.file.filename, category, nominal });
    }

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

module.exports = { getAllVouchers, getOneVoucher, createVoucher, updateVoucher, deleteVoucher };
