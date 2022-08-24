const mongoose = require("mongoose");

const NominalSchema = new mongoose.Schema(
  {
    coinQuantity: { type: Number, default: 0 },
    coinName: { type: String, default: [true, "Please insert coin name"] },
    price: { type: Number, default: 0 },
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Nominal", NominalSchema);
