const { createJWT, isTokenValid } = require("./jwt"),
  { createTokenUser, createTokenPlayer } = require("./createTokenUser");

module.exports = { createJWT, isTokenValid, createTokenUser, createTokenPlayer };
