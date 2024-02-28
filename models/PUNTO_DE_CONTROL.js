const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return PUNTO_DE_CONTROL.init(sequelize, DataTypes);
}

class PUNTO_DE_CONTROL extends Sequelize.Model {
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
    latitud: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    longitud: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'PUNTO_DE_CONTROL',
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
