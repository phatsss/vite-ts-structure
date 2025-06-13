import { useProducts, useDeleteProduct } from './hooks'
import RoleBasedAccess from '@/components/RoleBasedAccess'
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export function ProductList() {
  const { t } = useTranslation()
  const { data: products, isLoading, error } = useProducts()
  const deleteMut = useDeleteProduct()

  if (isLoading)
    return (
      <div className="flex justify-center py-20">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
      </div>
    )

  if (error) return <p>Error loading products.</p>

  return (
    <>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold text-gray-800">
            {t('products.title')}
          </h1>
          {/* OCP: we can add new permissions/UI without changing delete logic */}
          <RoleBasedAccess requiredPermission="create:product">
            <Link to="/products/new">
              <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded shadow">
                {t('products.newProduct')}
              </button>
            </Link>
          </RoleBasedAccess>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products!.map((p) => (
            <div
              key={p.id}
              className="bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden transition-shadow duration-200"
            >
              <div className="p-4">
                <Link
                  to="/products/$productId"
                  params={{ productId: p.id }}
                  className="text-xl font-semibold text-indigo-600 hover:underline"
                >
                  {p.name}
                </Link>

                <p className="mt-2 text-gray-600 line-clamp-3">
                  {p.description || 'No description.'}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="inline-block bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full">
                    ${p.price.toFixed(2)}
                  </span>

                  <div className="flex space-x-2">
                    <RoleBasedAccess requiredPermission="update:product">
                      <Link
                        to="/products/$productId/edit"
                        params={{ productId: p.id }}
                      >
                        <button className="text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
                          {t('products.edit')}
                        </button>
                      </Link>
                    </RoleBasedAccess>

                    <RoleBasedAccess requiredPermission="delete:product">
                      <button
                        onClick={() => deleteMut.mutate(p.id)}
                        disabled={deleteMut.isPending}
                        className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      >
                        {deleteMut.isPending
                          ? t('common.loading')
                          : t('products.delete')}
                      </button>
                    </RoleBasedAccess>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
