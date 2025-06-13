import { z } from 'zod'

// DTOs
export const ProductInputSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  price: z
    .number({ invalid_type_error: 'Price must be a number' })
    .min(0, 'Price must be ≥ 0'),
  description: z.string().max(500).optional(),
})

export type ProductInput = z.input<typeof ProductInputSchema>
export type Product = {
  id: string
} & z.infer<typeof ProductInputSchema>
