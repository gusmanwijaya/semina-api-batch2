"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.belongsTo(models.Organizer, {
        foreignKey: "organizer_id",
      });

      Category.hasOne(models.Event, {
        foreignKey: "id",
      });
    }
  }
  Category.init(
    {
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
        validate: {
          len: [3, 20],
        },
      },
      organizer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Category",
    }
  );
  return Category;
};
