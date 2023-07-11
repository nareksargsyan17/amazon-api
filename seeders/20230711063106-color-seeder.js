'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('colors', [
      {
        color: "black",
      },
      {
        color: "blue",
      },
      {
        color: "red",
      },
      {
        color: "pink",
      },
      {
        color: "yellow",
      },
      {
        color: "brown",
      },
      {
        color: "purple",
      },
      {
        color: "white",
      },
      {
        color: "green",
      },
      {
        color: "orange",
      },
      {
        color: "gray",
      },
      {
        color: "azure",
      },
      {
        color: "maroon",
      },
      {
        color: "lime",
      },
      {
        color: "wheat",
      },
      {
        color: "gold",
      },
      {
        color: "salmon",
      },
      {
        color: "cyan",
      },
      {
        color: "coral",
      },
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('colors', null, {});
  }
};
