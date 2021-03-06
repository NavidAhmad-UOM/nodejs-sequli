'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Shops', [{
      clientId: 3,
      location: 'Margalla Town, Phase-1, Islamabad',
      area: '2 Marla',
      rent: false,
      amount: '5,0000',
      confirmed: true,
      direct: false,
      createdAt: '2019-02-12T05:37:42.055Z',
      updatedAt: '2019-02-12T05:37:42.055Z'
    },{
      clientId: 2,
      location: 'F-8/4, Islamabad',
      area: '4 Marla',
      rent: false,
      amount: '4,0000',
      confirmed: true,
      direct: false,
      createdAt: '2019-02-12T05:37:42.055Z',
      updatedAt: '2019-02-12T05:37:42.055Z'
    },{
      clientId: 1,
      location: 'E-8 Markaz, Islamabad',
      area: ' 6Marla',
      rent: false,
      amount: '5,50000',
      confirmed: true,
      direct: true,
      createdAt: '2019-02-12T05:37:42.055Z',
      updatedAt: '2019-02-12T05:37:42.055Z'
    },
    {
      clientId: 1,
      location: 'Margalla Town, Phase-3, Islamabad',
      area: '8 Marla',
      rent: false,
      amount: '555,0000',
      confirmed: false,
      direct: false,
      createdAt: '2019-02-12T05:37:42.055Z',
      updatedAt: '2019-02-12T05:37:42.055Z'
    }
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('Shops');
    }
  }
};
