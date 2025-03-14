import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().nonempty('Nome obrigatório'),
  lastName: z.string().nonempty('Sobrenome obrigatório'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres')
});
