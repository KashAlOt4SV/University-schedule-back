import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js'; // Импорт модели соединения с БД

// Модель студента для таблицы студентов
const Student = sequelize.define('Student', {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users', // Название таблицы пользователей
      key: 'id',
    },
    allowNull: false,
  },
  // Дополнительные поля, которые могут быть нужны
  // Например, можно добавить поле даты рождения
  birthDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
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
