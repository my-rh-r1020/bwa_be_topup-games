const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
  {
    personalPurchase: {
      name: { type: String, required: [true, "Please provide full name"], minlength: 3, maxlength: 50 },
      accountPlayer: { type: String, required: [true, "Please provide account name"], minlength: 3, maxlength: 50 },
      tax: { type: Number, default: 0 },
      value: { type: Number, default: 0 },
      status: { type: String, enum: ["pending", "success", "failed"], default: "pending" },
    },
    game: { type: mongoose.Types.ObjectId, ref: "Game", required: true },
    voucher: { type: mongoose.Types.ObjectId, ref: "Voucher" },
    historyVoucher: {
      games: { type: mongoose.Types.ObjectId, ref: "Game" },
      nominal: { type: mongoose.Types.ObjectId, ref: "Nominal" },
    },
    payment: { type: mongoose.Types.ObjectId, ref: "Payment" },
    historyPayment: {},
    // historyPayment: {
    //   name: { type: String, required: [true, "Please provide name"] },
    //   type: { type: String, required: [true, "Please provide payment type"] },
    //   namaBank: { type: String, require: [true, "Please insert bank name"] },
    //   noRekening: { type: String, require: [true, "Please insert account number"] },
    // },
    // player: { type: mongoose.Types.ObjectId, ref: "Player", required: true },
    // historyPlayer: {
    //   fullName: { type: String, required: [true, "Please provide name"], minlength: 3, maxlength: 50 },
    //   phoneNumber: { type: Number, required: [true, "Please provide phone number"], minlength: 9, maxlength: 12 },
    // },
    // category: { type: mongoose.Types.ObjectId, ref: "Category", required: true },
    // user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", TransactionSchema);
