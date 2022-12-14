const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
  {
    type: { type: String, required: [true, "Please provide type"] },
    status: { type: Boolean, enum: [true, false], default: true },
    banks: { type: mongoose.Types.ObjectId, ref: "Bank" },
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", PaymentSchema);
