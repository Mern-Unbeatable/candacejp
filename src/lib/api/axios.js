import axios from 'axios'
import { env } from '../../config/env'
import { setupInterceptors } from './interceptors'

export const apiClient = axios.create({
  baseURL: env.apiUrl,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

setupInterceptors(apiClient)

export default apiClient
