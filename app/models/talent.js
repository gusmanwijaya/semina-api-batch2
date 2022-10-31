"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Talent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Talent.belongsTo(models.Image, {
        foreignKey: "image_id",
      });

      Talent.belongsTo(models.Organizer, {
        foreignKey: "organizer_id",
      });

      Talent.hasOne(models.Event, {
        foreignKey: "id",
      });
    }
  }
  Talent.init(
    {
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          len: [3, 50],
        },
      },
      role: {
        type: DataTypes.STRING(10),
        allowNull: true,
        defaultValue: "talent",
      },
      image_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      organizer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Talent",
    }
  );
  return Talent;
};
