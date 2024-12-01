import Schedule from '../models/Schedule.js';

// Получение расписания
export const getSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findAll();
    res.json(schedule);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка на сервере', error: err.message });
  }
};

// Добавление нового расписания
export const createSchedule = async (req, res) => {
  const { day, time, groupId, disciplineId, teacherId, classType } = req.body;
  try {
    const schedule = await Schedule.create({ day, time, groupId, disciplineId, teacherId, classType });
    res.status(201).json(schedule);
  } catch (err) {
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
