'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('refresh_token', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement: true,
        allowNull : false  
      },
      token: {
        type:Sequelize.TEXT,
        allowNull : false
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
    });

    // membuat sebuah foreign key dari tabel refresh token
    await queryInterface.addConstraint('refresh_token', {
      type: "foreign key",
      name : "REFRESH_TOKENS_USER_ID",
      fields: ['user_id'],
      references : {
        table: "users",
        field: "id"
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('refresh_token');
  }
};
