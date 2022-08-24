const jwt = require("jsonwebtoken"),
  { jwtSecret } = require("../config");

// Create JWT
const createJWT = ({ payload }) => {
    const token = jwt.sign(payload, jwtSecret);
    return token;
  },
  isTokenValid = ({ token }) => jwt.verify(token, jwtSecret);

module.exports = { createJWT, isTokenValid };
