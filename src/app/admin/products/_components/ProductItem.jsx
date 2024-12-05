'use client'

export default function ProductItem({ item }) {
  return (
    <div className='flex items-center justify-between bg-gray-100 p-2 rounded-md shadow-sm'>
      {/* Imagen del producto */}
      <span className='relative w-8 h-8 flex items-center justify-center bg-orange-500 text-white font-bold rounded-full mx-4 select-none'>
        {item.stock}
      </span>
      <img src={item.thumbnail} alt='thumbnail' className='w-16 h-16 mr-4' />

      {/* Información del producto */}
      <div className='flex flex-col flex-1'>
        <span className='font-bold'>{item.name}</span>
        <span className='text-gray-700'>${item.price}</span>
      </div>

      {/* Botón de stock */}
      <button className='relative w-8 h-8 flex items-center justify-center bg-orange-500 text-white font-bold rounded-full hover:bg-orange-600 transition duration-300'>
        <span className='absolute hidden group-hover:inline'>E</span>
      </button>
    </div>
  )
}
