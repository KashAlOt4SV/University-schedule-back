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

export const updateTeacher = async (req, res) => {
  const { id } = req.params; // Получаем ID преподавателя
  const { fio, disciplines } = req.body; // Получаем данные для обновления

  const t = await sequelize.transaction(); // Используем транзакцию для целостности данных

  try {
    // Находим преподавателя по ID
    const teacher = await Teacher.findByPk(id, {
      include: [Discipline]  // Загружаем дисциплины с преподавателем
    });

    if (!teacher) {
      return res.status(404).json({ message: 'Преподаватель не найден' });
    }

    // Обновляем ФИО
    teacher.FIO = fio || teacher.FIO;

    // Если дисциплины переданы, обновляем их
    if (disciplines && Array.isArray(disciplines)) {
      // Получаем дисциплины по их названию
      const disciplineInstances = await Discipline.findAll({
        where: {
          name: {
            [Sequelize.Op.in]: disciplines  // Находим дисциплины по их названию
          },
        },
        transaction: t  // Указываем транзакцию
      });

      // Если не все дисциплины существуют, возвращаем ошибку
      if (disciplineInstances.length !== disciplines.length) {
        return res.status(400).json({ message: 'Одна или несколько дисциплин не найдены' });
      }

      // Удаляем старые дисциплины и добавляем новые через таблицу связи
      await teacher.setDisciplines([], { transaction: t });
      await teacher.addDisciplines(disciplineInstances, { transaction: t });
    }

    // Сохраняем изменения
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
