import MainContent from '@/app/admin/_components/MainContent'
import CategoryItem from '@/app/admin/categories/_components/CategoryItem'
import { listCategories } from '@/app/_api/stock'

export default async function AdminCategoriesPage() {
  const items = await listCategories()

  return (
    <>
      <MainContent items={items} ItemComponent={CategoryItem} />
    </>
  )
}
