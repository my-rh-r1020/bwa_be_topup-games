// Create token user as Admin
const createTokenUser = (user) => {
  return {
    name: user.name ? user.name : `${user.firstName} ${user.lastName}`,
    userId: user._id,
    role: user.role,
    emai: user.email,
  };
};

// Create toke user as Player
const createTokenPlayer = (player) => {
  return {
    name: player.name ? player.name : `${player.firstName} ${player.lastName}`,
    playerId: player._id,
    email: player.email,
    username: player.username,
    phoneNumber: player.phoneNumber,
    avatar: player.avatar,
    role: player.role,
  };
};

module.exports = { createTokenUser, createTokenPlayer };
