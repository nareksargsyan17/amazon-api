'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('sizes',
      [
        {
          size: 'Small',
        },
        {
          size: 'Middle',
        },
        {
          size: 'Large',
        }
      ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('sizes', null, {});
  }
};
