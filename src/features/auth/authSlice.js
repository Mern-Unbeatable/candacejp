import { createSlice } from '@reduxjs/toolkit'
import { tokenStorage } from '../../lib/api/tokenStorage'

const token = tokenStorage.getAccessToken()
const user = tokenStorage.getUser()

const initialState = {
  user,
  token,
  isAuthenticated: Boolean(token && user),
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user: nextUser, token: nextToken, refreshToken } = action.payload

      state.user = nextUser
      state.token = nextToken
      state.isAuthenticated = true

      tokenStorage.setSession({
        accessToken: nextToken,
        refreshToken,
        user: nextUser,
      })
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      tokenStorage.clear()
    },
  },
})

export const { setCredentials, logout } = authSlice.actions
export default authSlice.reducer

export const selectCurrentUser = (state) => state.auth.user
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated
export const selectUserRole = (state) => state.auth.user?.role?.toLowerCase()
