'use client'
import { useEffect, useState } from 'react'
import MainContent from '@/app/admin/_components/MainContent'
import BrandItem from '@/app/admin/brands/_components/BrandItem'
import BrandCreateForm from '@/app/admin/brands/_components/BrandCreateForm'
import { token } from '@/app/_contexts/auth'
import { listBrands } from '@/app/_api/stock'
import LoadingOverlay from '@/app/_components/ui/LoadingOverlay'

export default function AdminBrandsPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const brands = await listBrands()
        setItems(brands)
      } catch (error) {
        console.error('Error fetching brands:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const CreateComponent = (props) => (
    <BrandCreateForm
      {...props}
      token={token}
      refreshBrands={() => window.location.reload()}
    />
  )

  if (loading) return <LoadingOverlay />

  return (
    <MainContent
      items={items}
      ItemComponent={BrandItem}
      CreateComponent={CreateComponent}
    />
  )
}
