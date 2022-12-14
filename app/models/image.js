"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Image.hasOne(models.Talent, {
        foreignKey: "id",
      });

      Image.hasOne(models.Payment, {
        foreignKey: "id",
      });

      Image.hasOne(models.Event, {
        foreignKey: "id",
      });
    }
  }
  Image.init(
    {
      ETag: {
        type: DataTypes.STRING,
      },
      Location: {
        type: DataTypes.STRING,
      },
      Key: {
        type: DataTypes.STRING,
      },
      Bucket: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Image",
    }
  );
  return Image;
};
