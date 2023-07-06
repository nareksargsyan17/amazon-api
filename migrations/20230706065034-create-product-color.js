"use strict";
const { INTEGER } = require("sequelize");
/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable("product_color", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: INTEGER
      },
      productId: {
        type: INTEGER,
        allowNull: false,
        reference: {
          model : "product",
          key: "id"
        }
      },
      colorId : {
        type: INTEGER,
        allowNull: false,
        reference: {
          model : "color",
          key: "id"
        }
      }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("product_color");
  }
};