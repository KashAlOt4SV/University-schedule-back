import Group from '../models/Group.js';
import Student from '../models/Student.js';
import { Op } from 'sequelize';

// Получение всех групп
export const getGroups = async (req, res) => {
  try {
    const groups = await Group.findAll({
      include: Student // Включаем студентов в ответ
    });
    res.json(groups);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении групп', error });
  }
};

// Добавление новой группы с проверкой уникальности
export const createGroup = async (req, res) => {
  const { groupName } = req.body;

  try {
    // Проверяем, существует ли группа с таким названием
    const existingGroup = await Group.findOne({ where: { groupName } });

    if (existingGroup) {
      return res.status(400).json({ message: `Группа с названием "${groupName}" уже существует.` });
    }

    const newGroup = await Group.create({ groupName });
    res.status(201).json(newGroup);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при добавлении группы', error });
  }
};

// Получение студентов для группы
export const getStudentsForGroup = async (req, res) => {
  const { groupId } = req.params;

  try {
    const group = await Group.findByPk(groupId, {
      include: Student,  // Включаем студентов для этой группы
    });
    if (!group) {
      return res.status(404).json({ message: 'Группа не найдена' });
    }
    res.json(group.Students); // Возвращаем список студентов группы
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении студентов для группы', error });
  }
};

// Добавление студента в группу с двумя проверками
export const addStudentToGroup = async (req, res) => {
  const { groupId, studentId } = req.params;

  try {
    const group = await Group.findByPk(groupId);
    const student = await Student.findByPk(studentId);

    if (!group || !student) {
      return res.status(404).json({ message: 'Группа или студент не найдены' });
    }

    // Проверка, если студент уже прикреплен к группе
    if (student.group === groupId) {
      return res.status(400).json({ message: 'Студент уже прикреплен к этой группе' });
    }

    // Проверка, если студент прикреплен к другой группе
    if (student.group !== null) {
      return res.status(400).json({ message: 'Студент уже прикреплен к другой группе' });
    }

    // Добавляем студента в группу
    await group.addStudent(student);

    // Обновляем информацию о группе студента
    student.group = groupId;
    await student.save();

    res.json({ message: 'Студент добавлен в группу' });
  } catch (error) {
    console.error('Ошибка при добавлении студента в группу:', error);
    res.status(500).json({ message: 'Ошибка при добавлении студента в группу', error });
  }
};

// Удаление студента из группы
export const removeStudentFromGroup = async (req, res) => {
  const { groupId, studentId } = req.params;

  try {
    const group = await Group.findByPk(groupId);
    const student = await Student.findByPk(studentId);

    if (!group || !student) {
      return res.status(404).json({ message: 'Группа или студент не найдены' });
    }

    await group.removeStudent(student);  // Удаляем студента из группы
    res.json({ message: 'Студент удален из группы' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при удалении студента из группы', error });
  }
};

// Удаление группы
export const removeGroup = async (req, res) => {
  const { groupId } = req.params;

  try {
    const group = await Group.findByPk(groupId);

    if (!group) {
      return res.status(404).json({ message: 'Группа не найдена' });
    }

    await group.destroy(); // Удаляем группу
    res.json({ message: 'Группа удалена' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при удалении группы', error });
  }
};

// Редактирование группы с проверкой уникальности
export const editGroup = async (req, res) => {
  const { groupId } = req.params;
  const { groupName } = req.body;

  try {
    const group = await Group.findByPk(groupId);

    if (!group) {
      return res.status(404).json({ message: 'Группа не найдена' });
    }

    // Проверяем, существует ли группа с таким же названием (кроме текущей)
    const existingGroup = await Group.findOne({
      where: { groupName, id: { [Op.ne]: groupId } }  // Исключаем текущую группу
    });

    if (existingGroup) {
      return res.status(400).json({ message: `Группа с названием "${groupName}" уже существует.` });
    }

    group.groupName = groupName;  // Обновляем название группы
    await group.save();
    res.json(group);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при редактировании группы', error });
  }
};
