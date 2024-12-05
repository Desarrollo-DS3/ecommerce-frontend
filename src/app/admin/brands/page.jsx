import MainContent from '@/app/admin/_components/MainContent'
import BrandItem from '@/app/admin/brands/_components/BrandItem'
import { loadBrands } from '@/app/_api/stock'

export default async function AdminBrandsPage() {
  const items = await loadBrands()

  return (
    <>
      <MainContent items={items} ItemComponent={BrandItem} />
    </>
  )
}
