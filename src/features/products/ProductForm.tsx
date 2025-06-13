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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label>Name</label>
        <input
          className="input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Price</label>
        <input
          type="number"
          step="0.01"
          className="input"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description</label>
        <textarea
          className="input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button type="submit" className="btn" disabled={isLoading}>
        {initial ? 'Update' : 'Create'}
      </button>
    </form>
  )
}
