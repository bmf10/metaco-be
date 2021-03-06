'use strict'

/** @typedef {import('../migration-types').Migration} Migration */

/** @type {Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tournament_results', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      teamId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'teams' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      position: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      point: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      tournamentId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'tournaments' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
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
    return queryInterface.dropTable('tournament_results')
  },
}
