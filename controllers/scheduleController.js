import Schedule from '../models/schedule.js';
import Group from '../models/Group.js';
import Teacher from '../models/Teacher.js';
import Discipline from '../models/Discipline.js';
import { Op } from 'sequelize';

// Получение расписания с данными из связанных таблиц
export const getSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findAll({
      include: [
        {
          model: Group, // Включаем группу
          attributes: ['groupName'], // Мы хотим только поле 'name'
        },
        {
          model: Teacher, // Включаем преподавателя
          attributes: ['FIO'], // Мы хотим только поле 'fio'
        },
        {
          model: Discipline, // Включаем дисциплину
          attributes: ['name'], // Мы хотим только поле 'name'
        },
      ],
    });

    // Ответ с полями 'groupName', 'teacher' и 'discipline'
    const formattedSchedule = schedule.map(item => {
      return {
        ...item.toJSON(),
        groupName: item.Group?.name,
        teacher: item.Teacher?.fio,
        discipline: item.Discipline?.name,
      };
    });

    res.json(formattedSchedule);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка на сервере', error: err.message });
  }
};

export const createSchedule = async (req, res) => {
  const { dayOfWeek, timeSlot, groupId, disciplineId, teacherId, classType } = req.body;

  try {
    // Получаем связанные данные для группы, дисциплины и преподавателя
    const group = await Group.findByPk(groupId);
    const discipline = await Discipline.findByPk(disciplineId);
    const teacher = await Teacher.findByPk(teacherId);

    // Логируем найденные данные, чтобы удостовериться в их наличии
    console.log('Group:', group);
    console.log('Discipline:', discipline);
    console.log('Teacher:', teacher);

    if (!group || !discipline || !teacher) {
      return res.status(400).json({
        message: 'Не найдены данные для группы, дисциплины или преподавателя.'
      });
    }

    // Проверяем, занята ли эта ячейка расписания
    const existingSchedule = await Schedule.findOne({
      where: {
        dayOfWeek,
        timeSlot,
        [Op.or]: [
          { groupId },
          { teacherId }
        ],
      },
    });

    if (existingSchedule) {
      return res.status(400).json({ message: 'Эта ячейка расписания уже занята для этой группы или преподавателя.' });
    }

    // Создаем новое расписание
    const schedule = await Schedule.create({
      dayOfWeek,
      timeSlot,
      groupId,
      disciplineId,
      teacherId,
      classType
    });

    res.status(201).json(schedule);
  } catch (err) {
    console.error('Error:', err);  // Логируем ошибку
    res.status(500).json({ message: 'Ошибка на сервере', error: err.message });
  }
};




// Обновление расписания
export const updateSchedule = async (req, res) => {
  const { id } = req.params;
  const { day, time, groupId, disciplineId, teacherId, classType } = req.body;

  try {
    const schedule = await Schedule.findByPk(id);
    if (!schedule) {
      return res.status(404).json({ message: 'Запись расписания не найдена' });
    }
    schedule.day = day;
    schedule.time = time;
    schedule.groupId = groupId;
    schedule.disciplineId = disciplineId;
    schedule.teacherId = teacherId;
    schedule.classType = classType;

    await schedule.save();
    res.json(schedule);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка на сервере', error: err.message });
  }
};

// Удаление записи расписания
export const deleteSchedule = async (req, res) => {
  const { id } = req.params;

  try {
    const schedule = await Schedule.findByPk(id);
    if (!schedule) {
      return res.status(404).json({ message: 'Запись расписания не найдена' });
    }
    await schedule.destroy();
    res.json({ message: 'Запись расписания удалена' });
  } catch (err) {
    res.status(500).json({ message: 'Ошибка на сервере', error: err.message });
  }
};
