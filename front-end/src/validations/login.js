import { z } from 'zod';

const loginMin = 6;

const loginSchema = z.object({
  email: z.string({
    required_error: 'Email obrigatório',
  }).email({
    message: 'Email inválido',
  }),
  password: z.string({
    required_error: 'Senha obrigatória',
  }).min(loginMin, {
    message: 'Senha pequena',
  }),
});

export default loginSchema;
