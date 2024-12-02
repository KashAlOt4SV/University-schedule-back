// models/Group.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Student from './Student.js'; // Импорт модели студента

const Group = sequelize.define('Group', {  // Мы сразу создаем модель через sequelize.define
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  groupName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

Group.belongsToMany(Student, { through: 'GroupStudent' });
Student.belongsToMany(Group, { through: 'GroupStudent' });

export default Group; // Экспортируем модель
