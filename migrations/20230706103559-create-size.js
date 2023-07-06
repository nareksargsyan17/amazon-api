"use strict";
const { INTEGER, STRING } = require("sequelize");
/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable("size", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: INTEGER
      },
      size: {
        type: STRING,
        allowNull: false,
        unique: true
      }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("size");
  }
};