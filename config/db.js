// Импорт Sequelize для работы с базой данных
import { Sequelize } from 'sequelize';

// Подключение к базе данных PostgreSQL через Sequelize
const sequelize = new Sequelize('schedule_db', 'postgres', '17200407ashot', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});

export default sequelize;
