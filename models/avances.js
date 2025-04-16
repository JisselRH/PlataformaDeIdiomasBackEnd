'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class avances extends Model {

    avances = sequelize.define(
      "avances",
      {
        id_user: {
          type: DataTypes.INTEGER,
          references: {
            model: 'usuarios',
            key: 'id'
          }
        },
        porcentaje: {
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
            model: 'tipo_entrenamiento',
            key: 'id'
          }
        },  
        id_tipo_evaluacion: {
          type: DataTypes.INTEGER,
          references: {
            model: 'tipo_evaluacion',
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
      avances.belongsTo(models.usuarios, { foreignKey: 'id_user'});
      avances.belongsTo(models.tipo_entrenamientos, { foreignKey: 'id_tipo_entrenamiento'});
      avances.belongsTo(models.tipo_evaluacions, { foreignKey: 'id_tipo_evaluacion'});
    }
  }
  avances.init({
    id_user: DataTypes.INTEGER,
    porcentaje: DataTypes.INTEGER,
    fecha: DataTypes.DATE,
    id_tipo_entrenamiento: DataTypes.INTEGER,
    id_tipo_evaluacion: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'avances',
  });
  return avances;
};