'use client'

import { useEffect, useState, useContext } from 'react'
import MainContent from '@/app/admin/_components/MainContent'
import CategoryItem from '@/app/admin/categories/_components/CategoryItem'
import CategoryCreateForm from '@/app/admin/categories/_components/CategoriesCreateForm.jsx'
import { listCategories } from '@/app/_api/stock'
import LoadingOverlay from '@/app/_components/ui/LoadingOverlay'
import { AuthContext } from '@/app/_contexts/auth'

export default function AdminCategoriesPage() {
  const { token, isInitializing } = useContext(AuthContext)
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchCategories = (currentToken) => {
    setLoading(true)
    listCategories(currentToken)
      .then((categories) => setItems(categories))
      .catch((error) => {
        console.error('Error fetching categories:', error)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    if (!isInitializing && token) {
      fetchCategories(token)
    }
  }, [isInitializing, token])

  const CreateComponent = (props) => (
    <CategoryCreateForm
      {...props}
      token={token}
      refreshCategories={() => fetchCategories(token)}
    />
  )

  if (isInitializing || loading) return <LoadingOverlay />

  return (
    <MainContent
      items={items}
      ItemComponent={(itemProps) => (
        <CategoryItem {...itemProps} token={token} />
      )}
      CreateComponent={CreateComponent}
    />
  )
}
