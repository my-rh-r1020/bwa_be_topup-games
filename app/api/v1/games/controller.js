const Game = require("./model"),
  { StatusCodes } = require("http-status-codes"),
  CustomAPIError = require("../../../errors"),
  fs = require("fs"),
  config = require("../../../config");

// Get all games data
const getAllGames = async (req, res, next) => {
  try {
    let condition = { user: req.user.id };
    const result = await Game.find(condition).populate({ path: "category", select: "_id name" });

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

// Get one game data
const getOneGame = async (req, res, next) => {
  try {
    const { id: gameId } = req.params;

    const result = await Game.findOne({ _id: gameId, user: req.user.id });
    if (!result) throw new CustomAPIError.NotFound(`Game id ${gameId} is not found`);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

// Create new game data
const createGame = async (req, res, next) => {
  try {
    const { gameName, status, category } = req.body,
      user = req.user.id;

    // Check data
    const check = await Game.findOne({ gameName });
    if (check) throw new CustomAPIError.BadRequest(`Game name ${gameName} is already used`);

    // Save data
    let result;

    if (!req.file) {
      result = await Game.create({ gameName, status, category, user });
    } else {
      result = await Game.create({ gameName, coverGames: req.file.filename, status, category, user });
    }

    res.status(StatusCodes.CREATED).json({ data: result });
  } catch (err) {
    next(err);
  }
};

// Update game data
const updateGame = async (req, res, next) => {
  try {
    const { id: gameId } = req.params,
      { gameName, status, category } = req.body,
      user = req.user.id;

    // Check data
    let result = await Game.findOne({ _id: gameId, user });
    if (!result) throw new CustomAPIError.NotFound(`Game id ${gameId} is not found`);

    // Update data
    if (!req.file) {
      // Update without cover game
      (result.gameName = gameName), (result.status = status), (result.category = category), (result.user = user);
    } else {
      // Update with cover game
      let currentCover = `${config.rootPath}/public/uploads/cover-games/${result.coverGames}`;
      if (fs.existsSync(currentCover)) fs.unlinkSync(currentCover);

      (result.gameName = gameName), (result.coverGames = req.file.filename), (result.status = status), (result.category = category), (result.user = user);
    }

    await result.save();

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

// Delete game data
const deleteGame = async (req, res, next) => {
  try {
    const { id: gameId } = req.params,
      user = req.user.id;

    // Delete data
    const result = await Game.findOneAndDelete({ _id: gameId, user });
    if (!result) throw new CustomAPIError.NotFound(`Game id ${gameId} is not found`);

    // Delete image
    let currentCoverGames = `${config.rootPath}/public/uploads/cover-games/${result.coverGames}`;
    if (fs.existsSync(currentCoverGames)) fs.unlinkSync(currentCoverGames);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllGames, getOneGame, createGame, updateGame, deleteGame };
