import Discipline from '../models/Discipline.js';

// Получение списка дисциплин
export const getDisciplines = async (req, res) => {
  try {
    const disciplines = await Discipline.findAll();
    res.json(disciplines);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка на сервере', error: err.message });
  }
};

// Добавление новой дисциплины
export const createDiscipline = async (req, res) => {
  const { name, classTypes, description } = req.body;
  try {
    const discipline = await Discipline.create({ name, classTypes, description });
    res.status(201).json(discipline);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка на сервере', error: err.message });
  }
};

// Обновление дисциплины
export const updateDiscipline = async (req, res) => {
  const { id } = req.params;
  const { name, classTypes, description } = req.body;

  try {
    const discipline = await Discipline.findByPk(id);
    if (!discipline) {
      return res.status(404).json({ message: 'Дисциплина не найдена' });
    }

    // Обновляем поля
    discipline.name = name;
    discipline.classTypes = classTypes;  // Сохраняем обновленные типы
    discipline.description = description; // Описание

    await discipline.save();
    res.json(discipline);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка на сервере', error: err.message });
  }
};

// Удаление дисциплины
export const deleteDiscipline = async (req, res) => {
  const { id } = req.params;

  try {
    const discipline = await Discipline.findByPk(id);
    if (!discipline) {
      return res.status(404).json({ message: 'Дисциплина не найдена' });
    }
    await discipline.destroy();
    res.json({ message: 'Дисциплина удалена' });
  } catch (err) {
    res.status(500).json({ message: 'Ошибка на сервере', error: err.message });
  }
};
