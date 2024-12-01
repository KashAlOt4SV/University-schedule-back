import express from 'express';
import { getDisciplines, createDiscipline, updateDiscipline, deleteDiscipline } from '../controllers/DisciplinesController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Роуты для работы с дисциплинами
router.get('/', authMiddleware, getDisciplines); // Просмотр дисциплин
router.post('/', authMiddleware, createDiscipline); // Создание дисциплины
router.put('/:id', authMiddleware, updateDiscipline); // Обновление дисциплины
router.delete('/:id', authMiddleware, deleteDiscipline); // Удаление дисциплины

export default router;
