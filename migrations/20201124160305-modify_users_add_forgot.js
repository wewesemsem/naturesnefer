'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'users',
      'resetPasswordToken',
      Sequelize.STRING
    );
    await queryInterface.addColumn(
      'users',
      'resetPasswordExpires',
      Sequelize.DATE
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'resetPasswordToken');
    await queryInterface.removeColumn('users', 'resetPasswordExpires');
  },
};
