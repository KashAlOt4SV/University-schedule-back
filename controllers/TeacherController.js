// controllers/TeacherController.js
import { Teacher, Discipline } from '../models/index.js';  // Импортируем модели из index.js
import sequelize from "../config/db.js";  // Подключаем sequelize для транзакций

// Получение всех преподавателей
export const getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.findAll();  // Получаем всех преподавателей
    res.json(teachers);  // Отправляем ответ с данными
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при получении преподавателей', error: err.message });
  }
};

// Обновление данных преподавателя
export const updateTeacher = async (req, res) => {
  const { id } = req.params; // Получаем ID преподавателя
  const { fio, disciplines } = req.body; // Получаем данные для обновления

  const t = await sequelize.transaction(); // Используем транзакцию для целостности данных

  try {
    // Находим преподавателя по ID
    const teacher = await Teacher.findByPk(id, { transaction: t });

    if (!teacher) {
      return res.status(404).json({ message: 'Преподаватель не найден' });
    }

    // Обновляем ФИО
    teacher.FIO = fio || teacher.FIO;

    // Обновляем дисциплины как строку
    if (disciplines) {
      teacher.Disciplines = disciplines;  // Сохраняем строку дисциплин
    }

    // Сохраняем изменения в БД
    await teacher.save({ transaction: t });

    // Подтверждаем транзакцию
    await t.commit();

    res.json(teacher); // Возвращаем обновленного преподавателя
  } catch (error) {
    // Если произошла ошибка, откатываем транзакцию
    await t.rollback();
    console.error('Error updating teacher:', error);
    res.status(500).json({ message: 'Ошибка при обновлении преподавателя', error });
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
