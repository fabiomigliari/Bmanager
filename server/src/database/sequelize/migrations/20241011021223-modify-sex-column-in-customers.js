module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('customers', 'sex', {
      type: Sequelize.CHAR(1),
      allowNull: true, // Set to true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('customers', 'sex', {
      type: Sequelize.CHAR(1),
      allowNull: false, // Revert to false if necessary
    });
  },
};
