// student.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js'; // Подключение к БД

// Модель для таблицы студентов
const Student = sequelize.define('Student', {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'User', // Название таблицы пользователей
      key: 'id',
    },
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false, // Обязательное поле
  },
  // Здесь можно добавить дополнительные поля для студентов (например, курс)
  group: {
    type: DataTypes.STRING,
    references: {
      model: 'Group', // Название таблицы групп
      key: 'name',
    },
    allowNull: true,
  },
  FIO:{
    type: DataTypes.STRING,
    references: {
      model: 'User', // Название таблицы групп
      key: 'fio',
    },
    allowNull: true,
  }
});

Student.beforeCreate(async (admin) => {
  if (admin.password) {
    admin.password = await bcrypt.hash(admin.password, 10);
  }
});

Student.beforeUpdate(async (admin) => {
  if (admin.password) {
    admin.password = await bcrypt.hash(admin.password, 10);
  }
});

export default Student;
