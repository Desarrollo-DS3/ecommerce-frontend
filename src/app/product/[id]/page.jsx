'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect, useContext } from 'react'
import { buyProduct, getProductById } from '@/app/_api/stock'
import LoadingOverlay from '@/app/_components/ui/LoadingOverlay'
import { AuthContext } from '@/app/_contexts/auth'

export default function ProductPage() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const { token, isInitializing, role } = useContext(AuthContext)
  const router = useRouter()

  useEffect(() => {
    if (id && !isInitializing && token) {
      setLoading(true)
      getProductById(id, token)
        .then((response) => {
          const { success, product, message } = response
          if (success) {
            setProduct(product)
          } else {
            console.error(message)
          }
        })
        .catch((error) => {
          console.error('Error al obtener producto:', error)
        })
        .finally(() => setLoading(false))
    }
  }, [id, isInitializing, token])

  const handleBuy = () => {
    try {
      buyProduct({ productId: product.id, quantity }, token)
      window.alert(
        'Se has hecho la petición de compra exitosamente, vuelva a consultar la página de productos.'
      )
      router.push('/')
    } catch (error) {
      if (process.env.ENVIRONMENT === 'development') console.error(error)
    }
  }

  if (loading) return <LoadingOverlay />

  if (!product) {
    return (
      <div className='flex items-center justify-center h-screen bg-gray-100'>
        <div className='text-xl text-red-600'>Producto no encontrado</div>
      </div>
    )
  }

  return (
    <div className='flex justify-center items-center h-full bg-gray-100 p-4'>
      <div className='bg-white rounded-lg shadow-lg p-6 max-w-5xl w-full flex flex-col lg:flex-row gap-8'>
        <div className='flex-shrink-0 w-full lg:w-1/2 flex justify-center items-center'>
          <img
            src={product.thumbnail}
            alt={product.name}
            className='h-auto max-h-80 w-auto object-cover rounded-lg shadow-md'
          />
        </div>
        <div className='flex flex-col flex-grow gap-4'>
          <h2 className='text-3xl font-bold text-gray-800'>{product.name}</h2>
          <p className='text-gray-500 text-sm'>
            Categoría:{' '}
            {product.category ? product.category.name : 'Sin categoría'}
          </p>
          <p className='text-gray-500 text-sm'>
            Marca: {product.brand ? product.brand.name : 'Sin marca'}
          </p>
          <p className='text-2xl font-semibold text-gray-800'>{`$${product.price}`}</p>
          <p className='text-sm text-gray-600'>{product.description}</p>
          <p className='text-lg text-orange-600'>
            {product.stock > 10
              ? `Ultimas ${product.stock} unidades!!!`
              : `Unidades disponibles: ${product.stock}`}
          </p>
          {role === 'user' && (
            <div className='flex items-center gap-4 mt-4'>
              <input
                type='number'
                min='1'
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className='border border-gray-300 rounded-md p-2 w-16'
              />
              <button
                className='bg-orange-600 text-white font-semibold py-2 px-6 rounded-md hover:bg-orange-500 transition'
                onClick={handleBuy}
              >
                Comprar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
