import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/db.js';
import authRoutes from './routes/auth.js';
import scheduleRoutes from './routes/schedule.js';

dotenv.config(); // Загружаем переменные окружения

const app = express();

// Мидлвары
app.use(cors());
app.use(express.json());

// Подключаем маршруты
app.use('/api/auth', authRoutes);
app.use('/api/schedule', scheduleRoutes);


// Запуск сервера и подключение к базе данных
const PORT = process.env.PORT || 5000;

sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Сервер запущен на порту ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Ошибка подключения к базе данных:', err);
  });
