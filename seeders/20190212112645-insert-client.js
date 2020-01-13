'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Clients', [{
        firstName: 'Chris',
        lastName: 'Prat',
        email: 'chris@test.com',
        phoneNumber: '+923336589542',
        createdAt: '2019-02-12T05:37:42.055Z',
        updatedAt: '2019-02-12T05:37:42.055Z'
      },
      {
        firstName: 'Michael',
        lastName: 'Holding',
        email: 'michael@test.com',
        phoneNumber: '+923335478547',
        createdAt: '2019-02-12T05:37:42.055Z',
        updatedAt: '2019-02-12T05:37:42.055Z'
      },
      {
        firstName: 'John',
        lastName: 'Cena',
        email: 'john@test.com',
        phoneNumber: '+923335214536',
        createdAt: '2019-02-12T05:37:42.055Z',
        updatedAt: '2019-02-12T05:37:42.055Z'
      },
      {
        firstName: 'Triple',
        lastName: 'H',
        email: 'triple@test.com',
        phoneNumber: '+923338896585',
        createdAt: '2019-02-12T05:37:42.055Z',
        updatedAt: '2019-02-12T05:37:42.055Z'
      },
      {
        firstName: 'Braun',
        lastName: 'Stowman',
        email: 'braun@test.com',
        phoneNumber: '+923331112542',
        createdAt: '2019-02-12T05:37:42.055Z',
        updatedAt: '2019-02-12T05:37:42.055Z'
      },
      {
        firstName: 'Shahid',
        lastName: 'Afridi',
        email: 'shahid@test.com',
        phoneNumber: '+9233311475256',
        createdAt: '2019-02-12T05:37:42.055Z',
        updatedAt: '2019-02-12T05:37:42.055Z'
      },
      {
        firstName: 'Roman',
        lastName: 'Reigns',
        email: 'roman@test.com',
        phoneNumber: '+923334785858',
        createdAt: '2019-02-12T05:37:42.055Z',
        updatedAt: '2019-02-12T05:37:42.055Z'
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Clients', null, {});
  }
};