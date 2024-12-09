'use client'
import { createContext, useState, useEffect } from 'react'
import { listCategories } from '@/app/_api/stock'

// 1. Crear el contexto de categorías
export const CategoriesContext = createContext()

// 2. Proveedor del contexto
export function CategoriesProvider({ children }) {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    if (categories.length === 0) {
      listCategories().then((fetchedCategories) => {
        const allCategory = {
          id: -1,
          name: 'all',
          description: 'All categories'
        }
        setCategories([allCategory, ...fetchedCategories])
      })
    }
  }, [categories])

  return (
    <CategoriesContext.Provider value={{ categories, setCategories }}>
      {children}
    </CategoriesContext.Provider>
  )
}
