// models/Schedule.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Group from './Group.js';
import Teacher from './Teacher.js';
import Discipline from './Discipline.js';

const Schedule = sequelize.define('Schedule', {
  dayOfWeek: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  timeSlot: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  groupId: {
    type: DataTypes.INTEGER,
    references: {
      model: Group,
      key: 'id',
    },
  },
  disciplineId: {
    type: DataTypes.INTEGER,
    references: {
      model: Discipline,
      key: 'id',
    },
  },
  teacherId: {
    type: DataTypes.INTEGER,
    references: {
      model: Teacher,
      key: 'id',
    },
  },
  teacher: {  // Поле для FIO преподавателя (вычисляется триггером)
    type: DataTypes.STRING,
    allowNull: true,
  },
  groupName: {  // Поле для имени группы (вычисляется триггером)
    type: DataTypes.STRING,
    allowNull: true,
  },
  discipline: {  // Поле для названия дисциплины (вычисляется триггером)
    type: DataTypes.STRING,
    allowNull: true,
  },
  classType: {  // Тип занятия
    type: DataTypes.STRING,
    allowNull: true,
  },
});

// Устанавливаем ассоциации
Schedule.belongsTo(Group, { foreignKey: 'groupId' });
Schedule.belongsTo(Teacher, { foreignKey: 'teacherId' });
Schedule.belongsTo(Discipline, { foreignKey: 'disciplineId' });

export default Schedule;
