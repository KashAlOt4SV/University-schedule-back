import express from 'express';
import { register, login } from '../controllers/authController.js';

const router = express.Router();

// Маршруты для регистрации и логина
router.post('/register', register);
router.post('/login', login);

export default router;
