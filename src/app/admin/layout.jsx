import AdminSidebar from '@/app/admin/_components/AdminSidebar'
import { AuthProvider } from '@/app/_contexts/auth'

export default function AdminLayout({ children }) {
  return (
    <div className='flex h-screen'>
      <AuthProvider>
        <AdminSidebar />
        <div className='flex flex-col flex-1'>{children}</div>
      </AuthProvider>
    </div>
  )
}
