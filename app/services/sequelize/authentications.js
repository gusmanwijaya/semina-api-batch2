const { User } = require("../../models");
const CustomError = require("../../errors");
const { createTokenUser } = require("../../utils/createTokenJwt");
const { createJWT, createRefreshTokenJWT } = require("../../utils/jwt");
const { createUserRefreshToken } = require("./refresh-tokens");
const bcrypt = require("bcryptjs");

module.exports = {
  signIn: async (req) => {
    const { email, password } = req.body;

    if (!email || !password)
      throw new CustomError.BadRequest("Please input email and password!");

    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) throw new CustomError.Unauthorized("Invalid credentials!");

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);

    if (!isPasswordCorrect)
      throw new CustomError.Unauthorized("Invalid credentials!");

    const token = createJWT(createTokenUser(user));
    const refreshToken = createRefreshTokenJWT(createTokenUser(user));

    const payload = {
      refreshToken,
      user_id: user.id,
    };
    await createUserRefreshToken(payload);

    return {
      name: user.name,
      email: user.email,
      role: user.role,
      token,
      refreshToken,
    };
  },
};
