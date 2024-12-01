import Group from '../models/Group.js';

// Получение всех групп
export const getGroups = async (req, res) => {
  try {
    const groups = await Group.findAll();
    res.json(groups);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка на сервере', error: err.message });
  }
};

// Добавление новой группы
export const createGroup = async (req, res) => {
  const { name, students } = req.body;

  try {
    const group = await Group.create({ name, students });
    res.status(201).json(group);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка на сервере', error: err.message });
  }
};
