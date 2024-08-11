// ** React Imports
import { useRouter } from 'next/router'
import { ReactElement, ReactNode, useEffect } from 'react'
import authConfig from 'src/configs/auth'
import { useAuth } from 'src/hooks/useAuth'

interface AuthGuardProps {
  children: ReactNode
  fallback: ReactElement | null
}

const AuthGuard = (props: AuthGuardProps) => {
  const { children, fallback } = props

  const authContext = useAuth()
  const router = useRouter()

  useEffect(() => {
    // check page da render chua
    if (!router.isReady) {
      return
    }
    // check neu chua login
    if (
      authContext.user === null &&
      !window.localStorage.getItem(authConfig.accessToken) &&
      !window.localStorage.getItem(authConfig.userData)
    ) {
      // nếu page trước đó không phải là trang chủ
      if (router.asPath !== '/') {
        // sau khi login xong sẽ redirect về chính trang đó
        router.replace({
          pathname: '/login',
          query: { returnUrl: router.asPath }
        })
      } else {
        // sau khi login xong sẽ chuyển về trang chủ
        router.replace('/login')
      }
      // clear thông tin login trước đó
      window.localStorage.removeItem(authConfig.accessToken)
      window.localStorage.removeItem(authConfig.userData)
      authContext.setUser(null)
    }
  }, [router.route])

  // vì useEffect chạy sau render, nên children sẽ render trươcs rồi useEffect sẽ chạy, do đó sẽ thấy trang children trươcs rồi mơi redirect sang login
  // để fix việc này, thì cho nó hiẻn thị cái hình loading là được
  if (authContext.loading || authContext.user === null) {
    return fallback
  }

  return <>{children}</>
}

export default AuthGuard
