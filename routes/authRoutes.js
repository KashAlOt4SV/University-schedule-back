import express from 'express';
import { login } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { createUser, getMe } from '../controllers/userController.js'; // Импортируем контроллеры

const router = express.Router();

// Авторизация пользователя
router.post('/login', login);

// Создание пользователя
router.post('/createUsers' , createUser);

// Получение информации о пользователе
router.get('/me', authMiddleware, getMe);

export default router;
