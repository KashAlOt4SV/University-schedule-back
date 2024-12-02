import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js'; // Импорт модели соединения с БД
import Discipline from './Discipline.js';

// Модель преподавателя для таблицы преподавателей
const Teacher = sequelize.define('Teacher', {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'User', // Название таблицы пользователей
      key: 'id',
    },
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false, // Обязательное поле
  },
  // Можно добавить дополнительные поля для описания преподавателя
  Disciplines: {
    type: DataTypes.STRING,
    references: {
      model: 'Discipline', // Название таблицы групп
      key: 'name',
    },
    allowNull: true,
  },
});

export default Teacher;
