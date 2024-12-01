import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js'; // Импорт модели соединения с БД

// Модель студента для таблицы студентов
const Student = sequelize.define('Student', {
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
  group: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Дополнительные поля, которые могут быть нужны
  // Например, можно добавить поле даты рождения
  birthDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

export default Student;
