const mongoose = require("mongoose");

const BankSchema = new mongoose.Schema({});

module.exports = mongoose.model("Bank", BankSchema);
