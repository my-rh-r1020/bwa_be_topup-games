const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Please provide name"], minlength: 3, maxlength: 50 },
    email: { type: String, unique: true, required: [true, "Please provide email"] },
    password: { type: String, required: [true, "Please provide password"], minlength: 6 },
    role: { type: String, enum: ["super-admin", "admin"], default: "super-admin" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
