'use client'

import { ReactSVG } from 'react-svg'
import ic from '@/app/_config/assets.json'

export default function Pagination({ currentPage, totalPages, changePage }) {
  return (
    <div className='flex items-center space-x-4'>
      {/* Botón de página anterior */}
      <button
        className={`p-2 bg-orange-500 rounded-md ${
          currentPage === 1 || totalPages === 0
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:bg-orange-700'
        }`}
        onClick={() => changePage(currentPage - 1)}
        disabled={currentPage === 1 || totalPages === 0}
      >
        <ReactSVG
          className='fill-none text-white hover:fill-black'
          src={ic.ui.arrowLeft}
          alt='arrow-left'
          width={24}
          height={24}
        />
      </button>
      {/* Texto de la página actual */}
      <span className='text-gray-700'>
        {`Página ${totalPages === 0 ? 0 : currentPage} de ${totalPages}`}
      </span>
      {/* Botón de página siguiente */}
      <button
        className={`p-2 bg-orange-500 rounded-md ${
          currentPage === totalPages || totalPages === 0
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:bg-orange-700'
        }`}
        onClick={() => changePage(currentPage + 1)}
        disabled={currentPage === totalPages || totalPages === 0}
      >
        <ReactSVG
          className='fill-none text-white hover:fill-black'
          src={ic.ui.arrowRight}
          alt='arrow-right'
          width={24}
          height={24}
        />
      </button>
    </div>
  )
}
