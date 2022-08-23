const mongoose = require("mongoose");

const VoucherSchema = new mongoose.Schema(
  {
    gameName: {
      type: String,
      require: [true, "Please insert game name"],
    },
    status: {
      type: Boolean,
      enum: [true, false],
      default: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    nominal: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Nominal",
        required: true,
      },
    ],
    // user: {
    //   type: mongoose.Types.ObjectId,
    //   ref: "User",
    //   // required: true,
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Voucher", VoucherSchema);
