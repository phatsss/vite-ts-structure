import type { Product, ProductInput } from '../../types/Product'

// ISP: only the methods we need for Product CRUD
export interface IProductService {
  getAll(): Promise<Product[]>
  getById(id: string): Promise<Product>
  create(input: ProductInput): Promise<Product>
  update(id: string, input: ProductInput): Promise<Product>
  delete(id: string): Promise<void>
}
