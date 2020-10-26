'use strict';
const bcrypt = require('bcrypt');
module.exports = {
  up: async (queryInterface, Sequelize) => {

     await queryInterface.bulkInsert('users', [
      {
        name: "agus mertha",
        profession : "back end developer",
        role: "admin",
        email: "agus@gmail.com",
        password: await bcrypt.hash("admin123", 10),
        created_at: new Date(),
        updated_at : new Date()
      },
      {
        name: "agung",
        profession : "front end developer",
        role: "student",
        email: "agung@gmail.com",
        password: await bcrypt.hash("studentn123", 10),
        created_at: new Date(),
        updated_at : new Date()
      }
    ], );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
