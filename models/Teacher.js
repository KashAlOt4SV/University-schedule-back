// models/Teacher.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';  // Импортируем соединение с БД

const Teacher = sequelize.define('Teacher', {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id',
    },
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  FIO: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  specialties: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Disciplines: {
    type: DataTypes.JSONB,  // Поле будет хранить массив дисциплин в формате JSON
    allowNull: true,
  },
});

export default Teacher;
