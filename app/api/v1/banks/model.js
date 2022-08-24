const mongoose = require("mongoose");

const BankSchema = new mongoose.Schema(
  {
    namaBank: { type: String, require: [true, "Please insert bank name"] },
    namaRekening: { type: String, require: [true, "Please insert account name"] },
    noRekening: { type: String, require: [true, "Please insert account number"] },
    imgBank: { type: String, require: [true, "Please insert bank image"] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bank", BankSchema);
