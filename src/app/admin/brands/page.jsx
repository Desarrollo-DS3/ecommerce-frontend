import MainContent from '@/app/admin/_components/MainContent'
import BrandItem from '@/app/admin/brands/_components/BrandItem'
import { listBrands } from '@/app/_api/stock'

export default async function AdminBrandsPage() {
  const items = await listBrands()

  return (
    <>
      <MainContent items={items} ItemComponent={BrandItem} />
    </>
  )
}
