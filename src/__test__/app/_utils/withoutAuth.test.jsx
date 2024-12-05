import { render, screen, act } from '@testing-library/react'
import { AuthContext } from '@/app/_contexts/auth'
import withoutAuth from '@/app/_utils/withoutAuth'
import { useRouter } from 'next/navigation'

// Mock del componente que envuelve
const MockComponent = () => <div>Public Content</div>

jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}))

describe('withoutAuth', () => {
  const MockComponentWithoutAuth = withoutAuth(MockComponent)

  test('debería redirigir si el usuario está autenticado', () => {
    const mockPush = jest.fn()
    useRouter.mockReturnValue({ push: mockPush })

    const mockAuthContext = {
      isAuthenticated: jest.fn().mockReturnValue(true)
    }

    render(
      <AuthContext.Provider value={mockAuthContext}>
        <MockComponentWithoutAuth />
      </AuthContext.Provider>
    )

    expect(mockPush).toHaveBeenCalledWith('/')
  })

  test('debería renderizar el componente si el usuario no está autenticado', () => {
    const mockAuthContext = {
      isAuthenticated: jest.fn().mockReturnValue(false)
    }

    render(
      <AuthContext.Provider value={mockAuthContext}>
        <MockComponentWithoutAuth />
      </AuthContext.Provider>
    )

    expect(screen.getByText('Public Content')).toBeInTheDocument()
  })
})
