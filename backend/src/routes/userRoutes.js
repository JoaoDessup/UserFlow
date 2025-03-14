import express from 'express';
import { body } from 'express-validator';
import {
  addUser,
  updateUser,
  deleteUser,
  loginUser,
  verifyToken,
  getProtectedRoute
} from '../controllers/userController.js';

const router = express.Router();

// Validações
const userValidation = [
  body('name').notEmpty().withMessage('Nome é obrigatório'),
  body('lastName').notEmpty().withMessage('Sobrenome é obrigatório'),
  body('email').isEmail().withMessage('Email inválido'),
  body('password').isLength({ min: 6 }).withMessage('Senha precisa ter pelo menos 6 caracteres')
];

const loginValidation = [
  body('email').isEmail().withMessage('Email inválido'),
  body('password').notEmpty().withMessage('Senha obrigatória')
];

// Rotas
router.post('/add', userValidation, addUser);
router.put('/edit', userValidation, updateUser);
router.delete('/delete', deleteUser);
router.post('/login', loginValidation, loginUser);
router.get('/protected', verifyToken, getProtectedRoute);

export default router;
