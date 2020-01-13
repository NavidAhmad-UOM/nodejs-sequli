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
        allowNull:false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Clients',
          key: 'id',
        }
      },
      userId: {
        allowNull:false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        }
      },
      forRent: {
        allowNull:false,
        type: Sequelize.BOOLEAN
      },
      confirmed: {
        allowNull:false,
        type: Sequelize.BOOLEAN
      },
      direct: {
        allowNull:false,
        type: Sequelize.BOOLEAN
      },
      phone1: {
        allowNull:false,
        type: Sequelize.STRING
      },
      phone2: {
        type: Sequelize.STRING
      },
      marlas: {
        allowNull:false,
        type: Sequelize.FLOAT
      },
      sqft: {
        allowNull:false,
        type: Sequelize.FLOAT
      },
      amount: {
        allowNull:false,
        type: Sequelize.INTEGER
      },
      notes: {
        type: Sequelize.TEXT
      },
      lenght: {
        type: Sequelize.INTEGER
      },
      width: {
        type: Sequelize.INTEGER
      },
      isResidental: {
        allowNull:false,
        type: Sequelize.BOOLEAN
      },
      isDeleted: {
        type: Sequelize.BOOLEAN
      },
      createdBy: {
        allowNull:false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        }
      },
      updatedBy: {
        allowNull:false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        }
      },
      deletedBy: {
        allowNull:true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        }
      },
      deletedAt: {
        type: Sequelize.DATE
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