const Player = require("./model"),
  Game = require("../../v1/games/model"),
  Voucher = require("../../v1/vouchers/model"),
  Payment = require("../../v1/payments/model"),
  Bank = require("../../v1/banks/model"),
  Category = require("../../v1/categories/model"),
  Transaction = require("../../v1/transactions/model"),
  { StatusCodes } = require("http-status-codes"),
  CustomAPIError = require("../../../errors"),
  fs = require("fs"),
  config = require("../../../config");

// Signup Player
const signupPlayer = async (req, res, next) => {
  try {
    const { name, username, email, password } = req.body;

    const result = await Player.create({ name, username, email, password });
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
    if (!username) throw new CustomAPIError.BadRequest(`Please provide username or email`);
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
      resultVoucher = await Voucher.find({ games: detailPageId }).populate({ path: "nominal", select: "_id coinQuantity coinName price" });

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
    const { accountPlayer, tax, value, game: gameId, voucher: voucherId, payment: paymentId, banks: bankId } = req.body,
      player = req.player.id;

    // Check game id
    const checkGame = await Game.findOne({ _id: gameId });
    if (!checkGame) throw new CustomAPIError.NotFound(`Game id ${gameId} is not found`);

    // Check voucher id
    const checkVoucher = await Voucher.findOne({ _id: voucherId }).populate({ path: "nominal", select: "_id coinQuantity coinName price" });
    if (!checkVoucher) throw new CustomAPIError.NotFound(`Voucher id ${voucherId} is not found`);

    // History voucher
    const historyVoucher = {
      games: checkVoucher.games,
      nominal: checkVoucher.nominal,
    };

    // Check payment id
    const checkPayment = await Payment.findOne({ _id: paymentId }).populate({ path: "banks", select: "_id namaBank namaRekening noRekening imgBank" });
    if (!checkPayment) throw new CustomAPIError.NotFound(`Payment id ${paymentId} is not found`);

    // History Payment
    const historyPayment = {
      type: checkPayment.type,
      banks: checkPayment.banks,
    };

    // Check bank id
    const checkBank = await Bank.findOne({ _id: bankId });
    if (!checkBank) throw new CustomAPIError.NotFound(`Bank id ${banksId} is not found`);

    // Save checkout data
    const result = await Transaction.create({
      accountPlayer: accountPlayer,
      tax: tax,
      value: value,
      // personalPurchase: personalPurchase,
      game: gameId,
      voucher: voucherId,
      historyVoucher: historyVoucher,
      payment: paymentId,
      historyPayment: historyPayment,
      banks: bankId,
      player: player,
    });

    res.status(StatusCodes.CREATED).json({ data: result });
  } catch (err) {
    next(err);
  }
};

// History Transaksi
const historyTransactions = async (req, res, next) => {
  try {
    const { status } = req.query,
      players = req.player.id;
    let condition = {};

    // Filter by status
    if (status) condition = { ...condition, status: { $regex: status, $options: "i" } };

    // Filter by player account
    if (players) condition = { ...condition, player: players };

    // Search data
    const result = await Transaction.find(condition);
    if (!result) throw new CustomAPIError.NotFound(`Transaction data is not found`);

    // Count data
    const count = await Transaction.countDocuments(condition);

    res.status(StatusCodes.OK).json({ data: result, total: count });
  } catch (err) {
    next(err);
  }
};

// Detail History Transaksi
const detailHistoryTransaction = async (req, res, next) => {
  try {
    const { id: transactionId } = req.params,
      player = req.player.id;

    const result = await Transaction.findOne({ _id: transactionId, player });
    if (!result) throw new CustomAPIError.NotFound(`Transaction id ${transactionId} is not found`);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

// Dashboard
const dashboard = async (req, res, next) => {
  try {
    const player = req.player.id;

    // Get transactions data
    const count = await Transaction.aggregate([{ $match: { player: player } }, { $group: { _id: `$game`, value: { $sum: `$value` } } }]);

    // Get categories data
    const resultCategory = await Category.find();

    resultCategory.forEach((e) => {
      count.forEach((data) => {
        if (data._id.toString() === e._id.toString()) data.name = e.name;
      });
    });

    // Get history transactions
    const history = await Transaction.find({ player }).populate({ path: "game" }).sort({ updateAt: -1 });

    res.status(StatusCodes.OK).json({ data: history, total: count });
  } catch (err) {
    next(err);
  }
};

// Read Profile
const profilePlayer = async (req, res, next) => {
  try {
    const result = await Player.findOne({ player: req.player.id }).select("_id name email username password avatar phoneNumber");
    if (!result) throw new CustomAPIError.NotFound(`Unknown Player`);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

// Edit Profile
const editProfile = async (req, res, next) => {
  try {
    const { _id: playerId } = req.params,
      { name, email, password, phoneNumber } = req.body;

    const result = await Player.findOne({ _id: playerId });
    if (!result) throw new CustomAPIError.NotFound(`Unknown Player`);

    console.log(result);

    // Update data
    // if (!req.file) {
    //   // Update without change avatar
    //   (result.name = name), (result.email = email), (result.password = password), (result.phoneNumber = phoneNumber);
    // } else {
    //   // Update with change avatar
    //   let currentAvatar = `${config.rootPath}/public/uploads/avatar/${result.avatar}`;
    //   if (fs.existsSync(currentAvatar)) fs.unlinkSync(currentAvatar);

    //   (result.name = name), (result.email = email), (result.password = password), (result.avatar = req.file.filename), (result.phoneNumber = phoneNumber);
    // }

    // await result.save();

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = { signupPlayer, signinPlayer, landingPage, detailPage, checkoutPage, historyTransactions, detailHistoryTransaction, dashboard, profilePlayer, editProfile };
