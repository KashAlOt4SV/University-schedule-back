import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js'; // Импорт модели соединения с БД

// Модель типа занятия для таблицы типов занятий
const ClassType = sequelize.define('ClassType', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  type: {
    type: DataTypes.ENUM('lecture', 'practical', 'lab'),
    allowNull: false,
  },
  // Дополнительное описание типа занятия, если нужно
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export default ClassType;
