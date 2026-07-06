import { useCallback } from 'react'
import toast from 'react-hot-toast'
import { ApiError } from '../lib/api/ApiError'

export function getApiErrorMessage(error, fallback = 'Something went wrong') {
  if (error instanceof ApiError) {
    return error.message || fallback
  }

  if (error?.message) {
    return error.message
  }

  return fallback
}

export function useApiErrorHandler() {
  return useCallback((error, fallback) => {
    toast.error(getApiErrorMessage(error, fallback))
  }, [])
}
