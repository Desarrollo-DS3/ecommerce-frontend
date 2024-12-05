import MainContent from '@/app/admin/_components/MainContent'
import CategoryItem from '@/app/admin/categories/_components/CategoryItem'
import { loadCategories } from '@/app/_api/stock'

export default async function AdminCategoriesPage() {
  const items = await loadCategories()

  return (
    <>
      <MainContent items={items} ItemComponent={CategoryItem} />
    </>
  )
}
