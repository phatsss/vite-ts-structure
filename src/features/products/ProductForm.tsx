import { useState, useEffect, type FormEvent } from 'react'
import type { Product, ProductInput } from '@/types/Product'

interface Props {
  initial?: Product
  onSubmit: (data: ProductInput) => void
  isLoading: boolean
}

// SRP: purely form UI + local state
export function ProductForm({ initial, onSubmit, isLoading }: Props) {
  const [name, setName] = useState(initial?.name || '')
  const [price, setPrice] = useState(initial?.price.toString() || '0')
  const [description, setDescription] = useState(initial?.description || '')

  // Sync form fields if `initial` changes
  useEffect(() => {
    if (initial) {
      setName(initial.name)
      setPrice(initial.price.toString())
      setDescription(initial.description || '')
    }
  }, [initial])

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    onSubmit({ name, price: parseFloat(price), description })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 space-y-4"
    >
      <div>
        <label className="block font-medium text-gray-700">Name</label>
        <input
          className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block font-medium text-gray-700">Price</label>
        <input
          type="number"
          step="0.01"
          className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block font-medium text-gray-700">Description</label>
        <textarea
          className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

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
