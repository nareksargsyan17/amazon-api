'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
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
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('colors', null, {});
  }
};
