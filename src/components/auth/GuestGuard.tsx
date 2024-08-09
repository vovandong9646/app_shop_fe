// ** React Imports
import { ReactNode, ReactElement, useEffect } from 'react'
import { useAuth } from 'src/hooks/useAuth'
import { useRouter } from 'next/router'
import authConfig from 'src/configs/auth'

interface GuestGuardProps {
  children: ReactNode
  fallback: ReactElement | null
}

const GuestGuard = (props: GuestGuardProps) => {
  const { children, fallback } = props

  const authContext = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) {
      return
    }
    // da login roi
    if (window.localStorage.getItem(authConfig.storageTokenKeyName) && window.localStorage.getItem('userData')) {
      router.replace({ pathname: '/' })
    }
  }, [router.route])

  if (authContext.loading || (!authContext.loading && authContext.user !== null)) {
    return fallback
  }

  return <>{children}</>
}

export default GuestGuard
