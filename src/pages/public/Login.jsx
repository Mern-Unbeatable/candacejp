import { useState } from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { DUMMY_CREDENTIALS_HINT } from '../../features/auth/dummyAuth'

export default function Login() {
  const { login, isLoginLoading } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(form)
  }

  const fillDemo = (email, password) => {
    setForm({ email, password })
  }

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-ink-50 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-ink-500">Login</h1>
        <p className="mt-2 text-sm text-ink-300">Sign in to your CandaceJP account.</p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-ink-400">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-ink-100 px-3 py-2.5 text-ink-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="you@email.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-ink-400">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={form.password}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-ink-100 px-3 py-2.5 text-ink-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isLoginLoading}
            className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {isLoginLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 rounded-lg border border-blue-100 bg-blue-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">Demo Accounts</p>
          <p className="mt-1 text-xs text-ink-300">Password for all: <span className="font-mono">demo123</span></p>
          <div className="mt-3 flex flex-col gap-2">
            {DUMMY_CREDENTIALS_HINT.map((cred) => (
              <button
                key={cred.role}
                type="button"
                onClick={() => fillDemo(cred.email, cred.password)}
                className="rounded-lg border border-blue-200 bg-white px-3 py-2 text-left text-xs text-ink-400 transition-colors hover:border-blue-400 hover:bg-blue-50"
              >
                <span className="font-medium capitalize text-blue-700">{cred.role}</span>
                <span className="ml-2 font-mono text-ink-300">{cred.email}</span>
              </button>
            ))}
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-ink-300">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="font-medium text-blue-600 hover:text-blue-700">
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}
