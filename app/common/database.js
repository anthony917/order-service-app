const Sequelize = require("sequelize");
const winston = require("winston");

const sequelize = new Sequelize(process.env.DB_NAME, "admin", process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "mysql",
  logging: false,
  timezone: "+08:00",
  define: {
    underscored: true
  }
});

sequelize
  .authenticate()
  .then(() => {
    winston.info(`Database (${process.env.DB_NAME}) connection success`);
  })
  .catch(err => {
    winston.info("Unable to connect to the database");
  });

module.exports = sequelize;
