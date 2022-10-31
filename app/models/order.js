"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.OrderDetail, {
        foreignKey: "order_detail_id",
      });

      Order.belongsTo(models.Participant, {
        foreignKey: "participant_id",
      });

      Order.belongsTo(models.Payment, {
        foreignKey: "payment_id",
      });

      Order.belongsTo(models.Event, {
        foreignKey: "event_id",
      });

      Order.belongsTo(models.HistoryEvent, {
        foreignKey: "history_event_id",
      });
    }
  }
  Order.init(
    {
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      personal_detail_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("pending", "paid"),
        defaultValue: "pending",
      },
      totalPay: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      totalOrderTicket: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      order_detail_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      participant_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      payment_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      event_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      history_event_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
