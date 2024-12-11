'use client'

import { useState } from 'react'
import { createCategory } from '@/app/_api/stock'
import {
  validateCategoryName,
  validateCategoryDescription
} from '@/app/_utils/validations/categoryValidations'

export default function CategoryCreateForm({
  isOpen,
  onClose,
  token,
  refreshCategories
}) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const nameError = validateCategoryName(name)
    const descriptionError = validateCategoryDescription(description)

    if (nameError || descriptionError) {
      setError(nameError || descriptionError)
      return
    }

    setLoading(true)
    setError(null)

    try {
      await createCategory({ name, description }, token)
      refreshCategories() // Actualiza la lista de categorias
      onClose() // Cierra el formulario
    } catch (err) {
      setError('Error al crear la categoria. Inténtalo de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-96'>
        <h2 className='text-lg font-semibold mb-4'>Crear Categoria</h2>
        {error && <p className='text-red-500 text-sm mb-2'>{error}</p>}
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium'>Nombre</label>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='mt-1 block w-full border-gray-300 rounded-md shadow-sm'
            />
          </div>
          <div>
            <label className='block text-sm font-medium'>Descripción</label>
            <input
              type='text'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='mt-1 block w-full border-gray-300 rounded-md shadow-sm'
            />
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
                loading ? 'bg-gray-400' : 'bg-orange-500 hover:bg-orange-600'
              } text-white`}
            >
              {loading ? 'Creando...' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
