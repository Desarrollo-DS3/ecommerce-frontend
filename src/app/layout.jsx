import './globals.css'
import { FiltersProvider } from '@/app/_contexts/filters'
// import Navbar from '@/app/_components/ui/Navbar'
// import Sidebar from '@/app/_components/ui/sidebar/Sidebar'
// import LoginModal from '@/app/_components/form/LoginModal'
import { AuthProvider } from './_contexts/auth'

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js'
}

export default function RootLayout({ children }) {
  return (
    <html lang='es'>
      <body className='flex h-full'>
        <AuthProvider>
          <FiltersProvider>
            {/* <Navbar />
            <Sidebar />
            <LoginModal /> */}
            {children}
          </FiltersProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
