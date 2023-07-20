'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {

        await queryInterface.bulkInsert('users', [
            {
                "id": 1,
                "firstName": "admin1",
                "lastName": "admin1",
                "email": "admin1",
                "password": "$2b$10$wSNtwlvP2UEJZ6tpUMvtC.B.POFaI664z9ZHTYvewhcBiC8GC8hyG",
                "role": true,
                "verified": true,
                "token": null,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 2,
                "firstName": "admin2",
                "lastName": "admin2",
                "email": "admin2",
                "password": "$2b$10$wSNtwlvP2UEJZ6tpUMvtC.B.POFaI664z9ZHTYvewhcBiC8GC8hyG",
                "role": true,
                "verified": true,
                "token": null,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 3,
                "firstName": "admin3",
                "lastName": "admin3",
                "email": "admin3",
                "password": "$2b$10$wSNtwlvP2UEJZ6tpUMvtC.B.POFaI664z9ZHTYvewhcBiC8GC8hyG",
                "role": true,
                "verified": true,
                "token": null,
                "createdAt": new Date(),
                "updatedAt": new Date()
            }
        ], {});
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('users', null, {});
    }
};
