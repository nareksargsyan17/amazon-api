'use strict';
const { INTEGER, STRING, TEXT, BOOLEAN, DATE, JSON, NUMBER} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('products', {
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
        references: {
          model: 'categories',
          key: 'id',
        }
      },
      userId: {
        type: INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        }
      },
      colors: {
        type: JSON,
        allowNull: false
      },
      sizes: {
        type: JSON,
        allowNull: false
      },
      bought: {
        type: INTEGER,
        defaultValue: 0
      },
      earnings: {
        type: INTEGER,
        defaultValue: 0
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
    await queryInterface.dropTable('products');
  }
};