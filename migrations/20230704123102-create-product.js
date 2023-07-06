'use strict';
const { INTEGER, STRING, TEXT, BOOLEAN, DATE } = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('product', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: INTEGER
      },
      name: {
        type: STRING,
        allowNull: false,
      },
      description : {
        type : TEXT,
      },
      brand : {
        type : STRING,
        allowNull : false
      },
      price : {
        type : INTEGER,
        allowNull:  false
      },
      isPublished : {
        type : BOOLEAN,
        defaultValue: false
      },
      categoryId: {
        type: INTEGER,
        allowNull: false,
        reference: {
          model: 'category',
          key: 'id',
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
    await queryInterface.dropTable('product');
  }
};