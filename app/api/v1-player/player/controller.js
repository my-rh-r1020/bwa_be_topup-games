const Player = require("./model"),
  Game = require("../../v1/games/model"),
  Voucher = require("../../v1/vouchers/model"),
  Payment = require("../../v1/payments/model"),
  Category = require("../../v1/categories/model"),
  { StatusCodes } = require("http-status-codes"),
  { createJWT, createTokenUser } = require("../../../utils"),
  CustomAPIError = require("../../../errors");

// Signup Player
const signupPlayer = async (req, res, next) => {
  try {
    const { fullName, username, email, password } = req.body;

    const result = await Player.create({ fullName, username, email, password });
    delete result._doc.password;

    res.status(StatusCodes.CREATED).json({ data: result });
  } catch (err) {
    next(err);
  }
};

// Signin Player
const signinPlayer = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Check empty field
    if (!username || !email) throw new CustomAPIError.BadRequest(`Please provide username or email`);
    if (!password) throw new CustomAPIError.BadRequest(`Please provide your password`);

    // Check username
    const result = await Player.findOne({ username });
    if (!result) throw new CustomAPIError.NotFound(`Username ${username} is not found`);

    // Check password
    const isPassCorrect = await result.comparePassword(password);
    if (!isPassCorrect) throw new CustomAPIError.NotFound(`Password is invalid`);

    // Create Token
    const token = createJWT({ payload: createTokenUser(result) });

    res.status(StatusCodes.OK).json({ data: { token } });
  } catch (err) {
    next(err);
  }
};

// Landing Page
const landingPage = async (req, res, next) => {
  try {
    const result = await Game.find().populate({ path: "category", select: "_id name" });
    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

// Detail Page
const detailPage = async (req, res, next) => {
  try {
    const { id: detailPageId } = req.params;

    const resultGame = await Game.find({ _id: detailPageId, status: true }).populate({ path: "category", select: "_id name" }),
      resultVoucher = await Voucher.find({ games: detailPageId });

    if (!resultGame) throw new CustomAPIError.NotFound(`Game is not found`);
    if (!resultVoucher) throw new CustomAPIError.NotFound(`Voucher is not found`);

    const result = { resultGame, resultVoucher };

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

// Checkout Page
const checkoutPage = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

// History Transaksi
const historyTransaksi = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

// Detail History Transaksi
const detailHistoryTransaksi = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

// Read Profile

// Edit Profile
const editProfilePage = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

module.exports = { signupPlayer, signinPlayer, landingPage, detailPage };
