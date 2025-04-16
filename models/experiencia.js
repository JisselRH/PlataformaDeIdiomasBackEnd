'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class experiencia extends Model {
   experiencia = sequelize.define(
      "experiencia",
      {
        id_user: {
          type: DataTypes.INTEGER,
          references: {
            model: 'usuarios',
            key: 'id'
          }
        },
        acumulada_dia: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        fecha: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        id_tipo_entrenamiento: {
          type: DataTypes.INTEGER,
          references: {
            model: 'tipo_entrenamientos',
            key: 'id'
          }
        },
      },
      {
        timestamps: true,
        freezeTableName: true,
        tableName: "experiencia",
        classMethods: {},
      }
    );
    static associate(models) {
      experiencia.belongsTo(models.usuarios, { foreignKey: 'id_user'});
      experiencia.belongsTo(models.tipo_entrenamientos, { foreignKey: 'id_tipo_entrenamiento'});

    }
  }
  experiencia.init({
    id_user: DataTypes.INTEGER,
    acumulada_dia: DataTypes.INTEGER,
    fecha: DataTypes.DATE,
    id_tipo_entrenamiento: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'experiencia',
  });
  return experiencia;
};