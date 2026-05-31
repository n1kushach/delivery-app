import * as z from 'zod';
export const LoginSchema = z.object({
  email: z.email({ pattern: z.regexes.html5Email }),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .regex(/[A-Z]/, 'Must include an uppercase letter')
    .regex(/[0-9]/, 'Must include a number'),
});
