"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Organizer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Organizer.hasOne(models.User, {
        foreignKey: "id",
      });

      Organizer.hasMany(models.Category, {
        foreignKey: "id",
      });

      Organizer.hasOne(models.Talent, {
        foreignKey: "id",
      });

      Organizer.hasOne(models.Payment, {
        foreignKey: "id",
      });

      Organizer.hasOne(models.Event, {
        foreignKey: "id",
      });
    }
  }
  Organizer.init(
    {
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
          len: [3, 50],
        },
      },
    },
    {
      sequelize,
      modelName: "Organizer",
    }
  );
  return Organizer;
};
