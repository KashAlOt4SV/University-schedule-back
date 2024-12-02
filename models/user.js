// models/User.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';  // Подключение к БД
import Teacher from './Teacher.js';

const User = sequelize.define('User', {
  fio: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

// Связь с таблицей Teacher
User.hasOne(Teacher, { foreignKey: 'userId' });
Teacher.belongsTo(User, { foreignKey: 'userId' });


// Связь с таблицей ролей
User.hasOne(User, { as: 'Student', foreignKey: 'userId' });
// Здесь можно добавить для других ролей, если нужно.

export default User;