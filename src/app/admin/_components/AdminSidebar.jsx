'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function AdminSidebar() {
  const pathname = usePathname()

  const basePath = '/admin'
  const paths = [
    ['/auxiliaries', 'Auxiliares'],
    ['/products', 'Productos'],
    ['/categories', 'Categorías'],
    ['/brands', 'Marcas']
  ]

  return (
    <div className='bg-gray-800 text-white w-60 h-full flex flex-col'>
      <nav className='mt-6 space-y-4'>
        {paths.map(([path, name]) => (
          <NavItem
            key={path}
            href={`${basePath}${path}`}
            text={name}
            selected={pathname.startsWith(`${basePath}${path}`)}
          />
        ))}
      </nav>
    </div>
  )
}

function NavItem({ text, href, selected }) {
  return (
    <Link
      className={`flex items-center pl-4 py-2 cursor-pointer ${
        selected ? 'bg-gray-700' : 'hover:bg-gray-700'
      }`}
      href={href}
    >
      <span>{text}</span>
    </Link>
  )
}
