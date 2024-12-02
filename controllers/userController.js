// controllers/userController.js
import { User, Student, Teacher, Schedule, Group, Discipline, ClassType } from '../models/index.js'; // Импортируем все модели из index.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const createUser = async (req, res) => {
  const { fio, role, password, email } = req.body;

  if (!fio || !role || !password) {
    return res.status(400).json({ message: 'Не все поля заполнены' });
  }

  try {
    // Проверяем существование пользователя с таким же ФИО
    const existingUser = await User.findOne({ where: { fio } });
    if (existingUser) {
      return res.status(400).json({ message: 'Пользователь с таким ФИО уже существует' });
    }

    // Создаём пользователя в таблице users
    const user = await User.create({ fio, role, password, email });

    // В зависимости от роли создаем запись в таблице роли
    if (role === 'Student') {
      await Student.create({ UserId: user.id });
    } else if (role === 'Teacher') {
      await Teacher.create({ UserId: user.id });
    }

    res.status(201).json({
      message: 'Пользователь успешно создан',
      user: {
        id: user.id,
        fio: user.fio,
        role,
        email: user.email
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка при создании пользователя' });
  }
};


export const getMe = async (req, res) => {
    try {
      const token = req.headers.authorization?.split(' ')[1]; // Берем токен из заголовков
  
      if (!token) {
        return res.status(401).json({ message: 'Токен не предоставлен' });
      }
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Расшифровываем токен
      const user = await User.findByPk(decoded.id); // Ищем пользователя в базе
  
      if (!user) {
        return res.status(404).json({ message: 'Пользователь не найден' });
      }
  
      // Получаем дополнительную информацию о роли, например, для администратора
      let roleData = null;
     if (user.role === 'Teacher') {
        roleData = await Teacher.findOne({ where: { UserId: user.id } });
      } else if (user.role === 'Student') {
        roleData = await Student.findOne({ where: { UserId: user.id } });
      }
  
      res.json({
        id: user.id,
        fio: user.fio,
        role: user.role,
        roleData, // Добавляем данные о роли
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
};