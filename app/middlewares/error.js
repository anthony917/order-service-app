const winston = require("winston");
const Respose = require("../common/Response");

const notFoundError = function (req, res, next) {
  return Respose.error(res, 404, "Endpoint does not exist.");
};

const systemError = function (err, req, res, next) {
  winston.error(err);
  return Respose.error(res, 500, "Something went wrong, please try again later.");
};

module.exports = { notFoundError, systemError }