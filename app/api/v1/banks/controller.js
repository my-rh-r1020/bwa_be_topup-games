const Bank = require("./model"),
  { StatusCodes } = require("http-status-codes"),
  fs = require("fs"),
  config = require("../../../config"),
  CustomAPIError = require("../../../errors");

// Get all banks data
const getAllBanks = async (req, res, next) => {
  try {
    let condition = { user: req.user.id };
    const result = await Bank.find(condition);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

// Get one bank data
const getOneBank = async (req, res, next) => {
  try {
    const { id: bankId } = req.params;

    const result = await Bank.findOne({ _id: bankId, user: req.user.id });
    if (!result) throw new CustomAPIError.NotFound(`Bank id ${bankId} is not found`);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

// Create new bank data
const createBank = async (req, res, next) => {
  try {
    const { namaBank, namaRekening, noRekening } = req.body,
      user = req.user.id;

    // Check data
    const check = await Bank.findOne({ namaBank, user });
    if (check) throw new CustomAPIError.BadRequest(`Bank ${namaBank} is already used`);

    // Save new data
    let result;

    if (!req.file) {
      result = await Bank.create({ namaBank, namaRekening, noRekening, user });
    } else {
      result = await Bank.create({ namaBank, namaRekening, noRekening, imgBank: req.file.filename, user });
    }

    res.status(StatusCodes.CREATED).json({ data: result });
  } catch (err) {
    next(err);
  }
};

// Update bank data
const updateBank = async (req, res, next) => {
  try {
    const { id: bankId } = req.params,
      { namaBank, namaRekening, noRekening } = req.body,
      user = req.user.id;

    // Check data
    let result = await Bank.findOne({ _id: bankId, user });
    if (!result) throw new CustomAPIError.BadRequest(`Bank ${bankId} is not found`);

    // Update data
    if (!req.file) {
      // Update without change image bank
      (result.namaBank = namaBank), (result.namaRekening = namaRekening), (result.noRekening = noRekening), (result.user = user);
    } else {
      // Update with change image bank
      let currentImgBank = `${config.rootPath}/public/uploads/imgBank/${result.imgBank}`;
      if (fs.existsSync(currentImgBank)) fs.unlinkSync(currentImgBank);

      (result.namaBank = namaBank), (result.namaRekening = namaRekening), (result.noRekening = noRekening), (result.imgBank = req.file.filename), (result.user = user);
    }

    await result.save();

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

// Delete bank data
const deleteBank = async (req, res, next) => {
  try {
    const { id: bankId } = req.params,
      user = req.user.id;

    const result = await Bank.findOneAndDelete({ _id: bankId, user });
    if (!result) throw new CustomAPIError.NotFound(`Fail to delete bank id`);

    // Delete image
    let currentImgBank = `${config.rootPath}/public/uploads/imgBank/${result.imgBank}`;
    if (fs.existsSync(currentImgBank)) fs.unlinkSync(currentImgBank);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllBanks, getOneBank, createBank, updateBank, deleteBank };
