import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Provider } from 'react-redux'
import { setUnauthorizedHandler } from '../../lib/api/authSession'
import { queryClient } from '../../lib/query/queryClient'
import { logout } from '../../features/auth/authSlice'
import { store } from '../store'

setUnauthorizedHandler(() => {
  store.dispatch(logout())
  queryClient.clear()

  if (window.location.pathname !== '/login') {
    window.location.assign('/login')
  }
})

export function AppProviders({ children }) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {children}
        {import.meta.env.DEV ? (
          <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
        ) : null}
      </QueryClientProvider>
    </Provider>
  )
}
