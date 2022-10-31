import { z } from 'zod';

const DOZE = 12;
const SEIS = 6;

const registerSchema = z.object({
  name: z.string({
    required_error: 'Nome deve conter até 12 caracteres' }).min(SEIS).max(DOZE),
  email: z.string().email({
    message: 'Email inválido',
  }),
  password: z.string({
    required_error: 'Senha obrigatória',
  }).min(SEIS, {
    message: 'Senha pequena',
  }),
});

export default registerSchema;
