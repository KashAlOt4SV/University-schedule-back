// routes/teacherRoutes.js

import express from 'express';
import { getTeachers, createTeacher, updateTeacher, deleteTeacher } from '../controllers/TeacherController.js';
import { authMiddleware } from '../middleware/authMiddleware.js'; // Миддлвар для аутентификации

const router = express.Router();

// Роуты для работы с преподавателями
router.get('/', authMiddleware, getTeachers); // Получение всех преподавателей
router.post('/', authMiddleware, createTeacher); // Создание нового преподавателя
router.put('/:id', authMiddleware, updateTeacher); // Обновление данных преподавателя
router.delete('/:id', authMiddleware, deleteTeacher); // Удаление преподавателя

export default router;
