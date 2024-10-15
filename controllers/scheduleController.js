import Schedule from '../models/schedule.js';

// Создание нового расписания
export const createSchedule = async (req, res) => {
  const { groupName, subject, teacher, dayOfWeek, timeSlot } = req.body;

  try {
    const schedule = await Schedule.create({ groupName, subject, teacher, dayOfWeek, timeSlot });
    res.status(201).json(schedule);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка на сервере', error: err.message });
  }
};

// Получение всех расписаний
export const getSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.findAll();
    res.json(schedules);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка на сервере', error: err.message });
  }
};

// Обновление расписания
export const updateSchedule = async (req, res) => {
  const { id } = req.params;
  const { groupName, subject, teacher, dayOfWeek, timeSlot } = req.body;

  try {
    const schedule = await Schedule.findByPk(id);
    if (!schedule) {
      return res.status(404).json({ message: 'Расписание не найдено' });
    }

    schedule.groupName = groupName;
    schedule.subject = subject;
    schedule.teacher = teacher;
    schedule.dayOfWeek = dayOfWeek;
    schedule.timeSlot = timeSlot;
    await schedule.save();

    res.json(schedule);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка на сервере', error: err.message });
  }
};

// Удаление расписания
export const deleteSchedule = async (req, res) => {
  const { id } = req.params;

  try {
    const schedule = await Schedule.findByPk(id);
    if (!schedule) {
      return res.status(404).json({ message: 'Расписание не найдено' });
    }

    await schedule.destroy();
    res.json({ message: 'Расписание удалено' });
  } catch (err) {
    res.status(500).json({ message: 'Ошибка на сервере', error: err.message });
  }
};
