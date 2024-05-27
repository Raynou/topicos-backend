const { sequelize } = require("../../connection.js");
const models = require("../../shared/init-models.js").initModels(sequelize);

/*async function findAllTiempos() {
  const response = await models.TIEMPO.findAll();
  const tiempos = response.map((data) => data.dataValues);
  return tiempos;
}

async function findTiempoByVueltaAndId(vueltaId, id) {
  const response = await models.TIEMPO.findOne({
    where: { vuelta_id: vueltaId, id: id },
  });
  const tiempo = response.dataValues;
  return tiempo;
}*/

async function findTiempoByVueltaId(vueltaId) {
  const response = await models.TIEMPO.findAll({
    where: { vuelta: vueltaId },
  });
  const tiempos = response.map((data) => data.dataValues);
  return tiempos;
}

async function createTiempo(tiempo) {
  await models.TIEMPO.create(tiempo);
}

module.exports = {
  // findAllTiempos,
  findTiempoByVueltaId,
  // findTiempoByVueltaAndId,
  createTiempo,
};
