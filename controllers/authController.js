import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const password = '17200407ashot';
const hashedPassword = '$2a$10$D8EogH2VnI1X4Xx7BfVpUOiHc9dM6V5brPy9mSfz1t3IzVjeoiT2q'; // Хеш из базы данных

// Регистрация нового пользователя
export const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    let user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, password: hashedPassword, role });

    res.status(201).json({ message: 'Пользователь успешно зарегистрирован' });
  } catch (err) {
    console.log()
    res.status(500).json({ message: 'Ошибка на сервере', error: err.message, requst: req.body });
  }
};

// Авторизация пользователя
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Неверные учетные данные' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Неверные учетные данные' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, user: { id: user.id, name: user.name, role: user.role }});
  } catch (err) {
    res.status(500).json({ message: 'Ошибка на сервере', error: err.message });
  }
};

export const authMe = async (req, res) => {
  try {
    // Получаем токен из заголовков авторизации
    const token = req.headers.authorization?.split(' ')[1]; // Формат 'Bearer <token>'
    if (!token) {
      return res.status(401).json({ message: 'Необходимо авторизоваться' });
    }

    // Проверка токена
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // secret должен быть в .env

    // Получаем пользователя по ID из токена
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    // Возвращаем информацию о пользователе (например, имя и роль)
    res.json({
      id: user.id,
      fio: user.fio,
      role: user.role, // Возвращаем роль пользователя
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

