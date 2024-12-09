'use client'

import { createContext, useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { login as apiLogin } from '@/app/_api/auth'

const ACCESS_TOKEN = 'frontend_access_token'
const USER_ROLE = 'frontend_user_role'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const [role, setRole] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const storedToken = Cookies.get(ACCESS_TOKEN)
    const storedRole = Cookies.get(USER_ROLE)

    if (storedToken) {
      setIsLoggedIn(true)
      setToken(storedToken)
      setRole(storedRole || null)
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

      const {
        token: accessToken,
        user: userInfo,
        role: userRole
      } = await apiLogin({
        email,
        password
      })

      if (!accessToken || !userRole) {
        setLoginError('Error al procesar la respuesta del servidor.')
        return
      }

      setIsLoggedIn(true)
      setToken(accessToken)
      setUser(userInfo)
      setRole(userRole)

      Cookies.set(ACCESS_TOKEN, accessToken, {
        path: '/',
        secure: true,
        sameSite: 'strict',
        expires: 365 * 5
      })

      Cookies.set(USER_ROLE, userRole, {
        path: '/',
        secure: true,
        sameSite: 'strict',
        expires: 365 * 5
      })

      console.log('Inicio de sesión exitoso:', { accessToken, userRole })
      router.push('/')
    } catch (error) {
      setLoginError('Credenciales incorrectas. Intenta nuevamente.')
      console.error('[authContext] Error en login:', error)
    }
  }

  const logout = () => {
    setIsLoggedIn(false)
    setToken(null)
    setUser(null)
    setRole(null)
    Cookies.remove(ACCESS_TOKEN)
    Cookies.remove(USER_ROLE)
    router.push('/')
  }

  const isAuthenticated = () => Boolean(Cookies.get(ACCESS_TOKEN))

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, token, user, role, login, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  )
}
