const { sequelize } = require("../../connection.js");
const { checkpoints } = require("../../shared/globals.js");
const pdcService = require("../puntoDeControl/service.js");
const ws = require("../../web-socket.js");
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
async function spawnEventHandler(flag) {
  // TODO: Spawn Python desktop app

  // Get control points
  const existsEvent = true;
  const mockDataForSammy = {
    vehicles: {
      id: ["v0", "v1", "v2"],
      lat: [19.359377728478943, 19.359377728478943, 19.359377728478943],
      lng: [-99.16335342077437, -99.16335342077437, -99.16335342077437],
    },
    checkpoints: {
      id: ["cp0", "cp1", "cp2"],
      lat: [19.359377728478943, 19.359377728478943, 19.359377728478943],
      lng: [-99.16335342077437, -99.16335342077437, -99.16335342077437],
    },
    threshold: 0.1,
  };
  ws.send(JSON.stringify(mockDataForSammy));
  const mockEvents = ["rebase", "retraso"];
  let random = Math.random();

  // Test code
  if (random > 0.5) {
    random = Math.ceil(random);
  } else {
    random = Math.floor(random);
  }

  const event = mockEvents[random];

  if (existsEvent) {
    // TODO: Send via ws an alert to the clients
    console.log(event);
    ws.send(event);
  }
}

module.exports = {
  findAllLecturas,
  findLecturaById,
  createLectura,
  testService,
};
