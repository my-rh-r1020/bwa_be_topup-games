const Voucher = require("./model"),
  Category = require("../categories/model"),
  Game = require("../games/model"),
  Nominal = require("../nominals/model"),
  fs = require("fs"),
  { StatusCodes } = require("http-status-codes"),
  CustomAPIError = require("../../../errors"),
  config = require("../../../config");

// Get all vouchers data
const getAllVouchers = async (req, res, next) => {
  try {
    let condition = { user: req.user.id };
    // V1
    // const result = await Voucher.find(condition).populate({ path: "games", select: "_id gameName" }).populate({ path: "nominal", select: "_id coinName coinQuantity price" });

    // V2
    const result = await Voucher.find(condition).populate({ path: "games", select: "_id gameName" });

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

// Get one voucher data
const getOneVoucher = async (req, res, next) => {
  try {
    const { id: voucherId } = req.params;

    // V1
    // const result = await Voucher.findOne({ _id: voucherId, user: req.user.id }).populate({ path: "games", select: "_id gameName" }).populate({ path: "nominal", select: "_id coinName coinQuantity price" });

    // V2
    const result = await Voucher.findOne({ _id: voucherId, user: req.user.id }).populate({ path: "games", select: "_id gameName" });
    if (!result) throw new CustomAPIError.NotFound(`Voucher id ${voucherId} is not found`);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

// Create new voucher data
const createVoucher = async (req, res, next) => {
  try {
    // V1
    // const { games, nominal } = req.body,
    //   user = req.user.id;
    // V2
    const { games, coinQuantity, coinName, price } = req.body,
      user = req.user.id;

    // Check data V1
    // const checkGame = await Game.findOne({ _id: games }),
    //   checkNominal = await Nominal.findOne({ _id: nominal });

    // Check data V2
    const checkGame = await Game.findOne({ _id: games });

    if (!checkGame) throw new CustomAPIError.NotFound(`Category id ${games} is not found!`);
    // if (!checkNominal) throw new CustomAPIError.NotFound(`Nominal id ${nominal} is not found!`);

    // Save new data V1
    // const result = await Voucher.create({ games, nominal, user });

    // Save new data V2
    const result = await Voucher.create({ games, coinQuantity, coinName, price, user });

    res.status(StatusCodes.CREATED).json({ data: result });
  } catch (err) {
    next(err);
  }
};

// Update voucher data
const updateVoucher = async (req, res, next) => {
  try {
    const { id: voucherId } = req.params,
      // V1
      // { gameName, status, category, nominal } = req.body,
      // V2
      { gameName, status, category, coinQuantity, coinName, price } = req.body,
      user = req.user.id;

    // Check data
    let result = await Voucher.findOne({ _id: voucherId, user });
    const checkCategory = await Category.findOne({ _id: category });
    // V1
    // const checkCategory = await Category.findOne({ _id: category }),
    //   checkNominal = await Nominal.findOne({ _id: nominal });

    if (!result) throw new CustomAPIError.NotFound(`Voucher id ${voucherId} is not found`);
    if (!checkCategory) throw new CustomAPIError.NotFound(`Category id ${category} is not found!`);
    // if (!checkNominal) throw new CustomAPIError.NotFound(`Nominal id ${nominal} is not found!`);

    // Update data
    if (!req.file) {
      // Update without change thumbnail voucher
      (result.gameName = gameName), (result.status = status), (result.category = category), (result.coinQuantity = coinQuantity), (result.coinName = coinName), (result.price = price), (result.user = user);

      // V1
      // (result.gameName = gameName), (result.status = status), (result.category = category), (result.nominal = nominal), (result.user = user);
    } else {
      // Update with change thumbail voucher
      let currentThumbnail = `${config.rootPath}/public/uploads/thumbnail-voucher/${result.thumbnail}`;
      if (fs.existsSync(currentThumbnail)) fs.unlinkSync(currentThumbnail);

      (result.gameName = gameName), (result.status = status), (result.category = category), (result.coinQuantity = coinQuantity), (result.coinName = coinName), (result.price = price), (result.user = user);
      // V1
      // (result.gameName = gameName), (result.status = status), (result.thumbnail = req.file.filename), (result.category = category), (result.nominal = nominal), (result.user = user);
    }

    await result.save();

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

// Delete voucher data
const deleteVoucher = async (req, res, next) => {
  try {
    const { id: voucherId } = req.params,
      user = req.user.id;

    let result = await Voucher.findOneAndDelete({ _id: voucherId, user });
    if (!result) throw new CustomAPIError.NotFound(`Fail delete voucher id ${voucherId}`);

    // Delete image
    let currentThumbnail = `${config.rootPath}/public/uploads/thumbnail-voucher/${result.thumbnail}`;
    if (fs.existsSync(currentThumbnail)) fs.unlinkSync(currentThumbnail);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllVouchers, getOneVoucher, createVoucher, updateVoucher, deleteVoucher };
