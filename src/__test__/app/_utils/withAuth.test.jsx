import { render, screen } from '@testing-library/react'
import { AuthContext } from '@/app/_contexts/auth'
import withAuth from '@/app/_utils/withAuth'
import { useRouter } from 'next/navigation'

// Mock del componente que envuelve
const MockComponent = () => <div>Protected Content</div>

jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}))

describe('withAuth', () => {
  const MockComponentWithAuth = withAuth(MockComponent)

  test('debería redirigir si el usuario no está autenticado', () => {
    const mockPush = jest.fn()
    useRouter.mockReturnValue({ push: mockPush })

    // Contexto simulado: no autenticado
    const mockAuthContext = {
      isInitializing: false,
      isAuthenticated: jest.fn().mockReturnValue(false),
      role: null
    }

    render(
      <AuthContext.Provider value={mockAuthContext}>
        <MockComponentWithAuth />
      </AuthContext.Provider>
    )

    expect(mockPush).toHaveBeenCalledWith('/')
  })

  test('debería renderizar el componente si el usuario está autenticado', () => {
    // Contexto simulado: autenticado
    const mockAuthContext = {
      isInitializing: false,
      isAuthenticated: jest.fn().mockReturnValue(true),
      role: 'user' // Puedes agregar cualquier rol aquí si es necesario
    }

    render(
      <AuthContext.Provider value={mockAuthContext}>
        <MockComponentWithAuth />
      </AuthContext.Provider>
    )

    expect(screen.getByText('Protected Content')).toBeInTheDocument()
  })
})
