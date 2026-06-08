import * as z from 'zod';
export const CreateOrderSchema = z.object({
  full_name: z.string().min(1, { error: 'Required Field!' }),
  phone: z
    .string()
    .trim()
    .min(1, 'Required Field!')
    .regex(/^(\+995)?5\d{8}$/, 'Please enter a valid Georgian phone number'),
  address: z.string().min(1, 'Required Field!'),
  city: z.string().min(1, 'Required Field!'),
  status: z.string().min(1, 'Required Field!'),
  notes: z.string().min(1, 'Required Field!'),
  total_price: z.string().min(1, 'Required Field!'),
});
