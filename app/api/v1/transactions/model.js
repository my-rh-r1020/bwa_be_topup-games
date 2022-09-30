const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
  {
    accountPlayer: { type: String, required: [true, "Please provide account name"], minlength: 3, maxlength: 50 },
    tax: { type: Number, default: 0 },
    value: { type: Number, default: 0 },
    status: { type: String, enum: ["pending", "success", "failed"], default: "pending" },
    game: { type: mongoose.Types.ObjectId, ref: "Game", required: true },
    voucher: { type: mongoose.Types.ObjectId, ref: "Voucher" },
    historyVoucher: {
      games: { type: mongoose.Types.ObjectId, ref: "Game" },
      coinQuantity: { type: String, required: [true, "Please coin quantity"] },
      coinName: { type: String, required: [true, "Please coin name"] },
      price: { type: Number, default: 0 },
      // nominal: { type: mongoose.Types.ObjectId, ref: "Nominal" },
    },
    payment: { type: mongoose.Types.ObjectId, ref: "Payment" },
    historyPayment: {
      type: { type: String, required: [true, "Please provide type"] },
      namaBank: { type: String, required: [true, "Please provide bank name"] },
      namaRekening: { type: String, required: [true, "Please provide account bank name"] },
      noRekening: { type: String, required: [true, "Please provide bank account"] },
    },
    banks: { type: mongoose.Types.ObjectId, ref: "Bank" },
    player: { type: mongoose.Types.ObjectId, ref: "Player" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", TransactionSchema);
