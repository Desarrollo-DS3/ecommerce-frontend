'use client'
import { usePathname } from 'next/navigation'
import { useSidebarState } from '@/app/_states/SidebarState'
import CategoriesList from '@/app/_components/ui/sidebar/CategoriesList'

export default function Sidebar() {
  const pathname = usePathname()
  const { isOpen, setIsOpen } = useSidebarState() // Asegúrate de que setIsOpen esté disponible

  return (
    <div>
      {isOpen && pathname === '/' && (
        <div className='fixed inset-0 bg-black bg-opacity-60 flex z-50'>
          <div className='relative w-64 bg-gray-900 text-white py-24 px-6 shadow-md'>
            {/* Botón de cierre */}
            <button
              onClick={() => setIsOpen(false)}
              className='absolute top-4 right-4 bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition'
            >
              X
            </button>

            <CategoriesList />
          </div>
        </div>
      )}
    </div>
  )
}
