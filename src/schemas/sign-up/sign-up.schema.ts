import * as z from 'zod';

export const SignUpSchema = z
  .object({
    name: z
      .string('')
      .trim()
      .min(1, 'Name is required')
      .min(8, 'Name must be at least 8 characters long')
      .regex(/^[a-zA-Zა-ჰ\s]+$/, 'Name can only contain letters'),
    // role: z.enum(['customer', 'driver'], {
    //   error: 'Role is required',
    // }),
    phone: z
      .string()
      .trim()
      .min(1, 'Phone number is required')
      .regex(/^(\+995)?5\d{8}$/, 'Please enter a valid Georgian phone number'),
    email: z.email({ pattern: z.regexes.html5Email }),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .regex(/[A-Z]/, 'Must include an uppercase letter')
      .regex(/[0-9]/, 'Must include a number'),

    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
