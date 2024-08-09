import { ILoginParam } from 'src/types/auth'
import axios from 'axios'
import { CONFIG_API } from 'src/configs/api'

export const loginAuth = async (data: ILoginParam) => {
  try {
    const res = await axios.post(CONFIG_API.AUTH.INDEX, data)
    return res.data
  } catch (err) {
    console.log(err)
    return null
  }
}
