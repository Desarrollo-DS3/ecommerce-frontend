'use client'
import { useContext } from 'react'
import { FiltersContext } from '@/app/_contexts/filters'

export function useFilters() {
  const { filters, setFilters } = useContext(FiltersContext)

  const filterProducts = (products) => {
    return products.filter((product) => {
      return (
        product.name
          .toLowerCase()
          .includes(filters.includedString.toLowerCase()) &&
        (filters.categoryId === -1 || product.categoryId === filters.categoryId)
      )
    })
  }

  return { filters, setFilters, filterProducts }
}
