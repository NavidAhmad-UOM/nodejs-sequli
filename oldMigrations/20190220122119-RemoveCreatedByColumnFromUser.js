'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.removeColumn(
      'Flats',
      'createdBy'
    )]);
  },

  down: (queryInterface, Sequelize) => {
    
  }
};
