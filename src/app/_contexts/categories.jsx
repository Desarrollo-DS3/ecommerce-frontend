'use client'

import { createContext, useState, useEffect, useContext } from 'react'
import { listCategories } from '@/app/_api/stock'
import { AuthContext } from '@/app/_contexts/auth'

export const CategoriesContext = createContext()

export function CategoriesProvider({ children }) {
  const { token, isInitializing } = useContext(AuthContext)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    if (!isInitializing && token && categories.length === 0) {
      listCategories(token)
        .then((fetchedCategories) => {
          const allCategory = {
            id: -1,
            name: 'all',
            description: 'All categories'
          }
          setCategories([allCategory, ...fetchedCategories])
        })
        .catch((error) => {
          console.error('Error fetching categories:', error)
        })
    }
  }, [categories, token, isInitializing])

  return (
    <CategoriesContext.Provider value={{ categories, setCategories }}>
      {children}
    </CategoriesContext.Provider>
  )
}
