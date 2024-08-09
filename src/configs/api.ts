const BASE_URL = process.env.NEXT_PUBLIC_APP_API_URL

export const CONFIG_API = {
  AUTH: {
    INDEX: `${BASE_URL}/auth/login`,
    AUTH_ME: `${BASE_URL}/auth/me`
  }
}
