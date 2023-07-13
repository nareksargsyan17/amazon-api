'use strict';
const {INTEGER, STRING, BOOLEAN} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('addresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: INTEGER
      },
      address: {
        type: STRING,
        allowNull: false
      },
      isMain: {
        type: BOOLEAN,
        defaultValue: false
      },
      userId: {
        type: INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id"
        }
      }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('addresses');
  }
};