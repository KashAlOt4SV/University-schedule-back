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
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,  // Поле email обязательно
  },
  FIO: {
    type: DataTypes.STRING,
    allowNull: false,  // Поле FIO обязательно
  },
  specialties: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Disciplines: {
    type: DataTypes.JSONB,  // Здесь мы храним данные как JSONB (массив дисциплин)
    allowNull: true,  // Можно оставить пустым
  },
});

export default Teacher;
