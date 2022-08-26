const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema({
  fullName: { type: String, required: [true, "Please provide full name"], minlength: 3, maxlength: 50 },
  email: { type: String, required: [true, "Please provide email"] },
  username: { type: String, required: [true, "Please provide username"], minlength: 3, maxlength: 50 },
  password: { type: String, required: [true, "Please provide password"], minlength: [6, "Password must length 6 character"] },
  role: { type: String, default: "user" },
  avatar: { type: String },
  fileName: { type: String },
  phoneNumber: { type: Number, required: [true, "Please provide phone number"], minlength: 9, maxlength: 12 },
  favorite: { type: mongoose.Types.ObjectId, ref: "Category" },
});

module.exports = mongoose.model("Player", PlayerSchema);
