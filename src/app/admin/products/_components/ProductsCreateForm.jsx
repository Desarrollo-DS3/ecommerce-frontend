import { useState, useEffect } from 'react'
import { listBrands, listCategories, addProduct } from '@/app/_api/stock'
import {
  validateProductName,
  validateProductDescription,
  validateProductPrice,
  validateProductStock
} from '@/app/_utils/validations/productValidations'

export default function ProductsCreateForm({ isOpen, onClose, token }) {
  const [formValues, setFormValues] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    brandId: '',
    categoryId: ''
  })
  const [errors, setErrors] = useState({})
  const [brands, setBrands] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [brandData, categoryData] = await Promise.all([
          listBrands(token),
          listCategories(token)
        ])
        setBrands(brandData)
        setCategories(categoryData)
      } catch (error) {
        console.error('Error fetching brands or categories:', error)
      }
    }
    if (isOpen) fetchData()
  }, [isOpen, token])

  const validateForm = () => {
    const newErrors = {
      name: validateProductName(formValues.name),
      description: validateProductDescription(formValues.description),
      price: validateProductPrice(formValues.price),
      stock: validateProductStock(formValues.stock)
    }
    setErrors(newErrors)
    return Object.values(newErrors).every((error) => error === '')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!validateForm()) return

    setLoading(true)
    try {
      await addProduct(
        {
          name: formValues.name,
          description: formValues.description,
          price: parseFloat(formValues.price),
          stock: parseInt(formValues.stock, 10),
          brandId: parseInt(formValues.brandId, 10),
          categoryId: parseInt(formValues.categoryId, 10)
        },
        token
      )
      window.location.reload()
      onClose()
    } catch (error) {
      console.error('Error creating product:', error)
      alert('Error al crear el producto')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormValues({ ...formValues, [name]: value })
  }

  return (
    isOpen && (
      <div className='fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50'>
        <div className='bg-white rounded-lg shadow-lg p-6 w-full max-w-lg'>
          <h2 className='text-lg font-bold mb-4'>Crear Producto</h2>
          <form onSubmit={handleSubmit}>
            <div className='mb-4'>
              <label className='block text-sm font-medium mb-1'>Nombre</label>
              <input
                type='text'
                name='name'
                value={formValues.name}
                onChange={handleChange}
                className='w-full border rounded px-3 py-2'
              />
              {errors.name && (
                <p className='text-red-500 text-sm'>{errors.name}</p>
              )}
            </div>
            <div className='mb-4'>
              <label className='block text-sm font-medium mb-1'>
                Descripción
              </label>
              <textarea
                name='description'
                value={formValues.description}
                onChange={handleChange}
                className='w-full border rounded px-3 py-2'
              />
              {errors.description && (
                <p className='text-red-500 text-sm'>{errors.description}</p>
              )}
            </div>
            <div className='mb-4'>
              <label className='block text-sm font-medium mb-1'>Precio</label>
              <input
                type='text'
                name='price'
                value={formValues.price}
                onChange={handleChange}
                className='w-full border rounded px-3 py-2'
              />
              {errors.price && (
                <p className='text-red-500 text-sm'>{errors.price}</p>
              )}
            </div>
            <div className='mb-4'>
              <label className='block text-sm font-medium mb-1'>Stock</label>
              <input
                type='text'
                name='stock'
                value={formValues.stock}
                onChange={handleChange}
                className='w-full border rounded px-3 py-2'
              />
              {errors.stock && (
                <p className='text-red-500 text-sm'>{errors.stock}</p>
              )}
            </div>
            <div className='mb-4'>
              <label className='block text-sm font-medium mb-1'>Marca</label>
              <select
                name='brandId'
                value={formValues.brandId}
                onChange={handleChange}
                className='w-full border rounded px-3 py-2'
              >
                <option value=''>Selecciona una marca</option>
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>
            <div className='mb-4'>
              <label className='block text-sm font-medium mb-1'>
                Categoría
              </label>
              <select
                name='categoryId'
                value={formValues.categoryId}
                onChange={handleChange}
                className='w-full border rounded px-3 py-2'
              >
                <option value=''>Selecciona una categoría</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className='flex justify-end space-x-2'>
              <button
                type='button'
                onClick={onClose}
                className='px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300'
                disabled={loading}
              >
                Cancelar
              </button>
              <button
                type='submit'
                className='px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600'
                disabled={loading}
              >
                {loading ? 'Creando...' : 'Crear'}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  )
}
