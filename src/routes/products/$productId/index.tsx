import {
  useParams,
  useNavigate,
  Link,
  createFileRoute,
} from '@tanstack/react-router'
import { useProduct, useDeleteProduct } from '@/features/products/hooks'
import RoleBasedAccess from '@/components/RoleBasedAccess'

export const Route = createFileRoute('/products/$productId/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { productId } = useParams({ from: '/products/$productId/' }) // { productId: string }
  const navigate = useNavigate()
  const { data: product, isLoading, error } = useProduct(productId!)
  const deleteMut = useDeleteProduct()

  // Loading state
  if (isLoading)
    return (
      <div className="flex justify-center py-20">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
      </div>
    )

  // Error / not found
  if (error || !product)
    return <p className="text-center py-10">Product not found.</p>

  // Delete handler
  const handleDelete = async () => {
    if (!confirm(`Delete “${product.name}”?`)) return
    try {
      await deleteMut.mutateAsync(product.id)
      navigate({ to: '/products' })
    } catch {
      alert('Failed to delete product')
    }
  }

  return (
    <>
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <h1 className="text-4xl font-bold text-gray-800">{product.name}</h1>
            <p className="mt-4 text-gray-700">{product.description}</p>

            <div className="mt-6 flex items-center space-x-4">
              <span className="text-2xl font-semibold text-indigo-600">
                ${product.price.toFixed(2)}
              </span>

              {/* Edit Button (only if user can update) */}
              <RoleBasedAccess requiredPermission="update:product">
                <Link
                  to="/products/$productId/edit"
                  params={{ productId: product.id }}
                >
                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded">
                    Edit
                  </button>
                </Link>
              </RoleBasedAccess>

              {/* Delete Button (only if user can delete) */}
              <RoleBasedAccess requiredPermission="delete:product">
                <button
                  onClick={handleDelete}
                  disabled={deleteMut.isPending}
                  className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded"
                >
                  {deleteMut.isPending ? 'Deleting…' : 'Delete'}
                </button>
              </RoleBasedAccess>
            </div>
          </div>

          <div className="px-6 py-4 bg-gray-50">
            <Link to="/products" className="text-indigo-600 hover:underline">
              ← Back to Products
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
