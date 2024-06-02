const { sequelize } = require("../../connection.js");
const models = require("../../shared/init-models.js").initModels(sequelize);

async function findAllPuntosDeControl() {
  const response = await models.PUNTO_DE_CONTROL.findAll();
  const puntosDeControl = response.map((data) => data.dataValues);
  return puntosDeControl;
}

async function findPuntoDeControlById(id) {
  const response = await models.PUNTO_DE_CONTROL.findByPk(id);
  const puntoDeControl = response.dataValues;
  return puntoDeControl;
}

async function findPuntoDeControlByRuta(ruta) {
  const response = await models.PUNTO_DE_CONTROL.findAll({
    where: {
      ruta: ruta,
    },
  });
  const puntosDeControl = response.map((data) => data.dataValues);
  return puntosDeControl;
}

async function createPuntoDeControl(puntoDeControl) {
  console.log(puntoDeControl);
  await models.PUNTO_DE_CONTROL.create(puntoDeControl);
}

async function updatePuntoDeControl(puntoDeControl) {
  await models.PUNTO_DE_CONTROL.update(puntoDeControl, {
    where: { id: puntoDeControl.id },
  });
}

async function deletePuntoDeControl(id) {
  const puntoDeControl = await models.PUNTO_DE_CONTROL.findByPk(id);
  puntoDeControl.destroy();
}

module.exports = {
  findAllPuntosDeControl,
  findPuntoDeControlById,
  findPuntoDeControlByRuta,
  createPuntoDeControl,
  updatePuntoDeControl,
  deletePuntoDeControl,
};
