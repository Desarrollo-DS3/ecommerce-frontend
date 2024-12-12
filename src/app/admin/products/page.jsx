'use client'

import { useState, useEffect, useContext } from 'react'
import MainContent from '@/app/admin/_components/MainContent'
import ProductItem from '@/app/admin/products/_components/ProductItem'
import ProductCreateForm from '@/app/admin/products/_components/ProductsCreateForm.jsx'
import { listProducts } from '@/app/_api/stock'
import LoadingOverlay from '@/app/_components/ui/LoadingOverlay'
import { AuthContext } from '@/app/_contexts/auth'

export default function AdminProductsPage() {
  const { token, isInitializing } = useContext(AuthContext)
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchProducts = (currentToken) => {
    setLoading(true)
    listProducts(currentToken)
      .then((products) => setItems(products))
      .catch((error) => {
        console.error('Error fetching products:', error)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    if (!isInitializing && token) {
      fetchProducts(token)
    }
  }, [isInitializing, token])

  const CreateComponent = (props) => (
    <ProductCreateForm
      {...props}
      token={token}
      refreshProducts={() => fetchProducts(token)}
    />
  )

  if (isInitializing || loading) return <LoadingOverlay />

  return (
    <MainContent
      items={items}
      ItemComponent={(itemProps) => (
        <ProductItem {...itemProps} token={token} />
      )}
      CreateComponent={CreateComponent}
    />
  )
}
