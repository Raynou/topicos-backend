const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return RUTA.init(sequelize, DataTypes);
}

class RUTA extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    punto_inicial_lat: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    punto_inicial_lon: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    punto_final_lat: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    punto_final_lon: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'RUTA',
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
    ]
  });
  }
}
