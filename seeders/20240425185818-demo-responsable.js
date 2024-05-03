'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const info_responsable = [
      {
        numEmpleado: 123,
        nombre: "Tere",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    await queryInterface.bulkInsert('responsables', info_responsable, {});
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('responsables', null, {});
     
  }
};
