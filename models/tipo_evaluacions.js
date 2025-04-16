'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tipo_evaluacions extends Model {
  
    static associate(models) {
      tipo_evaluacions.hasMany(models.avances, {
        foreignKey: 'id_tipo_evaluacions'
      });
    }
  }
  tipo_evaluacions.init({
    tipo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tipo_evaluacions',
  });
  return tipo_evaluacions;
};