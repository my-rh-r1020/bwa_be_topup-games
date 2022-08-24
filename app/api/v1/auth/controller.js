const User = require("../users/model"),
  { createJWT, createTokenUser } = require("../../../utils"),
  { StatusCodes } = require("http-status-codes"),
  CustomAPIError = require("../../../errors");

// API Signup
const signup = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    const result = await User.create({ name, email, password, role });
    delete result._doc.password;

    res.status(StatusCodes.CREATED).json({ data: result });
  } catch (err) {
    next(err);
  }
};

// API Signin
const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check empty field
    if (!email || !password) throw new CustomAPIError.BadRequest("Please provide your email and password");

    // Check email
    const result = await User.findOne({ email });
    if (!result) throw new CustomAPIError.Unauthorized(`Invalid email ${email}`);

    // Check password
    const isPassCorrect = await result.comparePassword(password);
    if (!isPassCorrect) throw new CustomAPIError.Unauthorized(`Invalid password`);

    // Create Token
    const token = createJWT({ payload: createTokenUser(result) });

    res.status(StatusCodes.OK).json({ data: { token } });
  } catch (err) {
    next(err);
  }
};

module.exports = { signup, signin };
