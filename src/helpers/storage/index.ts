import authConfig from 'src/configs/auth'

export const setLocalUserData = (response: { data: { user: any; access_token: string; refresh_token: string } }) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(authConfig.userData, JSON.stringify(response.data.user))
    window.localStorage.setItem(authConfig.accessToken, response.data.access_token)
    window.localStorage.setItem(authConfig.refreshToken, response.data.refresh_token)
  }
}

export const clearLocalUserData = () => {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(authConfig.userData)
    window.localStorage.removeItem(authConfig.accessToken)
    window.localStorage.removeItem(authConfig.refreshToken)
  }
}

export const getLocalUserData = () => {
  if (typeof window !== 'undefined') {
    const userData = window.localStorage.getItem(authConfig.userData)
    const accessToken = window.localStorage.getItem(authConfig.accessToken)
    const refreshToken = window.localStorage.getItem(authConfig.refreshToken)
    return { refreshToken, accessToken, userData }
  }
  return { refreshToken: null, accessToken: null, userData: null }
}
