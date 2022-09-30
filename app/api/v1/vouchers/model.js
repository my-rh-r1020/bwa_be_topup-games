const mongoose = require("mongoose");

// V1
// const VoucherSchema = new mongoose.Schema(
//   {
//     games: { type: mongoose.Types.ObjectId, ref: "Game", required: true },
//     nominal: { type: mongoose.Types.ObjectId, ref: "Nominal", required: true },
//     user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
//   },
//   { timestamps: true }
// );

// V2
const VoucherSchema = new mongoose.Schema(
  {
    games: { type: mongoose.Types.ObjectId, ref: "Game", required: true },
    coinQuantity: { type: Number, default: 0 },
    coinName: { type: String, default: [true, "Please insert coin name"] },
    price: { type: Number, default: 0 },
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Voucher", VoucherSchema);
