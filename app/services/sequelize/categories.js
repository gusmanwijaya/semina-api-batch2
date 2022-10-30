const { Op } = require("sequelize");
const { Category } = require("../../models");
const CustomError = require("../../errors");

module.exports = {
  getAllCategories: async () => {
    const data = await Category.findAll({
      attributes: ["id", "name"],
    });

    return data;
  },
  createCategory: async (req) => {
    const { name } = req.body;

    if (!name) throw new CustomError.BadRequest("Please input name!");
    if (name.length < 3 || name.length > 20)
      throw new CustomError.BadRequest(
        "Please input length of name between 3-20 characters!"
      );

    const checkName = await Category.findOne({
      where: {
        name,
      },
      attributes: ["id", "name"],
    });
    if (checkName)
      throw new CustomError.BadRequest(`Name : ${name} already registered!`);

    const data = new Category({ name });
    await data.save();

    return data;
  },
  detailCategory: async (req) => {
    const { id } = req.params;

    const data = await Category.findOne({
      where: {
        id,
      },
      attributes: ["id", "name"],
    });

    if (!data)
      throw new CustomError.NotFound(`Category with id : ${id} not found!`);

    return data;
  },
  updateCategory: async (req) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) throw new CustomError.BadRequest("Please input name!");
    if (name.length < 3 || name.length > 20)
      throw new CustomError.BadRequest(
        "Please input length of name between 3-20 characters!"
      );

    const checkName = await Category.findOne({
      where: {
        id: {
          [Op.ne]: id,
        },
        name,
      },
    });
    if (checkName)
      throw new CustomError.BadRequest(`Name : ${name} already registered!`);

    let data = await Category.findOne({
      where: {
        id,
      },
    });

    if (!data)
      throw new CustomError.NotFound(`Category with id : ${id} not found!`);

    data.name = name;
    await data.save();

    return data;
  },
  destroyCategory: async (req) => {
    const { id } = req.params;

    const data = await Category.findOne({
      where: {
        id,
      },
    });

    if (!data)
      throw new CustomError.NotFound(`Category with id : ${id} not found!`);

    await data.destroy();

    return data;
  },
};
