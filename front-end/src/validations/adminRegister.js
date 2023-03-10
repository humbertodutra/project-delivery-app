import { z } from 'zod';

const DOZE = 12;
const SEIS = 6;

const registerSchema = z.object({
  name: z.string({
    required_error: 'Nome obrigatório' }).min(DOZE, {
    message: 'Nome muito curto',
  }),
  email: z.string().email({
    message: 'Email inválido',
  }),
  password: z.string({
    required_error: 'Senha obrigatória',
  }).min(SEIS, {
    message: 'Senha pequena',
  }),
  role: z.string({
    required_error: 'Função obrigatória',
  }),
});

export default registerSchema;
