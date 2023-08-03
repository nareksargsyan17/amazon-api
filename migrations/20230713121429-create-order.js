'use strict';
const { INTEGER, STRING, DATE} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('orders', {
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
      color: {
        type: STRING
      },
      size: {
        type: STRING
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
      },
      createdAt: {
        allowNull: false,
        type: DATE
      },
      updatedAt: {
        allowNull: false,
        type: DATE
      }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('orders');
  }
};