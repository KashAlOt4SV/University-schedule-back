import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js'; // Импорт модели соединения с БД

// Модель преподавателя для таблицы преподавателей
const Teacher = sequelize.define('Teacher', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  // Можно добавить дополнительные поля для описания преподавателя
  department: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  specialties: {
    type: DataTypes.JSONB, // Массив дисциплин, которые может вести преподаватель
    allowNull: true,
  },
});

export default Teacher;
