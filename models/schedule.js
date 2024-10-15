import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js'; // Импорт соединения с БД

// Модель расписания
const Schedule = sequelize.define('Schedule', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  groupName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  teacher: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dayOfWeek: {
    type: DataTypes.ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
    allowNull: false,
  },
  timeSlot: {
    type: DataTypes.STRING,
    allowNull: false,  // Время проведения пары (например, 10:00 - 11:30)
  },
});

export default Schedule;
