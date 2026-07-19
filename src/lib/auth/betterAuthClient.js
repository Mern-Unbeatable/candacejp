import { createAuthClient } from 'better-auth/react'
import { env } from '../../config/env'
import { tokenStorage } from '../api/tokenStorage'

const apiOrigin = env.apiUrl.replace(/\/api\/?$/, '')

export const betterAuthClient = createAuthClient({
  baseURL: apiOrigin,
  basePath: '/api/better-auth',
  fetchOptions: {
    credentials: 'include',
    auth: {
      type: 'Bearer',
      token: () => tokenStorage.getAccessToken() || '',
    },
  },
})

