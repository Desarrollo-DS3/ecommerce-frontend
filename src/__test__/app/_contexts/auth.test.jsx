import React from 'react'
import { render, act, screen } from '@testing-library/react'
import Cookies from 'js-cookie'
import { AuthProvider, AuthContext } from '@/app/_contexts/auth'

// Mock de `js-cookie`
jest.mock('js-cookie', () => ({
  get: jest.fn(),
  set: jest.fn(),
  remove: jest.fn()
}))

// Mock de `next/navigation`
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn()
  }))
}))

describe('AuthProvider', () => {
  test('debería verificar si el usuario está autenticado al cargar', async () => {
    Cookies.get.mockReturnValue('mocked_token') // Simula un token almacenado

    let isLoggedIn
    render(
      <AuthProvider>
        <AuthContext.Consumer>
          {(value) => {
            isLoggedIn = value.isLoggedIn
            return null
          }}
        </AuthContext.Consumer>
      </AuthProvider>
    )

    // Verifica que el estado inicial sea autenticado
    expect(isLoggedIn).toBe(true)
  })

  test('debería limpiar el estado al cerrar sesión', () => {
    const mockRouterPush = jest.fn()
    Cookies.get.mockReturnValue('mocked_token') // Simula un token almacenado
    jest.spyOn(require('next/navigation'), 'useRouter').mockReturnValue({
      push: mockRouterPush
    })

    let logout
    render(
      <AuthProvider>
        <AuthContext.Consumer>
          {(value) => {
            logout = value.logout
            return null
          }}
        </AuthContext.Consumer>
      </AuthProvider>
    )

    act(() => {
      logout()
    })

    // Verifica que las cookies sean eliminadas y el usuario redirigido
    expect(Cookies.remove).toHaveBeenCalledWith('frontend_access_token')
    expect(mockRouterPush).toHaveBeenCalledWith('/')
  })
})
