import express from 'express';
import { getStudents, createStudent, updateStudent, deleteStudent } from '../controllers/StudentController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Роуты для работы со студентами
router.get('/', authMiddleware, getStudents); // Просмотр студентов
router.post('/', authMiddleware, createStudent); // Добавление студента
router.put('/:id', authMiddleware, updateStudent); // Обновление данных студента
router.delete('/:id', authMiddleware, deleteStudent); // Удаление студента

export default router;
