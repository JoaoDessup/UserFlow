import express from 'express';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import userRoutes from './routes/userRoutes.js';
import { createUserTable } from './controllers/userController.js';

dotenv.config();
const app = express();
app.use(express.json());

// Rate limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Muitas requisições, tente novamente mais tarde.'
});
app.use(limiter);

// Criar tabela
createUserTable();

// Rotas
app.use('/user', userRoutes);

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
