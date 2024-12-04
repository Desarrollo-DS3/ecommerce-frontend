import Link from 'next/link'

export default function ProductCard({ product }) {
  return (
    <Link href={`/product/${product.id}`}>
      <div className='bg-white p-4 rounded-md shadow-md h-[350px] overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl'>
        <img
          src={product.thumbnail}
          className='w-full h-48 object-cover rounded-md mb-4'
          alt={product.name}
        />
        <h3 className='text-lg font-bold truncate'>{product.name}</h3>
        <p className='text-gray-500 text-sm'>{product.categoryId}</p>
        <p className='text-lg font-semibold mt-2'>{`$${product.price}`}</p>
      </div>
    </Link>
  )
}
