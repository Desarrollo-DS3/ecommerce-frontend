'use client'

import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AuthContext } from '@/app/_contexts/auth'

export default function withAuth(
  Component,
  {
    authorizedRoles = null,
    unauthorizedRoles = null,
    requireAuth = true,
    redirectTo = '/'
  } = {}
) {
  return function WithAuth(props) {
    const { isInitializing, isAuthenticated, role } = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
      if (isInitializing) return

      const isUserAuthenticated = isAuthenticated()

      if (requireAuth && !isUserAuthenticated) {
        router.push(redirectTo)
        return
      }

      if (
        unauthorizedRoles &&
        ((unauthorizedRoles.includes('*') && role) ||
          unauthorizedRoles.includes(role))
      ) {
        router.push(redirectTo)
        return
      }

      if (authorizedRoles && (!role || !authorizedRoles.includes(role))) {
        router.push(redirectTo)
        return
      }

      setIsLoading(false)
    }, [
      isInitializing,
      isAuthenticated,
      role,
      authorizedRoles,
      unauthorizedRoles,
      requireAuth,
      redirectTo,
      router
    ])

    if (isInitializing || isLoading) {
      return <div>Cargando...</div>
    }

    return <Component {...props} />
  }
}
