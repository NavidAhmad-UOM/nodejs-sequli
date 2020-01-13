'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Plots', [{
        clientId: 1,
        location: 'Margalla Town, Phase-1, Islamabad',
        area: '5 Marla',
        amount: '5,000,000',
        type: 'Residential',
        phoneNumber: '',
        forRent: false,
        confirmed: true,
        direct: true,
        createdAt: '2019-02-12T05:37:42.055Z',
        updatedAt: '2019-02-12T05:37:42.055Z'
      },
      {
        clientId: 1,
        location: 'F-8/4, Islamabad',
        area: '1 Kanal',
        type: 'Commercial',
        amount: '60,000,000',
        phoneNumber: '',
        forRent: false,
        confirmed: true,
        direct: true,
        createdAt: '2019-02-12T05:37:42.055Z',
        updatedAt: '2019-02-12T05:37:42.055Z'
      },
      {
        clientId: 1,
        location: 'E-8 Markaz, Islamabad',
        area: '15 Marla',
        amount: '60,000,000',
        type: 'Residential',
        phoneNumber: '',
        forRent: false,
        confirmed: true,
        direct: true,
        createdAt: '2019-02-12T05:37:42.055Z',
        updatedAt: '2019-02-12T05:37:42.055Z'
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Plots', null, {});
  }
};