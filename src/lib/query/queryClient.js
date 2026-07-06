import { QueryClient } from '@tanstack/react-query'
import { ApiError } from '../api/ApiError'

function shouldRetryQuery(failureCount, error) {
  if (error instanceof ApiError) {
    if (error.status >= 400 && error.status < 500) {
      return false
    }
  }

  return failureCount < 2
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      gcTime: 5 * 60 * 1000,
      retry: shouldRetryQuery,
      refetchOnWindowFocus: import.meta.env.PROD,
    },
    mutations: {
      retry: false,
    },
  },
})
