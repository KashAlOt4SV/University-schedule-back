import { Sequelize, DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
import sequelize from '../config/db.js'; // Ваши настройки подключения к базе данных

// Модель для пользователей
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,  // Тип данных для ID
    allowNull: false,         // ID не может быть null
    primaryKey: true,         // Этот столбец будет являться ключом
    autoIncrement: true,      // Устанавливаем автоинкремент
  },
  fio: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email:{
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Хэширование пароля перед сохранением
User.beforeCreate(async (user) => {
  if (user.password) {
    user.password = await bcrypt.hash(user.password, 10); // Хэшируем пароль перед сохранением
  }
});

User.beforeUpdate(async (user) => {
  if (user.password) {
    user.password = await bcrypt.hash(user.password, 10); // Хэшируем пароль при обновлении
  }
});

// Связь с таблицей ролей
User.hasOne(User, { as: 'Student', foreignKey: 'userId' });
User.hasOne(User, { as: 'Teacher', foreignKey: 'userId' });
// Здесь можно добавить для других ролей, если нужно.

export default User;