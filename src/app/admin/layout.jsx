'use client'
import AdminSidebar from '@/app/admin/_components/AdminSidebar'
import { AuthProvider } from '@/app/_contexts/auth'
import withAuth from '@/app/_utils/withAuth'

const roles = ['warehouse_assistant', 'warehouse_manager', 'admin']

function AdminLayout({ children }) {
  return (
    <div className='flex h-screen'>
      <AuthProvider>
        <AdminSidebar />
        <div className='flex flex-col flex-1'>{children}</div>
      </AuthProvider>
    </div>
  )
}

export default withAuth(AdminLayout, { authorizedRoles: roles })
