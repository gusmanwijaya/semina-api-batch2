const { StatusCodes } = require("http-status-codes");
const {
  getAllCategories,
  createCategory,
  detailCategory,
  updateCategory,
  destroyCategory,
} = require("../../../services/sequelize/categories");

module.exports = {
  create: async (req, res, next) => {
    try {
      const data = await createCategory(req);

      res.status(StatusCodes.CREATED).json({
        statusCode: StatusCodes.CREATED,
        message: "Successfully created category",
        data,
      });
    } catch (error) {
      next(error);
    }
  },
  get: async (req, res, next) => {
    try {
      const data = await getAllCategories();

      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: "Successfully get categories",
        data,
      });
    } catch (error) {
      next(error);
    }
  },
  detail: async (req, res, next) => {
    try {
      const data = await detailCategory(req);

      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: "Successfully get detail category",
        data,
      });
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const data = await updateCategory(req);

      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: "Successfully updated category",
        data,
      });
    } catch (error) {
      next(error);
    }
  },
  destroy: async (req, res, next) => {
    try {
      const data = await destroyCategory(req);

      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: "Successfully deleted category",
        data,
      });
    } catch (error) {
      next(error);
    }
  },
};
