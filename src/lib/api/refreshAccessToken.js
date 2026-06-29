import axios from 'axios'
import { env } from '../../config/env'
import { ApiError } from './ApiError'
import { tokenStorage } from './tokenStorage'

/**
 * Standalone refresh call (no interceptors) to avoid infinite retry loops.
 */
export async function refreshAccessToken() {
  const refreshToken = tokenStorage.getRefreshToken()

  if (!refreshToken) {
    throw new ApiError('No refresh token available', 401)
  }

  const response = await axios.post(
    `${env.apiUrl}/auth/refresh`,
    { refreshToken },
    {
      headers: { 'Content-Type': 'application/json' },
      timeout: 15000,
    },
  )

  const body = response.data

  if (!body?.success) {
    throw new ApiError(body?.message || 'Token refresh failed', response.status, body)
  }

  const { accessToken, refreshToken: nextRefreshToken } = body.data || {}

  if (!accessToken) {
    throw new ApiError('Token refresh failed', response.status, body)
  }

  tokenStorage.setTokens({
    accessToken,
    refreshToken: nextRefreshToken || refreshToken,
  })

  return accessToken
}
