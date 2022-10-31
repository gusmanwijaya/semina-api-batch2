"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Event.belongsToMany(models.TicketCategory, {
        foreignKey: "ticket_categories_id",
      });

      Event.belongsTo(models.Image, {
        foreignKey: "image_id",
      });

      Event.belongsTo(models.Category, {
        foreignKey: "category_id",
      });

      Event.belongsTo(models.Talent, {
        foreignKey: "talent_id",
      });

      Event.belongsTo(models.Organizer, {
        foreignKey: "organizer_id",
      });

      Event.hasOne(models.Order, {
        foreignKey: "id",
      });
    }
  }
  Event.init(
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
      status: {
        type: DataTypes.ENUM("draft", "published"),
        defaultValue: "draft",
      },
      ticket_categories_id: {
        type: DataTypes.INTEGER,
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
      modelName: "Event",
    }
  );
  return Event;
};
