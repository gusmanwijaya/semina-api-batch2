"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class HistoryEvent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      HistoryEvent.belongsTo(models.Image, {
        foreignKey: "image_id",
      });

      HistoryEvent.belongsTo(models.Category, {
        foreignKey: "category_id",
      });

      HistoryEvent.belongsTo(models.Talent, {
        foreignKey: "talent_id",
      });

      HistoryEvent.belongsTo(models.Organizer, {
        foreignKey: "organizer_id",
      });

      HistoryEvent.hasOne(models.Order, {
        foreignKey: "id",
      });
    }
  }
  HistoryEvent.init(
    {
      title: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          len: [3, 50],
        },
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      about: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      tagline: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      keyPoint: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      venueName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      talent_id: {
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
      modelName: "HistoryEvent",
    }
  );
  return HistoryEvent;
};
