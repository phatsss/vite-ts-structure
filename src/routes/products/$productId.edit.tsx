import RoleBasedAccess from '@/components/RoleBasedAccess'
import { useProduct, useUpdateProduct } from '@/features/products/hooks'
import { ProductForm } from '@/features/products/ProductForm'
import { createFileRoute, useNavigate, useParams } from '@tanstack/react-router'

export const Route = createFileRoute('/products/$productId/edit')({
  component: RouteComponent,
})

function RouteComponent() {
  const { productId } = useParams({ from: '/products/$productId/edit' })
  const { data, isLoading, error } = useProduct(productId!)
  const updateMut = useUpdateProduct(productId!)
  const navigate = useNavigate()

  if (isLoading) return <p>Loading…</p>
  if (error || !data) return <p>Product not found</p>

  return (
    <RoleBasedAccess requiredPermission="update:product">
      <h1>Edit Product</h1>
      <ProductForm
        initial={data}
        isLoading={updateMut.isPending}
        onSubmit={(d) =>
          updateMut.mutate(d, {
            onSuccess: () => navigate({ to: '/products' }),
          })
        }
      />
    </RoleBasedAccess>
  )
}
