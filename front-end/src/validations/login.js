import { z } from 'zod';

const loginMin = 6;

const loginSchema = z.object({
  email: z.string({
    required_error: 'Email is required',
  }).email({
    message: 'Email is invalid',
  }),
  password: z.string({
    required_error: 'Password is required',
  }).min(loginMin, {
    message: `Password must be at least ${loginMin} characters`,
  }),
});

export default loginSchema;
