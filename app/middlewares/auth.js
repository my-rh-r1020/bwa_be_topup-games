const CustomAPIError = require("../errors"),
  { isTokenValid } = require("../utils/jwt");

const authenticateUser = async (req, res, next) => {
  try {
    let token;
    // Check Header Token
    const authHeader = req.headers.authorization;

    // Token Valid
    if (authHeader && authHeader.startsWith("Bearer")) token = authHeader.split(" ")[1];

    // Token Invalid
    if (!token) throw new CustomAPIError.Unauthenticated("Authentication failed!");

    const payload = isTokenValid({ token });

    // Attach the user and his permissions
    req.user = { name: payload.name, id: payload.userId, role: payload.role, email: payload.email };

    next();
  } catch (err) {
    next(err);
  }
};

const authenticatePlayer = async (req, res, next) => {
  try {
    let token;

    // Check Header Token
    const authHeader = req.headers.authorization;

    // Token Valid
    if (authHeader && authHeader.startsWith("Bearer")) token = authHeader.split(" ")[1];
    // Token Invalid
    if (!token) throw new CustomAPIError.Unauthenticated("Authentication failed!");

    const payload = isTokenValid({ token });

    // Attach the user and his permissions
    req.player = { name: payload.name, id: payload.playerId, email: payload.email, username: payload.username, phoneNumber: payload.phoneNumber, avatar: payload.avatar, role: payload.role };

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { authenticateUser, authenticatePlayer };
