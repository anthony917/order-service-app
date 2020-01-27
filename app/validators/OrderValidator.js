const StatusHelper = require("../common/StatusHelper");

class OrderValidator {
  static createRequestValidation(origin, destination) {
    if (!(origin instanceof Array) || !(destination instanceof Array)) {
      return {
        code: 400,
        message: "Coordinate must be array format."
      };
    }
    if (origin.length !== 2 || destination.length !== 2) {
      return {
        code: 400,
        message: "Coordinate must be exactly 2 strings only."
      };
    }
    return null;
  }

  static coordinateValidation(startCoordinate, endCoordinate) {
    if (startCoordinate.isEmpty() || endCoordinate.isEmpty()) {
      return {
        code: 400,
        message: "Coordinate is required."
      };
    }
    if (!startCoordinate.isValid() || !endCoordinate.isValid()) {
      return {
        code: 400,
        message: "Coordinate is invalid."
      };
    }
    return null;
  }

  static distanceValidation(distance) {
    if (distance === null) {
      return {
        code: 400,
        message: "Can not get distance from the coordinates."
      };
    }
    return null;
  }

  static updateRequestValidation(id, status) {
    if (!Number.isInteger(id)) {
      return {
        code: 400,
        message: "Order id is invalid."
      };
    }

    if (typeof status === "undefined" || !status) {
      return {
        code: 400,
        message: "Order status is required."
      };
    }

    if (!StatusHelper.isAvailable(status)) {
      return {
        code: 400,
        message: "Order status is invalid."
      };
    }

    return null;
  }

  static updateTransactionValidation(order, status) {
    if (!order) {
      return {
        code: 404,
        message: "Order does not exist."
      };
    } else if (order.status == status) {
      return {
        code: 400,
        message: "Order status cannot be updated."
      };
    }

    return null;
  }

  static listRequestValidation(page, limit) {
    if (!page || !limit) {
      return {
        code: 400,
        message: "The page and limit are required."
      };
    }

    if (!Number.isInteger(page) || !Number.isInteger(limit)) {
      return {
        code: 400,
        message: "Page and limit must be integer."
      };
    }

    if (page < 0 || limit < 0) {
      return {
        code: 400,
        message: "Page and limit must be positive."
      };
    }

    return null;
  }

}

module.exports = OrderValidator;