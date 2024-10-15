import express from 'express';
import { createSchedule, getSchedules, updateSchedule, deleteSchedule } from '../controllers/scheduleController.js';

const router = express.Router();

// Маршруты для работы с расписанием
router.post('/create', createSchedule);
router.get('/', getSchedules);
router.put('/:id', updateSchedule);
router.delete('/:id', deleteSchedule);

export default router;
