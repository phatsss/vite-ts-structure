import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { ProductInput } from '../../types/Product'
import { useServices } from '../../contexts/ServiceContext'

// SRP: this module only defines data‐fetching hooks
export function useProducts() {
  const { productService } = useServices()
  return useQuery({
    queryKey: ['products'],
    queryFn: () => productService.getAll(),
  })
}

export function useProduct(id: string) {
  const { productService } = useServices()
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productService.getById(id),
    enabled: Boolean(id),
  })
}

export function useCreateProduct() {
  const { productService } = useServices()
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (input: ProductInput) => productService.create(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['products'] }),
  })
}

export function useUpdateProduct(id: string) {
  const { productService } = useServices()
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (input: ProductInput) => productService.update(id, input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['products'] })
      qc.invalidateQueries({ queryKey: ['product', id] })
    },
  })
}

export function useDeleteProduct() {
  const { productService } = useServices()
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => productService.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['products'] }),
  })
}
