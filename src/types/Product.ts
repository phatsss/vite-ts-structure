// Data Transfer Objects for Product
export interface Product {
  id: string
  name: string
  description?: string
  price: number
}

// Input payload when creating/updating
export type ProductInput = Omit<Product, 'id'>
