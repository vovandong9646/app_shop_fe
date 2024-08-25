import axios from 'axios'
import { CONFIG_API } from 'src/configs/api'
import axiosInstance from 'src/helpers/axios'
import { ILoginParam, IRegisterParam } from 'src/types/auth'

export const loginAuth = async (data: ILoginParam) => {
  try {
    const res = await axios.post(`${CONFIG_API.AUTH.INDEX}/login`, data)
    return res.data
  } catch (err) {
    return null
  }
}

export const logoutAuth = async () => {
  try {
    const res = await axios.post(`${CONFIG_API.AUTH.INDEX}/logout`)
    return res.data
  } catch (err) {
    return null
  }
}

export const registerAuth = async (data: IRegisterParam) => {
  try {
    const res = await axios.post(`${CONFIG_API.AUTH.INDEX}/register`, data)
    return res.data
  } catch (err) {
    return err
  }
}

export const updateMe = async (data: any) => {
  try {
    const res = await axiosInstance.put(`${CONFIG_API.AUTH.INDEX}/me`, data)
    return res.data
  } catch (err) {
    return err
  }
}

export const getAuthMe = async () => {
  try {
    const res = await axiosInstance.get(`${CONFIG_API.AUTH.INDEX}/me`)
    return res.data
  } catch (err) {
    return err
  }
}
