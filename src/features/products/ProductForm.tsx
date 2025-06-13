import {
  ProductInputSchema,
  type Product,
  type ProductInput,
} from '@/types/Product'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

interface Props {
  initial?: Product
  onSubmit: (data: ProductInput) => void
  isLoading: boolean
}

// SRP: purely form UI + local state
export function ProductForm({ initial, onSubmit, isLoading }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductInput>({
    resolver: zodResolver(ProductInputSchema),
    defaultValues: initial ?? { name: '', price: 0, description: '' },
  })

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 space-y-4"
    >
      {/* Name */}
      <div>
        <label className="block font-medium text-gray-700">Name</label>
        <input
          {...register('name')}
          className={`mt-1 w-full border rounded px-3 py-2 
            ${errors.name ? 'border-red-500' : 'border-gray-300'}
            focus:outline-none focus:ring-2 focus:ring-indigo-200`}
        />
        {errors.name && (
          <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Price */}
      <div>
        <label className="block font-medium text-gray-700">Price</label>
        <input
          type="number"
          step="0.01"
          {...register('price', { valueAsNumber: true })}
          className={`mt-1 w-full border rounded px-3 py-2 
            ${errors.price ? 'border-red-500' : 'border-gray-300'}
            focus:outline-none focus:ring-2 focus:ring-indigo-200`}
        />
        {errors.price && (
          <p className="text-red-600 text-sm mt-1">{errors.price.message}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block font-medium text-gray-700">Description</label>
        <textarea
          {...register('description')}
          className={`mt-1 w-full border rounded px-3 py-2 
            ${errors.description ? 'border-red-500' : 'border-gray-300'}
            focus:outline-none focus:ring-2 focus:ring-indigo-200`}
        />
        {errors.description && (
          <p className="text-red-600 text-sm mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded"
      >
        {initial ? 'Update Product' : 'Create Product'}
      </button>
    </form>
  )
}
