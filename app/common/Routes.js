const express = require("express");
const orders = require("../routes/orders");
const { systemError, notFoundError } = require("../middlewares/error");

class Routes {
  static init(app) {
    app.use(express.json());
    app.use("/orders", orders);
    app.use(notFoundError);
    app.use(systemError);
  }
}

module.exports = Routes;
