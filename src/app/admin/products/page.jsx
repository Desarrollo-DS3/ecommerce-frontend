import MainContent from '@/app/admin/_components/MainContent'
import ProductItem from '@/app/admin/products/_components/ProductItem'
import { listProducts } from '@/app/_api/stock'

export default async function AdminProductsPage() {
  const items = await listProducts()

  return (
    <>
      <MainContent items={items} ItemComponent={ProductItem} />
    </>
  )
}
