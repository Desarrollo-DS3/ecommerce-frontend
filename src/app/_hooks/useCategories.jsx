'use client'
import { useContext } from 'react'
import { CategoriesContext } from '@/app/_contexts/categories'
// Hook para consumir el contexto de categorías
export function useCategories() {
  const { categories, setCategories } = useContext(CategoriesContext)
  return { categories, setCategories }
}
