const { StatusCodes } = require("http-status-codes");
const { signIn } = require("../../../services/sequelize/authentications");

module.exports = {
  signInCMS: async (req, res, next) => {
    try {
      const response = await signIn(req);

      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: "Successfully sign in!",
        data: {
          name: response.name,
          email: response.email,
          role: response.role,
          token: response.token,
          refreshToken: response.refreshToken,
        },
      });
    } catch (error) {
      next(error);
    }
  },
};
