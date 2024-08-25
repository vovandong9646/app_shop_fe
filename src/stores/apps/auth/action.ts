import { createAsyncThunk } from '@reduxjs/toolkit'
import { registerAuth, updateMe } from 'src/services/auth'
import { IRegisterParam } from 'src/types/auth'

// ** Add User
export const registerAuthAction = createAsyncThunk('auth/register', async (dataInput: IRegisterParam) => {
  const response = await registerAuth(dataInput)

  if (response?.data) {
    return response
  }

  return {
    data: null,
    message: response?.response?.data?.message,
    typeError: response?.response?.data?.typeError
  }
})

// ** Update Me
export const updateMeAsync = createAsyncThunk('auth/updateMe', async (data: any) => {
  const response = await updateMe(data)

  if (response?.data) {
    return response
  }

  return {
    data: null,
    message: response?.response?.data?.message,
    typeError: response?.response?.data?.typeError
  }
})
