const Order = require("../models/Order");
const sequelize = require("../common/database");
const OrderValidator = require("../validators/OrderValidator");

class OrderService {
  static async createOrder(start, end, distance) {
    const order = await Order.create({
      start_latitude: start.latitude,
      start_longitude: start.longitude,
      end_latitude: end.latitude,
      end_longitude: end.longitude,
      distance: parseInt(distance),
      status: "UNASSIGNED"
    });
    return order;
  }

  static async updateOrder(id, status) {
    return await sequelize.transaction(async (t) => {
      const order = await Order.findByPk(id, {
        transaction: t,
        lock: true,
        skipLocked: true,
      })
      const updateTransactionValidation = OrderValidator.updateTransactionValidation(order, status);
      if (updateTransactionValidation) {
        return {
          code: updateTransactionValidation.code,
          message: updateTransactionValidation.message
        };
      }
      await order.update({ status: status }, {
        transaction: t,
        lock: true,
        where: { id: id }
      });
      return null;
    });
  }

  static async orderList(page, limit) {
    const offset = (page - 1) * limit;
    const orders = await Order.findAll({
      attributes: ['id', 'distance', 'status'],
      offset: offset,
      limit: limit
    })
    return orders;
  }

}

module.exports = OrderService;