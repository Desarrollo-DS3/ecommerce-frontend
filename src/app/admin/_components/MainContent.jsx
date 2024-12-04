'use client'
import { useState } from 'react'
import Pagination from '@/app/_components/ui/Pagination'

export default function MainContent({ items, ItemComponent }) {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const itemsPerPage = 5

  // Verificar si el término de búsqueda es un número válido
  const isNumber = (term) => {
    const regex = /^\d+(\.\d+)?$/ // Valida enteros o flotantes con un solo punto
    return regex.test(term)
  }

  // Preparar el término de búsqueda
  const preparedSearchTerm = isNumber(searchTerm)
    ? ` ${searchTerm}`
    : searchTerm

  // Filtrar los elementos en función del término de búsqueda
  const filteredItems = items.filter((item) =>
    Object.values(item)
      .join(' ')
      .toLowerCase()
      .includes(preparedSearchTerm.toLowerCase())
  )

  // Calcular los elementos a mostrar en la página actual
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = filteredItems.slice(startIndex, endIndex)

  // Calcular el total de páginas
  const totalPages =
    filteredItems.length === 0
      ? 0
      : Math.ceil(filteredItems.length / itemsPerPage)

  // Cambiar página
  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  return (
    <div className='flex-1 bg-white p-6 relative'>
      {/* Barra de búsqueda */}
      <div className='flex items-center bg-gray-100 rounded-md px-4 py-2 mb-6'>
        <input
          type='text'
          placeholder='Buscar...'
          className='flex-1 bg-transparent outline-none text-gray-700'
          value={searchTerm} // Estado controlado para la búsqueda
          onChange={(e) => {
            setSearchTerm(e.target.value) // Actualizar término de búsqueda
            setCurrentPage(1) // Reiniciar a la primera página en cada búsqueda
          }}
        />
      </div>

      {/* Lista de elementos */}
      <div className='space-y-4'>
        {currentItems.length > 0 ? (
          currentItems.map((item) => (
            <ItemComponent key={item.id} item={item} />
          ))
        ) : (
          <p className='text-gray-500'>No se encontraron resultados.</p>
        )}
      </div>

      {/* Paginación */}
      <div className='absolute bottom-0 left-0 w-full p-4 flex justify-between bg-white border-t'>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          changePage={changePage}
        />
      </div>

      {/* Botón flotante */}
      <button className='fixed bottom-6 right-6 bg-orange-500 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-orange-600'>
        +
      </button>
    </div>
  )
}
