import { ApiError } from './ApiError'
import { handleUnauthorized } from './authSession'
import { refreshAccessToken } from './refreshAccessToken'
import { tokenStorage } from './tokenStorage'

let isRefreshing = false
let refreshQueue = []

function resolveRefreshQueue(error, token = null) {
  refreshQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error)
      return
    }
    resolve(token)
  })
  refreshQueue = []
}

function shouldAttemptRefresh(error, originalRequest) {
  return (
    error.response?.status === 401
    && !originalRequest._retry
    && !originalRequest.skipAuthRefresh
    && Boolean(tokenStorage.getRefreshToken())
  )
}

export function setupInterceptors(client) {
  client.interceptors.request.use((config) => {
    const token = tokenStorage.getAccessToken()

    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  })

  client.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config

      if (!originalRequest || !shouldAttemptRefresh(error, originalRequest)) {
        return Promise.reject(ApiError.fromAxios(error))
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          refreshQueue.push({
            resolve: (token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`
              resolve(client(originalRequest))
            },
            reject,
          })
        })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const accessToken = await refreshAccessToken()
        resolveRefreshQueue(null, accessToken)
        originalRequest.headers.Authorization = `Bearer ${accessToken}`
        return client(originalRequest)
      } catch (refreshError) {
        resolveRefreshQueue(refreshError, null)
        tokenStorage.clear()
        handleUnauthorized()
        return Promise.reject(
          refreshError instanceof ApiError ? refreshError : ApiError.fromAxios(refreshError),
        )
      } finally {
        isRefreshing = false
      }
    },
  )
}
