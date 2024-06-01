const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  return LECTURA.init(sequelize, DataTypes);
};

class LECTURA extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        arduino: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "ARDUINO",
            key: "id",
          },
        },
        latitud: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        longitud: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        fecha: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "LECTURA",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "id" }],
          },
          {
            name: "arduino",
            using: "BTREE",
            fields: [{ name: "arduino" }],
          },
        ],
      }
    );
  }
}
