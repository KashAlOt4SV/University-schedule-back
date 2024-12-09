// Импорт Sequelize для работы с базой данных
import { Sequelize } from 'sequelize';

// Подключение к базе данных PostgreSQL через Sequelize
const sequelize = new Sequelize('schedule_db', 'postgres', '17200407ashot', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});

export const resetTables = async () => {
  try {
    console.log('Удаляем существующие таблицы...');
    await sequelize.drop(); // Удаление всех таблиц
    console.log('Старые таблицы удалены.');

    console.log('Создаем таблицы заново...');
    await sequelize.sync({ force: true }); // Синхронизация с пересозданием
    console.log('Все таблицы пересозданы!');
  } catch (error) {
    console.error('Ошибка при пересоздании таблиц:', error);
    throw error;
  }
};

export default sequelize;
