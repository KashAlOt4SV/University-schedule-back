import express from 'express';
import { getSchedule, createSchedule, updateSchedule, deleteSchedule, getAudiences } from '../controllers/scheduleController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Роуты для работы с расписанием
router.get('/', authMiddleware, getSchedule); // Просмотр расписания
router.get('/audience', authMiddleware, getAudiences)
router.post('/', authMiddleware, createSchedule); // Создание записи расписания
router.put('/:id', authMiddleware, updateSchedule); // Обновление записи расписания
router.delete('/:id', authMiddleware, deleteSchedule); // Удаление записи расписания


export default router;
