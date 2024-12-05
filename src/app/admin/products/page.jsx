import MainContent from '@/app/admin/_components/MainContent'
import ProductItem from '@/app/admin/products/_components/ProductItem'
import { loadProducts } from '@/app/_api/stock'

export default async function AdminProductsPage() {
  const items = await loadProducts()

  return (
    <>
      <MainContent items={items} ItemComponent={ProductItem} />
    </>
  )
}
