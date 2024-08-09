import { ILoginParam } from 'src/types/auth'
import axios from 'axios'
import { CONFIG_API } from 'src/configs/api'

export const loginAuth = async (data: ILoginParam) => {
  try {
    const res = await axios.post(`${CONFIG_API.AUTH.INDEX}/login`, data)
    return res.data
  } catch (err) {
    console.log(err)
    return null
  }
}

export const logoutAuth = async () => {
  try {
    const res = await axios.post(`${CONFIG_API.AUTH.INDEX}/logout`)
    return res.data
  } catch (err) {
    console.log(err)
    return null
  }
}
