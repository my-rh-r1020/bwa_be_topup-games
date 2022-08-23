const mongoose = require("mongoose");

const PaymentSchema = mongoose.Schema({});

module.exports = mongoose.model("Payment", PaymentSchema);
