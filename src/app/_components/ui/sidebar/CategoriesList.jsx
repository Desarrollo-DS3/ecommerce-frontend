'use client'
import { useState, useEffect } from 'react'
import { useFilters } from '@/app/_hooks/useFilters'
import { useSidebarState } from '@/app/_states/SidebarState'
import { loadCategories } from '@/app/_api/stock'

export default function CategoriesList() {
  const { filters, setFilters } = useFilters()
  const { setIsOpen } = useSidebarState()
  const [categories, setCategories] = useState([])

  useEffect(() => {
    loadCategories().then((categories) => {
      const allCategory = {
        id: -1,
        name: 'all',
        description: 'all'
      }
      setCategories([allCategory, ...categories])
    })
  }, [])

  const handleCategoryChange = (categoryId) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      categoryId
    }))
    setIsOpen(false)
  }

  return (
    <div>
      <h2 className='text-lg font-bold mb-4'>Categorías</h2>
      <ul>
        {categories.map((category) => (
          <li
            key={category.id}
            className={`cursor-pointer ${
              filters.category === category.name ? 'font-bold' : ''
            }`}
            onClick={() => handleCategoryChange(category.id)}
          >
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  )
}
