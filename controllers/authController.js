import bcrypt from 'bcryptjs'; // Для шифрования паролей
import jwt from 'jsonwebtoken'; // Для работы с JWT
import User from '../models/user.js'; // Импорт модели пользователя

// Регистрация нового пользователя
export const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Проверяем, существует ли пользователь
    let user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
    }

    // Хешируем пароль перед сохранением в базу данных
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создаем нового пользователя
    user = await User.create({
      name,
      email,
      password: hashedPassword, // Сохраняем хешированный пароль
      role,
    });

    res.status(201).json({ message: 'Пользователь успешно зарегистрирован' });
  } catch (err) {
    res.status(500).json({ message: 'Ошибка на сервере', error: err.message });
  }
};

// Авторизация пользователя
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Ищем пользователя по email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Неверные учетные данные' });
    }

    // Сравниваем введенный пароль с хешированным
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Неверные учетные данные52' });
    }

    // Генерация JWT токена
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Возвращаем токен и информацию о пользователе
    res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: 'Ошибка на сервере', error: err.message });
  }
};
