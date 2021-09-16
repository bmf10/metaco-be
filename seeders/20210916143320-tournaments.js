'use strict'

/** @typedef {import('../migration-types').Migration} Migration */

/** @type {Migration} */
module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('tournaments', [
      {
        id: 111,
        title: 'Metaco Tournament Dota 2 #1',
        startDate: new Date('7/31/2021'),
        endDate: new Date('8/1/2021'),
        teamCount: 10,
        slot: 10,
        createdAt: '2021-07-15 04:05:23.35+00',
        updatedAt: '2021-07-15 04:05:23.35+00',
      },
      {
        id: 112,
        title: 'Metaco Tournament Dota 2 #2',
        startDate: new Date('8/7/2021'),
        endDate: new Date('8/8/2021'),
        teamCount: 10,
        slot: 10,
        createdAt: '2021-07-22 04:05:23.35+00',
        updatedAt: '2021-07-22 04:05:23.35+00',
      },
      {
        id: 113,
        title: 'Metaco Tournament Dota 2 #3',
        startDate: new Date('8/14/2021'),
        endDate: new Date('8/15/2021'),
        teamCount: 10,
        slot: 10,
        createdAt: '2021-07-29 04:05:23.35+00',
        updatedAt: '2021-07-29 04:05:23.35+00',
      },
      {
        id: 114,
        title: 'Metaco Tournament Dota 2 #4',
        startDate: new Date('8/21/2021'),
        endDate: new Date('8/22/2021'),
        teamCount: 10,
        slot: 10,
        createdAt: '2021-08-05 04:05:23.35+00',
        updatedAt: '2021-08-05 04:05:23.35+00',
      },
      {
        id: 115,
        title: 'Metaco Tournament Dota 2 #5',
        startDate: new Date('8/29/2021'),
        endDate: new Date('8/29/2021'),
        teamCount: 10,
        slot: 10,
        createdAt: '2021-08-12 04:05:23.35+00',
        updatedAt: '2021-08-12 04:05:23.35+00',
      },
    ])
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('tournaments', null, {})
  },
}
