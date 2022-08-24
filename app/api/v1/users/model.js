const mongoose = require("mongoose"),
  bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Please provide name"], minlength: 3, maxlength: 50 },
    email: { type: String, unique: true, required: [true, "Please provide email"] },
    password: { type: String, required: [true, "Please provide password"], minlength: 6 },
    role: { type: String, enum: ["super-admin", "admin"], default: "super-admin" },
  },
  { timestamps: true }
);

// Check email validation
UserSchema.path("email").validate(
  (value) => {
    const EMAIL_RE = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return EMAIL_RE.test(value);
  },
  (attr) => `${attr.value} harus merupakan email valid`
);

// Check email unique
UserSchema.path("email").validate(
  async function (value) {
    try {
      const count = await this.model("User").countDocuments({ email: value });
      return !count;
    } catch (err) {
      throw err;
    }
  },
  (attr) => `${attr.value} sudah terdaftar`
);

// Check name unique
UserSchema.path("name").validate(
  async function (value) {
    try {
      const count = await this.model("User").countDocuments({ name: value });
      return !count;
    } catch (err) {
      throw err;
    }
  },
  (attr) => `${attr.value} sudah digunakan`
);

UserSchema.pre("save", async function () {
  // console.log(this.modifiedPaths());
  // console.log(this.isModified("name"));
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("User", UserSchema);
