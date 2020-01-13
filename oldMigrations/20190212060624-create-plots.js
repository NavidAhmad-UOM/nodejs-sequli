'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Plots', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      clientId: {
        type: Sequelize.INTEGER,
        references : {
          model : 'Clients',
          key   : 'id',
      }
      },
      location: {
        type: Sequelize.STRING
      },
      area: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.STRING
      },
      phoneNumber: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      forRent: {
        type: Sequelize.BOOLEAN
      },
      confirmed: {
        type: Sequelize.BOOLEAN
      },
      direct: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Plots');
  }
};