"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PersonalDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PersonalDetail.init(
    {
      firstName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          len: [3, 50],
        },
      },
      lastName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          len: [3, 50],
        },
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          isEmail: {
            msg: "Please input a valid email address!",
          },
        },
      },
      role: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: "-",
      },
    },
    {
      sequelize,
      modelName: "PersonalDetail",
    }
  );
  return PersonalDetail;
};
