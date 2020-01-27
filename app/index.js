require('dotenv').config({ path: `${__dirname}/.env.${process.env.NODE_ENV || "production"}` });

const winston = require("winston");
const express = require("express");

const app = express();
const database = require("./common/database");
const Routes = require("./common/Routes");
const path = require('path');

const port = process.env.PORT || 8080;
Routes.init(app);

const server = app.listen(port, () =>
  winston.info(`Listening on port ${port}...`)
);

module.exports = server;
