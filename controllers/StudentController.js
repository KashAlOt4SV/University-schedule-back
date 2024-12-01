import Student from '../models/Student.js';

// Получение всех студентов
export const getStudents = async (req, res) => {
  try {
    const students = await Student.findAll();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка на сервере', error: err.message });
  }
};

// Добавление нового студента
export const createStudent = async (req, res) => {
  const { firstName, lastName, email, group, birthDate } = req.body;

  try {
    const student = await Student.create({ firstName, lastName, email, group, birthDate });
    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка на сервере', error: err.message });
  }
};

// Обновление студента
export const updateStudent = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, group, birthDate } = req.body;

  try {
    const student = await Student.findByPk(id);
    if (!student) {
      return res.status(404).json({ message: 'Студент не найден' });
    }
    student.firstName = firstName;
    student.lastName = lastName;
    student.email = email;
    student.group = group;
    student.birthDate = birthDate;

    await student.save();
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка на сервере', error: err.message });
  }
};

// Удаление студента
export const deleteStudent = async (req, res) => {
  const { id } = req.params;

  try {
    const student = await Student.findByPk(id);
    if (!student) {
      return res.status(404).json({ message: 'Студент не найден' });
    }
    await student.destroy();
    res.json({ message: 'Студент удален' });
  } catch (err) {
    res.status(500).json({ message: 'Ошибка на сервере', error: err.message });
  }
};
