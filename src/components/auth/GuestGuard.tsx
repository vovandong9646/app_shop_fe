// ** React Imports
import { useRouter } from 'next/router'
import { ReactElement, ReactNode, useEffect } from 'react'
import authConfig from 'src/configs/auth'
import { useAuth } from 'src/hooks/useAuth'

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
    if (window.localStorage.getItem(authConfig.accessToken) && window.localStorage.getItem(authConfig.userData)) {
      router.replace({ pathname: '/' })
    }
  }, [router.route])

  if (authContext.loading || (!authContext.loading && authContext.user !== null)) {
    return fallback
  }

  return <>{children}</>
}

export default GuestGuard
