import MainContent from '@/app/admin/_components/MainContent'
import AuxiliaryItem from '@/app/admin/auxiliaries/_components/AuxiliaryItem'
import { loadAuxiliaries } from '@/app/_api/auth'

export default async function AdminArticlesPage() {
  const items = await loadAuxiliaries()

  return (
    <>
      <MainContent items={items} ItemComponent={AuxiliaryItem} />
    </>
  )
}
