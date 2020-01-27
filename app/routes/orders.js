const express = require("express");
const router = express.Router();
const Response = require("../common/Response");
const Coordinate = require("../components/Coordinate");
const OrderService = require("../services/OrderService");
const OrderValidator = require("../validators/OrderValidator");

router.post("/", async (req, res, next) => {
  try {
    const { origin, destination } = req.body;
    const createRequestValidation = OrderValidator.createRequestValidation(origin, destination);
    if (createRequestValidation) {
      return Response.error(res, createRequestValidation.code, createRequestValidation.message);
    }
    const startCoordinate = new Coordinate(origin[0], origin[1]);
    const endCoordinate = new Coordinate(destination[0], destination[1]);
    const coordinateValidation = OrderValidator.coordinateValidation(startCoordinate, endCoordinate);
    if (coordinateValidation) {
      return Response.error(res, coordinateValidation.code, coordinateValidation.message);
    }
    const distance = await Coordinate.calculateDistance(startCoordinate, endCoordinate);
    const distanceValidation = OrderValidator.distanceValidation(distance);
    if (distanceValidation) {
      return Response.error(res, distanceValidation.code, distanceValidation.message);
    }
    const order = await OrderService.createOrder(startCoordinate, endCoordinate, distance);
    return Response.success(res,
      {
        id: order.id,
        distance: order.distance,
        status: order.status
      }
    );
  } catch (error) {
    next(error);
  }
});



router.patch("/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const status = req.body.status;
    const updateRequestValidation = OrderValidator.updateRequestValidation(id, status);
    if (updateRequestValidation) {
      return Response.error(res, updateRequestValidation.code, updateRequestValidation.message);
    }
    const transactionError = await OrderService.updateOrder(id, status);
    if (transactionError) {
      return Response.error(res, transactionError.code, transactionError.message);
    }
    return Response.success(res, { status: "SUCCESS" })
  } catch (error) {
    next(error);
  }
});



router.get("/", async (req, res, next) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const listRequestValidation = OrderValidator.listRequestValidation(page, limit)
    if (listRequestValidation) {
      return Response.error(res, listRequestValidation.code, listRequestValidation.message);
    }
    const orders = await OrderService.orderList(page, limit);
    Response.success(res, orders);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
