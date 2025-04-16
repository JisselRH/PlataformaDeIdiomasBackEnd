const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class usuarios extends Model {
    usuarios = sequelize.define(
      'usuarios',
      {
        rut: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        pass: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        nombre: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        apellido: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        id_tipo: {
          type: DataTypes.INTEGER,
          references: {
            model: 'tipo_usuario',
            key: 'id',
          },
        },
      },
      {
        timestamps: true,
        freezeTableName: true,
        tableName: 'usuarios',
        classMethods: {},
      },
    );

    static associate(models) {
      usuarios.hasMany(models.avances, {
        foreignKey: 'id_user',
      });

      usuarios.hasMany(models.experiencia, {
        foreignKey: 'id_user',
      });

      usuarios.belongsTo(models.tipo_usuario);
    }
  }
  usuarios.init({
    rut: DataTypes.STRING,
    pass: DataTypes.STRING,
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    id_tipo: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'usuarios',
  });
  return usuarios;
};
