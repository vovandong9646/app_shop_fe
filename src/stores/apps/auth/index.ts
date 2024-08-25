// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'
import { Dispatch } from 'redux'
import { registerAuthAction, updateMeAsync } from './action'

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

const initialState = {
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: '',
  typeError: ''
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    resetState: () => initialState
  },
  extraReducers: builder => {
    builder.addCase(registerAuthAction.pending, (state, action) => {
      state.isLoading = true
    }),
      builder.addCase(registerAuthAction.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = !!action.payload?.data?.email
        state.isError = !action.payload?.data?.email
        state.message = action.payload?.message
        state.typeError = action.payload?.typeError
      }),
      builder.addCase(updateMeAsync.pending, (state, action) => {
        state.isLoading = true
      }),
      builder.addCase(updateMeAsync.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = !!action.payload?.data?.email
        state.isError = !action.payload?.data?.email
        state.message = action.payload?.message
        state.typeError = action.payload?.typeError
      })
  }
})

export const { resetState } = authSlice.actions
export default authSlice.reducer
