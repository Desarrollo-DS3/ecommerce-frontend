'use client'

import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { getProductById } from '@/app/_api/stock'

export default function ProductPage() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      setLoading(true)
      getProductById(id)
        .then((data) => {
          setProduct(data)
          setLoading(false)
        })
        .catch(() => {
          setLoading(false)
        })
    }
  }, [id])

  if (loading) {
    return (
      <div className='flex items-center justify-center h-screen bg-gray-100'>
        <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500'></div>
      </div>
    )
  }

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
        {/* Imagen del producto */}
        <div className='flex-shrink-0 w-full lg:w-1/2 flex justify-center items-center'>
          <img
            src={product.thumbnail}
            alt={product.name}
            className='h-auto max-h-80 w-auto object-cover rounded-lg shadow-md'
          />
        </div>

        {/* Detalles del producto */}
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
            ¡Últimas {product.stock} en stock!
          </p>

          {/* Botón de agregar al carrito */}
          <div className='flex items-center gap-4 mt-4'>
            <input
              type='number'
              min='1'
              defaultValue='1'
              className='border border-gray-300 rounded-md p-2 w-16'
            />
            <button className='bg-orange-600 text-white font-semibold py-2 px-6 rounded-md hover:bg-orange-500 transition'>
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
