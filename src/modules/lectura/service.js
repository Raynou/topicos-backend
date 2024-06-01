const { sequelize } = require("../../connection.js");
const models = require("../../shared/init-models.js").initModels(sequelize);

// TODO: Remove unused functions
async function findAllLecturas() {
  const response = await models.LECTURA.findAll();
  const lecturas = response.map((data) => data.dataValues);
  return lecturas;
}

async function findLecturaById(id) {
  const response = await models.LECTURA.findByPk(id);
  if(response === null) {
    throw new Error("Lectura not found");
  }
  const lectura = response.dataValues;
  return lectura;
}

async function findAllLecturasByArduinoId(id) {
  const response = await models.LECTURA.findAll({
    where: {
      arduino: id,
    },
    order: [["fecha", "ASC"]],
  });
  const lecturas = response.map((data) => data.dataValues);
  return lecturas;
}

async function createLectura(lectura) {
  lectura.fecha = new Date(); // Add the date of the reading
  await models.LECTURA.create(lectura);
}

async function testService() {
  console.log("Este endpoint ha sido deprecado, por favor, no lo use");
}

module.exports = {
  findAllLecturas,
  findAllLecturasByArduinoId,
  findLecturaById,
  createLectura,
  testService,
};
