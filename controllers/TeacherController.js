// controllers/TeacherController.js
import { Teacher, Discipline } from '../models/index.js';  // Импортируем модели из index.js
import sequelize from "../config/db.js";  // Подключаем sequelize для транзакций

// Получение всех преподавателей
export const getTeachers = async (req, res) => {
  try {
    // Получаем всех преподавателей
    const teachers = await Teacher.findAll();

    // Обрабатываем дисциплины для каждого преподавателя
    const teachersWithValidDisciplines = teachers.map(teacher => {
      let disciplines = [];

      if (teacher.Disciplines) {
        // Заменяем двойные кавычки и другие ненужные символы
        // Сначала удаляем лишние двойные кавычки
        const fixedDisciplines = teacher.Disciplines.replace(/""/g, '"');

        // Убираем внешний набор фигурных скобок и разделяем на элементы
        const cleanedDisciplines = fixedDisciplines
          .replace(/^{|}$/g, '')  // Убираем внешние фигурные скобки
          .split(',')  // Разделяем элементы по запятой
          .map(item => item.replace(/"/g, '').trim()); // Убираем лишние кавычки и пробелы

        // Преобразуем элементы в массив чисел
        disciplines = cleanedDisciplines.map(Number);
      }

      return {
        ...teacher.toJSON(),  // Преобразуем объект Sequelize в обычный JSON
        Disciplines: disciplines
      };
    });

    // Отправляем ответ с данными
    res.json(teachersWithValidDisciplines);
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

    // Преобразуем дисциплины в массив ID, если они были переданы
    let disciplineIds = [];

    // Проверка, если дисциплины были переданы как строка, представляющая массив
    if (disciplines) {
      // Если disciplines — строка, пытаемся парсить как JSON
      if (typeof disciplines === 'string') {
        try {
          disciplineIds = JSON.parse(disciplines); // Преобразуем строку в массив ID
        } catch (e) {
          return res.status(400).json({ message: "Ошибка при парсинге дисциплин", error: e.message });
        }
      } else if (Array.isArray(disciplines)) {
        // Если disciplines уже массив, просто используем его
        disciplineIds = disciplines;
      }
    }

    // Проверяем, что дисциплины — это валидный массив с числами
    disciplineIds = disciplineIds.filter(id => !isNaN(id));

    if (disciplineIds.length > 0) {
      // Получаем дисциплины из БД
      const disciplinesFromDb = await Discipline.findAll({
        where: { id: disciplineIds },
        transaction: t,
      });

      console.log(disciplineIds, disciplinesFromDb);

      // Присваиваем обновленные дисциплины преподавателю
      teacher.Disciplines = disciplinesFromDb.map(d => d.id);  // Сохраняем ID дисциплин
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
