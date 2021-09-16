'use strict'

/** @typedef {import('../migration-types').Migration} Migration */

/** @type {Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('team_members', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'users' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      teamId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'teams' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      roles: {
        allowNull: false,
        type: Sequelize.ENUM('CAPTAIN', 'MEMBER', 'STANDIN'),
      },
      ingameId: {
        allowNull: false,
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
    return queryInterface.dropTable('team_members')
  },
}
