"use strict";
const { INTEGER, STRING } = require("sequelize");
/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable("sizes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: INTEGER
      },
      size: {
        type: STRING,
        allowNull: false,
      }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("sizes");
  }
};