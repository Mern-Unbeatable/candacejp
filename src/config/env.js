const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

export const env = {
  apiUrl: apiUrl.replace(/\/$/, ''),
  socketUrl: (import.meta.env.VITE_SOCKET_URL || apiUrl.replace(/\/api\/?$/, '') || 'http://localhost:3000').replace(/\/$/, ''),
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
}
