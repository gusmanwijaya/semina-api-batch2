const { StatusCodes } = require("http-status-codes");
const {
  createImage,
  getAllImages,
  detailImage,
  destroyImage,
} = require("../../../services/sequelize/images");

module.exports = {
  create: async (req, res, next) => {
    try {
      const data = await createImage(req);

      res.status(StatusCodes.CREATED).json({
        statusCode: StatusCodes.CREATED,
        message: "Successfully uploaded image!",
        data,
      });
    } catch (error) {
      next(error);
    }
  },
  get: async (req, res, next) => {
    try {
      const data = await getAllImages();

      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: "Successfully get uploaded image!",
        data,
      });
    } catch (error) {
      next(error);
    }
  },
  detail: async (req, res, next) => {
    try {
      const data = await detailImage(req);

      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: "Successfully get detail uploaded image!",
        data,
      });
    } catch (error) {
      next(error);
    }
  },
  destroy: async (req, res, next) => {
    try {
      const data = await destroyImage(req);

      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: "Successfully deleted an image!",
        data,
      });
    } catch (error) {
      next(error);
    }
  },
};
