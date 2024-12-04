'use client'
import { useContext } from 'react'
import { AuthContext } from '@/app/_contexts/auth'

export function useAuth() {
  const { isLoggedIn, token, user, login, logout } = useContext(AuthContext)

  return { isLoggedIn, token, user, login, logout }
}
