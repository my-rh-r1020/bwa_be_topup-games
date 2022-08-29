const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema(
  {
    gameName: { type: String, require: [true, "Please insert game name"] },
    coverGames: { type: String, require: [true, "Please insert cover game"] },
    status: { type: Boolean, enum: [true, false], default: true },
    category: { type: mongoose.Types.ObjectId, ref: "Category", required: true },
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Game", GameSchema);
