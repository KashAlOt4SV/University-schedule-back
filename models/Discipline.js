import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js'; // Подключение к БД
import Teacher from './Teacher.js';

// Определение модели Discipline
const Discipline = sequelize.define('Discipline', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  classTypes: {
    type: DataTypes.JSONB, // Массив или JSON для типов занятий
    allowNull: false,
  },
});

export default Discipline;
