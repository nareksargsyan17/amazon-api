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
    await queryInterface.bulkInsert('categories', [
      {
        name: "Electronics",
        parentId: null
      },
      {
        name: "Phones",
        parentId: 1
      },
      {
        name: "Computers",
        parentId: 1
      },
      {
        name: "TV",
        parentId: 1
      },
      {
        name: "IPhone",
        parentId: 2
      },
      {
        name: "Samsung",
        parentId: 2
      },
      {
        name: "Honor",
        parentId: 2
      },
      {
        name: "Xiaomi",
        parentId: 2
      },
      {
        name: "Lenovo",
        parentId: 3
      },
      {
        name: "ASUS",
        parentId: 3
      },
      {
        name: "Acer",
        parentId: 3
      },
      {
        name: "HP",
        parentId: 3
      },
      {
        name: "LG",
        parentId: 4
      },
      {
        name: "SONY",
        parentId: 4
      },
      {
        name: "Panasonic",
        parentId: 4
      },
      {
        name: "Samsung",
        parentId: 4
      },
      {
        name: "Vehicles",
        parentId: null
      },
      {
        name: "Cars",
        parentId: 17
      },
      {
        name: "Bicycles",
        parentId: 17
      },
      {
        name: "Motorcycles",
        parentId: 17
      },
      {
        name: "Mazda",
        parentId: 18
      },
      {
        name: "Mercedes",
        parentId: 18
      },
      {
        name: "BMW",
        parentId: 18
      },
      {
        name: "Nissan",
        parentId: 18
      },
      {
        name: "Schwinn",
        parentId: 19
      },
      {
        name: "Mongoose",
        parentId: 19
      },
      {
        name: "Huffy",
        parentId: 19
      },
      {
        name: "Dynacraft",
        parentId: 19
      },
      {
        name: "Aoshima",
        parentId: 20
      },
      {
        name: "Fujimi",
        parentId: 20
      },
      {
        name: "Hasegawa",
        parentId: 20
      },
      {
        name: "Italeri",
        parentId: 20
      }
    ], {});
  },

  async down(queryInterface) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('categories', null, {});
  }
};
