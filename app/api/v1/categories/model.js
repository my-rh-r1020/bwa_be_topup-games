const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({});

module.exports = mongoose.model("Category", CategorySchema);
