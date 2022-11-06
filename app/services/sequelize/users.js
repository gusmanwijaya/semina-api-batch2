const { Op } = require("sequelize");
const { Organizer, User } = require("../../models");
const CustomError = require("../../errors");
const bcrypt = require("bcryptjs");
const { getRedis } = require("../redis");

module.exports = {
  createOwner: async (req) => {
    const { nameOrganizer, nameUser, email, password, confirmPassword } =
      req.body;

    if (!nameOrganizer)
      throw new CustomError.BadRequest("Please input organizer's name!");
    if (!nameUser)
      throw new CustomError.BadRequest("Please input user's name!");
    if (!email)
      throw new CustomError.BadRequest("Please input an email address!");
    if (!password) throw new CustomError.BadRequest("Please input password!");
    if (!confirmPassword)
      throw new CustomError.BadRequest("Please input confirm password");

    if (password !== confirmPassword)
      throw new CustomError.BadRequest(
        "Password and confirmation password doesn't match!"
      );

    const hashPassword = bcrypt.hashSync(password, 12);

    const [organizer, created] = await Organizer.findOrCreate({
      where: {
        name: nameOrganizer,
      },
    });

    const data = await User.create({
      name: nameUser,
      email,
      password: hashPassword,
      role: "owner",
      organizer_id: organizer.id,
    });

    delete data.dataValues.password;

    return data;
  },
  createOrganizer: async (req) => {
    const { nameOrganizer, nameUser, email, password, confirmPassword } =
      req.body;

    if (!nameOrganizer)
      throw new CustomError.BadRequest("Please input organizer's name!");
    if (!nameUser)
      throw new CustomError.BadRequest("Please input user's name!");
    if (!email)
      throw new CustomError.BadRequest("Please input an email address!");
    if (!password) throw new CustomError.BadRequest("Please input password!");
    if (!confirmPassword)
      throw new CustomError.BadRequest("Please input confirm password");

    if (password !== confirmPassword)
      throw new CustomError.BadRequest(
        "Password and confirmation password doesn't match!"
      );

    const hashPassword = bcrypt.hashSync(password, 12);

    const [organizer, created] = await Organizer.findOrCreate({
      where: {
        name: nameOrganizer,
      },
    });

    const data = await User.create({
      name: nameUser,
      email,
      password: hashPassword,
      role: "organizer",
      organizer_id: organizer.id,
    });

    delete data.dataValues.password;

    return data;
  },
  getUsers: async () => {
    const data = await User.findAll({
      where: {
        role: {
          [Op.ne]: "owner",
        },
      },
      attributes: ["id", "name", "email", "role"],
      include: [
        {
          model: Organizer,
          attributes: ["id", "name"],
        },
      ],
    });
    return data;
  },
  createAdmin: async (req) => {
    const { name, email, password, confirmPassword } = req.body;

    if (!name) throw new CustomError.BadRequest("Please input name!");
    if (!email)
      throw new CustomError.BadRequest("Please input an email address!");
    if (!password) throw new CustomError.BadRequest("Please input password!");
    if (!confirmPassword)
      throw new CustomError.BadRequest("Please input confirm password");

    if (password !== confirmPassword)
      throw new CustomError.BadRequest(
        "Password and confirmation password doesn't match!"
      );

    const hashPassword = bcrypt.hashSync(password, 12);

    const cacheUser = await getRedis("authentication-user");

    const data = await User.create({
      name,
      email,
      password: hashPassword,
      role: "admin",
      organizer_id:
        cacheUser != null ? cacheUser.organizer_id : req.user.organizer_id,
    });

    delete data.dataValues.password;

    return data;
  },
};
