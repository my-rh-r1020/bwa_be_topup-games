const Player = require("./model"),
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
    const result = await Voucher.find().populate({ path: "category", select: "_id name" });
    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

// Detail Page
const detailPage = async (req, res, next) => {
  try {
    const { id: detailPageId } = req.params;

    const result = await Voucher.findOne({ _id: detailPageId, status: true })
      .populate({ path: "category", select: "_id name" })
      .populate({ path: "nominal", select: "_id coinQuantity coinName price" })
      .populate({ path: "user", select: "_id name phoneNumber" });
    if (!result) throw new CustomAPIError.NotFound(`Voucher game is not found`);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

// Category Page
const getAllCategories = async (req, res, next) => {
  try {
    const result = await Category.find();

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

// Checkout Page

// History Transaksi

// Detail History Transaksi

// Read Profile

// Edit Profile

module.exports = { signupPlayer, signinPlayer, landingPage, detailPage, getAllCategories };
