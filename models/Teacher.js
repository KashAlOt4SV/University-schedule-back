import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js'; // Импорт модели соединения с БД

// Модель преподавателя для таблицы преподавателей
const Teacher = sequelize.define('Teacher', {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users', // Название таблицы пользователей
      key: 'id',
    },
    allowNull: false,
  },
  // Можно добавить дополнительные поля для описания преподавателя
  department: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  specialties: {
    type: DataTypes.JSONB, // Массив дисциплин, которые может вести преподаватель
    allowNull: true,
  },
});

Teacher.beforeCreate(async (admin) => {
  if (admin.password) {
    admin.password = await bcrypt.hash(admin.password, 10);
  }
});

Teacher.beforeUpdate(async (admin) => {
  if (admin.password) {
    admin.password = await bcrypt.hash(admin.password, 10);
  }
});

export default Teacher;
