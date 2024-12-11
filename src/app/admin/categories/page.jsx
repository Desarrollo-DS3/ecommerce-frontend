'use client'
import { useEffect, useState } from 'react'
import MainContent from '@/app/admin/_components/MainContent'
import CategoryItem from '@/app/admin/categories/_components/CategoryItem'
import CategoryCreateForm from '@/app/admin/categories/_components/CategoriesCreateForm.jsx'
import { token } from '@/app/_contexts/auth'
import { listCategories } from '@/app/_api/stock'

export default function AdminCategoriesPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categories = await listCategories()
        setItems(categories)
      } catch (error) {
        console.error('Error fetching categories:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const CreateComponent = (props) => (
    <CategoryCreateForm
      {...props}
      token={token}
      refreshCategories={() => window.location.reload()}
    />
  )

  if (loading) return <p>Loading...</p>

  return (
    <MainContent
      items={items}
      ItemComponent={CategoryItem}
      CreateComponent={CreateComponent}
    />
  )
}
