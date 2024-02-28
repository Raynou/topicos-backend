const { sequelize } = require('../connection.js');
const models = require("../models/init-models.js").initModels(sequelize);

async function findAllLecturas() {
  const response = await models.LECTURA.findAll();
  const lecturas = response.map((data) => data.dataValues);
  return lecturas;
}

async function findLecturaById(id) {
  const response = await models.LECTURA.findByPk(id);
  const lectura = response.dataValues;
  return lectura;
}

async function createLectura(lectura) {
  await models.LECTURA.create(lectura);
}

module.exports = {
    findAllLecturas,
    findLecturaById,
    createLectura
};
