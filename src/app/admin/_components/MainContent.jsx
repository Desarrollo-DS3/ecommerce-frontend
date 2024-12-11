'use client'

import { useState } from 'react'
import Pagination from '@/app/_components/ui/Pagination'

export default function MainContent({ items, ItemComponent, CreateComponent }) {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const itemsPerPage = 5

  const isNumber = (term) => /^\d+(\.\d+)?$/.test(term)

  const filteredItems = items.filter((item) =>
    Object.values(item)
      .join(' ')
      .toLowerCase()
      .includes(
        isNumber(searchTerm) ? ` ${searchTerm}` : searchTerm.toLowerCase()
      )
  )

  const currentItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const totalPages =
    filteredItems.length === 0
      ? 0
      : Math.ceil(filteredItems.length / itemsPerPage)

  return (
    <div className='flex-1 bg-white p-6 relative'>
      <div className='flex items-center bg-gray-100 rounded-md px-4 py-2 mb-6'>
        <input
          type='text'
          placeholder='Buscar...'
          className='flex-1 bg-transparent outline-none text-gray-700'
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            setCurrentPage(1)
          }}
        />
      </div>
      <div className='space-y-4'>
        {currentItems.length > 0 ? (
          currentItems.map((item) => (
            <ItemComponent key={item.id} item={item} />
          ))
        ) : (
          <p className='text-gray-500'>No se encontraron resultados.</p>
        )}
      </div>
      <div className='absolute bottom-0 left-0 w-full p-4 flex justify-between bg-white border-t'>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          changePage={(page) => {
            if (page >= 1 && page <= totalPages) setCurrentPage(page)
          }}
        />
      </div>
      <button
        className='fixed bottom-6 right-6 bg-orange-500 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-orange-600'
        onClick={() => setModalOpen(true)}
      >
        +
      </button>
      {modalOpen && CreateComponent && (
        <CreateComponent
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  )
}
