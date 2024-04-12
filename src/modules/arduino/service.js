const { sequelize } = require('../connection.js');
const models = require("../models/init-models.js").initModels(sequelize);

async function findAllArduinos() {
  const response = await models.ARDUINO.findAll();
  const arduinos = response.map((data) => data.dataValues);
  return arduinos;
}

async function findArduinoById(id) {
  const response = await models.ARDUINO.findByPk(id);
  const user = response.dataValues;
  return user;
}

module.exports = {
  findAllArduinos,
  findArduinoById
};
