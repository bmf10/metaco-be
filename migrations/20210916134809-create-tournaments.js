'use strict'

/** @typedef {import('../migration-types').Migration} Migration */

/** @type {Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tournaments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      startDate: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      endDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      teamCount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      slot: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    })
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('tournaments')
  },
}
