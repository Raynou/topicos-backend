const { sequelize } = require("../../connection.js");
const models = require("../../shared/init-models.js").initModels(sequelize);

async function findAllRutas() {
  const response = await models.RUTA.findAll();
  const rutas = response.map((data) => data.dataValues);
  return rutas;
}

async function findRutaById(id) {
  const response = await models.RUTA.findByPk(id);
  const ruta = response.dataValues;
  return ruta;
}

async function createRuta(ruta) {
  await models.RUTA.create(ruta);
}

async function updateRuta(ruta) {
  await models.RUTA.update(ruta, {
    where: { id: puntoDeControl.id },
  });
}

async function deleteRuta(id) {
  const ruta = await findPuntoDeControlById(id);
  ruta.destroy();
}

module.exports = {
  findAllRutas,
  findRutaById,
  createRuta,
  updateRuta,
  deleteRuta,
};
