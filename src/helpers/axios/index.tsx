import axios from 'axios'
import { jwtDecode, JwtPayload } from 'jwt-decode'
import { NextRouter, useRouter } from 'next/router'
import { FC } from 'react'
import { CONFIG_API } from 'src/configs/api'
import { UserDataType } from 'src/contexts/types'
import { clearLocalUserData, getLocalUserData } from 'src/helpers/storage'
import { useAuth } from 'src/hooks/useAuth'

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
})

const handleRedirectLogin = (router: NextRouter, setUser: (data: UserDataType | null) => void) => {
  if (router.asPath != '/') {
    router.replace({
      pathname: '/login',
      query: { returnUrl: router.asPath }
    })
  } else {
    router.replace('/login')
  }
  setUser(null)
  clearLocalUserData()
}

type TAxiosProps = {
  children: React.ReactNode
}
const AxiosInterceptor: FC<TAxiosProps> = ({ children }) => {
  const router = useRouter()
  const { setUser } = useAuth()
  const { refreshToken, accessToken } = getLocalUserData()

  axiosInstance.interceptors.request.use(async config => {
    // 1.check accessToken đã hết hạn chưa
    // 1.1. Chưa hết hạn
    // 1.1.1. set token vao header của config axios
    // 1.2. Hết hạn
    // 1.2.1. check refreshToken hết hạn chưa
    // 1.2.1.1. chưa hết hạn
    // 1.2.1.1.1. call API get accessToken với refreshToken (refreshToken)
    // 1.2.1.2. hết hạn
    // 1.2.1.2.1. Redirect người dùng về trang login

    if (accessToken) {
      // decode jsonwebtoken de get expires
      const decodedAccessToken: JwtPayload = jwtDecode(accessToken)
      // chua het han accessToken
      if (decodedAccessToken?.exp > Date.now() / 1000) {
        config.headers['Authorization'] = `Bearer ${accessToken}`
      } else {
        // het han accessToken
        if (!refreshToken) {
          return handleRedirectLogin(router, setUser)
        }
        const decodedRefreshToken: JwtPayload = jwtDecode(refreshToken)
        if (decodedRefreshToken.exp > Date.now() / 1000) {
          // call api get accessToken với refreshToken

          await axios
            .post(`${CONFIG_API.AUTH.INDEX}/refresh-token`, null, {
              headers: {
                Authorization: `Bearer ${refreshToken}`
              }
            })
            .then(res => {
              console.log(res)
            })
            .catch(err => console.log(err))
        } else {
          // refreshToken het han
          // redirect ve login
          handleRedirectLogin(router, setUser)
        }
      }
    }

    return config
  })

  axiosInstance.interceptors.response.use(response => {
    return response
  })

  return <>{children}</>
}

export default axiosInstance
export { AxiosInterceptor }
