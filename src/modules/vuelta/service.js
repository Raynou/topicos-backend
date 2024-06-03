const { Sequelize, Op } = require("sequelize");
const { sequelize } = require("../../connection.js");
const { Result } = require("../../shared/result.js");
const models = require("../../shared/init-models.js").initModels(sequelize);

async function findAllVueltas() {
  const response = await models.VUELTA.findAll();
  const vueltas = response.map((data) => data.dataValues);
  return vueltas;
}

async function findLastVueltByArduinoId(arduinoId) {
  const response = await models.VUELTA.findOne({
    where: {
      arduino: arduinoId,
    },
    order: [["fecha", "DESC"]],
  });
  if(response === null) {
    return Result.fail(`No laps found for arduino ${arduinoId}`);
  }
  const vuelta = response.dataValues;
  return Result.success(vuelta);
}

/**
 * Find all laps by Arduino id and date.
 * @param {*} arduinoId - Arduino id
 * @param {*} date - Date in format "YYYY-MM-DD"
 */
async function findAllVueltasByArduinoIdAndDate(arduinoId, date) {
  const response = await models.VUELTA.findAll({
    where: {
      arduino: arduinoId,
      fecha: {
        [Op.like]: Sequelize.literal(`DATE('${date}')`),
      },
    },
  });
  const vueltas = response.map((data) => data.dataValues);
  return vueltas;
}

async function findVueltaById(id) {
  const response = await models.VUELTA.findByPk(id);
  const vuelta = response.dataValues;
  return vuelta;
}

async function createVuelta(vuelta) {
  await models.VUELTA.create(vuelta);
}

module.exports = {
  findAllVueltas,
  findVueltaById,
  findLastVueltByArduinoId,
  findAllVueltasByArduinoIdAndDate,
  createVuelta,
};
