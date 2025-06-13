import RoleBasedAccess from '@/components/RoleBasedAccess'
import { useCreateProduct } from '@/features/products/hooks'
import { ProductForm } from '@/features/products/ProductForm'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/products/new')({
  component: RouteComponent,
})

function RouteComponent() {
  const createMut = useCreateProduct()
  const navigate = useNavigate()

  return (
    <RoleBasedAccess requiredPermission="create:product">
      <h1>New Product</h1>
      <ProductForm
        isLoading={createMut.isPending}
        onSubmit={(data) =>
          createMut.mutate(data, {
            onSuccess: () => navigate({ to: '/products' }),
          })
        }
      />
    </RoleBasedAccess>
  )
}
