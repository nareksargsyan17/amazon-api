'use strict';
const { INTEGER } = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: INTEGER
      },
      productId: {
        type: INTEGER,
        allowNull: false,
        references: {
          model: "products",
          key: "id"
        }
      },
      userId: {
        type: INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id"
        }
      },
      count: {
        type: INTEGER,
        defaultValue: 1
      },
      addressId: {
        type: INTEGER,
        allowNull: false,
        references: {
          model: "addresses",
          key: "id"
        }
      }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Orders');
  }
};