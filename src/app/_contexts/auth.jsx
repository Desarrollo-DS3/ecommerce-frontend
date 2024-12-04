'use client'

import { createContext, useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { login as apiLogin } from '@/app/_api/auth'

const ACCESS_TOKEN = 'frontend_access_token'

// 1. Crear el contexto de autenticación
export const AuthContext = createContext()

// 2. Crear el proveedor de autenticación
export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const router = useRouter()

  // Verificar si el usuario ya está autenticado al cargar la aplicación
  useEffect(() => {
    const storedToken = Cookies.get(ACCESS_TOKEN)
    if (storedToken) {
      setIsLoggedIn(true)
      setToken(storedToken)
      // TODO: Obtener información extra del usuario
    } else {
      setIsLoggedIn(false)
    }
  }, [])

  const login = async (email, password, setLoginError) => {
    try {
      if (!email || !password) {
        setLoginError('Por favor ingresa un correo y una contraseña.')
        return
      }

      const response = await apiLogin({ email, password })
      const { access_token, user: userInfo } = response

      setIsLoggedIn(true)
      setToken(access_token.access)
      setUser(userInfo)
      Cookies.set(ACCESS_TOKEN, access_token.access, {
        path: '/',
        secure: true,
        sameSite: 'strict',
        expires: 365 * 5
      })

      console.log('Inicio de sesión exitoso:', response)
      router.push('/')
    } catch (error) {
      setLoginError('Credenciales incorrectas. Intenta nuevamente.')
      console.error(error)
    }
  }

  const logout = () => {
    setIsLoggedIn(false)
    setToken(null)
    setUser(null)
    Cookies.remove(ACCESS_TOKEN)
    router.push('/')
  }

  const isAuthenticated = () => {
    return Boolean(Cookies.get(ACCESS_TOKEN))
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, token, user, login, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  )
}
