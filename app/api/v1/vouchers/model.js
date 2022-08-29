const mongoose = require("mongoose");

const VoucherSchema = new mongoose.Schema(
  {
    games: { type: mongoose.Types.ObjectId, ref: "Game", required: true },
    nominal: { type: mongoose.Types.ObjectId, ref: "Nominal", required: true },
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Voucher", VoucherSchema);
