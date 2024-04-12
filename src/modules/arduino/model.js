const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return ARDUINO.init(sequelize, DataTypes);
}

class ARDUINO extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ruta: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'RUTA',
        key: 'id'
      }
    },
    numero_unidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: "numero_unidad"
    }
  }, {
    sequelize,
    tableName: 'ARDUINO',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "numero_unidad",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "numero_unidad" },
        ]
      },
      {
        name: "ruta",
        using: "BTREE",
        fields: [
          { name: "ruta" },
        ]
      },
    ]
  });
  }
}
