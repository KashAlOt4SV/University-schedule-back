import { body } from 'express-validator';

export const loginValidation = [
  body('email', 'Неверный формат почты1').isEmail(),
  body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5 }),
];

export const switchPasswordValidation = [
  body('newPassword', 'Пароль должен быть минимум 5 символов').isLength({ min: 5 }),
];

export const registerValidation = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5 }),
  body('fullName', 'Укажите имя и фамилию').isLength({ min: 3 }),
  body('avatarUrl', 'Неверная ссылка на аватарку').optional().isString(),
  body('interests', 'Длина инетерсов должен быть минимум 10 символов').isLength({ min: 10 }),
];

export const postCreateValidation = [
  body('title', 'Введите заголовок статьи').isLength({ min: 3 }).isString(),
  body('text', 'Введите текст статьи').isLength({ min: 3 }).isString(),
  body('tags', 'Неверный формат тэгов').optional().isString(),
  body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
];
