import express from 'express';
import { getGroups, createGroup } from '../controllers/GroupController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Роуты для работы с группами
router.get('/', authMiddleware, getGroups); // Просмотр групп
router.post('/', authMiddleware, createGroup); // Создание группы

export default router;
