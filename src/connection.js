const { Sequelize } = require("sequelize");
require("dotenv").config();

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const dbDialect = process.env.DB_DIALECT;
const dbPort = process.env.DB_PORT;


const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  dialect: dbDialect,
  host: dbHost,
  port: dbPort,
  logging: process.env.NODE_ENV === "production" ? false : true, // Disable SQL Query logging in production
});

module.exports = {
  sequelize,
};
