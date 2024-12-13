'use client'

import { useEffect, useState, useContext } from 'react'
import MainContent from '@/app/admin/_components/MainContent'
import BrandItem from '@/app/admin/brands/_components/BrandItem'
import BrandCreateForm from '@/app/admin/brands/_components/BrandCreateForm'
import { listBrands } from '@/app/_api/stock'
import LoadingOverlay from '@/app/_components/ui/LoadingOverlay'
import { AuthContext } from '@/app/_contexts/auth'

export default function AdminBrandsPage() {
  const { token, isInitializing } = useContext(AuthContext)
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchBrands = (currentToken) => {
    setLoading(true)
    listBrands(currentToken)
      .then((brands) => setItems(brands))
      .catch((error) => {
        console.error('Error fetching brands:', error)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    if (!isInitializing && token) {
      fetchBrands(token)
    }
  }, [isInitializing, token])

  const CreateComponent = (props) => (
    <BrandCreateForm
      {...props}
      token={token}
      refreshBrands={() => fetchBrands(token)}
    />
  )

  if (isInitializing || loading) return <LoadingOverlay />

  return (
    <MainContent
      items={items}
      ItemComponent={(itemProps) => <BrandItem {...itemProps} token={token} />}
      CreateComponent={CreateComponent}
    />
  )
}
