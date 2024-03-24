const { sequelize } = require("../../connection.js");
const ws = require("../../ws-server.js");
const models = require("../../shared/init-models.js").initModels(sequelize);

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
  spawnEventHandler();
}

async function testService() {
  spawnEventHandler();
}

/**
 * Calls an app builded in python to determine if exists any
 * overtaking or a bus is stopped. In case that any of the
 * mentioned events exists, the function will send via websockets
 * an alert to the clients.
 */
function spawnEventHandler() {
  // TODO: Spawn Python desktop app
  const existsEvent = true;
  if (existsEvent) {
    // TODO: Send via ws an alert to the clients
    ws.clients.forEach((client) => {
      client.send("There's an event!");
    });
  }
}

module.exports = {
  findAllLecturas,
  findLecturaById,
  createLectura,
  testService
};
