import { render, screen, fireEvent } from '@testing-library/react'
import Navbar from '@/app/_components/ui/Navbar'
import { usePathname } from 'next/navigation'
import { useAppInfoState } from '@/app/_states/AppInfoState'
import { useSidebarState } from '@/app/_states/SidebarState'
import { useLoginModalState } from '@/app/_states/LoginFormState'
import { useFilters } from '@/app/_hooks/useFilters'
import { useAuth } from '@/app/_hooks/useAuth'

jest.mock('next/navigation', () => ({
  usePathname: jest.fn()
}))

jest.mock('@/app/_states/AppInfoState', () => ({
  useAppInfoState: jest.fn()
}))

jest.mock('@/app/_states/SidebarState', () => ({
  useSidebarState: jest.fn()
}))

jest.mock('@/app/_states/LoginFormState', () => ({
  useLoginModalState: jest.fn()
}))

jest.mock('@/app/_hooks/useFilters', () => ({
  useFilters: jest.fn()
}))

jest.mock('@/app/_hooks/useAuth', () => ({
  useAuth: jest.fn()
}))

jest.mock('react-svg', () => ({
  ReactSVG: ({ src, alt }) => <svg data-testid={alt} />
}))

describe('Navbar', () => {
  beforeEach(() => {
    usePathname.mockReturnValue('/')
    useAppInfoState.mockReturnValue({ companyName: 'Test Company' })
    useSidebarState.mockReturnValue({ isOpen: false, setIsOpen: jest.fn() })
    useLoginModalState.mockReturnValue({ turnOn: jest.fn() })
    useFilters.mockReturnValue({
      filters: { includedString: '' },
      setFilters: jest.fn()
    })
    useAuth.mockReturnValue({ isLoggedIn: false, logout: jest.fn() })
  })

  test('debería mostrar el nombre de la empresa', () => {
    render(<Navbar />)
    expect(screen.getByText('Test Company')).toBeInTheDocument()
  })

  test('debería mostrar el mensaje "Hola, Inicia sesión" si el usuario no ha iniciado sesión', () => {
    render(<Navbar />)
    expect(screen.getByText('Hola, Inicia sesión')).toBeInTheDocument()
  })

  test('debería mostrar el input de búsqueda en la página principal', () => {
    render(<Navbar />)
    expect(screen.getByPlaceholderText('Buscar...')).toBeInTheDocument()
  })

  test('debería deshabilitar el dropdown después de salir del hover', async () => {
    const { getByText, queryByText } = render(<Navbar />)

    fireEvent.mouseEnter(getByText('Hola, Inicia sesión'))
    expect(queryByText('Iniciar sesión')).toBeInTheDocument()

    fireEvent.mouseLeave(getByText('Hola, Inicia sesión'))

    await new Promise((resolve) => setTimeout(resolve, 300))

    expect(queryByText('Iniciar sesión')).not.toBeInTheDocument()
  })

  test('debería mostrar el botón del carrito si el usuario ha iniciado sesión', () => {
    useAuth.mockReturnValueOnce({ isLoggedIn: true, logout: jest.fn() })
    const { getByTestId } = render(<Navbar />)
    expect(getByTestId('cart-button')).toBeInTheDocument()
  })
})
