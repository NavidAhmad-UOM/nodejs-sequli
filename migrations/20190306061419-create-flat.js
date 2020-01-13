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
        allowNull:true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Clients',
          key: 'id',
        }
      },
      userId: {
        allowNull:false,
        type: Sequelize.INTEGER
      },
      forRent: {
        allowNull:true,
        type: Sequelize.BOOLEAN
      },
      confirmed: {
        allowNull:true,
        type: Sequelize.BOOLEAN
      },
      direct: {
        allowNull:true,
        type: Sequelize.BOOLEAN
      },
      phone1: {
        type: Sequelize.STRING
      },
      phone2: {
        allowNull:false,
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
      rooms: {
        allowNull:false,
        type: Sequelize.INTEGER
      },
      floorNo: {
        allowNull:false,
        type: Sequelize.INTEGER
      },
      bath:{
        allowNull:false,
        type:Sequelize.INTEGER
      },
      isResidental: {
        allowNull:true,
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
    return queryInterface.dropTable('Flats');
  }
};