'use client'
import ProductsGrid from '@/app/_components/products/ProductsGrid'
import withAuth from '@/app/_utils/withAuth'

function Home() {
  return (
    <div className='h-full w-full'>
      <ProductsGrid />
    </div>
  )
}

export default withAuth(Home, { requireAuth: true, redirectTo: '/register' })
