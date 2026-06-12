import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

function getStoredUser() {
  try {
    const raw = Cookies.get('user')
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

const token = Cookies.get('access_token') || null
const user = getStoredUser()

const initialState = {
  user,
  token,
  isAuthenticated: !!token && !!user,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user: nextUser, token: nextToken } = action.payload
      state.user = nextUser
      state.token = nextToken
      state.isAuthenticated = true
      Cookies.set('access_token', nextToken, { expires: 7 })
      Cookies.set('user', JSON.stringify(nextUser), { expires: 7 })
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      Cookies.remove('access_token')
      Cookies.remove('user')
    },
  },
})

export const { setCredentials, logout } = authSlice.actions
export default authSlice.reducer

export const selectCurrentUser = (state) => state.auth.user
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated
export const selectUserRole = (state) => state.auth.user?.role
