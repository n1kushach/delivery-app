import * as z from 'zod';

// schema — no .default(), just plain string
export const CreateOrderSchema = z
  .object({
    full_name: z.string().min(1, 'Required Field!'),
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
    driver: z.string(), // 👈 plain string, no default
    customer: z.string(), // 👈 plain string, no default
  })
  .superRefine((data, ctx) => {
    const hasDriver = !!data.driver;
    const hasCustomer = !!data.customer;

    if (!hasDriver && !hasCustomer) {
      ctx.addIssue({
        path: ['driver'],
        code: z.ZodIssueCode.custom,
        message: 'Select either a driver or a customer',
      });
      ctx.addIssue({
        path: ['customer'],
        code: z.ZodIssueCode.custom,
        message: 'Select either a driver or a customer',
      });
    }

    if (hasDriver && hasCustomer) {
      ctx.addIssue({
        path: ['driver'],
        code: z.ZodIssueCode.custom,
        message: 'You can select only one: driver OR customer',
      });
      ctx.addIssue({
        path: ['customer'],
        code: z.ZodIssueCode.custom,
        message: 'You can select only one: driver OR customer',
      });
    }
  });
