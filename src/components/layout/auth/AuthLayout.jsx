import { Link, Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-blue-50">
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <Outlet />
      </div>

      <p className="pb-6 text-center text-sm text-ink-300">
        <Link to="/" className="font-medium text-blue-600 hover:text-blue-700">
          &larr; Back to Home
        </Link>
      </p>
    </div>
  )
}
