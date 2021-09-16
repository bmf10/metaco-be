/** @typedef {import('sequelize')} Sequelize */
/** @typedef {import('sequelize').QueryInterface} QueryInterface */
/**
 * @callback MigrationFunction
 * @param {QueryInterface} queryInterface
 * @param {Sequelize} Sequelize
 */
/**
 * @typedef {object} Migration
 * @property {MigrationFunction} up
 * @property {MigrationFunction} down
 */

module.exports = undefined
