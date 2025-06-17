import type { IProductService } from './IProductService'
import type { Product, ProductInput } from '@/types/schemas/ProductSchema'
import rawData from './mockProducts.json'

// We keep an in-memory copy so creates/updates/deletes persist during runtime
let products: Product[] = [...rawData]

// Concrete implementation: low-level HTTP calls
export class ProductService implements IProductService {
  // base URL for all product-related requests
  // private base = '/api/products'

  /** Fetch all products */
  async getAll(): Promise<Product[]> {
    // const res = await fetch(this.base)
    // if (!res.ok) throw new Error('Failed to fetch products')
    // return res.json() as Promise<Product[]>

    // mock data
    return Promise.resolve(products)
  }

  /** Fetch one product by ID */
  async getById(id: string): Promise<Product> {
    // const res = await fetch(`${this.base}/${id}`)
    // if (!res.ok) throw new Error('Failed to fetch product')
    // return res.json() as Promise<Product>

    // mock data
    const item = products.find((p) => p.id === id)
    if (!item) throw new Error('Product not found')
    return Promise.resolve(item)
  }

  /** Create a new product */
  async create(input: ProductInput): Promise<Product> {
    // const res = await fetch(this.base, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(input),
    // })
    // if (!res.ok) throw new Error('Failed to create product')
    // return res.json() as Promise<Product>

    // mock data
    const newProduct: Product = {
      id: Date.now().toString(),
      ...input,
    }
    products.push(newProduct)
    return Promise.resolve(newProduct)
  }

  /** Update an existing product */
  async update(id: string, input: ProductInput): Promise<Product> {
    // const res = await fetch(`${this.base}/${id}`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(input),
    // })
    // if (!res.ok) throw new Error('Failed to update product')
    // return res.json() as Promise<Product>

    // mock data
    const idx = products.findIndex((p) => p.id === id)
    if (idx === -1) throw new Error('Product not found')
    products[idx] = { id, ...input }
    return Promise.resolve(products[idx])
  }

  /** Delete a product */
  async delete(id: string): Promise<void> {
    // const res = await fetch(`${this.base}/${id}`, {
    //   method: 'DELETE',
    // })
    // if (!res.ok) throw new Error('Failed to delete product')

    // mock data
    const idx = products.findIndex((p) => p.id === id)
    if (idx === -1) throw new Error('Product not found')
    products.splice(idx, 1)
    return Promise.resolve()
  }
}
