import { ProductList } from '@/features/products/ProductList'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/products/')({
  component: RouteComponent,
})

// “/products” → show list
function RouteComponent() {
  return <ProductList />
}
