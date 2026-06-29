import { ApiError } from './ApiError'
import apiClient from './axios'
import { unwrapResponse } from './unwrapResponse'

async function execute(requestPromise) {
  try {
    const response = await requestPromise
    return unwrapResponse(response)
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw ApiError.fromAxios(error)
  }
}

export const http = {
  get(url, config) {
    return execute(apiClient.get(url, config))
  },

  post(url, data, config) {
    return execute(apiClient.post(url, data, config))
  },

  put(url, data, config) {
    return execute(apiClient.put(url, data, config))
  },

  patch(url, data, config) {
    return execute(apiClient.patch(url, data, config))
  },

  delete(url, config) {
    return execute(apiClient.delete(url, config))
  },
}
