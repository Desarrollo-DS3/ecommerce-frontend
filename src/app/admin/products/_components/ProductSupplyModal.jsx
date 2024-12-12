import { useState } from 'react'
import { supplyProduct } from '@/app/_api/stock'

export default function ProductSupplyModal({
  product,
  isOpen,
  onClose,
  token
}) {
  const [quantity, setQuantity] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const parsedQuantity = parseInt(quantity, 10)

    if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
      setError('Quantity must be a valid number greater than 0')
      return
    }

    setLoading(true)
    setError(null)

    try {
      await supplyProduct(
        { productId: product.id, quantity: parsedQuantity },
        token
      )
      window.location.reload()
      onClose()
    } catch (err) {
      setError('Failed to supply product. Please try again.')
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white p-6 rounded-lg shadow-lg'>
        <h2 className='text-lg font-semibold mb-4'>
          Suministrar Producto: {product.name.slice(0, 20)}
        </h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label htmlFor='quantity' className='block text-sm font-medium'>
              Cantidad a agregar
            </label>
            <input
              type='number'
              id='quantity'
              name='quantity'
              min='1'
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className='mt-1 block w-full border-gray-300 rounded-md shadow-sm'
            />
            {error && <p className='text-red-500 text-sm'>{error}</p>}
          </div>

          <div className='flex justify-end space-x-2'>
            <button
              type='button'
              onClick={onClose}
              className='px-4 py-2 bg-gray-300 text-black rounded-md'
            >
              Cancelar
            </button>
            <button
              type='submit'
              disabled={loading}
              className={`px-4 py-2 rounded-md ${
                loading ? 'bg-gray-400' : 'bg-orange-500'
              } text-white`}
            >
              {loading ? 'Procesando...' : 'Suministrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
