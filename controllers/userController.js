import { User, Student, Teacher } from '../models/index.js'; // Импортируем все модели
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import sequelize from "../config/db.js"; // Подключение к БД

export const createUser = async (req, res) => {
  const { fio, email, password, role, group, specialties } = req.body;

  const t = await sequelize.transaction(); // Начинаем транзакцию

  try {
    // Логируем входные данные для отслеживания ошибок
    console.log('Received data:', { fio, email, password, role, group, specialties });

    // Создаем пользователя
    const newUser = await User.create(
      {
        fio,
        email,
        password,
        role,
      },
      { transaction: t }
    );

    console.log('User created:', newUser);  // Логируем созданного пользователя

    // Проверяем роль и создаем запись в соответствующей таблице
    if (role === 'teacher') {
      // Для преподавателя добавляем данные в таблицу Teacher
      const teacher = await Teacher.create(
        {
          userId: newUser.id,
          specialties,
          email: newUser.email,  // Используем email из созданного пользователя
          FIO: newUser.fio,  // Заполняем FIO из таблицы User
        },
        { transaction: t }
      );
      console.log('Teacher created:', teacher);  // Логируем созданного преподавателя
    } else if (role === 'student') {
      console.log('Creating student with email:', newUser.email); // Логирование для проверки
      await Student.create(
        {
          userId: newUser.id,
          group,
          email: newUser.email,  // Заполняем email из таблицы User
          FIO: newUser.fio, // Заполняем FIO из таблицы User
        },
        { transaction: t }
      );
    }

    // Подтверждаем транзакцию
    await t.commit();

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    // Если произошла ошибка, откатываем транзакцию
    await t.rollback();
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user', error });
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
