const sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  return TIEMPO.init(sequelize, DataTypes);
};

class TIEMPO extends sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        vuelta: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "VUELTA",
            key: "id",
          },
        },
        tiempo: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        fecha: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "TIEMPO",
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
