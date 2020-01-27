const Sequelize = require("sequelize");
const sequelize = require("../common/database");

class Order extends Sequelize.Model { }

Order.init(
  {
    start_latitude: Sequelize.STRING,
    start_longitude: Sequelize.STRING,
    end_latitude: Sequelize.STRING,
    end_longitude: Sequelize.STRING,
    distance: Sequelize.INTEGER,
    status: Sequelize.STRING
  },
  { sequelize, modelName: "order" }
);

module.exports = Order;
