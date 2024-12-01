// controllers/TeacherController.js

import Teacher from '../models/Teacher.js'; // Модель преподавателя

// Получение всех преподавателей
export const getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.findAll(); // Получаем всех преподавателей из базы данных
    res.json(teachers); // Отправляем ответ с данными
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при получении преподавателей', error: err.message });
  }
};

// Создание нового преподавателя
export const createTeacher = async (req, res) => {
  const { name, discipline, group } = req.body; // Данные, которые передаются в теле запроса

  try {
    // Создаем нового преподавателя
    const teacher = await Teacher.create({ name, discipline, group });
    res.status(201).json(teacher); // Возвращаем созданного преподавателя
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при создании преподавателя', error: err.message });
  }
};

// Обновление данных преподавателя
export const updateTeacher = async (req, res) => {
  const { id } = req.params; // Получаем ID преподавателя из параметров запроса
  const { name, discipline, group } = req.body; // Данные, которые передаются в теле запроса

  try {
    const teacher = await Teacher.findByPk(id); // Ищем преподавателя по ID

    if (!teacher) {
      return res.status(404).json({ message: 'Преподаватель не найден' });
    }

    // Обновляем данные преподавателя
    teacher.name = name || teacher.name;
    teacher.discipline = discipline || teacher.discipline;
    teacher.group = group || teacher.group;

    await teacher.save(); // Сохраняем изменения в базе данных
    res.json(teacher); // Возвращаем обновленные данные
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при обновлении преподавателя', error: err.message });
  }
};

// Удаление преподавателя
export const deleteTeacher = async (req, res) => {
  const { id } = req.params; // Получаем ID преподавателя из параметров запроса

  try {
    const teacher = await Teacher.findByPk(id); // Ищем преподавателя по ID

    if (!teacher) {
      return res.status(404).json({ message: 'Преподаватель не найден' });
    }

    await teacher.destroy(); // Удаляем преподавателя из базы данных
    res.json({ message: 'Преподаватель успешно удален' }); // Отправляем успешный ответ
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при удалении преподавателя', error: err.message });
  }
};
