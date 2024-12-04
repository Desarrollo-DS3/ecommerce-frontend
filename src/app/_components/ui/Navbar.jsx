'use client'
import { useState, useRef } from 'react'
import { ReactSVG } from 'react-svg'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import ic from '@/app/_config/assets.json'
import { useAppInfoState } from '@/app/_states/AppInfoState'
import { useSidebarState } from '@/app/_states/SidebarState'
import { useLoginModalState } from '@/app/_states/LoginFormState'
import { useFilters } from '@/app/_hooks/useFilters'
import { useAuth } from '@/app/_hooks/useAuth'

export default function Navbar() {
  const pathname = usePathname()
  const { companyName } = useAppInfoState()
  const [isDropdownOpen, setDropdownOpen] = useState(false)
  const dropdownTimeout = useRef(null)
  const { turnOn: turnOnLoginModal } = useLoginModalState()
  const { isOpen, setIsOpen } = useSidebarState()
  const { filters, setFilters } = useFilters()
  const { isLoggedIn, logout } = useAuth() // Usar contexto de autenticación

  const handleMouseEnter = () => {
    clearTimeout(dropdownTimeout.current)
    setDropdownOpen(true)
  }

  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => setDropdownOpen(false), 150)
  }

  const handleSearchChange = (e) => {
    setFilters((prevState) => ({
      ...prevState,
      includedString: e.target.value
    }))
  }

  return (
    <nav className='w-full z-50 flex items-center px-6 py-4 bg-orange-500 shadow-md h-16'>
      {/* company name */}
      <div className='text-xl font-bold text-white mr-6'>
        <Link href='/'>{companyName}</Link>
      </div>

      {/* menu button */}
      {pathname === '/' && (
        <>
          <button
            className='flex items-center space-x-2 text-white hover:text-gray-900 transition mr-6'
            onClick={() => {
              setIsOpen(!isOpen)
            }}
          >
            <ReactSVG
              className='fill-none text-white hover:text-gray-900 transition'
              src={ic.ui.menu}
              alt='menu'
            />
          </button>

          {/* search bar */}
          <div className='flex items-center flex-grow mr-6'>
            <input
              type='text'
              value={filters.includedString}
              onChange={handleSearchChange}
              placeholder='Buscar...'
              className='w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500'
            />
          </div>
        </>
      )}

      <div
        className='relative text-white hover:text-gray-900 transition ml-auto mr-6'
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {isLoggedIn ? <p>Hola, Usuario</p> : <p>Hola, Inicia sesión</p>}
        {isDropdownOpen && (
          <div className='absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg py-2 transition-all duration-200 transform scale-95'>
            {!isLoggedIn && (
              <>
                <Link
                  href='#'
                  onClick={() => {
                    turnOnLoginModal()
                  }}
                  className='block px-4 py-2 hover:bg-gray-100'
                >
                  Iniciar sesión
                </Link>
                <Link
                  href='/register'
                  className='block px-4 py-2 hover:bg-gray-100'
                >
                  Registrarse
                </Link>
              </>
            )}
            {isLoggedIn && (
              <button
                onClick={logout} // Llama directamente a la función del contexto
                className='block px-4 py-2 hover:bg-gray-100'
              >
                Cerrar Sesión
              </button>
            )}
          </div>
        )}
      </div>

      {/* cart button */}
      {isLoggedIn && (
        <div className='mr-6'>
          <Link
            href='/cart'
            className='text-white hover:text-gray-900 transition'
          >
            <ReactSVG
              className='text-white fill-none hover:fill-black'
              src={ic.ui.cart}
              alt='cart-button'
            />
          </Link>
        </div>
      )}
    </nav>
  )
}
