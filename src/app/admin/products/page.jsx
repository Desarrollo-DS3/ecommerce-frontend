'use client'
import { useEffect, useState } from 'react'
import MainContent from '@/app/admin/_components/MainContent'
import ProductItem from '@/app/admin/products/_components/ProductItem'
import ProductCreateForm from '@/app/admin/products/_components/ProductsCreateForm.jsx'
import { token } from '@/app/_contexts/auth'
import { listProducts } from '@/app/_api/stock'
import LoadingOverlay from '@/app/_components/ui/LoadingOverlay'

export default function AdminProductsPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await listProducts()
        setItems(products)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const CreateComponent = (props) => (
    <ProductCreateForm
      {...props}
      token={token}
      refreshProducts={() => window.location.reload()}
    />
  )

  if (loading) return <LoadingOverlay />

  return (
    <MainContent
      items={items}
      ItemComponent={ProductItem}
      CreateComponent={CreateComponent}
    />
  )
}
