export default {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.addColumn('Users', 'fio', {
        type: Sequelize.STRING,
        allowNull: false,
      });
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.removeColumn('Users', 'fio');
    },
  };