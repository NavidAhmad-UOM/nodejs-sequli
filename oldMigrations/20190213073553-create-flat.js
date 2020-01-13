'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Flats', {
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
      rent: {
        type: Sequelize.BOOLEAN
      },
      amount: {
        type: Sequelize.STRING
      },
      rooms: {
        type: Sequelize.INTEGER
      },
      bath: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('Flats');
  }
};