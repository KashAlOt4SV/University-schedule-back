// Импорт необходимых модулей
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js'; // Предполагается, что вы настроили Sequelize в этом файле

// Определение модели Audience
const Audience = sequelize.define('Audience', {
  id: {
    type: DataTypes.INTEGER,      // Тип данных - число
    autoIncrement: true,          // Автоинкремент
    primaryKey: true              // Первичный ключ
  },
  number_of_audiences: {
    type: DataTypes.STRING,       // Тип данных - строка
    allowNull: false,             // Обязательно для заполнения
    validate: {
      len: [4, 6],                // Длина строки от 4 до 6 символов (например, "1101", "14020")
      is: /^\d+$/                 // Регулярное выражение для проверки: только цифры
    }
  }
}, {
  tableName: 'Audiences',         // Название таблицы в базе данных
  timestamps: false               // Отключение полей createdAt и updatedAt
});

export default Audience;
