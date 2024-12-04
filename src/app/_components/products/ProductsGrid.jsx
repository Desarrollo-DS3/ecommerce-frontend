'use client'
import { useState, useEffect } from 'react'
import { useFilters } from '@/app/_hooks/useFilters'
import { loadProducts } from '@/app/_api/stock'
import LoadingOverlay from '@/app/_components/ui/LoadingOverlay'
import ProductCard from '@/app/_components/products/ProductCard'
import Pagination from '@/app/_components/ui/Pagination'

export default function ProductsGrid() {
  const [products, setProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const productsPerPage = 6

  const { filterProducts } = useFilters()

  useEffect(() => {
    loadProducts().then((data) => {
      setProducts(data)
      setIsLoading(false)
    })
  }, [])

  const filteredProducts = filterProducts(products)

  useEffect(() => {
    if (filteredProducts.length > 0) {
      const newTotalPages = Math.ceil(filteredProducts.length / productsPerPage)
      setTotalPages(newTotalPages)

      if (currentPage > newTotalPages) {
        setCurrentPage(newTotalPages)
      }
    }
  }, [filteredProducts, currentPage])

  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  )

  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const handleProductClick = () => {
    setIsLoading(true)
  }

  return (
    <div className='flex flex-col justify-center items-center min-h-full bg-gray-100'>
      {/* Círculo cargando que cubre toda la pantalla */}
      {isLoading && <LoadingOverlay />}

      <div className='w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 px-20'>
        {currentProducts.map((product) => (
          <div key={product.id} onClick={handleProductClick}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Paginación */}
      <div className='py-8'>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          changePage={changePage}
        />
      </div>
    </div>
  )
}
