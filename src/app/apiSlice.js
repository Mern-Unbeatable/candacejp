import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { env } from '../config/env'
import { tokenStorage } from '../lib/api/tokenStorage'

const baseQuery = fetchBaseQuery({
  baseUrl: env.apiUrl,
  prepareHeaders: (headers) => {
    const token = tokenStorage.getAccessToken()
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    return headers
  },
})

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['Auth', 'Member', 'Concierge', 'Admin'],
  endpoints: () => ({}),
})
