'use client'

import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { loadProductById } from '@/app/_api/stock'

export default function ProductPage() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      setLoading(true)
      loadProductById(id)
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
    <div className='flex flex-col h-full p-20 justify-normal items-center bg-gray-100'>
      <div className='bg-white p-6 rounded-lg shadow-lg flex flex-col lg:flex-row'>
        {/* Imagen del producto */}
        <div className='lg:w-1/2'>
          <img
            src={product.thumbnail}
            alt={product.title}
            className='h-auto rounded-lg shadow-md w-full max-w-sm'
          />
        </div>
        {/* Detalles del producto */}
        <div className='mt-6'>
          <h2 className='text-3xl font-bold text-gray-800'>{product.title}</h2>
          <p className='text-gray-500 mt-2'>{product.category}</p>
          <p className='text-xl font-semibold mt-4 text-gray-800'>{`$${product.price}`}</p>
          <p className='mt-4 text-gray-600'>{product.description}</p>

          {/* Disponibilidad del producto */}
          <p className='text-lg mt-4 text-orange-600'>
            ¡Últimas {product.stock} en stock!
          </p>

          {/* Botón de agregar al carrito */}
          <div className='mt-6 flex items-center'>
            <input
              type='number'
              min='1'
              defaultValue='1'
              className='border border-gray-300 rounded-md p-2 mr-4 w-16'
            />
            <button className='bg-orange-600 text-white font-semibold py-2 px-6 rounded-md hover:bg-orange-500'>
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
