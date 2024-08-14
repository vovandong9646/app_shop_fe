// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'
import { Dispatch } from 'redux'
import { registerAuthAction } from './action'

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

const initialState = {
  isSuccess: true,
  isError: false,
  isLoading: false,
  message: '',
  typeError: ''
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(registerAuthAction.pending, (state, action) => {
      state.isLoading = true
      state.isError = false
      state.isSuccess = false
      state.message = ''
      state.typeError = ''
    }),
      builder.addCase(registerAuthAction.fulfilled, (state, action) => {
        console.log(action.payload)
        state.isLoading = false
        state.isSuccess = !!action.payload?.data?.email
        state.isError = !action.payload?.data?.email
        state.message = action.payload?.message
        state.typeError = action.payload?.typeError
      })
  }
})

export default authSlice.reducer
