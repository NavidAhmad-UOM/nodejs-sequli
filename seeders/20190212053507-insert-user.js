'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
        firstName: 'John',
        lastName: 'Doe',
        email: 'demo@demo.com',
        username: 'john',
        password: '123456',
        phoneNumber: '+923331234567',
        createdAt: '2019-02-12T05:37:42.055Z',
        updatedAt: '2019-02-12T05:37:42.055Z'
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};