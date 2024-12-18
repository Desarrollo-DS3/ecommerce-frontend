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
  const [isInitializing, setIsInitializing] = useState(true)
  const router = useRouter()

  const initializeAuthState = () => {
    try {
      const storedToken = Cookies.get(ACCESS_TOKEN)
      const storedRole = Cookies.get(USER_ROLE)

      if (storedToken) {
        setIsLoggedIn(true)
        setToken(decodeURIComponent(storedToken))
        setRole(storedRole || null)
      } else {
        setIsLoggedIn(false)
        setToken(null)
        setRole(null)
      }
    } catch (error) {
      console.error('[authContext] Error al inicializar el estado:', error)
      setIsLoggedIn(false)
      setToken(null)
      setRole(null)
    } finally {
      setIsInitializing(false)
    }
  }

  useEffect(() => {
    initializeAuthState()
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
      } = await apiLogin({ email, password })

      if (!accessToken || !userRole) {
        setLoginError('Error al procesar la respuesta del servidor.')
        return
      }

      setIsLoggedIn(true)
      setToken(accessToken)
      setUser(userInfo)
      setRole(userRole)

      Cookies.set(ACCESS_TOKEN, encodeURIComponent(accessToken), {
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

      router.push('/')
    } catch (error) {
      setLoginError('Verifique las credenciales e intente nuevamente.')
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
      value={{
        isLoggedIn,
        token,
        user,
        role,
        isInitializing,
        login,
        logout,
        isAuthenticated
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
