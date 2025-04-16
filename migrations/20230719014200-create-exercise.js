/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Exercises', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      context: {
        type: Sequelize.STRING,
      },
      words: {
        type: Sequelize.JSON,
        allowNull: false,
        // get() {
        //   return this.getDataValue('favColors').split(';');
        // },
        // set(val) {
        //   this.setDataValue('favColors', val.join(';'));
        // },

      },
      characterName: {
        type: Sequelize.STRING,
      },
      characterDescription: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Exercises');
  },
};
