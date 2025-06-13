import type { IProductService } from './IProductService'
import type { Product, ProductInput } from '@/types/Product'

// Concrete implementation: low-level HTTP calls
export class ProductService implements IProductService {
  // base URL for all product-related requests
  private base = '/api/products'

  async getAll() {
    const res = await fetch(this.base)
    if (!res.ok) throw new Error('Failed to fetch products')
    return res.json() as Promise<Product[]>
  }

  async getById(id: string) {
    const res = await fetch(`${this.base}/${id}`)
    if (!res.ok) throw new Error('Failed to fetch product')
    return res.json() as Promise<Product>
  }

  async create(input: ProductInput) {
    const res = await fetch(this.base, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    })
    if (!res.ok) throw new Error('Failed to create product')
    return res.json() as Promise<Product>
  }

  async update(id: string, input: ProductInput) {
    const res = await fetch(`${this.base}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    })
    if (!res.ok) throw new Error('Failed to update product')
    return res.json() as Promise<Product>
  }

  async delete(id: string) {
    const res = await fetch(`${this.base}/${id}`, {
      method: 'DELETE',
    })
    if (!res.ok) throw new Error('Failed to delete product')
  }
}
