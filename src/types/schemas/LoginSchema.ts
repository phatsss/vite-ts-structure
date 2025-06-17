import { z } from 'zod'

// DTOs
export const LoginCredentialsSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Must be a valid email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(128, 'Password is too long'),
})

/** Inferred TS type from the schema */
export type LoginCredentialsInput = z.infer<typeof LoginCredentialsSchema>
