'use strict';
const {INTEGER, STRING, ENUM} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('cart', {
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
      count: {
        type: INTEGER,
        allowNull: false
      },
      size: {
        type: STRING,
        allowNull: false
      },
      color: {
        type: STRING,
        allowNull: false
      },
      userId: {
        type: INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id"
        }
      },
      type: {
        type: ENUM("cart", "saved"),
        allowNull: false
      }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('cart');
  }
};