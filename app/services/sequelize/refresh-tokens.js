const { User, RefreshToken } = require("../../models");
const { createTokenUser } = require("../../utils/createTokenJwt");
const { createJWT, isRefreshTokenJWTValid } = require("../../utils/jwt");
const CustomError = require("../../errors");

module.exports = {
  createUserRefreshToken: async (payload) => {
    const { refreshToken, user_id } = payload;

    const isAnyOldRefreshToken = await RefreshToken.findOne({
      where: {
        user_id,
      },
    });

    if (isAnyOldRefreshToken) {
      await isAnyOldRefreshToken.destroy();
    }

    const data = await RefreshToken.create({
      refreshToken,
      user_id,
    });

    return data;
  },
  getUserRefreshToken: async (req) => {
    const { refreshToken } = req.params;

    const refresh = await RefreshToken.findOne({
      where: {
        refreshToken,
      },
    });

    if (!refresh) throw new CustomError.NotFound("Invalid refresh token!");

    const payload = isRefreshTokenJWTValid(refresh.refreshToken);
    const user = await User.findOne({
      where: {
        email: payload.email,
      },
    });
    const token = createJWT(createTokenUser(user));

    return token;
  },
};
