import Cookies from 'js-cookie'

const ACCESS_TOKEN_KEY = 'access_token'
const REFRESH_TOKEN_KEY = 'refresh_token'
const USER_KEY = 'user'
const ACCESS_EXPIRES_AT_KEY = 'access_token_expires_at'
const REFRESH_EXPIRES_AT_KEY = 'refresh_token_expires_at'

const cookieOptions = { expires: 7, sameSite: 'Lax' }

export const tokenStorage = {
  getAccessToken() {
    return Cookies.get(ACCESS_TOKEN_KEY) || null
  },

  getRefreshToken() {
    return Cookies.get(REFRESH_TOKEN_KEY) || null
  },

  getAccessTokenExpiresAt() {
    return Cookies.get(ACCESS_EXPIRES_AT_KEY) || null
  },

  getRefreshTokenExpiresAt() {
    return Cookies.get(REFRESH_EXPIRES_AT_KEY) || null
  },

  isAccessTokenExpired(bufferSeconds = 30) {
    const expiresAt = this.getAccessTokenExpiresAt()
    if (!expiresAt) return false
    return Date.now() >= new Date(expiresAt).getTime() - bufferSeconds * 1000
  },

  getUser() {
    try {
      const raw = Cookies.get(USER_KEY)
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  },

  setSession({
    accessToken,
    refreshToken,
    user,
    accessTokenExpiresAt,
    refreshTokenExpiresAt,
  }) {
    if (accessToken) {
      Cookies.set(ACCESS_TOKEN_KEY, accessToken, cookieOptions)
    }
    if (refreshToken) {
      Cookies.set(REFRESH_TOKEN_KEY, refreshToken, cookieOptions)
    }
    if (accessTokenExpiresAt) {
      Cookies.set(ACCESS_EXPIRES_AT_KEY, accessTokenExpiresAt, cookieOptions)
    }
    if (refreshTokenExpiresAt) {
      Cookies.set(REFRESH_EXPIRES_AT_KEY, refreshTokenExpiresAt, cookieOptions)
    }
    if (user) {
      Cookies.set(USER_KEY, JSON.stringify(user), cookieOptions)
    }
  },

  setTokens({
    accessToken,
    refreshToken,
    accessTokenExpiresAt,
    refreshTokenExpiresAt,
  }) {
    if (accessToken) {
      Cookies.set(ACCESS_TOKEN_KEY, accessToken, cookieOptions)
    }
    if (refreshToken) {
      Cookies.set(REFRESH_TOKEN_KEY, refreshToken, cookieOptions)
    }
    if (accessTokenExpiresAt) {
      Cookies.set(ACCESS_EXPIRES_AT_KEY, accessTokenExpiresAt, cookieOptions)
    }
    if (refreshTokenExpiresAt) {
      Cookies.set(REFRESH_EXPIRES_AT_KEY, refreshTokenExpiresAt, cookieOptions)
    }
  },

  clear() {
    Cookies.remove(ACCESS_TOKEN_KEY)
    Cookies.remove(REFRESH_TOKEN_KEY)
    Cookies.remove(USER_KEY)
    Cookies.remove(ACCESS_EXPIRES_AT_KEY)
    Cookies.remove(REFRESH_EXPIRES_AT_KEY)
  },
}
