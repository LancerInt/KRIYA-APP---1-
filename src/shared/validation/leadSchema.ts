import {z} from 'zod';

export const leadSchema = z.object({
  name: z.string().min(2),
  company: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().optional(),
  country: z.string().optional()
});

export type LeadFormInput = z.infer<typeof leadSchema>;
