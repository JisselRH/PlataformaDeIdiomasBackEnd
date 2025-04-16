'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tipo_entrenamientos extends Model {
 
    static associate(models) {
      tipo_entrenamientos.hasMany(models.experiencia, {
        foreignKey: 'id_tipo_entrenamiento'
      });

      tipo_entrenamientos.hasMany(models.avances, {
        foreignKey: 'id_tipo_entrenamiento'
      });
    }
  }
  tipo_entrenamientos.init({
    tipo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tipo_entrenamientos',
  });
  return tipo_entrenamientos;
};