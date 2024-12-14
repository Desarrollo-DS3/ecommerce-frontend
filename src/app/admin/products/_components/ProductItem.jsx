'use client'
import { useEffect, useState } from 'react'
import { ReactSVG } from 'react-svg'
import ic from '@/app/_config/assets.json'
import ProductSupplyModal from '@/app/admin/products/_components/ProductSupplyModal'

export default function ProductItem({ item, token }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  useEffect(() => {}, [isModalOpen])

  return (
    <div className='flex items-center justify-between bg-gray-100 p-2 rounded-md shadow-sm'>
      {/* Imagen del producto */}
      <span className='relative min-w-[2rem] min-h-[2rem] flex items-center justify-center bg-orange-500 text-white font-bold rounded-full px-3 py-2 mx-4 select-none'>
        {item.stock}
      </span>
      <img src={item.thumbnail} alt='thumbnail' className='w-16 h-16 mr-4' />

      {/* Información del producto */}
      <div className='flex flex-col flex-1'>
        <span className='font-bold'>{item.name}</span>
        <span className='text-gray-700'>${item.price}</span>
      </div>

      {/* Botón de stock */}
      <button
        className='relative flex items-center justify-center w-10 h-10 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition duration-300'
        onClick={openModal}
      >
        <ReactSVG
          className='w-[60%] h-[60%] text-white transition group-hover:text-orange-500'
          src={ic.ui.edit}
          alt=''
        />
      </button>

      <ProductSupplyModal
        product={item}
        isOpen={isModalOpen}
        onClose={closeModal}
        token={token}
      />
    </div>
  )
}
