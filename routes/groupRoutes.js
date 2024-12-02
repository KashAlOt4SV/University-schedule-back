import express from 'express';
import {
  addStudentToGroup,
  getGroups,
  createGroup,
  getStudentsForGroup,
  removeStudentFromGroup,
  removeGroup,
  editGroup
} from '../controllers/groupController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Маршрут для добавления студента в группу
router.post('/:groupId/students/:studentId', addStudentToGroup, authMiddleware);

// Получение всех групп
router.get('/', getGroups, authMiddleware);

// Получение студентов для группы
router.get('/:groupId/students', getStudentsForGroup, authMiddleware);

// Удаление студента из группы
router.delete('/:groupId/students/:studentId', removeStudentFromGroup, authMiddleware);

// Удаление группы
router.delete('/:groupId', removeGroup, authMiddleware);

// Добавление новой группы
router.post('/', createGroup, authMiddleware);

// Редактирование группы
router.put('/:groupId', editGroup, authMiddleware);

export default router;
