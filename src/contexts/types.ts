export type ErrCallbackType = (err: { [key: string]: string }) => void

export type LoginParams = {
  email: string
  password: string
  rememberMe?: boolean
}

export type UserDataType = {
  id?: number
  role: {
    _id: string
    name: string
    permissions: string[]
  }
  email: string
  firstName: string
  middleName: string
  lastName: string
  password?: string
  phoneNumber?: string
  address?: string
  city?: string
  avatar?: string | null
}

export type AuthValuesType = {
  loading: boolean
  logout: () => void
  user: UserDataType | null
  setLoading: (value: boolean) => void
  setUser: (value: UserDataType | null) => void
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void
}
