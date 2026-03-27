import { z } from 'zod'

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name is too long')
    .regex(/^[a-zA-Z\s'\-]+$/, 'Name contains invalid characters')
    .transform((s) => s.trim()),
  email: z
    .string()
    .email('Please enter a valid email address')
    .max(255, 'Email is too long')
    .transform((s) => s.trim().toLowerCase()),
  subject: z
    .string()
    .max(200, 'Subject is too long')
    .optional()
    .transform((s) => s?.trim()),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be under 2000 characters')
    .transform((s) => s.trim()),
})

export type ContactFormData = z.infer<typeof contactSchema>
