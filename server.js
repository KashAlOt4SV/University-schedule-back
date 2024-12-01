import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import auth from './routes/authRoutes.js';
import disciplinesRoutes from './routes/disciplinesRoutes.js';
import schedule from './routes/scheduleRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import groupRoutes from './routes/groupRoutes.js';
import teacherRoutes from './routes/teacherRoutes.js';
import sequelize from './config/db.js';

dotenv.config(); // Загружаем переменные окружения

const app = express();

// Мидлвары
app.use(cors());
app.use(express.json());

// Подключаем маршруты
app.use('/api/auth', auth);
app.use('/api/disciplines', disciplinesRoutes);
app.use('/api/schedule', schedule);
app.use('/api/students', studentRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/teachers', teacherRoutes);


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
