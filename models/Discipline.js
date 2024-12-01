import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js'; // Импорт модели соединения с БД

// Модель дисциплины для таблицы дисциплин
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
  // Пример связи с типом занятия (периодически дисциплина будет иметь несколько видов занятий)
  classTypes: {
    type: DataTypes.JSONB, // Массив или JSON для типов занятий
    allowNull: false,
  },
});

export default Discipline;
