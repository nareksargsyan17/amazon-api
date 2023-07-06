'use strict';
const { INTEGER, STRING } = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('category', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: INTEGER
      },
      name: {
        type: STRING,
        allowNull: false,
        unique: true
      }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('category');
  }
};