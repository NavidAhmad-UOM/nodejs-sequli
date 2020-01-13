'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.addColumn(
      'Flats',
      'createdBy', {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 2,
        references: {
          model: 'Users',
          key: 'id',
        }
      }
    )]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
