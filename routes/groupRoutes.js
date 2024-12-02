import express from 'express';
import { addStudentToGroup, getGroups, createGroup, getStudentsForGroup, removeStudentFromGroup } from '../controllers/groupController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Получение всех групп
router.get('/', getGroups);  // Здесь путь /api/groups

// Добавление студента в группу
router.post('/:groupId/students/:studentId', addStudentToGroup);

// Получение студентов для группы
router.get('/:groupId/students', getStudentsForGroup);

// Удаление студента из группы
router.delete('/:groupId/students/:studentId', removeStudentFromGroup);

// Добавление новой группы
router.post('/', createGroup);

export default router;
