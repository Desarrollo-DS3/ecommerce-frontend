import React from 'react'
import { renderHook } from '@testing-library/react'
import { AuthProvider, AuthContext } from '@/app/_contexts/auth'
import { useAuth } from '@/app/_hooks/useAuth'

// Mock de useRouter
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn()
  }))
}))

describe('useAuth', () => {
  test('debería proporcionar los valores de autenticación', () => {
    const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>

    const { result } = renderHook(() => useAuth(), { wrapper })

    expect(result.current).toHaveProperty('isLoggedIn', false) // Estado inicial
    expect(result.current).toHaveProperty('token', null)
    expect(result.current).toHaveProperty('user', null)
    expect(result.current).toHaveProperty('login')
    expect(result.current).toHaveProperty('logout')
  })
})
