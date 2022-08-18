const mongoose = require("mongoose"),
  { urlDb } = require("../config");

mongoose.connect(urlDb);
const db = mongoose.connection;

module.exports = db;
