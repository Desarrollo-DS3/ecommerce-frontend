'use client'
import { useCategories } from '@/app/_hooks/useCategories'
import { useFilters } from '@/app/_hooks/useFilters'
import { useSidebarState } from '@/app/_states/SidebarState'

export default function CategoriesList() {
  const { categories } = useCategories()
  const { filters, setFilters } = useFilters()
  const { setIsOpen } = useSidebarState()

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
              filters.categoryId === category.id ? 'font-bold' : ''
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
