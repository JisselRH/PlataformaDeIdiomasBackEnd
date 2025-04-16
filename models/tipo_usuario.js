'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tipo_usuario extends Model {
 
    static associate(models) {
      tipo_usuario.hasMany(models.usuarios, {
        foreignKey: 'id_tipo'
      });
    }
  }
  tipo_usuario.init({
    tipo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tipo_usuario',
  });
  return tipo_usuario;
};