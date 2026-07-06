const apiUrl = import.meta.env.VITE_API_URL || 'https://api-candacejp.maktechgroup.tech/api'

export const env = {
  apiUrl: apiUrl.replace(/\/$/, ''),
  socketUrl: (import.meta.env.VITE_SOCKET_URL || apiUrl.replace(/\/api\/?$/, '') || 'https://api-candacejp.maktechgroup.tech').replace(/\/$/, ''),
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
}
