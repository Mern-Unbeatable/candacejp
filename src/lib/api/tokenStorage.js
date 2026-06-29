import Cookies from 'js-cookie'

const ACCESS_TOKEN_KEY = 'access_token'
const REFRESH_TOKEN_KEY = 'refresh_token'
const USER_KEY = 'user'

const cookieOptions = { expires: 7, sameSite: 'Lax' }

export const tokenStorage = {
  getAccessToken() {
    return Cookies.get(ACCESS_TOKEN_KEY) || null
  },

  getRefreshToken() {
    return Cookies.get(REFRESH_TOKEN_KEY) || null
  },

  getUser() {
    try {
      const raw = Cookies.get(USER_KEY)
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  },

  setSession({ accessToken, refreshToken, user }) {
    if (accessToken) {
      Cookies.set(ACCESS_TOKEN_KEY, accessToken, cookieOptions)
    }
    if (refreshToken) {
      Cookies.set(REFRESH_TOKEN_KEY, refreshToken, cookieOptions)
    }
    if (user) {
      Cookies.set(USER_KEY, JSON.stringify(user), cookieOptions)
    }
  },

  setTokens({ accessToken, refreshToken }) {
    if (accessToken) {
      Cookies.set(ACCESS_TOKEN_KEY, accessToken, cookieOptions)
    }
    if (refreshToken) {
      Cookies.set(REFRESH_TOKEN_KEY, refreshToken, cookieOptions)
    }
  },

  clear() {
    Cookies.remove(ACCESS_TOKEN_KEY)
    Cookies.remove(REFRESH_TOKEN_KEY)
    Cookies.remove(USER_KEY)
  },
}
