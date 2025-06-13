import { useProducts, useDeleteProduct } from './hooks'
import RoleBasedAccess from '@/components/RoleBasedAccess'
import { Link } from '@tanstack/react-router'

export function ProductList() {
  const { data: products, isLoading, error } = useProducts()
  const deleteMut = useDeleteProduct()

  if (isLoading) return <p>Loading products…</p>
  if (error) return <p>Error loading products.</p>

  return (
    <div>
      <h1>Products</h1>

      {/* OCP: we can add new permissions/UI without changing delete logic */}
      <RoleBasedAccess requiredPermission={'create:product'}>
        <Link to="/products/new">
          <button className="btn">+ New Product</button>
        </Link>
      </RoleBasedAccess>

      <ul>
        {products!.map((p) => (
          <li key={p.id} className="flex justify-between py-2">
            {/* <Link to={`/products/$productId`}  params={{ productId: p.id }}>{p.name}</Link> */}
            <div className="space-x-2">
              <RoleBasedAccess requiredPermission="update:product">
                <Link
                  to={`/products/$productId/edit`}
                  params={{ productId: p.id }}
                >
                  <button className="btn-sm">Edit</button>
                </Link>
              </RoleBasedAccess>
              <RoleBasedAccess requiredPermission="delete:product">
                <button
                  className="btn-sm btn-danger"
                  onClick={() => deleteMut.mutate(p.id)}
                  disabled={deleteMut.isPending}
                >
                  Delete
                </button>
              </RoleBasedAccess>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
