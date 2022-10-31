const { StatusCodes } = require("http-status-codes");
const {
  createOrganizer,
  createAdmin,
  createOwner,
  getUsersRoleOrganizer,
} = require("../../../services/sequelize/users");

module.exports = {
  createOwner: async (req, res, next) => {
    try {
      const data = await createOwner(req);

      res.status(StatusCodes.CREATED).json({
        statusCode: StatusCodes.CREATED,
        message: "Successfully created owner!",
        data,
      });
    } catch (error) {
      next(error);
    }
  },
  createCMSOrganizer: async (req, res, next) => {
    try {
      const data = await createOrganizer(req);

      res.status(StatusCodes.CREATED).json({
        statusCode: StatusCodes.CREATED,
        message: "Successfully created organizer!",
        data,
      });
    } catch (error) {
      next(error);
    }
  },
  getCMSUsersRoleOrganizer: async (req, res, next) => {
    try {
      const data = await getUsersRoleOrganizer();

      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: "Successfully get users where role organizer!",
        data,
      });
    } catch (error) {
      next(error);
    }
  },
  createCMSAdmin: async (req, res, next) => {
    try {
      const data = await createAdmin(req);

      res.status(StatusCodes.CREATED).json({
        statusCode: StatusCodes.CREATED,
        message: "Successfully created admin!",
        data,
      });
    } catch (error) {
      next(error);
    }
  },
};
