import Group from '../models/Group.js';
import Student from '../models/Student.js';

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

// Добавление новой группы
export const createGroup = async (req, res) => {
  const { groupName } = req.body;

  try {
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

// Добавление студента в группу
export const addStudentToGroup = async (req, res) => {
  const { groupId, studentId } = req.params;
  console.log(`Group ID: ${groupId}, Student ID: ${studentId}`); // Логируем данные для отладки

  try {
    const group = await Group.findByPk(groupId);
    const student = await Student.findByPk(studentId);

    if (!group || !student) {
      return res.status(404).json({ message: 'Группа или студент не найдены' });
    }

    // Добавляем студента в группу
    await group.addStudent(student);
    res.json({ message: 'Студент добавлен в группу' });
  } catch (error) {
    console.error('Error adding student to group:', error);  // Логируем ошибку
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

    // Удаляем студента из группы
    await group.removeStudent(student);
    res.json({ message: 'Студент удален из группы' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при удалении студента из группы', error });
  }
};
