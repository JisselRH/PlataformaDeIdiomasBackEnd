const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Exercise extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    exercise = sequelize.define(
      'exercise',
      {
        context: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        words: {
          type: DataTypes.JSON,
          allowNull: false,
        },
        characterName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        characterDescription: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
    );

    static associate(models) {
      // define association here
    }
  }
  Exercise.init({
    context: DataTypes.STRING,
    words: DataTypes.JSON,
    characterName: DataTypes.STRING,
    characterDescription: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Exercise',
  });
  return Exercise;
};
