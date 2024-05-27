const DataTypes = require("sequelize").DataTypes;
const _ARDUINO = require("../modules/arduino/model");
const _LECTURA = require("../modules/lectura/model");
const _PUNTO_DE_CONTROL = require("../modules/puntoDeControl/model");
const _RUTA = require("../modules/ruta/model");
const _VUELTA = require("../modules/vuelta/model");
const _TIEMPO = require("../modules/tiempo/model");

function initModels(sequelize) {
  const ARDUINO = _ARDUINO(sequelize, DataTypes);
  const LECTURA = _LECTURA(sequelize, DataTypes);
  const PUNTO_DE_CONTROL = _PUNTO_DE_CONTROL(sequelize, DataTypes);
  const RUTA = _RUTA(sequelize, DataTypes);
  const VUELTA = _VUELTA(sequelize, DataTypes);
  const TIEMPO = _TIEMPO(sequelize, DataTypes);

  LECTURA.belongsTo(ARDUINO, { as: "arduino_ARDUINO", foreignKey: "arduino"});
  ARDUINO.hasMany(LECTURA, { as: "LECTURAs", foreignKey: "arduino"});
  ARDUINO.hasMany(VUELTA, { as: "VUELTAs", foreignKey: "arduino"});
  VUELTA.belongsTo(ARDUINO, { as: "arduino_ARDUINO", foreignKey: "arduino"});
  VUELTA.hasMany(TIEMPO, { as: "TIEMPOs", foreignKey: "vuelta"});
  TIEMPO.belongsTo(VUELTA, { as: "vuelta_VUELTA", foreignKey: "vuelta"});
  ARDUINO.belongsTo(RUTA, { as: "ruta_RUTum", foreignKey: "ruta"});
  RUTA.hasMany(ARDUINO, { as: "ARDUINOs", foreignKey: "ruta"});
  PUNTO_DE_CONTROL.belongsTo(RUTA, { as: "ruta_RUTum", foreignKey: "ruta"});
  RUTA.hasMany(PUNTO_DE_CONTROL, { as: "PUNTO_DE_CONTROLs", foreignKey: "ruta"});

  return {
    ARDUINO,
    LECTURA,
    PUNTO_DE_CONTROL,
    RUTA,
    VUELTA,
    TIEMPO,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
