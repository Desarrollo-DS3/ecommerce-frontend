'use client'

import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AuthContext } from '@/app/_contexts/auth'

export default function withAuth(Component) {
  return function WithAuth(props) {
    const { isAuthenticated } = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
      if (isAuthenticated()) {
        router.push('/')
      } else {
        setIsLoading(false)
      }
    }, [isAuthenticated, router])

    if (isLoading) {
      return null
    }

    return <Component {...props} />
  }
}
