const { StatusCodes } = require("http-status-codes");
const {
  getUserRefreshToken,
} = require("../../../services/sequelize/refresh-tokens");

module.exports = {
  getRefreshToken: async (req, res, next) => {
    try {
      const data = await getUserRefreshToken(req);

      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: "Successfully get refresh token!",
        data,
      });
    } catch (error) {
      next(error);
    }
  },
};
