const mongoose = require("mongoose"),
  bcrypt = require("bcryptjs");

const PlayerSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Please provide full name"], minlength: 3, maxlength: 50 },
  email: { type: String, required: [true, "Please provide email"] },
  username: { type: String, required: [true, "Please provide username"], minlength: 3, maxlength: 50 },
  password: { type: String, required: [true, "Please provide password"], minlength: [6, "Password must length 6 character"] },
  role: { type: String, default: "player" },
  avatar: { type: String, default: "default.png" },
  fileName: { type: String },
  phoneNumber: { type: Number, minlength: 9, maxlength: 12, default: 0 },
  favorite: { type: mongoose.Types.ObjectId, ref: "Category" },
});

// Check email validation
PlayerSchema.path("email").validate(
  (value) => {
    const EMAIL_RE = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return EMAIL_RE.test(value);
  },
  (attr) => `${attr.value} harus merupakan email valid`
);

// Check email unique
PlayerSchema.path("email").validate(
  async function (value) {
    try {
      const count = await this.model("Player").countDocuments({ email: value });
      return !count;
    } catch (err) {
      throw err;
    }
  },
  (attr) => `${attr.value} sudah terdaftar`
);

// Check name unique
PlayerSchema.path("name").validate(
  async function (value) {
    try {
      const count = await this.model("Player").countDocuments({ name: value });
      return !count;
    } catch (err) {
      throw err;
    }
  },
  (attr) => `${attr.value} sudah digunakan`
);

// Check username unique
PlayerSchema.path("username").validate(
  async function (value) {
    try {
      const count = await this.model("Player").countDocuments({ username: value });
      return !count;
    } catch (err) {
      next(err);
    }
  },
  (attr) => `${attr.value} sudah digunakan`
);

// Hash Password
PlayerSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

PlayerSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("Player", PlayerSchema);
