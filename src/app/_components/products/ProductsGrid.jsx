// [src/app/_components/products/ProductsGrid.jsx]
'use client'
import { useState, useEffect, useContext } from 'react'
import { useFilters } from '@/app/_hooks/useFilters'
import { listProducts } from '@/app/_api/stock'
import LoadingOverlay from '@/app/_components/ui/LoadingOverlay'
import ProductCard from '@/app/_components/products/ProductCard'
import Pagination from '@/app/_components/ui/Pagination'
import { AuthContext } from '@/app/_contexts/auth'

export default function ProductsGrid() {
  const { token, isInitializing } = useContext(AuthContext)
  const [products, setProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const productsPerPage = 6

  const { filterProducts } = useFilters()

  useEffect(() => {
    if (!isInitializing && token) {
      setIsLoading(true)
      listProducts(token)
        .then((data) => {
          setProducts(data)
        })
        .catch((error) => {
          console.error('Error fetching products:', error)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }, [isInitializing, token])

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

  if (isInitializing) {
    return <LoadingOverlay />
  }

  return (
    <div className='flex flex-col justify-center items-center min-h-full bg-gray-100'>
      {isLoading && <LoadingOverlay />}

      <div className='w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 px-20'>
        {currentProducts.map((product) => (
          <div key={product.id} onClick={handleProductClick}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>

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
