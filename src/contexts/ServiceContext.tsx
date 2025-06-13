import React, { createContext, useContext } from 'react'
import { ProductService } from '@/services/product/ProductService'
import type { IProductService } from '@/services/product/IProductService'

// DIP: define the shape of all injectable services
interface ServiceContextType {
  productService: IProductService
}

// Create the Context
const ServiceContext = createContext<ServiceContextType | null>(null)

// Provider that wires in concrete implementations
export function ServiceProvider({ children }: { children: React.ReactNode }) {
  const services: ServiceContextType = {
    productService: new ProductService(),
  }

  return (
    <ServiceContext.Provider value={services}>
      {children}
    </ServiceContext.Provider>
  )
}

// Hook to consume services in hooks/components
export function useServices(): ServiceContextType {
  const ctx = useContext(ServiceContext)
  if (!ctx) throw new Error('useServices must be inside ServiceProvider')
  return ctx
}
